"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { submitLeadAction } from "@/app/actions/submit-lead";

const BRANCHES = [
  {
    name: "Trivandrum",
    address: "Near Ayurveda College, Chinmaya Lane Opp. Punjab & Sind Bank, Trivandrum - 695001",
  },
  {
    name: "Calicut",
    address: "Opposite Crown Theatre, Kalpaka Building, Calicut",
  },
  {
    name: "Thrissur",
    address: "Poothol Road, Opposite Railway Backgate, Global Tower, Thrissur",
  },
  {
    name: "Perinthalmanna",
    address: "Noorya Complex, Pattambi Road, Near Traffic Jn, Perinthalmanna",
  },
  {
    name: "Kollam",
    address: "Creative Tax Solutions, Kollam Mulavana - 691503",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both name and email.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await submitLeadAction({
        name,
        email,
        phone,
        source: query.trim() ? `contact-page: ${query.trim()}` : "contact-page",
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setQuery("");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <section className="relative min-h-screen pt-16 sm:pt-28 md:pt-36 px-6 pb-24 bg-bg-page transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Sticky Contact Info (Badge, Header, Headquarters) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 text-left">
              {/* Header text content */}
              <div className="space-y-4">
                <Reveal direction="down">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                    Contact Us
                  </span>
                </Reveal>
                <Reveal direction="up">
                  <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-text-page leading-tight">
                    Get In Touch
                  </h1>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                  <p className="text-text-page/70 text-sm sm:text-base leading-relaxed">
                    Connect with our expert tax consultants and accounting professionals at any of our branches.
                  </p>
                </Reveal>
              </div>

              {/* Headquarters Details Card */}
              <Reveal direction="left" delay={0.2}>
                <div className="p-8 rounded-xl bg-[#eef3e8] border border-[#0f2d1e]/10 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      Headquarters
                    </span>
                    <h3 className="text-xl font-display font-bold text-[#0f2d1e] pt-3">
                      Head Office - Ernakulam
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[#0f2d1e]/90 leading-relaxed uppercase font-medium">
                    JANATHA ROAD, LANE NO 40,<br />
                    VYTTILA, KOCHI, KERALA 682019
                  </p>

                  <div className="pt-6 border-t border-[#0f2d1e]/15 space-y-4">
                    <a
                      href="tel:+919447726158"
                      className="flex items-center gap-3 text-sm font-semibold text-[#0f2d1e] hover:opacity-85 transition-opacity"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#0f2d1e] flex items-center justify-center">
                        <Image src="/telephone.png" alt="Phone" width={16} height={16} className="object-contain invert brightness-0" />
                      </span>
                      <span>+91 9447726158</span>
                    </a>

                    <a
                      href="mailto:creativetaxsolutionsekm@gmail.com"
                      className="flex items-center gap-3 text-sm font-semibold text-[#0f2d1e] hover:opacity-85 transition-opacity"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#0f2d1e] flex items-center justify-center">
                        <Image src="/email.png" alt="Email" width={16} height={16} className="object-contain invert brightness-0" />
                      </span>
                      <span className="break-all">creativetaxsolutionsekm@gmail.com</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Scrollable Forms and regional branches */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Inquiry Form */}
              <Reveal direction="right" delay={0.2}>
                <div className="p-8 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-border-subtle text-left space-y-6">
                  <h3 className="font-display text-xl font-bold text-text-page">
                    Send a Message
                  </h3>

                  {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold rounded-lg text-left">
                      ✓ Thank you! Your query has been submitted successfully and recorded.
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg text-left">
                      ✕ {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm"
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
                        className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm"
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
                        className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-text-page/60 uppercase tracking-wider mb-2">
                        Message / Query
                      </label>
                      <textarea
                        rows={4}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="How can we assist you with our services?"
                        className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] dark:bg-primary dark:hover:bg-primary-hover text-[#eef3e8] dark:text-text-accent-dark font-semibold text-sm transition-all shadow-md cursor-pointer text-center disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white dark:border-text-accent-dark border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Submit Query"
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>

              {/* Regional Branches Section */}
              <div className="space-y-8 pt-8 border-t border-border-subtle/50">
                <Reveal direction="up">
                  <h2 className="text-2xl font-serif font-medium text-text-page text-left">
                    Our Branch Locations
                  </h2>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-6">
                  {BRANCHES.map((branch, idx) => (
                    <Reveal key={branch.name} direction="up" delay={0.1 * idx}>
                      <div className="p-6 rounded-xl bg-[#eef3e8]/40 border border-[#0f2d1e]/10 hover:bg-[#eef3e8]/70 hover:border-[#0f2d1e]/25 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between min-h-[160px]">
                        <div className="space-y-3">
                          <h4 className="font-display font-bold text-base text-text-page">
                            {branch.name}
                          </h4>
                          <p className="text-xs text-text-page/70 leading-relaxed uppercase">
                            {branch.address}
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t border-border-subtle/30 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          <span>Kerala Branch</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </SiteShell>
  );
}
