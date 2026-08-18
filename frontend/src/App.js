import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UploadCertificate from "./pages/UploadCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import Certificates from "./pages/Certificates";

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/verify/:certificateId" element={<VerifyCertificate />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </main>
    <footer className="footer">© {new Date().getFullYear()} CertiVerify • Digital Certificate Verification</footer>
  </BrowserRouter>;
}
