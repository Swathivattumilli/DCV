const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const os = require("os");
const path = require("path");

const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Serve uploaded certificate files
app.use(
    "/uploads",
    express.static(path.join(os.tmpdir(), "uploads"))
);

// Test routes
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Digital Certificate Verification System API is running 🚀"
    });
});

app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "TEST ROUTE WORKING"
    });
});

app.get("/api/certificates/test", (req, res) => {
    res.json({
        success: true,
        message: "Certificate route is working"
    });
});

// Certificate routes
app.use("/api/certificates", certificateRoutes);

// Export app for Vercel
module.exports = app;