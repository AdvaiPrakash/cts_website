"use client";

import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

// Outlined SVG Icons matching the visual theme
const renderIcon = (idx: number) => {
  const iconClass = "text-[#0f2d1e]";

  switch (idx) {
    case 0: // Clipboard checklist
      return (
        <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l2 2 4-4m-6 5h6" />
        </svg>
      );
    case 1: // Briefcase (Career)
      return (
        <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.45.258-.717.258H3.717c-.266 0-.523-.093-.717-.258m16.5 0a2.18 2.18 0 01-.75 1.661v3.39m-16.5-5.05a2.18 2.18 0 00-.75 1.66v3.39m0-5.05a2.18 2.18 0 01.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.114 48.114 0 013.413-.387m0 0V5.25c0-1.03.834-1.875 1.875-1.875h3.75c1.03 0 1.875.845 1.875 1.875v1.294M7.5 12h9" />
        </svg>
      );
    case 2: // File upload (Filing)
      return (
        <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    case 3: // Open book (GST Rules)
    default:
      return (
        <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
  }
};

export function WhyChooseUs() {
  const { openLeadModal } = useLead();
  const { badge, title, subtitle, items } = CONTENT.whyChooseUs;

  return (
    <section className="relative w-full py-24 px-6 bg-[#e4ebd9] border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Split Header Layout (Left details, Right paragraph) */}
        <div className="grid md:grid-cols-12 gap-8 items-end w-full border-b border-[#0f2d1e]/15 pb-10">
          <div className="md:col-span-7 space-y-4 text-left">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0f2d1e]/70 bg-[#0f2d1e]/5 border border-[#0f2d1e]/15 rounded-md">
                {badge}
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-medium tracking-tight text-[#0f2d1e] leading-tight">
                {title}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 text-left pb-2">
            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-[#0f2d1e]/80 leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Feature Cards Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
          {items.map((item, idx) => (
            <Reveal key={item.id} direction="up" delay={0.1 * idx}>
              <div
                className="flex flex-col justify-between min-h-[285px] md:min-h-[305px] p-6 rounded-xl bg-[#eef3e8] text-[#0f2d1e] hover:shadow-lg transition-all duration-300 text-left relative"
              >
                {/* Card Content */}
                <div className="space-y-4">
                  {renderIcon(idx)}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Join Button */}
                <div className="mt-6">
                  <button
                    onClick={openLeadModal}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#0f2d1e] text-[#eef3e8] hover:bg-[#0c1f14] transition-all duration-300 hover:scale-102 cursor-pointer shadow-sm shadow-[#0f2d1e]/10"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
