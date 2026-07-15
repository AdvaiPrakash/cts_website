"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { useLead } from "@/lead";

export default function AboutPage() {
  const { openLeadModal } = useLead();

  const designedForItems = [
    "Commerce Graduates and Postgraduates aiming to build a career as Licensed GST Practitioners",
    "Individuals aspiring to start a career as Accountants",
    "Commerce HSSC (Plus Two) students seeking to become Tax Consultants",
    "CA / ICWA students requiring hands-on practical exposure",
    "Business owners wanting to understand Accounting, GST, and regulatory updates",
    "Traditional accountants upgrading to computerized systems such as Tally",
    "Working professionals enhancing their expertise in GST and return filing",
    "Retired professionals seeking opportunities as Freelance Accountants",
    "Women professionals preferring flexible, work-from-home opportunities"
  ];

  const commitments = [
    "Promoting professional competence and ethical practices in accounting and taxation",
    "Creating career opportunities for qualified individuals",
    "Supporting businesses with reliable and knowledgeable professionals",
    "Building a transparent, fair, and trustworthy ecosystem within the accounting and tax domain"
  ];

  return (
    <SiteShell>
      {/* Section Header */}
      <section className="relative w-full pt-36 pb-16 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
              ABOUT US
            </span>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif font-medium tracking-tight text-text-page leading-tight">
              About Us
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/70 max-w-2xl leading-relaxed">
              Creative Tax Solutions is a team of experienced professionals specializing in Accounting, GST, and Income Tax. We are committed to guiding and transforming ambitions into successful careers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 1: Who We Are & Designed For Grid */}
      <section className="relative w-full py-24 px-6 bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Overlapping Images & Quick Stats (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 text-left">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-bg-dark border border-border-subtle shadow-lg">
              <Image
                src="/about-discuss.jpg"
                alt="Accounting Discussion"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
              />
            </div>

            {/* Float WHRDE Badge */}
            <Reveal direction="left" delay={0.2}>
              <div className="p-8 rounded-[2rem] bg-[#eef3e8] border border-[#0f2d1e]/10 space-y-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-500/10">
                  Accreditation
                </span>
                <h4 className="font-sans font-bold text-lg text-[#0f2d1e] leading-snug">
                  WHRDE Affiliation
                </h4>
                <p className="text-sm text-[#0f2d1e]/85 leading-relaxed font-normal">
                  Affiliated with World Human Resources Development Education, reinforcing our commitment to professional development.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Copy & Audience Grid */}
          <div className="lg:col-span-7 text-left space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900 leading-tight">
                Transforming Ambitions into Successful Careers
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans font-normal">
                Creative Tax Solutions is a dedicated training institution focused on Accounting and Tax Filing, providing strong practical knowledge along with essential theoretical foundations.
              </p>
            </div>

            {/* Designed for list */}
            <div className="space-y-8 pt-4 border-t border-black/[0.06]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Our Programs are Specially Designed For:
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                {designedForItems.map((item, idx) => (
                  <Reveal key={idx} direction="up" delay={0.03 * idx}>
                    <div className="border-b border-black/[0.05] py-4 flex items-start gap-4 hover:border-emerald-600/30 transition-colors duration-300">
                      <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-100">
                        ✓
                      </span>
                      <span className="text-[13px] font-semibold text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Certified Accountant & Facilities Split */}
      <section className="relative w-full py-24 px-6 bg-[#f4f6f3] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 text-left">
            
            {/* Be a Certified Accountant Block */}
            <Reveal direction="up" className="space-y-5 bg-white p-8 sm:p-10 rounded-[2rem] border border-border-subtle shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-block">
                  Professional Path
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-gray-900 leading-tight">
                  Be a Certified Accountant
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Our course equips students with the knowledge and skills required to manage accounts across organizations of all sizes—from small businesses to large enterprises. The training includes official procedures, regulatory compliance, and current industry practices in accounting and taxation.
                </p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold mt-4 border-t border-black/[0.05] pt-4">
                Upon successful completion, learners will be capable of independently handling diverse accounting functions and statutory formalities with confidence and efficiency.
              </p>
            </Reveal>

            {/* Training & Facilities Block */}
            <Reveal direction="up" delay={0.15} className="space-y-5 bg-[#eef3e8] p-8 sm:p-10 rounded-[2rem] border border-[#0f2d1e]/5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white border border-emerald-100 px-3 py-1 rounded-full inline-block">
                  Classroom Setup
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-gray-900 leading-tight">
                  Training & Facilities
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Our main office, with fully equipped classroom facilities, is located in the heart of Ernakulam City, ensuring easy accessibility for students from both within and outside the region.
                </p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold mt-4 border-t border-black/[0.05] pt-4">
                Our experienced faculty delivers comprehensive training through a balanced combination of theoretical instruction and practical sessions. Students are also provided with guidance in preparing project reports.
              </p>
            </Reveal>

          </div>

          {/* Landscape Meeting Banner Image */}
          <Reveal direction="up" delay={0.2}>
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-[2.5rem] overflow-hidden border border-border-subtle shadow-md group">
              <Image
                src="/hero-meeting.jpg"
                alt="Corporate Training Meeting"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
              <button
                onClick={openLeadModal}
                className="absolute bottom-8 left-8 inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-neutral-50 text-gray-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-102 cursor-pointer shadow-lg border-none"
              >
                <span>Request Campus Tour</span>
                <svg className="w-3.5 h-3.5 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3: Vision & Mission (Dark Premium Contrast Break) */}
      <section className="relative w-full py-24 px-6 bg-[#041e17] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Vision */}
          <Reveal direction="up" className="space-y-5 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#bef264] bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-block">
              Our Future Direction
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-tight">
              Our Vision
            </h2>
            <p className="text-base text-white/80 leading-relaxed font-sans font-normal">
              Our vision is to strengthen the accounting and taxation field by nurturing qualified, competent, and ethical professionals. We aim to elevate industry standards by promoting professionalism, integrity, and excellence in practice.
            </p>
            <p className="text-sm text-white/60 leading-relaxed font-normal border-t border-white/5 pt-4">
              We strive to contribute to a system where businesses and authorities can rely on skilled professionals who uphold fair practices and deliver accurate financial services.
            </p>
          </Reveal>

          {/* Mission */}
          <Reveal direction="up" delay={0.15} className="space-y-8 text-left">
            <div className="space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#bef264] bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-block">
                Our Core Focus
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-tight">
                Our Mission
              </h2>
              <p className="text-base text-white/80 leading-relaxed font-normal">
                In today’s competitive environment, academic certificates alone are not sufficient to secure success. Practical knowledge and subject expertise are essential. Our mission is to bridge this gap by delivering high-quality, hands-on training that prepares individuals for real-world challenges.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">We are committed to:</span>
              <ul className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-white/95">
                {commitments.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#bef264]/10 text-[#bef264] font-bold text-[9px] border border-[#bef264]/20">
                      ✓
                    </span>
                    <span className="leading-relaxed leading-[1.4]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Section 4: Affiliation Section */}
      <section className="relative w-full py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          
          {/* Photo on left */}
          <div className="md:col-span-5 flex items-center justify-center w-full h-[280px] p-8 rounded-[2rem] border border-border-subtle shadow-sm bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-full">
              <Image
                src="/whrde.jpg"
                alt="WHRDE Affiliation Card"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Affiliation info right */}
          <div className="md:col-span-7 text-left space-y-6">
            <Reveal direction="down">
              <span className="inline-block px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 bg-[#f4f6f3] border border-black/5 rounded-md shadow-sm">
                Official Affiliation
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900 leading-tight">
                World Human Resources Development Education (WHRDE)
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-base text-gray-600 leading-relaxed font-sans font-normal">
                We are affiliated with **World Human Resources Development Education (WHRDE)**, reinforcing our commitment to quality education, validated certifications, and professional development.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0f2d1e] hover:bg-[#0c1f14] text-[#eef3e8] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border-none"
              >
                <span>Learn More About Certification</span>
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Reveal>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}
