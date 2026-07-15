"use client";

import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { useLead } from "@/lead";

export default function AboutPage() {
  const { openLeadModal } = useLead();

  return (
    <SiteShell>
      {/* Section Header */}
      <section className="relative w-full pt-36 pb-12 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
              ABOUT US
            </span>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-text-page">
              About Us
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/60 max-w-2xl leading-relaxed">
              Creative Tax Solutions is a team of experienced professionals specializing in Accounting, GST, and Income Tax. We are committed to guiding and transforming ambitions into successful careers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 1: Who We Are & Designed For Grid */}
      <section className="relative w-full py-20 px-6 bg-bg-page border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Overlapping Images & Quick Stats (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 text-left">
            <Reveal direction="right" className="relative w-full h-[320px] rounded-xl overflow-hidden bg-bg-dark border border-border-subtle shadow-md">
              <Image
                src="/about-discuss.jpg"
                alt="Accounting Discussion"
                fill
                className="object-cover object-center"
              />
            </Reveal>

            {/* Float WHRDE Badge */}
            <Reveal direction="left" delay={0.2}>
              <div className="p-6 rounded-xl bg-[#eef3e8] border border-[#0f2d1e]/10 space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Accreditation
                </span>
                <h4 className="font-display font-bold text-sm text-[#0f2d1e] leading-snug">
                  WHRDE Affiliation
                </h4>
                <p className="text-xs text-[#0f2d1e]/85 leading-relaxed font-semibold">
                  Affiliated with World Human Resources Development Education, reinforcing our commitment to professional development.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Copy & Audience Grid */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
                Transforming Ambitions into Successful Careers
              </h2>
              <p className="text-sm text-text-page/80 leading-relaxed font-sans">
                Creative Tax Solutions is a dedicated training institution focused on Accounting and Tax Filing, providing strong practical knowledge along with essential theoretical foundations.
              </p>
            </div>

            {/* Designed for list */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Our Programs are Specially Designed For:
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Commerce Graduates and Postgraduates aiming to build a career as Licensed GST Practitioners",
                  "Individuals aspiring to start a career as Accountants",
                  "Commerce HSSC (Plus Two) students seeking to become Tax Consultants",
                  "CA / ICWA students requiring hands-on practical exposure",
                  "Business owners wanting to understand Accounting, GST, and regulatory updates",
                  "Traditional accountants upgrading to computerized systems such as Tally",
                  "Working professionals enhancing their expertise in GST and return filing",
                  "Retired professionals seeking opportunities as Freelance Accountants",
                  "Women professionals preferring flexible, work-from-home opportunities"
                ].map((item, idx) => (
                  <Reveal key={idx} direction="up" delay={0.03 * idx}>
                    <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/[0.01] border border-border-subtle rounded-xl hover:border-emerald-600/30 hover:shadow-sm transition-all duration-300 min-h-[92px]">
                      <Image src="/check-list.png" alt="Check" width={14} height={14} className="shrink-0 object-contain mt-1.5" />
                      <span className="text-xs font-medium text-text-page/85 leading-relaxed">
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

      {/* Section 2: Certified Accountant & Facilities split */}
      <section className="relative w-full py-20 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-12 text-left">
            
            {/* Be a Certified Accountant block */}
            <Reveal direction="up" className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Professional Path</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
                Be a Certified Accountant
              </h2>
              <p className="text-sm text-text-page/70 leading-relaxed">
                Our course equips students with the knowledge and skills required to manage accounts across organizations of all sizes—from small businesses to large enterprises. The training includes official procedures, regulatory compliance, and current industry practices in accounting and taxation.
              </p>
              <p className="text-xs text-text-page/60 leading-relaxed font-semibold">
                Upon successful completion, learners will be capable of independently handling diverse accounting functions and statutory formalities with confidence and efficiency.
              </p>
            </Reveal>

            {/* Training & Facilities block */}
            <Reveal direction="up" delay={0.15} className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Classroom Setup</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
                Training & Facilities
              </h2>
              <p className="text-sm text-text-page/70 leading-relaxed">
                Our main office, with fully equipped classroom facilities, is located in the heart of Ernakulam City, ensuring easy accessibility for students from both within and outside the region.
              </p>
              <p className="text-xs text-text-page/60 leading-relaxed font-semibold">
                Our experienced faculty delivers comprehensive training through a balanced combination of theoretical instruction and practical sessions. Students are also provided with guidance and support in preparing project reports. Even individuals with basic qualifications can quickly gain proficiency.
              </p>
            </Reveal>

          </div>

          {/* Landscape Meeting Banner Image */}
          <Reveal direction="up" delay={0.2}>
            <div className="relative w-full h-[380px] rounded-xl overflow-hidden border border-border-subtle shadow-sm group">
              <Image
                src="/hero-meeting.jpg"
                alt="Corporate Training Meeting"
                fill
                className="object-cover object-center group-hover:scale-101 transition-transform duration-700"
              />
              <button
                onClick={openLeadModal}
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] dark:bg-primary dark:hover:bg-primary-hover text-[#eef3e8] dark:text-text-accent-dark font-semibold text-xs transition-all hover:scale-102 cursor-pointer shadow-md"
              >
                <span>Request Campus Tour</span>
                <span>→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3: Vision & Mission */}
      <section className="relative w-full py-20 px-6 bg-bg-page border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          
          {/* Vision */}
          <Reveal direction="up" className="space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Our Future Direction</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
              Our Vision
            </h2>
            <p className="text-sm text-text-page/70 leading-relaxed font-sans">
              Our vision is to strengthen the accounting and taxation field by nurturing qualified, competent, and ethical professionals. We aim to elevate industry standards by promoting professionalism, integrity, and excellence in practice.
            </p>
            <p className="text-xs text-text-page/60 leading-relaxed font-semibold">
              We strive to contribute to a system where businesses and authorities can rely on skilled professionals who uphold fair practices and deliver accurate financial services.
            </p>
          </Reveal>

          {/* Mission */}
          <Reveal direction="up" delay={0.15} className="space-y-6 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Our Core Focus</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
                Our Mission
              </h2>
              <p className="text-sm text-text-page/70 leading-relaxed">
                In today’s competitive environment, academic certificates alone are not sufficient to secure success. Practical knowledge and subject expertise are essential. Our mission is to bridge this gap by delivering high-quality, hands-on training that prepares individuals for real-world challenges.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-text-page/50">We are committed to:</span>
              <ul className="space-y-3 text-xs font-semibold text-text-page/80">
                {[
                  "Promoting professional competence and ethical practices in accounting and taxation",
                  "Creating career opportunities for qualified individuals",
                  "Supporting businesses with reliable and knowledgeable professionals",
                  "Building a transparent, fair, and trustworthy ecosystem within the accounting and tax domain"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Image src="/check-list.png" alt="Check" width={18} height={18} className="shrink-0 object-contain mt-0.5" />
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Section 4: Affiliation Section */}
      <section className="relative w-full py-20 px-6 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          
          {/* Photo on left */}
          <div className="md:col-span-5 flex items-center justify-center w-full h-[280px] p-6 rounded-xl border border-border-subtle shadow-sm bg-white">
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
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0f2d1e] bg-[#eef3e8] border border-[#0f2d1e]/15 rounded-md">
                Official Affiliation
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page leading-tight">
                World Human Resources Development Education (WHRDE)
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-sm text-text-page/70 leading-relaxed font-sans">
                We are affiliated with **World Human Resources Development Education (WHRDE)**, reinforcing our commitment to quality education, validated certifications, and professional development.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <button
                onClick={openLeadModal}
                className="px-6 py-3 rounded-lg bg-[#0f2d1e] hover:bg-[#0c1f14] text-[#eef3e8] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border-none"
              >
                Learn More About Certification
              </button>
            </Reveal>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}
