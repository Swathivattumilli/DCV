import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiClock, FiFileText, FiShield, FiArrowRight, FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../config";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, valid: 0, revoked: 0 });
  useEffect(() => { axios.get(`${API_URL}/certificates/stats`).then(r => setStats(r.data)).catch(() => {}); }, []);
  return <div className="container py-5">
    <section className="hero-card">
      <div className="hero-copy"><div className="eyebrow"><FiShield /> TRUSTED CREDENTIALS</div><h1>Verify certificates in <span>seconds.</span></h1><p>Upload, store and verify educational certificates using a unique certificate ID. Fast, simple and transparent.</p><div className="hero-actions"><Link to="/upload" className="btn btn-primary btn-lg"><FiUploadCloud /> Upload Certificate</Link><Link to="/verify" className="btn btn-light btn-lg"><FiCheckCircle /> Verify Now</Link></div></div>
      <div className="hero-art"><div className="seal"><FiShield /><b>VERIFIED</b><small>DIGITAL CREDENTIAL</small></div></div>
    </section>
    <div className="row g-4 mt-1">
      <Stat icon={<FiFileText />} title="Total Certificates" value={stats.total} />
      <Stat icon={<FiCheckCircle />} title="Valid Certificates" value={stats.valid} />
      <Stat icon={<FiClock />} title="Revoked Certificates" value={stats.revoked} />
    </div>
    <section className="info-section mt-5"><div><span className="eyebrow">HOW IT WORKS</span><h2>Three simple steps</h2></div><div className="steps"><Step n="01" title="Upload" text="Enter certificate details and upload the original PDF or image." /><Step n="02" title="Get a unique ID" text="The system creates a unique certificate ID for secure verification." /><Step n="03" title="Verify" text="Anyone can enter the ID to instantly check certificate status." /></div></section>
    <div className="quick-link"><div><b>Already have a Certificate ID?</b><span>Check its authenticity without uploading anything.</span></div><Link to="/verify">Verify Certificate <FiArrowRight /></Link></div>
  </div>;
}
function Stat({ icon, title, value }) { return <div className="col-md-4"><div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{title}</span><strong>{value}</strong></div></div></div>; }
function Step({ n, title, text }) { return <div className="step"><div className="step-num">{n}</div><h5>{title}</h5><p>{text}</p></div>; }
