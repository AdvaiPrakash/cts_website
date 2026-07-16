"use client";

import { use, useState, useEffect } from "react";
import { CONTENT } from "@/content";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { useLead } from "@/lead";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { openLeadModal } = useLead();

  const staticCourse = CONTENT.courses.items.find((item) => item.id === id);
  const [course, setCourse] = useState(staticCourse);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCourse(data);
        }
      })
      .catch((err) => console.error("Error loading dynamic course details:", err));
  }, [id]);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="bg-bg-page min-h-screen pt-20 sm:pt-26 md:pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Reveal direction="down">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-sm text-text-page/60 hover:text-text-page font-semibold transition-colors group cursor-pointer"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>Back to Courses</span>
              </Link>
            </Reveal>
          </div>

          {/* Main Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Sticky Course Header & CTAs */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 text-left">
              <Reveal direction="up">
                <div className="flex items-center gap-3">
                  {course.badge && (
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0f2d1e] bg-[#eef3e8] border border-[#0f2d1e]/15 rounded-md">
                      {course.badge}
                    </span>
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-text-page/55">
                    Professional Training Academy
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.05}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-text-page leading-tight">
                  {course.title}
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <p className="text-base text-text-page/75 leading-relaxed font-sans">
                  {course.description}
                </p>
              </Reveal>

              {/* Sticky CTAs */}
              <Reveal direction="up" delay={0.15}>
                <div className="space-y-3 pt-4">
                  <Link
                    href={`/enroll?course=${course.id}`}
                    className="w-full py-4 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] dark:bg-primary dark:hover:bg-primary-hover text-[#eef3e8] dark:text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-lg shadow-[#0f2d1e]/10 dark:shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <span>Enroll in Course</span>
                  </Link>
                  <button
                    onClick={openLeadModal}
                    className="w-full py-4 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-text-page border border-border-subtle font-semibold text-sm transition-all cursor-pointer flex items-center justify-center border-none"
                  >
                    <span>Request Free Callback</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Scrollable stats, syllabus, benefits */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Quick Stats Banner Card */}
              <Reveal direction="right" delay={0.1}>
                <div className="w-full bg-[#031d17] text-white rounded-2xl border border-white/5 shadow-xl p-8 grid sm:grid-cols-2 gap-6 text-left relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-1 sm:col-span-2 pb-4 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Course Investment</span>
                    <p className="text-3xl font-display font-black text-primary">{course.fees}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary text-sm shrink-0">
                      🕒
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Duration</span>
                      <span className="text-xs sm:text-sm font-semibold">{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary text-sm shrink-0">
                      📅
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Batch Schedule</span>
                      <span className="text-xs sm:text-sm font-semibold">{course.batch}</span>
                    </div>
                  </div>

                  {course.eligibility && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary text-sm shrink-0">
                        🎓
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Eligibility</span>
                        <span className="text-xs sm:text-sm font-semibold">{course.eligibility}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary text-sm shrink-0">
                      ★
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Course Rating</span>
                      <span className="text-xs sm:text-sm font-semibold flex items-center gap-1">
                        {course.rating || 4.8} / 5.0 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Syllabus Curriculum */}
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Curriculum</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page mt-2">
                    What You Will Learn
                  </h2>
                  <p className="text-sm text-text-page/60 mt-2">
                    Our structured, industry-standard modules ensure you get hands-on familiarity and clear insight into modern accounting operations.
                  </p>
                </div>
 
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.syllabus.map((topic, idx) => (
                    <Reveal key={idx} direction="up" delay={0.03 * idx}>
                      <div className="flex items-start gap-3.5 p-4 bg-white dark:bg-[#111827]/5 border border-border-subtle rounded-xl hover:border-emerald-600/40 hover:shadow-sm transition-all duration-300 text-left group">
                        <Image src="/check-list.png" alt="Check" width={18} height={18} className="shrink-0 object-contain mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-text-page/85 leading-relaxed">
                          {topic}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Academy Benefits */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#eef3e8]/30 dark:bg-white/[0.01] border border-border-subtle text-left space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Academy Benefits</span>
                  <h3 className="text-2xl font-serif font-medium text-text-page">
                    Why Study at Creative Tax Solutions?
                  </h3>
                  <p className="text-sm text-text-page/70 leading-relaxed font-sans">
                    We bridge the gap between academic education and industry expectations. Our students learn using real accounting ledgers, direct portal filing practices, and standard corporate payroll computations.
                  </p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3.5 text-xs font-semibold text-text-page/85">
                  <li className="flex items-center gap-2.5">
                    <Image src="/check-list.png" alt="Check" width={14} height={14} className="shrink-0 object-contain" />
                    <span>Practical Live-data Practice</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Image src="/check-list.png" alt="Check" width={14} height={14} className="shrink-0 object-contain" />
                    <span>Expert Faculty Mentorship</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Image src="/check-list.png" alt="Check" width={14} height={14} className="shrink-0 object-contain" />
                    <span>Official Software Certificates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Image src="/check-list.png" alt="Check" width={14} height={14} className="shrink-0 object-contain" />
                    <span>Job Placement Assistance</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link
                    href={`/enroll?course=${course.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0f2d1e] dark:bg-primary text-[#eef3e8] dark:text-text-accent-dark hover:bg-[#0c1f14] dark:hover:bg-primary-hover font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-md shadow-[#0f2d1e]/10 dark:shadow-primary/10 flex items-center justify-center"
                  >
                    <span>Book a Seat Now</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </SiteShell>
  );
}
