"use client";

import { useState, useEffect } from "react";
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

export default function CertificatesListPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [activeDownloadCert, setActiveDownloadCert] = useState<Certificate | null>(null);

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
    if (checked) {
      setSelectedIds(certs.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  // Function to capture and download a single certificate
  const triggerSingleDownload = async (cert: Certificate) => {
    setGeneratingPdf(true);
    setActiveDownloadCert(cert);

    // Wait for the DOM to update and render the template
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("certificate-render-target");
      if (!element) throw new Error("Certificate element not found");

      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FAF9F5",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1120, 792],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 1120, 792);
      pdf.save(`Certificate_${cert.studentRegnumber}.pdf`);
    } catch (err) {
      console.error("Error generating single PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setActiveDownloadCert(null);
      setGeneratingPdf(false);
    }
  };

  // Function to download selected certificates in bulk as a single PDF
  const triggerBulkDownload = async () => {
    if (selectedIds.length === 0) return;
    setGeneratingPdf(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1120, 792],
      });

      const selectedCerts = certs.filter((c) => selectedIds.includes(c.id));

      for (let i = 0; i < selectedCerts.length; i++) {
        const cert = selectedCerts[i];
        setActiveDownloadCert(cert);

        // Wait for rendering
        await new Promise((resolve) => setTimeout(resolve, 200));

        const element = document.getElementById("certificate-render-target");
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 1.5, // Standard high resolution for multi-page
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#FAF9F5",
        });

        const imgData = canvas.toDataURL("image/png");
        
        if (i > 0) {
          pdf.addPage([1120, 792], "landscape");
        }
        
        pdf.addImage(imgData, "PNG", 0, 0, 1120, 792);
      }

      pdf.save(`CTS_Certificates_Bulk.pdf`);
    } catch (err) {
      console.error("Error generating bulk PDF:", err);
      alert("Failed to generate bulk PDF.");
    } finally {
      setActiveDownloadCert(null);
      setGeneratingPdf(false);
    }
  };

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
        <div className="text-left">
          <p className="font-semibold text-text-page">{item.studentName}</p>
          <span className="font-mono text-[10px] bg-black/5 px-1 rounded text-text-page/60">{item.studentRegnumber}</span>
        </div>
      ),
    },
    {
      key: "courseTitle" as keyof Certificate,
      label: "Qualified Program",
      render: (item: Certificate) => (
        <span className="text-xs font-semibold text-text-page/80">
          {item.courseTitle}
        </span>
      ),
    },
    {
      key: "issueDate" as keyof Certificate,
      label: "Date Issued",
      render: (item: Certificate) => (
        <span className="text-xs text-text-page/60">{item.issueDate}</span>
      ),
    },
    {
      key: "grade" as keyof Certificate,
      label: "Grade",
      render: (item: Certificate) => (
        <span className="px-2 py-0.5 bg-black/5 rounded text-[10px] font-semibold text-text-page/70 border border-border-subtle">
          {item.grade}
        </span>
      ),
    },
    {
      key: "status" as keyof Certificate,
      label: "Status",
      render: (item: Certificate) => {
        const isActive = item.status === "Active";
        return (
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
            isActive 
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" 
              : "bg-red-500/10 border border-red-500/20 text-red-600"
          }`}>
            {item.status}
          </span>
        );
      },
    },
    { key: "actions" as keyof Certificate, label: "Actions" },
  ];

  return (
    <div className="space-y-6 text-left font-sans relative">
      
      {/* Hidden Certificate Target for PDF Render */}
      {activeDownloadCert && (
        <div className="fixed -top-[9999px] -left-[9999px] z-0">
          <div 
            id="certificate-render-target" 
            className="w-[1120px] h-[792px] p-16 bg-[#FAF9F5] border-[16px] border-double border-[#041e17] flex flex-col justify-between relative text-neutral-800"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {/* Top Border Header Details */}
            <div className="flex justify-between items-start w-full">
              <span className="text-sm font-semibold text-[#041e17] tracking-wider">
                Register No : {activeDownloadCert.studentRegnumber}
              </span>
              {/* Decorative Circle Badge */}
              <div className="w-16 h-16 rounded-full border border-sky-400 bg-sky-50 opacity-90 flex items-center justify-center text-[7px] text-sky-700 font-bold uppercase text-center p-1 leading-tight shadow-inner">
                Creative Tax Solutions
              </div>
            </div>

            {/* Main Center Content */}
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              {/* Crest / Logo Accent */}
              <div className="text-amber-500 text-3xl">⚜</div>

              {/* Company Title */}
              <h1 className="text-5xl font-bold text-[#041e17] uppercase tracking-widest font-serif leading-none">
                Creative Tax Solutions
              </h1>

              {/* WHRDE Subtext */}
              <p className="text-[11px] font-sans tracking-[0.25em] text-[#041e17]/80 uppercase font-semibold">
                Affiliated with Human Resource Development (WHRDE)
              </p>

              {/* Title Section */}
              <h2 className="text-xl font-bold text-[#041e17]/90 tracking-widest uppercase pt-2 pb-4 font-serif">
                Board of Professional Education
              </h2>

              {/* Certificate Script Text */}
              <div className="max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700 italic">
                <p>This is to certify that</p>
                <p className="text-3xl font-bold not-italic text-[#041e17] underline decoration-double decoration-amber-500/40 py-1">
                  {activeDownloadCert.studentName}
                </p>
                <p>has been admitted to the Professional Certification in</p>
                <p className="text-2xl font-bold not-italic font-sans text-[#041e17] uppercase tracking-wide">
                  {activeDownloadCert.courseTitle}
                </p>
                <p className="text-sm max-w-2xl mx-auto">
                  having been certified by duly appointed Examiners to be qualified to receive the same, 
                  and by them placed in the <span className="font-bold not-italic text-[#041e17]">{activeDownloadCert.grade}</span> at the examination.
                </p>
              </div>
            </div>

            {/* Bottom Signature / Date Area */}
            <div className="flex justify-between items-end w-full pt-6">
              {/* Issue Details */}
              <div className="text-left space-y-1">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Training Center</p>
                <p className="text-xs font-semibold text-[#041e17]">Kochi, Kerala, India</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest pt-2">Date of Issue</p>
                <p className="text-xs font-semibold text-[#041e17]">{activeDownloadCert.issueDate}</p>
              </div>

              {/* Red Wax Seal */}
              <div className="w-24 h-24 rounded-full border-4 border-red-600/30 flex items-center justify-center p-1 bg-red-500/5 select-none rotate-6">
                <div className="w-full h-full rounded-full border-2 border-dashed border-red-600 flex flex-col items-center justify-center text-red-600 font-bold uppercase text-[8px] text-center p-0.5 bg-red-500/10">
                  <span>CTS</span>
                  <span className="text-[6px] tracking-wider">CERTIFIED</span>
                  <span className="text-[5px]">SEAL</span>
                </div>
              </div>

              {/* Signature Line */}
              <div className="text-right space-y-1 border-t border-neutral-300 pt-2 w-48">
                {/* Handwritten script sign */}
                <p className="text-base font-serif italic text-neutral-700 pr-4 leading-none">Advai Prakash</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Director</p>
                <p className="text-[8px] text-neutral-400 font-sans tracking-wide">Creative Tax Solutions</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/50 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-text-page">
            Manage Certificates
          </h2>
          <p className="text-[11px] text-text-page/60 font-sans mt-0.5">
            Issue and manage student certification records for courses on the site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={triggerBulkDownload}
              disabled={generatingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-[10px] uppercase tracking-wider transition-all disabled:opacity-50 border-none cursor-pointer"
            >
              📥 Bulk Download PDF ({selectedIds.length})
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

      {/* Select All checkbox bar for mobile details */}
      {certs.length > 0 && (
        <div className="flex items-center gap-2 px-6 py-3 bg-black/[0.01] border border-border-subtle rounded-xl text-xs font-semibold text-text-page/70">
          <input
            type="checkbox"
            checked={selectedIds.length === certs.length && certs.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-border-subtle cursor-pointer"
          />
          <span>Select All Certificates for Bulk PDF Download</span>
        </div>
      )}

      {/* Main List Table */}
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
                  onClick={() => triggerSingleDownload(item)}
                  disabled={generatingPdf}
                  className="px-2.5 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-[10px] font-bold uppercase tracking-wider text-[#1e3a1e] transition-colors cursor-pointer border-none disabled:opacity-50"
                  title="Download Certificate PDF"
                >
                  Download PDF
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
