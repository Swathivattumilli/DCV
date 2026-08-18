const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/certificates", certificateRoutes);

app.get("/", (_, res) => res.json({ message: "Digital Certificate Verification API is running" }));

app.use((err, _, res, __) => {
  console.error(err);
  res.status(400).json({ message: err.message || "Request failed" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
