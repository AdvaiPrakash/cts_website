"use client";

import Image from "next/image";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function ContactCTA() {
  const { openLeadModal } = useLead();

  return (
    <section className="relative w-full py-28 px-6 overflow-hidden">
      {/* Background Image with Dark Green Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-meeting.jpg"
          alt="Office Consultation Meeting"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041e17]/95 via-[#041e17]/85 to-[#041e17]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left">
        {/* Left Column (Content) */}
        <div className="space-y-4 max-w-2xl">
          <Reveal direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-white leading-tight">
              Ready to Come in<br className="hidden sm:inline" />
              For an Appointment?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
              Get in touch with our accounting professionals and work with the top CPAs and tax experts in the country.
            </p>
          </Reveal>
        </div>

        {/* Right Column (CTA Button) */}
        <Reveal direction="left" delay={0.25}>
          <div className="flex items-center gap-6">
            <button
              onClick={openLeadModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-lg shadow-primary/20"
            >
              <span>Schedule a Consultation</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            {/* Minimalist cross icon */}
            <div className="hidden lg:block text-primary font-display font-light text-5xl opacity-40 select-none animate-pulse">
              ✕
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
