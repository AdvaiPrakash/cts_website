"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLead } from "@/lead";
import { EASE_OUT_EXPO } from "@/utils/scrollEase";
import { submitLeadAction } from "@/app/actions/submit-lead";

export function LeadModal() {
  const { isOpen, closeLeadModal } = useLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState(""); // Honeypot spam blocker
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await submitLeadAction({
        name,
        email,
        phone,
        company,
        source: query.trim() ? `free-consultation: ${query.trim()}` : "free-consultation",
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setQuery("");
    setCompany("");
    setError(null);
    closeLeadModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-8 border border-border-subtle shadow-2xl z-10 text-text-page"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-page/40 hover:text-text-page transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <h3 className="text-2xl font-display font-semibold text-text-page">
                    Schedule a Consultation
                  </h3>
                  <p className="text-sm text-text-page/60">
                    Leave your details and a principal tax advisor will reach out to schedule your introductory strategy session.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg text-left">
                    ✕ {error}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  {/* Honeypot field (hidden from users, bot trap) */}
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label className="block text-xs font-semibold text-text-page/60 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] transition-colors text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-page/60 uppercase tracking-wider mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94477 26158"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] transition-colors text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-page/60 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] transition-colors text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-page/60 uppercase tracking-wider mb-2">
                      Message / Query
                    </label>
                    <textarea
                      rows={3}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="How can we assist you with our services?"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] transition-colors text-sm font-sans resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] dark:bg-primary dark:hover:bg-primary-hover text-[#eef3e8] dark:text-text-accent-dark font-semibold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 border-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white dark:border-text-accent-dark border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="mx-auto w-12 h-12 rounded-lg bg-[#eef3e8] border border-[#0f2d1e]/15 text-[#0f2d1e] flex items-center justify-center text-xl">
                  ✓
                </div>
                <h3 className="text-xl font-display font-semibold text-text-page">
                  Request Received
                </h3>
                <p className="text-sm text-text-page/60 px-4">
                  Thank you, <span className="text-text-page font-medium">{name}</span>. We've received your inquiry and our team will contact you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 rounded-lg bg-[#0f2d1e] text-[#eef3e8] hover:bg-[#0c1f14] text-xs font-semibold transition-colors cursor-pointer border-none"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
