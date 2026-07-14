"use client";

import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function WhyChooseUs() {
  const { openLeadModal } = useLead();
  const { badge, title, subtitle, items } = CONTENT.whyChooseUs;

  // Render minimalist line-art icons meeting at center, with one highlighted lime-green leg
  const renderIcon = (idx: number) => {
    const limeColor = "var(--accent)";
    const darkColor = "var(--text-page)";

    switch (idx) {
      case 0: // X-shape
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <line x1="30" y1="30" x2="50" y2="50" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="70" y2="70" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="30" y1="70" x2="50" y2="50" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="70" y2="30" stroke={limeColor} strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
      case 1: // 6-legged star
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <line x1="50" y1="50" x2="50" y2="20" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="24" y2="35" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="24" y2="65" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="80" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="76" y2="65" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="76" y2="35" stroke={limeColor} strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
      case 2: // Cross "+"
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <line x1="50" y1="50" x2="20" y2="50" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="20" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="80" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="80" y2="50" stroke={limeColor} strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
      case 3: // 8-legged star (asterisk)
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <line x1="50" y1="50" x2="50" y2="20" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="29" y2="29" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="20" y2="50" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="29" y2="71" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="80" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="71" y2="71" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="80" y2="50" stroke={darkColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="71" y2="29" stroke={limeColor} strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section className="relative w-full py-24 px-6 bg-bg-page border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Split Header Layout (Left details, Right paragraph) */}
        <div className="grid md:grid-cols-12 gap-8 items-end w-full border-b border-border-subtle/40 pb-10">
          <div className="md:col-span-7 space-y-4 text-left">
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
          </div>
          <div className="md:col-span-5 text-left pb-2">
            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-text-page/70 leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Feature Cards Grid (4 Columns) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
          {items.map((item, idx) => (
            <Reveal key={item.id} direction="up" delay={0.1 * idx}>
              <div className="bg-white dark:bg-bg-card border border-border-subtle rounded-xl overflow-hidden flex flex-col h-[450px] hover:shadow-lg transition-all duration-300 text-left relative">


                {/* Top Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {renderIcon(idx)}
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-semibold text-text-page tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-page/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Checklist Section */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between bg-black/[0.02] dark:bg-white/[0.02] border-t border-border-subtle/50">
                  <ul className="space-y-3">
                    {item.checklist?.map((check, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <svg
                          className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-page/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-text-page/80">
                          {check}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <button
                  onClick={openLeadModal}
                  className="w-full py-4 bg-white dark:bg-bg-card border-t border-border-subtle/50 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] text-text-page/80 hover:text-text-page font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </Reveal>
          ))}
        </div>



      </div>
    </section>
  );
}
