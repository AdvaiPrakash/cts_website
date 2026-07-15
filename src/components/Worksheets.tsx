"use client";

import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function Worksheets() {
  const { openLeadModal } = useLead();
  const { title, items } = CONTENT.worksheets;

  return (
    <section className="relative w-full py-24 px-6 bg-bg-page border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Worksheets Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-border-subtle/40 pb-10">
          <div className="space-y-4 text-left max-w-xl">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                Worksheets
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-text-page leading-tight">
                {title}
              </h2>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.2}>
            <button
              onClick={openLeadModal}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-md shadow-primary/10"
            >
              <span>View More</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Reveal>
        </div>

        {/* Worksheets Grid (3 Columns) */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 w-full">
          {items.map((item, idx) => {
            // Card 2 is highlighted to match the screenshot layout
            const isHighlighted = idx === 1;

            return (
              <Reveal key={idx} direction="up" delay={0.1 * idx}>
                <div className={`p-8 rounded-xl border flex flex-col justify-between h-[300px] hover:shadow-md transition-all duration-300 text-left ${
                  isHighlighted
                    ? "bg-primary text-text-accent-dark border-transparent shadow-lg"
                    : "bg-black/[0.01] dark:bg-white/[0.01] border-border-subtle text-text-page"
                }`}>
                  {/* Details */}
                  <div className="space-y-4">
                    <h3 className={`font-display text-xl font-bold ${
                      isHighlighted ? "text-text-accent-dark" : "text-text-page"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isHighlighted ? "text-text-accent-dark/85" : "text-text-page/75"
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Download Action */}
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault(); // Simulate download triggers lead modal
                      openLeadModal();
                    }}
                    className={`inline-flex items-center justify-between px-5 py-3 rounded-lg font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                      isHighlighted
                        ? "bg-[#0a2f26] text-white hover:bg-[#051a15]"
                        : "bg-white dark:bg-bg-card border border-border-subtle text-text-page hover:bg-black/[0.01]"
                    }`}
                  >
                    <span>Download</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
