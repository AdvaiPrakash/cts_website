"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  const { openLeadModal } = useLead();

  return (
    <section className="relative w-full min-h-screen flex items-end pt-24 pb-20 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-meeting.jpg"
          alt="CTS Team Meeting"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Teal Overlay at the bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative max-w-7xl mx-auto w-full z-10 grid md:grid-cols-12 gap-8 items-end">
        {/* Left Column (Heading, Subtitle and CTAs) */}
        <div className="md:col-span-7 space-y-6 text-left">
          <Reveal direction="down" delay={0.05}>
            <span className="inline-block px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#bef264] bg-white/10 backdrop-blur-md border border-[#bef264]/20 rounded-md">
              {CONTENT.hero.badge}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-white leading-[1.15]">
              {CONTENT.hero.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              {CONTENT.hero.subtitle}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-lg shadow-primary/20"
              >
                <span>{CONTENT.hero.primaryCta}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                <span>{CONTENT.hero.secondaryCta}</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Column (Stats Cards) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4 w-full">
          {/* Card 1: Glassmorphic dark/blurry */}
          <Reveal direction="up" delay={0.3}>
            <div className="p-6 rounded-xl glass text-left h-44 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-4xl font-display font-semibold text-white">{CONTENT.hero.card1Val}</h3>
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">{CONTENT.hero.card1Sub}</p>
              </div>
              <p className="text-sm font-semibold text-white/95">{CONTENT.hero.card1Label}</p>
            </div>
          </Reveal>

          {/* Card 2: Solid lime-green */}
          <Reveal direction="up" delay={0.4}>
            <div className="p-6 rounded-xl bg-primary text-text-accent-dark text-left h-44 flex flex-col justify-between shadow-lg">
              <div className="space-y-1">
                <h3 className="text-4xl font-display font-semibold">{CONTENT.hero.card2Val}</h3>
                <p className="text-[10px] opacity-75 font-bold uppercase tracking-wider">{CONTENT.hero.card2Sub}</p>
              </div>
              <p className="text-sm font-bold">{CONTENT.hero.card2Label}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
