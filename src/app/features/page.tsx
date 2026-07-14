"use client";

import { useState, useEffect } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { CONTENT } from "@/content";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesPage() {
  const { items: staticItems } = CONTENT.courses;
  const [items, setItems] = useState(staticItems);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading dynamic courses:", err));
  }, []);

  return (
    <SiteShell>
      {/* Courses Page Header */}
      <section className="relative w-full pt-36 pb-16 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
              Academy
            </span>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif font-medium tracking-tight text-text-page leading-tight">
              Our Courses
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/70 max-w-2xl leading-relaxed">
              Hands-on practical training designed to equip students, graduates, and professionals with statutory compliance skills, accounting software knowledge, and career-ready expertise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Courses Cards Grid */}
      <section className="relative w-full py-20 px-6 bg-bg-page">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((course, idx) => (
              <Reveal key={course.id} direction="up" delay={0.1 * (idx % 3)}>
                <div className="flex flex-col bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full group">
                  
                  {/* Top Image Section */}
                  <div className="relative w-full h-[260px] overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark Green Gradient overlay matching home page courses */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent" />
                    
                    {/* Top Left Tag Pills */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide text-white uppercase border border-white/10">
                        {course.duration}
                      </span>
                      <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide text-white uppercase border border-white/10">
                        {course.batch.split("–")[0].trim()}
                      </span>
                    </div>

                    {/* Top Right Rating */}
                    {course.rating && (
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 z-10 border border-white/10">
                        <span className="text-[#bef264]">★</span>
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Center Bottom Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 transition-opacity duration-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 transition-opacity duration-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-text-page tracking-tight leading-snug group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        {course.badge && (
                          <span className="shrink-0 px-2.5 py-0.5 border border-border-subtle rounded-full text-[10px] font-semibold uppercase tracking-wider text-text-page/80 bg-black/5 dark:bg-white/5">
                            {course.badge}
                          </span>
                        )}
                      </div>

                      {course.eligibility && (
                        <p className="text-[11px] text-text-page/50 font-medium">
                          Eligibility: <span className="text-text-page/70">{course.eligibility}</span>
                        </p>
                      )}

                      <p className="text-xs text-text-page/70 leading-relaxed font-sans pt-1">
                        {course.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-page/35">Total Fees</span>
                        <div className="flex items-baseline">
                          <span className="text-lg font-display font-black text-text-page">
                            {course.fees.split("/")[0].trim()}
                          </span>
                          <span className="text-[10px] font-semibold text-text-page/40 ml-1">/ total</span>
                        </div>
                      </div>

                      {/* Black pill button with arrow circle */}
                      <Link
                        href={course.link}
                        className="bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-semibold text-xs py-2 px-3.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group/btn"
                      >
                        <span>Learn More</span>
                        <span className="w-5 h-5 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-bold text-[10px] shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
