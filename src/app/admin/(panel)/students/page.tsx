"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteStudentAction } from "@/app/admin/actions";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  regnumber: string;
  createdAt: string;
}

export default function StudentsListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        }
      })
      .catch((err) => console.error("Error loading students:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student profile? This will also remove any associated certificates due to database cascades.")) return;
    try {
      const res = await deleteStudentAction(id);
      if (res.success) {
        setStudents((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete student profile");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const headers = [
    {
      key: "name" as keyof Student,
      label: "Full Name",
      render: (item: Student) => (
        <span className="font-semibold text-text-page">
          {item.name}
        </span>
      ),
    },
    {
      key: "regnumber" as keyof Student,
      label: "Registration Number",
      render: (item: Student) => (
        <span className="font-mono text-xs bg-black/5 px-2 py-1 rounded border border-border-subtle font-semibold text-text-page/80">
          {item.regnumber}
        </span>
      ),
    },
    {
      key: "email" as keyof Student,
      label: "Email",
      render: (item: Student) => (
        <span className="text-xs text-text-page/60">{item.email || "—"}</span>
      ),
    },
    {
      key: "phone" as keyof Student,
      label: "Phone",
      render: (item: Student) => (
        <span className="text-xs text-text-page/60">{item.phone || "—"}</span>
      ),
    },
    { key: "actions" as keyof Student, label: "Actions" },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/50 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-text-page">
            Manage Students
          </h2>
          <p className="text-[11px] text-text-page/60 font-sans mt-0.5">
            Add, update, or remove student accounts and matching registration numbers.
          </p>
        </div>
        <div>
          <Link
            href="/admin/students/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-black text-white hover:bg-black/90 font-bold text-[10px] uppercase tracking-wider transition-all"
          >
            + Add Student
          </Link>
        </div>
      </div>

      {/* Main List Table */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border-subtle rounded-xl bg-white space-y-3">
          <p className="text-sm text-text-page/50">No students found.</p>
          <Link
            href="/admin/students/new"
            className="inline-flex text-xs font-bold text-primary hover:underline uppercase tracking-wider"
          >
            Add your first student profile
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden">
          <ResponsiveTable<Student>
            headers={headers}
            data={students}
            primaryKey="id"
            actions={(item) => (
              <>
                <Link
                  href={`/admin/students/${item.id}/edit`}
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
