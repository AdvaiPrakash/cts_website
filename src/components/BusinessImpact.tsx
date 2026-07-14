"use client";

import { CONTENT } from "@/content";
import { Reveal } from "@/components/Reveal";

export function BusinessImpact() {
  const { title, stats } = CONTENT.businessImpact;

  return (
    <section className="relative w-full py-20 px-6 bg-[#041e17] text-white overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column (Logo & Description) */}
        <div className="md:col-span-4 space-y-4 text-left">
          <Reveal direction="left">
            <div className="flex items-center gap-3">
              {/* Green X mark */}
              <div className="w-8 h-8 flex items-center justify-center text-primary font-display font-black text-2xl animate-pulse">
                ✕
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Metrics
              </span>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.15}>
            <h2 className="text-3xl font-serif font-medium tracking-tight leading-tight">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* Right Column (Stats Grid & Graph) */}
        <div className="md:col-span-8 space-y-12">
          {/* Stats List */}
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {stats.map((stat, idx) => (
              <Reveal key={idx} direction="up" delay={0.1 * idx}>
                <div className="space-y-2 border-l border-white/10 pl-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {stat.year}
                  </span>
                  <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                    {stat.val}
                  </h3>
                  <p className="text-xs text-white/70 font-semibold leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Procedural Glowing Wavy Line Graph */}
          <Reveal direction="up" delay={0.3}>
            <div className="relative w-full h-24 mt-6">
              <svg viewBox="0 0 800 100" fill="none" className="w-full h-full stroke-primary opacity-60">
                {/* Wavy line */}
                <path
                  d="M 50 80 C 150 20, 250 80, 400 30 C 550 80, 650 20, 750 60"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="stroke-[3px]"
                />
                
                {/* Intersecting dots and labels */}
                {/* 2021 dot */}
                <circle cx="150" cy="50" r="5" fill="var(--accent)" />
                <circle cx="150" cy="50" r="10" stroke="var(--accent)" strokeWidth="1" className="animate-ping" />
                <text x="150" y="85" fill="white" fontSize="10" textAnchor="middle" opacity="0.6">2021</text>
                
                {/* 2023 dot */}
                <circle cx="400" cy="30" r="5" fill="var(--accent)" />
                <circle cx="400" cy="30" r="10" stroke="var(--accent)" strokeWidth="1" className="animate-ping" />
                <text x="400" y="85" fill="white" fontSize="10" textAnchor="middle" opacity="0.6">2023</text>
                
                {/* 2025 dot */}
                <circle cx="650" cy="45" r="5" fill="var(--accent)" />
                <circle cx="650" cy="45" r="10" stroke="var(--accent)" strokeWidth="1" className="animate-ping" />
                <text x="650" y="85" fill="white" fontSize="10" textAnchor="middle" opacity="0.6">2025</text>
              </svg>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
