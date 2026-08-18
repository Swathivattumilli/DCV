import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiUploadCloud, FiCheckCircle, FiArrowLeft, FiFile } from "react-icons/fi";
import { API_URL } from "../config";

export default function UploadCertificate() {
  const [form, setForm] = useState({ studentName: "", course: "", institution: "", issueDate: "", grade: "" });
  const [file, setFile] = useState(null); const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const [created, setCreated] = useState(null);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); setError(""); setMessage(""); if (!file) return setError("Please select a PDF, PNG or JPEG certificate."); setLoading(true); try { const data = new FormData(); Object.entries(form).forEach(([k,v]) => data.append(k,v)); data.append("certificate", file); const r = await axios.post(`${API_URL}/certificates/upload`, data); setCreated(r.data.certificate); setMessage("Certificate uploaded successfully."); setForm({ studentName:"", course:"", institution:"", issueDate:"", grade:"" }); setFile(null); e.target.reset(); } catch (err) { setError(err.response?.data?.message || "Upload failed. Check the backend connection."); } finally { setLoading(false); } };
  return <div className="container py-5 narrow"><Link to="/" className="back-link"><FiArrowLeft /> Back to Dashboard</Link><div className="page-heading"><span className="eyebrow">CERTIFICATE MANAGEMENT</span><h1>Upload Certificate</h1><p>Store an educational certificate and generate a unique verification ID.</p></div>
    {message && <div className="alert success-alert"><FiCheckCircle /> {message}</div>}{error && <div className="alert alert-danger">{error}</div>}
    {created && <div className="success-panel"><span>Unique Certificate ID</span><strong>{created.certificateId}</strong><small>Save this ID. It can be used by anyone to verify the certificate.</small><Link to={`/verify/${created.certificateId}`} className="btn btn-success">Verify this certificate</Link></div>}
    <form className="form-card" onSubmit={submit}><div className="form-grid"><Field name="studentName" label="Student Name" value={form.studentName} onChange={change} required /><Field name="course" label="Course / Program" value={form.course} onChange={change} required /><Field name="institution" label="Institution" value={form.institution} onChange={change} required /><Field name="issueDate" label="Issue Date" type="date" value={form.issueDate} onChange={change} required /><Field name="grade" label="Grade / Percentage" value={form.grade} onChange={change} placeholder="e.g. A+ / 86%" /></div><label className="file-drop"><FiFile /><span>{file ? file.name : "Choose certificate file"}</span><small>PDF, PNG or JPEG • Maximum 5 MB</small><input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={e => setFile(e.target.files[0])} /></label><button className="btn btn-primary w-100 btn-lg" disabled={loading}>{loading ? "Uploading..." : <><FiUploadCloud /> Upload & Generate ID</>}</button></form>
  </div>;
}
function Field({ label, ...props }) { return <label className="field"><span>{label}</span><input {...props} /></label>; }
