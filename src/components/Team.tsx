"use client";

import Image from "next/image";
import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function Team() {
  const { openLeadModal } = useLead();
  const { badge, title, subtitle, leaders } = CONTENT.team;

  return (
    <section className="relative w-full py-24 px-6 bg-bg-page border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Details and CTAs) */}
        <div className="md:col-span-5 space-y-6 text-left">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
              {badge}
            </span>
          </Reveal>

          <Reveal direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-medium tracking-tight text-text-page leading-tight">
              {title}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/70 leading-relaxed max-w-md">
              {subtitle}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={openLeadModal}
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-md shadow-primary/15 flex items-center gap-1.5"
              >
                <span>Meet the Team</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={openLeadModal}
                className="px-6 py-3 rounded-lg border border-border-subtle hover:bg-black/5 dark:hover:bg-white/5 text-text-page font-semibold text-sm transition-colors cursor-pointer"
              >
                Career Opportunities
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Column (Leaders Cards Row) */}
        <div className="md:col-span-7 grid grid-cols-2 gap-6 w-full">
          {leaders.map((leader, idx) => (
            <Reveal key={idx} direction="up" delay={0.1 * idx}>
              <div className="bg-bg-page border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col group">
                {/* Photo */}
                <div className="relative aspect-square w-full bg-bg-dark overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-left">
                  <h3 className="font-display text-xl font-bold text-text-page leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-text-page/60 font-semibold mt-1">
                    {leader.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
