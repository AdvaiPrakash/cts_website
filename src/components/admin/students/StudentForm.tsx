"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertStudentAction } from "@/app/admin/actions";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regnumber.trim()) return;

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
    <form onSubmit={handleSubmit} className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm max-w-2xl space-y-6 text-left">
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
