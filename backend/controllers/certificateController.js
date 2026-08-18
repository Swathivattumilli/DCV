const crypto = require("crypto");
const Certificate = require("../models/Certificate");

const generateCertificateId = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `DCV-${stamp}-${random}`;
};

exports.uploadCertificate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Certificate file is required" });

    const { studentName, course, institution, issueDate, grade } = req.body;
    if (!studentName || !course || !institution || !issueDate) {
      return res.status(400).json({ message: "Student name, course, institution and issue date are required" });
    }

    let certificateId;
    do {
      certificateId = generateCertificateId();
    } while (await Certificate.exists({ certificateId }));

    const certificate = await Certificate.create({
      certificateId,
      studentName,
      course,
      institution,
      issueDate,
      grade,
      fileName: req.file.originalname,
      filePath: `/uploads/${req.file.filename}`,
      fileMimeType: req.file.mimetype
    });

    res.status(201).json({ message: "Certificate uploaded successfully", certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to upload certificate" });
  }
};

exports.verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!certificate) return res.status(404).json({ verified: false, message: "Certificate not found" });
    if (certificate.status === "Revoked") return res.status(200).json({ verified: false, message: "Certificate has been revoked", certificate });
    res.json({ verified: true, message: "Certificate is valid", certificate });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch certificates" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [total, valid, revoked] = await Promise.all([
      Certificate.countDocuments(),
      Certificate.countDocuments({ status: "Valid" }),
      Certificate.countDocuments({ status: "Revoked" })
    ]);
    res.json({ total, valid, revoked });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch dashboard statistics" });
  }
};

exports.revokeCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndUpdate(
      { certificateId: req.params.certificateId },
      { status: "Revoked" },
      { new: true }
    );
    if (!certificate) return res.status(404).json({ message: "Certificate not found" });
    res.json({ message: "Certificate revoked", certificate });
  } catch (error) {
    res.status(500).json({ message: "Unable to revoke certificate" });
  }
};
