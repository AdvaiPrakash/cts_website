"use client";

import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  const { openLeadModal } = useLead();
  const { title, items } = CONTENT.testimonials;

  return (
    <section className="relative w-full py-24 px-6 bg-bg-page border-t border-border-subtle overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Testimonials Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-border-subtle/40 pb-10">
          <div className="space-y-4 text-left max-w-xl">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                Testimonials
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-text-page leading-tight">
                {title}
              </h2>
            </Reveal>
          </div>

          {/* Google Reviews Badge */}
          <Reveal direction="left" delay={0.2}>
            <div className="flex items-center gap-6 bg-black/[0.02] dark:bg-white/[0.02] border border-border-subtle p-4 rounded-xl text-left">
              <div className="flex items-center justify-center font-display font-black text-2xl text-amber-500">
                G
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-sm font-bold text-text-page">
                  <span>5.0</span>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                </div>
                <p className="text-[10px] text-text-page/60 font-semibold uppercase tracking-wider">Google Reviews</p>
              </div>
              <button
                onClick={openLeadModal}
                className="ml-4 px-4 py-2 bg-[#0f2d1e] text-[#eef3e8] hover:bg-[#0c1f14] font-bold text-xs rounded-lg transition-all cursor-pointer shadow-sm"
              >
                Read All
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Infinite Scrolling Marquee container */}
      <div className="relative mt-16 w-full overflow-hidden py-4 select-none">
        {/* Side fade gradients */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-white/0 z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-white/0 z-10 pointer-events-none" />

        <div className="animate-marquee gap-6">
          {/* Render duplicated list to loop seamlessly */}
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] flex-shrink-0 p-8 rounded-xl bg-[#eef3e8] border border-[#0f2d1e]/10 flex flex-col justify-between h-[360px] hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* Quote Mark & Content */}
              <div className="space-y-6">
                {/* Huge quote mark */}
                <span className="text-[#0f2d1e]/20 font-serif font-black text-6xl leading-none select-none block h-8">
                  “
                </span>
                <p className="text-sm sm:text-base text-[#0f2d1e]/90 leading-relaxed italic whitespace-normal">
                  {item.quote}
                </p>
              </div>

              {/* Profile Details */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#0f2d1e]/15">
                <div className="w-8 h-8 rounded-lg bg-[#0f2d1e] flex items-center justify-center font-display font-bold text-xs text-[#eef3e8] uppercase select-none">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#0f2d1e] leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-[10px] text-[#0f2d1e]/60 font-semibold mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
