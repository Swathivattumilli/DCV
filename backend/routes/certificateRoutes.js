const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");
const controller = require("../controllers/certificateController");

const router = express.Router();

const uploadDir = path.join(os.tmpdir(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),

  filename: (_, file, cb) => {
    const safeName = path.basename(file.originalname)
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (_, file, cb) => {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg"
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(
        new Error("Only PDF, PNG and JPEG files are allowed")
      );
    }

    cb(null, true);
  }
});

router.post(
  "/upload",
  upload.single("certificate"),
  controller.uploadCertificate
);

router.get(
  "/verify/:certificateId",
  controller.verifyCertificate
);

router.get("/", controller.getCertificates);

router.get("/stats", controller.getStats);

router.patch(
  "/:certificateId/revoke",
  controller.revokeCertificate
);

module.exports = router;