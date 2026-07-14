"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteCertificateAction } from "@/app/admin/actions";

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

/* ─────────────────────────────────────────────────────────
 * Pure jsPDF certificate renderer — no html2canvas needed.
 * Draws directly onto a landscape A4 page so no CSS parsing
 * issues with oklch / lab color functions.
 * ────────────────────────────────────────────────────────── */
async function drawCertificatePage(
  pdf: import("jspdf").jsPDF,
  cert: Certificate
) {
  const W = pdf.internal.pageSize.getWidth(); // 841.89 pt (A4 landscape)
  const H = pdf.internal.pageSize.getHeight(); // 595.28 pt

  // ── Background ──
  pdf.setFillColor(250, 249, 245); // #FAF9F5
  pdf.rect(0, 0, W, H, "F");

  // ── Outer double-border ──
  pdf.setDrawColor(4, 30, 23); // #041e17
  pdf.setLineWidth(3);
  pdf.rect(18, 18, W - 36, H - 36);
  pdf.setLineWidth(1);
  pdf.rect(24, 24, W - 48, H - 48);

  // ── Corner ornaments (small squares) ──
  const cs = 6;
  const positions = [
    [30, 30],
    [W - 30 - cs, 30],
    [30, H - 30 - cs],
    [W - 30 - cs, H - 30 - cs],
  ];
  pdf.setFillColor(4, 30, 23);
  positions.forEach(([x, y]) => pdf.rect(x, y, cs, cs, "F"));

  // ── Inner decorative rule ──
  pdf.setDrawColor(180, 160, 120); // muted gold
  pdf.setLineWidth(0.5);
  pdf.rect(36, 36, W - 72, H - 72);

  // ── Top-left: Register number ──
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(4, 30, 23);
  pdf.text(`Register No: ${cert.studentRegnumber}`, 50, 55);

  // ── Top-right: Decorative seal circle ──
  const sealX = W - 75;
  const sealY = 65;
  pdf.setDrawColor(70, 130, 180);
  pdf.setLineWidth(1);
  pdf.circle(sealX, sealY, 22);
  pdf.setFontSize(5.5);
  pdf.setTextColor(70, 130, 180);
  pdf.setFont("helvetica", "bold");
  pdf.text("CREATIVE TAX", sealX, sealY - 5, { align: "center" });
  pdf.text("SOLUTIONS", sealX, sealY, { align: "center" });
  pdf.text("CERTIFIED", sealX, sealY + 5, { align: "center" });

  // ── Fleur-de-lis accent ──
  pdf.setFontSize(22);
  pdf.setTextColor(180, 140, 60);
  pdf.text("\u2766", W / 2, 95, { align: "center" }); // ❦

  // ── Title: Institution name ──
  pdf.setFont("times", "bold");
  pdf.setFontSize(36);
  pdf.setTextColor(4, 30, 23);
  pdf.text("CREATIVE TAX SOLUTIONS", W / 2, 130, { align: "center" });

  // ── Affiliation ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 80, 80);
  pdf.text(
    "Affiliated with Human Resource Development (WHRDE)",
    W / 2,
    148,
    { align: "center" }
  );

  // ── Thin decorative line ──
  pdf.setDrawColor(180, 160, 120);
  pdf.setLineWidth(0.4);
  pdf.line(W / 2 - 120, 156, W / 2 + 120, 156);

  // ── Section heading ──
  pdf.setFont("times", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(4, 30, 23);
  pdf.text("CERTIFICATE OF COMPLETION", W / 2, 178, { align: "center" });

  // ── Thin decorative line ──
  pdf.line(W / 2 - 100, 185, W / 2 + 100, 185);

  // ── Body text ──
  const cx = W / 2;

  pdf.setFont("times", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(80, 80, 80);
  pdf.text("This is to certify that", cx, 215, { align: "center" });

  // ── Student name (prominent) ──
  pdf.setFont("times", "bolditalic");
  pdf.setFontSize(30);
  pdf.setTextColor(4, 30, 23);
  pdf.text(cert.studentName, cx, 250, { align: "center" });

  // Underline beneath name
  const nameWidth = pdf.getTextWidth(cert.studentName);
  pdf.setDrawColor(180, 140, 60);
  pdf.setLineWidth(0.8);
  pdf.line(cx - nameWidth / 2, 255, cx + nameWidth / 2, 255);

  // ── Continuation text ──
  pdf.setFont("times", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(80, 80, 80);
  pdf.text("has successfully completed the Professional Certification in", cx, 280, {
    align: "center",
  });

  // ── Course title ──
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(4, 30, 23);
  pdf.text(cert.courseTitle.toUpperCase(), cx, 310, { align: "center" });

  // ── Description text ──
  pdf.setFont("times", "italic");
  pdf.setFontSize(11);
  pdf.setTextColor(100, 100, 100);
  const desc = `having been certified by duly appointed Examiners to be qualified to receive the same, and having been placed in the ${cert.grade} at the examination.`;
  const lines = pdf.splitTextToSize(desc, 460);
  pdf.text(lines, cx, 340, { align: "center" });

  // ── Bottom section ──

  // Date of issue (left)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(130, 130, 130);
  pdf.text("TRAINING CENTER", 60, H - 100);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(4, 30, 23);
  pdf.text("Kochi, Kerala, India", 60, H - 88);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(130, 130, 130);
  pdf.text("DATE OF ISSUE", 60, H - 72);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(4, 30, 23);
  pdf.text(cert.issueDate, 60, H - 60);

  // Red wax seal (center)
  const sealCX = cx;
  const sealCY = H - 80;
  pdf.setDrawColor(180, 40, 40);
  pdf.setLineWidth(2);
  pdf.circle(sealCX, sealCY, 28);
  pdf.setLineWidth(0.6);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.circle(sealCX, sealCY, 22);
  pdf.setLineDashPattern([], 0);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(180, 40, 40);
  pdf.text("CTS", sealCX, sealCY - 5, { align: "center" });
  pdf.setFontSize(7);
  pdf.text("CERTIFIED", sealCX, sealCY + 3, { align: "center" });
  pdf.setFontSize(5);
  pdf.text("SEAL", sealCX, sealCY + 9, { align: "center" });

  // Director signature (right)
  const sigX = W - 60;
  pdf.setDrawColor(180, 180, 180);
  pdf.setLineWidth(0.5);
  pdf.line(sigX - 80, H - 95, sigX, H - 95);
  pdf.setFont("times", "italic");
  pdf.setFontSize(14);
  pdf.setTextColor(60, 60, 60);
  pdf.text("Advai Prakash", sigX - 40, H - 82, { align: "center" });
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(130, 130, 130);
  pdf.text("DIRECTOR", sigX - 40, H - 72, { align: "center" });
  pdf.setFontSize(6);
  pdf.text("Creative Tax Solutions", sigX - 40, H - 64, {
    align: "center",
  });
}

export default function CertificatesListPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCerts(data);
        }
      })
      .catch((err) => console.error("Error loading certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  // Render a certificate preview onto a canvas element
  useEffect(() => {
    if (!previewCert || !previewCanvasRef.current) return;

    let cancelled = false;

    (async () => {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      await drawCertificatePage(pdf, previewCert);

      // Convert first page to data URL for preview
      const pageData = pdf.output("datauristring");

      // Draw onto canvas using an image
      const img = new Image();
      img.onload = () => {
        if (cancelled || !previewCanvasRef.current) return;
        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // A4 landscape aspect ratio
        const scale = 2;
        canvas.width = 842 * scale;
        canvas.height = 595 * scale;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = pageData;
    })();

    return () => {
      cancelled = true;
    };
  }, [previewCert]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate record?")) return;
    try {
      const res = await deleteCertificateAction(id);
      if (res.success) {
        setCerts((prev) => prev.filter((item) => item.id !== id));
        setSelectedIds((prev) => prev.filter((x) => x !== id));
        if (previewCert?.id === id) setPreviewCert(null);
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

  // ── Download a single certificate as A4 landscape PDF ──
  const triggerSingleDownload = async (cert: Certificate) => {
    setGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
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
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

      const selected = certs.filter((c) => selectedIds.includes(c.id));
      for (let i = 0; i < selected.length; i++) {
        if (i > 0) pdf.addPage("a4", "landscape");
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
      {/* ══════════ Preview Modal ══════════ */}
      {previewCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewCert(null);
          }}
        >
          <div className="relative w-full max-w-5xl bg-[#0f1117] rounded-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden flex flex-col max-h-[95vh]">
            {/* Modal Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div>
                <h3 className="text-base font-serif font-medium text-white tracking-wide">
                  Certificate Preview
                </h3>
                <p className="text-[10px] text-white/40 mt-0.5 font-sans">
                  {previewCert.studentName} — {previewCert.studentRegnumber} — {previewCert.courseTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerSingleDownload(previewCert)}
                  disabled={generatingPdf}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 border-none shadow-lg shadow-emerald-500/20"
                >
                  {generatingPdf ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "⬇ Save as PDF"
                  )}
                </button>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center cursor-pointer border-none text-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Certificate Canvas Area */}
            <div className="flex-1 overflow-auto p-6 sm:p-8 flex items-start justify-center bg-[#080a0e]">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 bg-[#FAF9F5]">
                <canvas ref={previewCanvasRef} className="block max-w-full h-auto" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-white/[0.02]">
              <p className="text-[9px] text-white/30 font-sans">
                A4 Landscape · 841.89 × 595.28 pt · Professional Certificate
              </p>
              <p className="text-[9px] text-white/30 font-sans">
                Grade: {previewCert.grade} · Issued: {previewCert.issueDate} · Status: {previewCert.status}
              </p>
            </div>
          </div>
        </div>
      )}

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
                <button
                  onClick={() => setPreviewCert(item)}
                  className="px-2.5 py-1.5 rounded bg-black/5 hover:bg-black/10 text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors cursor-pointer border-none"
                >
                  Preview
                </button>
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
