import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiShieldOff,
  FiExternalLink,
} from "react-icons/fi";
import { API_URL, FILE_BASE_URL } from "../config";

export default function Certificates() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/certificates`);
      setItems(response.data);
    } catch (err) {
      console.error("Failed to load certificates:", err);
      setError("Unable to load certificates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const revoke = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to revoke this certificate?"
    );

    if (!confirmed) return;

    try {
      await axios.patch(`${API_URL}/certificates/${id}/revoke`);
      await load();
    } catch (err) {
      console.error("Failed to revoke certificate:", err);
      alert("Failed to revoke certificate. Please try again.");
    }
  };

  const filtered = items.filter((certificate) => {
    const searchableText = [
      certificate.certificateId,
      certificate.studentName,
      certificate.course,
      certificate.institution,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query.toLowerCase());
  });

  return (
    <div className="container py-5">
      <div className="page-heading">
        <span className="eyebrow">RECORDS</span>

        <h1>Certificates</h1>

        <p>
          Manage uploaded certificates and their verification status.
        </p>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search by ID, student, course or institution"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Link to="/upload" className="btn btn-primary">
            + Upload New
          </Link>
        </div>

        {loading && (
          <div className="empty">
            Loading certificates...
          </div>
        )}

        {!loading && error && (
          <div className="empty">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty">
            No certificates found.
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Institution</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((certificate) => (
                  <tr key={certificate._id}>
                    <td>
                      <Link
                        className="id-link"
                        to={`/verify/${certificate.certificateId}`}
                      >
                        {certificate.certificateId}
                      </Link>
                    </td>

                    <td>{certificate.studentName}</td>

                    <td>{certificate.course}</td>

                    <td>{certificate.institution}</td>

                    <td>
                      <span
                        className={`status ${certificate.status.toLowerCase()}`}
                      >
                        {certificate.status}
                      </span>
                    </td>

                    <td className="actions">
                      <Link
                        to={`/verify/${certificate.certificateId}`}
                        title="Verify Certificate"
                      >
                        <FiSearch />
                      </Link>

                      <a
                        href={`${FILE_BASE_URL}${certificate.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Certificate"
                      >
                        <FiExternalLink />
                      </a>

                      {certificate.status === "Valid" && (
                        <button
                          onClick={() =>
                            revoke(certificate.certificateId)
                          }
                          title="Revoke Certificate"
                          type="button"
                        >
                          <FiShieldOff />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}