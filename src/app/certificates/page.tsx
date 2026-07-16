"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";

interface CertificateDetails {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentRegnumber: string;
  issueDate: string;
  grade: string;
  status: string;
  courseTitle: string;
  courseDuration: string;
}

export default function CertificatesPage() {
  const [regnumber, setRegnumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cert, setCert] = useState<CertificateDetails | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regnumber.trim()) return;

    setLoading(true);
    setError(null);
    setCert(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/certificates/verify?regnumber=${encodeURIComponent(regnumber.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
      } else {
        setCert(data);
      }
    } catch (err: any) {
      setError("An error occurred. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="relative w-full pt-20 sm:pt-28 md:pt-36 pb-12 px-6 bg-black/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 border border-border-subtle rounded-md">
              Verification Portal
            </span>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif font-medium tracking-tight text-text-page leading-tight">
              Verify Certificates
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/70 max-w-2xl leading-relaxed font-sans">
              Enter the student's unique registration number below to check the validity and view their training credentials.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Verification Search and Results */}
      <section className="relative w-full py-20 px-6 bg-bg-page min-h-[500px]">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Search Form */}
          <Reveal direction="up">
            <form onSubmit={handleVerify} className="space-y-4">
              <label className="block text-sm font-semibold text-text-page/80">
                Student Registration Number
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. CTS-2026-001"
                  value={regnumber}
                  onChange={(e) => setRegnumber(e.target.value)}
                  className="flex-grow px-5 py-4 rounded-xl bg-black/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-primary transition-all text-base font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-base transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none shrink-0"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-text-accent-dark border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Verify Now"
                  )}
                </button>
              </div>
              <p className="text-xs text-text-page/50">
                Registration numbers are case-insensitive. Example: <span className="font-mono bg-black/5 px-1.5 py-0.5 rounded">CTS-2026-001</span>
              </p>
            </form>
          </Reveal>

          {/* Results Area */}
          <div className="pt-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-text-page/60">Searching verification database...</p>
              </div>
            )}

            {!loading && error && searched && (
              <Reveal direction="up">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl text-left space-y-3">
                  <div className="flex items-center gap-3 text-red-500">
                    <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="font-semibold text-base">Invalid Registration Number</h3>
                  </div>
                  <p className="text-sm text-text-page/70 pl-9">
                    {error}. Please check the spelling, format, and ensure it matches the number printed on the certificate.
                  </p>
                </div>
              </Reveal>
            )}

            {!loading && cert && (
              <Reveal direction="up">
                <div className="border border-border-subtle rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-bg-card">
                  {/* Top Bar with Status Badge */}
                  <div className="px-8 py-5 border-b border-border-subtle flex items-center justify-between flex-wrap gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-text-page/60 uppercase tracking-wider">
                        Certificate Details
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      ✓ Verified Active
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 sm:p-10 space-y-8 text-left">
                    {/* Course Title Large */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#bef264]">
                        Qualified Program
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
                        {cert.courseTitle}
                      </h2>
                    </div>

                    {/* Meta Grid info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-subtle/50">
                      <div>
                        <p className="text-xs text-text-page/50 uppercase tracking-wider mb-1">
                          Student Name
                        </p>
                        <p className="text-base font-semibold text-text-page">
                          {cert.studentName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-text-page/50 uppercase tracking-wider mb-1">
                          Registration Number
                        </p>
                        <p className="text-base font-mono font-semibold text-text-page">
                          {cert.studentRegnumber}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-text-page/50 uppercase tracking-wider mb-1">
                          Course Duration
                        </p>
                        <p className="text-base font-semibold text-text-page">
                          {cert.courseDuration}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-text-page/50 uppercase tracking-wider mb-1">
                          Performance Grade
                        </p>
                        <p className="text-base font-semibold text-text-page">
                          {cert.grade}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-text-page/50 uppercase tracking-wider mb-1">
                          Date of Issue
                        </p>
                        <p className="text-base font-semibold text-text-page">
                          {cert.issueDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="px-8 py-5 bg-black/[0.02] dark:bg-white/[0.02] border-t border-border-subtle/50 text-xs text-text-page/40 text-center">
                    This document serves as digital proof of training completion at Creative Tax Solutions (CTS).
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
