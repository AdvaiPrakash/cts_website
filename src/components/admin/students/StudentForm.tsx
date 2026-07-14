"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertStudentAction } from "@/app/admin/actions";

interface Course {
  id: string;
  title: string;
}

interface StudentFormProps {
  initialData?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    regnumber: string;
  };
}

export function StudentForm({ initialData }: StudentFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [regnumber, setRegnumber] = useState(initialData?.regnumber || "");
  
  // Course completion / auto certificate generation state
  const [courses, setCourses] = useState<Course[]>([]);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [courseCompletedId, setCourseCompletedId] = useState("");
  const [grade, setGrade] = useState("A+");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !initialData;

  useEffect(() => {
    // Fetch courses list for auto generation selector
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regnumber.trim()) return;

    if (autoGenerate && !courseCompletedId) {
      setError("Please select a completed course to generate the certificate.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await upsertStudentAction({
        id: initialData?.id,
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        regnumber: regnumber.trim().toUpperCase(),
        isNew,
        generateCertificate: autoGenerate,
        courseCompletedId: autoGenerate ? courseCompletedId : undefined,
        grade: autoGenerate ? grade.trim() : undefined,
        issueDate: autoGenerate ? issueDate.trim() : undefined,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin/students");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to save student details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm max-w-2xl space-y-6 text-left font-sans">
      <h3 className="text-lg font-serif font-medium text-text-page border-b border-border-subtle/50 pb-3">
        {isNew ? "Create New Student Profile" : "Edit Student Profile"}
      </h3>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
          ✕ {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
            Student Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
            Registration Number *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CTS-2026-001"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
          />
          <p className="text-[10px] text-text-page/40 mt-1">
            This code must be unique and is used by the student to verify their certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-black/[0.01] text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
            />
          </div>
        </div>

        {/* Certificate Auto-Generation Section */}
        <div className="pt-4 border-t border-border-subtle/50 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoGenerate"
              checked={autoGenerate}
              onChange={(e) => setAutoGenerate(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-border-subtle"
            />
            <label htmlFor="autoGenerate" className="text-xs font-bold uppercase tracking-wider text-text-page/80 cursor-pointer">
              Mark Course as Completed & Auto-Issue Certificate
            </label>
          </div>

          {autoGenerate && (
            <div className="p-4 bg-black/[0.01] border border-border-subtle rounded-lg space-y-4 animate-fade-in">
              {/* Course selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
                  Select Completed Course *
                </label>
                <select
                  required={autoGenerate}
                  value={courseCompletedId}
                  onChange={(e) => setCourseCompletedId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-white text-text-page focus:outline-none focus:border-primary text-sm font-sans"
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
                {/* Date of Completion */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
                    Date of Issue *
                  </label>
                  <input
                    type="date"
                    required={autoGenerate}
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-white text-text-page focus:outline-none focus:border-primary text-sm font-sans"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-page/60 mb-2">
                    Performance Grade *
                  </label>
                  <input
                    type="text"
                    required={autoGenerate}
                    placeholder="e.g. A+, A, First Class"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-white text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary text-sm font-sans"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle/50 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/students")}
          className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-page/60 hover:bg-black/5 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer bg-transparent"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/10 cursor-pointer disabled:opacity-50 border-none"
        >
          {loading ? "Saving..." : isNew ? "Create Profile" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
