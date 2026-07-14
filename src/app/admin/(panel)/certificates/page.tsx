"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteCertificateAction } from "@/app/admin/actions";
import { drawCertificatePage } from "@/utils/certificateRenderer";

interface Certificate {
  id: number;
  studentId: number;
  courseId: string;
  issueDate: string;
  grade: string;
  status: string;
  studentName: string;
  studentRegnumber: string;
  courseTitle: string;
}

export default function CertificatesListPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCerts(data);
      })
      .catch((err) => console.error("Error loading certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate record?")) return;
    try {
      const res = await deleteCertificateAction(id);
      if (res.success) {
        setCerts((prev) => prev.filter((item) => item.id !== id));
        setSelectedIds((prev) => prev.filter((x) => x !== id));
      } else {
        alert(res.error || "Failed to delete certificate");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? certs.map((c) => c.id) : []);
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  // ── Download a single certificate as A4 portrait PDF ──
  const triggerSingleDownload = async (cert: Certificate) => {
    setGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      await drawCertificatePage(pdf, cert);
      pdf.save(`Certificate_${cert.studentRegnumber}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  // ── Bulk download selected certificates ──
  const triggerBulkDownload = async () => {
    if (selectedIds.length === 0) return;
    setGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      const selected = certs.filter((c) => selectedIds.includes(c.id));
      for (let i = 0; i < selected.length; i++) {
        if (i > 0) pdf.addPage("a4", "portrait");
        await drawCertificatePage(pdf, selected[i]);
      }

      pdf.save("CTS_Certificates_Bulk.pdf");
    } catch (err) {
      console.error("Error generating bulk PDF:", err);
      alert("Failed to generate bulk PDF.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  // ── Table headers ──
  const headers = [
    {
      key: "id" as keyof Certificate,
      label: "",
      render: (item: Certificate) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(item.id)}
          onChange={(e) => handleSelectOne(item.id, e.target.checked)}
          className="w-4 h-4 rounded text-primary focus:ring-primary border-border-subtle cursor-pointer"
        />
      ),
    },
    {
      key: "studentName" as keyof Certificate,
      label: "Student Name",
      render: (item: Certificate) => (
        <span className="font-semibold text-text-page">{item.studentName}</span>
      ),
    },
    {
      key: "studentRegnumber" as keyof Certificate,
      label: "Registration Number",
      render: (item: Certificate) => (
        <span className="font-mono text-xs bg-black/5 px-2 py-1 rounded border border-border-subtle font-semibold text-text-page/80">
          {item.studentRegnumber}
        </span>
      ),
    },
    { key: "actions" as keyof Certificate, label: "Actions" },
  ];

  return (
    <div className="space-y-6 text-left font-sans relative">
      {/* ══════════ Header ══════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/50 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-text-page">
            Manage Certificates
          </h2>
          <p className="text-[11px] text-text-page/60 font-sans mt-0.5">
            Preview, download as PDF, or bulk-export student certificates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={triggerBulkDownload}
              disabled={generatingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-[10px] uppercase tracking-wider transition-all disabled:opacity-50 border-none cursor-pointer"
            >
              ⬇ Bulk PDF ({selectedIds.length})
            </button>
          )}
          <Link
            href="/admin/certificates/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-black text-white hover:bg-black/90 font-bold text-[10px] uppercase tracking-wider transition-all"
          >
            + Issue Certificate
          </Link>
        </div>
      </div>

      {/* ══════════ Select-All Bar ══════════ */}
      {certs.length > 0 && (
        <div className="flex items-center gap-2 px-6 py-3 bg-black/[0.01] border border-border-subtle rounded-xl text-xs font-semibold text-text-page/70">
          <input
            type="checkbox"
            checked={selectedIds.length === certs.length && certs.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-border-subtle cursor-pointer"
          />
          <span>Select All for Bulk Download</span>
        </div>
      )}

      {/* ══════════ Table ══════════ */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : certs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border-subtle rounded-xl bg-white space-y-3">
          <p className="text-sm text-text-page/50">No certificates found.</p>
          <Link
            href="/admin/certificates/new"
            className="inline-flex text-xs font-bold text-primary hover:underline uppercase tracking-wider"
          >
            Issue your first student certificate
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden">
          <ResponsiveTable<Certificate>
            headers={headers}
            data={certs}
            primaryKey="id"
            actions={(item) => (
              <>
                <Link
                  href={`/admin/certificates/${item.id}/preview`}
                  className="px-2.5 py-1.5 rounded bg-black/5 hover:bg-black/10 text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors"
                >
                  Preview
                </Link>
                <button
                  onClick={() => triggerSingleDownload(item)}
                  disabled={generatingPdf}
                  className="px-2.5 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-700 transition-colors cursor-pointer border-none disabled:opacity-50"
                >
                  Save as PDF
                </button>
                <Link
                  href={`/admin/certificates/${item.id}/edit`}
                  className="px-2.5 py-1.5 rounded bg-black/[0.03] hover:bg-black/[0.07] text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/15 text-[10px] font-bold uppercase tracking-wider text-red-600 transition-colors cursor-pointer border-none"
                >
                  Delete
                </button>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
