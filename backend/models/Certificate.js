const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    grade: { type: String, trim: true },
    status: { type: String, enum: ["Valid", "Revoked"], default: "Valid" },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileMimeType: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
