"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { drawCertificatePage } from "@/utils/certificateRenderer";

interface Certificate {
  id: number;
  studentName: string;
  studentRegnumber: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  status: string;
}

export default function CertificatePreviewPage() {
  const params = useParams();
  const id = params.id as string;

  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const pdfRef = useRef<string | null>(null);

  // Fetch the certificate data
  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((c: Certificate) => c.id === Number(id));
          if (found) setCert(found);
        }
      })
      .catch((err) => console.error("Error loading certificate:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Generate PDF blob URL for preview
  useEffect(() => {
    if (!cert) return;
    let cancelled = false;

    (async () => {
      try {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
        await drawCertificatePage(pdf, cert);

        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);

        if (!cancelled) {
          setPdfUrl(url);
          pdfRef.current = url;
        }
      } catch (err) {
        console.error("Error generating preview:", err);
      }
    })();

    return () => {
      cancelled = true;
      if (pdfRef.current) {
        URL.revokeObjectURL(pdfRef.current);
      }
    };
  }, [cert]);

  // Download handler
  const handleDownload = async () => {
    if (!cert) return;
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      await drawCertificatePage(pdf, cert);
      pdf.save(`Certificate_${cert.studentRegnumber}.pdf`);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      alert("Failed to download PDF.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-page/50 font-semibold uppercase tracking-wider">Loading certificate...</p>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
        <p className="text-lg font-serif text-text-page/70">Certificate not found</p>
        <Link
          href="/admin/certificates"
          className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
        >
          ← Back to Certificates
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left font-sans">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/50 pb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
          >
            <span>←</span>
            <span>Back to Certificates</span>
          </Link>
          <div className="h-4 w-px bg-border-subtle" />
          <div>
            <h2 className="text-base font-serif font-medium text-text-page">
              Certificate Preview
            </h2>
            <p className="text-[10px] text-text-page/50 mt-0.5">
              {cert.studentName} · {cert.studentRegnumber} · {cert.courseTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 border-none shadow-lg shadow-emerald-600/20"
          >
            {downloading ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              "⬇ Save as PDF"
            )}
          </button>
          <Link
            href={`/admin/certificates/${id}/edit`}
            className="px-4 py-2.5 rounded-lg border border-border-subtle text-text-page/60 hover:bg-black/5 font-semibold text-[10px] uppercase tracking-wider transition-colors"
          >
            Edit Details
          </Link>
        </div>
      </div>

      {/* ── Certificate Details Summary ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Student Name", value: cert.studentName },
          { label: "Registration No", value: cert.studentRegnumber },
          { label: "Course", value: cert.courseTitle },
          { label: "Grade", value: cert.grade },
        ].map((item, idx) => (
          <div key={idx} className="p-4 bg-white border border-border-subtle rounded-xl">
            <p className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 mb-1">{item.label}</p>
            <p className="text-sm font-semibold text-text-page truncate">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── PDF Viewer ── */}
      <div className="bg-[#1a1a2e] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        {/* Viewer Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <p className="text-[9px] text-white/30 font-mono">
            Certificate_{cert.studentRegnumber}.pdf — A4 Portrait · 595 × 842 pt
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="text-[9px] text-white/50 hover:text-white/80 font-bold uppercase tracking-wider cursor-pointer bg-transparent border-none transition-colors"
          >
            ⬇ Download
          </button>
        </div>

        {/* PDF Embed */}
        <div className="p-6 sm:p-10 flex justify-center bg-[#0d0d1a] min-h-[700px]">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full max-w-[600px] h-[850px] rounded-lg shadow-2xl shadow-black/40 border border-white/5"
              title="Certificate Preview"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Generating preview...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
