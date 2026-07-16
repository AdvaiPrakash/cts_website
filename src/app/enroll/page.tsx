"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { submitLeadAction } from "@/app/actions/submit-lead";

const AVAILABLE_COURSES = [
  "CERTIFIED PRACTICAL ACCOUNTANT (CPA)",
  "CERTIFIED GST PRACTITIONER COURSE (CGPT)",
  "GST and Gulf VAT",
  "COMPUTERISED ACCOUNTING",
  "ONLINE FILING",
];

function EnrollForm() {
  const searchParams = useSearchParams();
  const courseQuery = searchParams.get("course") || "";

  const [name, setName] = useState("");
  const [sex, setSex] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [husbandFather, setHusbandFather] = useState("");
  const [qualification, setQualification] = useState("");
  const [course, setCourse] = useState("CERTIFIED PRACTICAL ACCOUNTANT (CPA)");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionType, setSubmissionType] = useState<"message" | "whatsapp" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-select based on search query parameter
  useEffect(() => {
    if (courseQuery) {
      const lower = courseQuery.toLowerCase();
      if (lower.includes("cpa")) {
        setCourse("CERTIFIED PRACTICAL ACCOUNTANT (CPA)");
      } else if (lower.includes("gulf") || lower.includes("vat") || lower.includes("gst-gulf")) {
        setCourse("GST and Gulf VAT");
      } else if (lower.includes("cgstp") || lower.includes("cgpt") || lower.includes("practitioner")) {
        setCourse("CERTIFIED GST PRACTITIONER COURSE (CGPT)");
      } else if (lower.includes("computer")) {
        setCourse("COMPUTERISED ACCOUNTING");
      } else if (lower.includes("online") || lower.includes("filing")) {
        setCourse("ONLINE FILING");
      }
    }
  }, [courseQuery]);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!phone.trim()) {
      setError("Please enter your Phone Number.");
      return false;
    }
    return true;
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    const tempEmail = email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}${phone.slice(-4)}@cts-enquiry.com`;
    const formattedSource = `[Course Enrollment Page]
Sex: ${sex}
Father/Husband: ${husbandFather.trim() || "—"}
Qualification: ${qualification.trim() || "—"}
Address: ${address.trim() || "—"}
Course: ${course}`;

    try {
      const res = await submitLeadAction({
        name: name.trim(),
        email: tempEmail,
        phone,
        source: formattedSource,
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSubmissionType("message");
        setSuccess(true);
        // Clear inputs
        setName("");
        setSex("Male");
        setPhone("");
        setEmail("");
        setAddress("");
        setHusbandFather("");
        setQualification("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError(null);

    const tempEmail = email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}${phone.slice(-4)}@cts-enquiry.com`;
    const formattedSource = `[WhatsApp Enrollment Page Request]
Sex: ${sex}
Father/Husband: ${husbandFather.trim() || "—"}
Qualification: ${qualification.trim() || "—"}
Address: ${address.trim() || "—"}
Course: ${course}`;

    submitLeadAction({
      name: name.trim(),
      email: tempEmail,
      phone,
      source: formattedSource,
    }).catch(err => console.error("Background lead save failed:", err));

    const message = `*NEW COURSE ENROLLMENT REQUEST*
----------------------------------
*Name:* ${name.trim()}
*Sex:* ${sex}
*Phone:* ${phone}
*Email:* ${email.trim() || "—"}
*Father/Husband:* ${husbandFather.trim() || "—"}
*Qualification:* ${qualification.trim() || "—"}
*Address:* ${address.trim() || "—"}
*Selected Course:* ${course}
----------------------------------
Submitted from website enrollment page.`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/919447726158?text=${encodedText}`, "_blank");

    setSubmissionType("whatsapp");
    setSuccess(true);
    // Clear inputs
    setName("");
    setSex("Male");
    setPhone("");
    setEmail("");
    setAddress("");
    setHusbandFather("");
    setQualification("");
  };

  return (
    <SiteShell>
      <section className="relative min-h-screen pt-20 sm:pt-28 md:pt-36 px-6 pb-24 bg-bg-page transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Sticky Page Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 text-left">
              <div className="space-y-4">
                <Reveal direction="down">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0f2d1e] bg-[#eef3e8] border border-[#0f2d1e]/15 rounded-md">
                    Student Portal
                  </span>
                </Reveal>
                <Reveal direction="up">
                  <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-text-page leading-tight">
                    Course Enrollment
                  </h1>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                  <p className="text-text-page/70 text-sm sm:text-base leading-relaxed">
                    Apply now to book your seat. Fill in your educational profile details and our admissions coordinator will reach out to verify your registration.
                  </p>
                </Reveal>
              </div>

              {/* Support Box */}
              <Reveal direction="left" delay={0.2}>
                <div className="p-8 rounded-xl bg-[#eef3e8] border border-[#0f2d1e]/10 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      Admissions Support
                    </span>
                    <h3 className="text-lg font-display font-bold text-[#0f2d1e] pt-3">
                      Need Help Registering?
                    </h3>
                  </div>
                  
                  <p className="text-xs text-[#0f2d1e]/80 leading-relaxed font-semibold">
                    For immediate assistance, dial our student hotline or drop an email to our academic advisor.
                  </p>

                  <div className="pt-6 border-t border-[#0f2d1e]/15 space-y-4">
                    <a
                      href="tel:+919447726158"
                      className="flex items-center gap-3 text-xs font-semibold text-[#0f2d1e] hover:opacity-85 transition-opacity"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#0f2d1e] flex items-center justify-center">
                      <Image src="/telephone.png" alt="Phone" width={16} height={16} className="object-contain invert brightness-0" />
                    </span>
                    <span>+91 9447726158</span>
                    </a>

                    <a
                      href="mailto:creativetaxsolutionsekm@gmail.com"
                      className="flex items-center gap-3 text-xs font-semibold text-[#0f2d1e] hover:opacity-85 transition-opacity"
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

            {/* Right Column: Enrollment Form */}
            <div className="lg:col-span-7">
              <Reveal direction="right" delay={0.2}>
                <div className="p-8 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-border-subtle text-left space-y-6">
                  
                  {success ? (
                    <div className="space-y-4 py-8 text-center max-w-md mx-auto font-sans">
                      <div className="w-16 h-16 bg-[#eef3e8] border border-[#0f2d1e]/15 text-[#0f2d1e] rounded-lg flex items-center justify-center text-3xl mx-auto">
                        ✓
                      </div>
                      <h4 className="text-lg font-serif font-medium text-text-page">
                        Enrollment Request Submitted!
                      </h4>
                      <p className="text-sm text-text-page/60">
                        {submissionType === "whatsapp"
                          ? "We have redirected you to WhatsApp with your structured details. Our admissions team will confirm your seat soon."
                          : "Your enrollment request has been submitted successfully. An advisor will contact you on your phone number shortly."}
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="mt-6 px-6 py-2.5 rounded-lg bg-[#0f2d1e] text-[#eef3e8] text-xs font-semibold hover:bg-[#0c1f14] transition-colors border-none cursor-pointer"
                      >
                        Fill New Form
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleMessageSubmit} className="space-y-4 font-sans">
                      <h3 className="font-display text-xl font-bold text-text-page pb-2 border-b border-border-subtle/50">
                        Enrollment Details
                      </h3>

                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
                          ✕ {error}
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold"
                        />
                      </div>

                      {/* Sex */}
                      <div>
                        <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                          Sex
                        </label>
                        <div className="flex gap-6 text-xs font-semibold text-text-page/80">
                          {["Male", "Female", "Others"].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="sex"
                                checked={sex === option}
                                onChange={() => setSex(option)}
                                className="w-4 h-4 accent-[#0f2d1e] cursor-pointer"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 94477 26158"
                            className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Permanent Address */}
                      <div>
                        <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                          Permanent Address
                        </label>
                        <textarea
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your complete permanent address details"
                          className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold resize-none"
                        />
                      </div>

                      {/* Father/Husband & Qualification */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                            Name of Husband/Father
                          </label>
                          <input
                            type="text"
                            value={husbandFather}
                            onChange={(e) => setHusbandFather(e.target.value)}
                            placeholder="Father or Husband's Name"
                            className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                            Qualification
                          </label>
                          <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder="e.g. B.Com / M.Com / +2"
                            className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page placeholder-text-page/30 focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Course select dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-text-page/60 uppercase tracking-wider mb-2">
                          Select Course *
                        </label>
                        <select
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle text-text-page focus:outline-none focus:border-[#0f2d1e] dark:focus:border-primary transition-colors text-sm font-semibold cursor-pointer"
                        >
                          {AVAILABLE_COURSES.map((c) => (
                            <option key={c} value={c} className="text-text-page">
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Submissions flow */}
                      <div className="pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3.5 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] text-[#eef3e8] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                        >
                          {loading ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <span>💬 Submit via Message</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleWhatsAppSubmit}
                          className="flex-1 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
                        >
                        <Image src="/whatsapp.png" alt="WhatsApp" width={18} height={18} className="object-contain" />
                        <span>Submit via WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>
    </SiteShell>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0f2d1e] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EnrollForm />
    </Suspense>
  );
}
