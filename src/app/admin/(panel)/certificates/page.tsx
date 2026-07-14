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
      } else {
        alert(res.error || "Failed to delete certificate");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const headers = [
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
    <div className="space-y-6 text-left font-sans">
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
        <div>
          <Link
            href="/admin/certificates/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-black text-white hover:bg-black/90 font-bold text-[10px] uppercase tracking-wider transition-all"
          >
            + Issue Certificate
          </Link>
        </div>
      </div>

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
