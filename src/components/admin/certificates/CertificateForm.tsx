"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertCertificateAction } from "@/app/admin/actions";

interface Student {
  id: number;
  name: string;
  regnumber: string;
}

interface Course {
  id: string;
  title: string;
}

interface CertificateFormProps {
  initialData?: {
    id: number;
    studentId: number;
    courseId: string;
    issueDate: string;
    grade: string;
    status: string;
  };
}

export function CertificateForm({ initialData }: CertificateFormProps) {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  const [studentId, setStudentId] = useState<string>(initialData?.studentId ? String(initialData.studentId) : "");
  const [courseId, setCourseId] = useState(initialData?.courseId || "");
  const [issueDate, setIssueDate] = useState(initialData?.issueDate || new Date().toISOString().split("T")[0]);
  const [grade, setGrade] = useState(initialData?.grade || "A+");
  const [status, setStatus] = useState(initialData?.status || "Active");
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isNew = !initialData;

  useEffect(() => {
    Promise.all([
      fetch("/api/students").then((res) => res.json()),
      fetch("/api/courses").then((res) => res.json()),
    ])
      .then(([studentsData, coursesData]) => {
        if (Array.isArray(studentsData)) setStudents(studentsData);
        if (Array.isArray(coursesData)) setCourses(coursesData);
      })
      .catch((err) => console.error("Error fetching form lists:", err))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !courseId || !issueDate.trim() || !grade.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await upsertCertificateAction({
        id: initialData?.id,
        studentId: Number(studentId),
        courseId,
        issueDate: issueDate.trim(),
        grade: grade.trim(),
        status,
        isNew,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin/certificates");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to save certificate.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-48 bg-white border border-border-subtle rounded-xl p-6 shadow-sm max-w-2xl">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm max-w-2xl space-y-6 text-left font-sans">
      <h3 className="text-lg font-serif font-medium text-text-page border-b border-border-subtle/50 pb-3">
        {isNew ? "Issue New Certificate" : "Edit Certificate Record"}
      </h3>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
          ✕ {error}
        </div>
      )}

      {students.length === 0 ? (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs rounded-lg space-y-2">
          <p className="font-semibold">⚠️ No Students Available</p>
          <p>You must create a student profile first before you can issue them a certificate.</p>
          <button
            type="button"
            onClick={() => router.push("/admin/students/new")}
            className="px-3 py-1 bg-amber-600 text-white rounded text-[10px] uppercase font-bold hover:bg-amber-700 cursor-pointer"
          >
            Create Student Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Student selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
              Select Student *
            </label>
            <select
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page focus:outline-none focus:border-primary text-sm font-sans"
            >
              <option value="" disabled>-- Choose a student --</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.regnumber})
                </option>
              ))}
            </select>
          </div>

          {/* Course selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
              Select Course *
            </label>
            <select
              required
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page focus:outline-none focus:border-primary text-sm font-sans"
            >
              <option value="" disabled>-- Choose a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Issue Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
                Date of Issue *
              </label>
              <input
                type="date"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page focus:outline-none focus:border-primary text-sm font-sans"
              />
            </div>

            {/* Performance Grade */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
                Performance Grade *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. A+, A, B, Satisfactory"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
              Certificate Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page focus:outline-none focus:border-primary text-sm font-sans"
            >
              <option value="Active">Active / Verified</option>
              <option value="Inactive">Inactive / Suspended</option>
            </select>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border-subtle/50 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/certificates")}
          className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-page/60 hover:bg-black/5 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer bg-transparent"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || students.length === 0}
          className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/10 cursor-pointer disabled:opacity-50 border-none"
        >
          {loading ? "Saving..." : isNew ? "Issue Certificate" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
