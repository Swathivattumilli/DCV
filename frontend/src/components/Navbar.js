import React from "react";
import { NavLink } from "react-router-dom";
import { FiShield, FiUploadCloud, FiSearch, FiGrid, FiFileText } from "react-icons/fi";

export default function Navbar() {
  const link = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  return <nav className="navbar navbar-expand-lg app-nav">
    <div className="container">
      <NavLink to="/" className="brand"><span className="brand-icon"><FiShield /></span><span>Certi<span>Verify</span></span></NavLink>
      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">☰</button>
      <div className="collapse navbar-collapse" id="navMenu">
        <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <NavLink to="/" className={link}><FiGrid /> Dashboard</NavLink>
          <NavLink to="/upload" className={link}><FiUploadCloud /> Upload</NavLink>
          <NavLink to="/verify" className={link}><FiSearch /> Verify</NavLink>
          <NavLink to="/certificates" className={link}><FiFileText /> Certificates</NavLink>
        </div>
      </div>
    </div>
  </nav>;
}
