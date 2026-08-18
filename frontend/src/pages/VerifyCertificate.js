import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiShield, FiCheckCircle, FiXCircle, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { API_URL, FILE_BASE_URL } from "../config";

export default function VerifyCertificate() {
  const { certificateId } = useParams(); const [id, setId] = useState(certificateId || ""); const [result, setResult] = useState(null); const [loading, setLoading] = useState(false);
  const verify = async value => { if (!value.trim()) return; setLoading(true); setResult(null); try { const r = await axios.get(`${API_URL}/certificates/verify/${encodeURIComponent(value.trim())}`); setResult(r.data); } catch (e) { setResult(e.response?.data || { verified:false, message:"Certificate not found" }); } finally { setLoading(false); } };
  useEffect(() => { if (certificateId) verify(certificateId); }, [certificateId]);
  return <div className="container py-5 narrow"><Link to="/" className="back-link"><FiArrowLeft /> Back to Dashboard</Link><div className="verify-top"><div className="verify-icon"><FiShield /></div><span className="eyebrow">PUBLIC VERIFICATION</span><h1>Verify a Certificate</h1><p>Enter the unique certificate ID to check authenticity and current status.</p></div><div className="search-box"><FiSearch /><input value={id} onChange={e => setId(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && verify(id)} placeholder="e.g. DCV-ME8K3D-AB12CD" /><button onClick={() => verify(id)} disabled={loading}>{loading ? "Checking..." : "Verify"}</button></div>{result && <Result result={result} />}</div>;
}
function Result({ result }) { const c = result.certificate; return <div className={`verification-result ${result.verified ? "valid" : "invalid"}`}><div className="result-header"><div className="result-status">{result.verified ? <FiCheckCircle /> : <FiXCircle />}<div><strong>{result.verified ? "Certificate Verified" : "Verification Failed"}</strong><span>{result.message}</span></div></div></div>{c && <div className="certificate-details"><Detail label="Certificate ID" value={c.certificateId} /><Detail label="Student Name" value={c.studentName} /><Detail label="Course" value={c.course} /><Detail label="Institution" value={c.institution} /><Detail label="Issue Date" value={new Date(c.issueDate).toLocaleDateString()} /><Detail label="Grade / Percentage" value={c.grade || "—"} /><Detail label="Status" value={c.status} /><a className="file-link" href={`${FILE_BASE_URL}${c.filePath}`} target="_blank" rel="noreferrer"><FiExternalLink /> View Original Certificate</a></div>}</div>; }
function Detail({ label, value }) { return <div className="detail"><span>{label}</span><b>{value}</b></div>; }
