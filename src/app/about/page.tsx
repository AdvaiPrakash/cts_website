"use client";

import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { useLead } from "@/lead";

export default function AboutPage() {
  const { openLeadModal } = useLead();

  return (
    <SiteShell>
      {/* Breadcrumbs Header */}
      <section className="relative w-full pt-32 pb-12 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <nav className="text-xs font-semibold uppercase tracking-wider text-text-page/40 flex items-center gap-2">
              <span>Home</span>
              <span>&gt;</span>
              <span className="text-text-page/60">About</span>
            </nav>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-text-page">
              Who We Are
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/60 max-w-xl leading-relaxed">
              With years of experience and a results-focused approach, we empower businesses and students to navigate complexity and achieve their goals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 1: Who We Are / Driving Success Through Strategy */}
      <section className="relative w-full py-24 px-6 bg-bg-page border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          {/* Left: Overlapping Photo and Card (Low Curvature) */}
          <div className="md:col-span-6 relative w-full h-[520px] flex items-center justify-start">
            <Reveal direction="right" className="w-[82%] h-[92%] relative rounded-xl overflow-hidden bg-bg-dark border border-border-subtle shadow-md">
              <Image
                src="/about-discuss.jpg"
                alt="Accounting Discussion"
                fill
                className="object-cover object-center"
              />
            </Reveal>
            
            {/* Floating Card (Low Curvature & Wavy Top) */}
            <Reveal direction="left" delay={0.2} className="absolute bottom-0 right-0 w-[270px] h-[340px] bg-[#bef264] text-text-accent-dark rounded-xl shadow-xl flex flex-col justify-between border border-white/10 z-10 text-left overflow-hidden p-7">
              {/* Layered Wave Graphics */}
              <div className="absolute top-0 left-0 right-0 h-[100px] overflow-hidden pointer-events-none opacity-40 select-none">
                <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none" className="w-full h-full text-[#0a2f26]">
                  <path d="M0,45 C50,15 100,55 150,25 C180,10 190,20 200,15 L200,0 L0,0 Z" fill="currentColor" />
                  <path d="M0,65 C60,35 110,75 160,45 C180,30 190,40 200,35 L200,0 L0,0 Z" fill="currentColor" opacity="0.6" />
                </svg>
              </div>

              {/* Title */}
              <div className="relative z-10 pt-16">
                <h3 className="font-display font-bold text-[1.35rem] tracking-tight text-text-accent-dark">
                  Why Hire Execor?
                </h3>
              </div>

              {/* Checklist */}
              <div className="relative z-10">
                <ul className="space-y-3.5 text-[0.825rem] font-semibold text-text-accent-dark/95">
                  <li className="flex items-center gap-2">
                    <span className="text-xs text-text-accent-dark/60 font-semibold">🗹</span> 15+ Years of Experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-xs text-text-accent-dark/60 font-semibold">🗹</span> Top-Rated Consultancy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-xs text-text-accent-dark/60 font-semibold">🗹</span> Certified Professionals
                  </li>
                </ul>
              </div>

              {/* Button */}
              <div className="relative z-10">
                <button
                  onClick={openLeadModal}
                  className="w-full py-3 px-4 bg-[#0a2f26] hover:bg-[#071f1b] text-white font-semibold text-[0.725rem] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-between cursor-pointer border-none"
                >
                  <span>Free Consultation</span>
                  <span className="text-xs">🡢</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: Copy Content */}
          <div className="md:col-span-6 text-left space-y-6">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                Who We Are
              </span>
            </Reveal>
            
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-serif font-medium tracking-tight text-text-page leading-tight">
                Driving Success Through Strategy
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-text-page/80 leading-relaxed">
                Creative Tax Solutions is a leading accounting and taxation training institute dedicated to developing highly skilled professionals for today's finance and compliance industry.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-xs sm:text-sm text-text-page/65 leading-relaxed">
                Our mission is to bridge the gap between academic education and practical industry requirements through hands-on, career-focused training. We specialize in helping individuals thrive by providing expert guidance.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <ul className="space-y-3.5 pt-2">
                {[
                  "Practical learning methodologies",
                  "Updated regulatory compliance curriculum",
                  "Job-oriented certifications and placement support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-text-page/80">
                    <div className="w-5 h-5 rounded-md border border-border-subtle flex items-center justify-center text-[10px] text-text-page/60">
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2: Our Mission / Empowering Clients to Create Lasting Value */}
      <section className="relative w-full py-24 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto flex flex-col justify-between">
          {/* Split Header */}
          <div className="grid md:grid-cols-12 gap-8 items-end w-full border-b border-border-subtle/40 pb-10 mb-16">
            <div className="md:col-span-7 space-y-4 text-left">
              <Reveal direction="down">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                  Our Mission
                </span>
              </Reveal>
              <Reveal direction="up">
                <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-text-page leading-tight">
                  Empowering Clients to Create Lasting Value
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5 text-left pb-2">
              <Reveal direction="up" delay={0.15}>
                <p className="text-sm text-text-page/70 leading-relaxed">
                  Our mission is to empower our students to create lasting value by providing strategic guidance, innovative solutions, and expert support. We are dedicated to helping accountants unlock their full potential.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Stats & Landscape Banner */}
          <div className="space-y-12">
            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-8 text-left border-l-2 border-primary/40 pl-6">
              <Reveal direction="up">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-text-page">
                    Higher return on investment
                  </h3>
                  <p className="text-xs text-text-page/65 leading-relaxed">
                    We help financial sponsors drive higher return on their investments through strategic analysis of target companies.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-text-page">
                    Greater shareholder value
                  </h3>
                  <p className="text-xs text-text-page/65 leading-relaxed">
                    We help corporate management teams increase shareholder value through tactical and strategic planning.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Landscape Banner (Low Curvature) */}
            <Reveal direction="up" delay={0.2}>
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-border-subtle group">
                <Image
                  src="/hero-meeting.jpg"
                  alt="Corporate Training Meeting"
                  fill
                  className="object-cover object-center group-hover:scale-101 transition-transform duration-700"
                />
                
                {/* Float Badge button */}
                <button
                  onClick={openLeadModal}
                  className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs transition-all hover:scale-102 cursor-pointer shadow-lg shadow-primary/20 border-none"
                >
                  <span>Explore Our Services</span>
                  <span>→</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3: Company With Traditions / Building on Tradition, Driving Innovation */}
      <section className="relative w-full py-24 px-6 bg-bg-page border-b border-border-subtle">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          {/* Left: Building Image with slate Overlay Card (Low Curvature) */}
          <div className="md:col-span-6 relative w-full h-[460px] flex items-center justify-end">
            <Reveal direction="left" className="w-[85%] h-full relative rounded-xl overflow-hidden bg-bg-dark border border-border-subtle shadow-md">
              <Image
                src="/whrde.jpg"
                alt="WHRDE Affiliation"
                fill
                className="object-cover object-center"
              />
            </Reveal>
            
            {/* Overlay card */}
            <Reveal direction="right" delay={0.2} className="absolute bottom-6 left-0 w-[55%] p-8 bg-[#041e17] text-white rounded-xl shadow-xl space-y-4 border border-white/5 z-10 text-left">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                CTS
              </span>
              <h3 className="text-4xl font-display font-black tracking-tight text-white leading-none">
                WHRDE
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                Affiliated with Human Resource Development.
              </p>
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                <span>Contact Us</span>
                <span>→</span>
              </button>
            </Reveal>
          </div>

          {/* Right: Copy Content */}
          <div className="md:col-span-6 text-left space-y-6">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                Company With Traditions
              </span>
            </Reveal>
            
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-serif font-medium tracking-tight text-text-page leading-tight">
                Building on Tradition, Driving Innovation
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-text-page/80 leading-relaxed">
                At Creative Tax Solutions, we combine decades of experience with forward-thinking technology to deliver comprehensive training and consulting.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="text-xs sm:text-sm text-text-page/65 leading-relaxed">
                Creative Tax Solutions is proud to be affiliated with the World Human Resources Development Education (WHRDE), reflecting our commitment to delivering quality education and professional skill development. We strive to raise professional standards by providing quality education.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 4: Our Team / A Team With Proven Expertise and Excellence */}
      <section className="relative w-full py-24 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto flex flex-col justify-between">
          {/* Split Header */}
          <div className="grid md:grid-cols-12 gap-8 items-end w-full border-b border-border-subtle/40 pb-10 mb-16">
            <div className="md:col-span-7 space-y-4 text-left">
              <Reveal direction="down">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                  Our Team
                </span>
              </Reveal>
              <Reveal direction="up">
                <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-text-page leading-tight">
                  A Team With Proven Expertise and Excellence
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5 text-left pb-2">
              <Reveal direction="up" delay={0.15}>
                <p className="text-sm text-text-page/70 leading-relaxed">
                  Our success stems from a seasoned professional team bringing extensive experience and expertise to every client engagement.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Team Cards Grid (Low Curvature) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Card 1: Slate Signature Card */}
            <Reveal direction="up">
              <div className="bg-[#041e17] text-white border border-transparent rounded-xl p-8 flex flex-col justify-between h-[360px] shadow-sm text-left relative overflow-hidden">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-serif font-medium italic text-white/90 leading-relaxed">
                    "Legacy of success can power your future!"
                  </p>
                  
                  {/* Decorative signature SVG */}
                  <svg viewBox="0 0 100 40" fill="none" stroke="var(--accent)" strokeWidth="2" className="w-24 h-10 opacity-70">
                    <path d="M10,20 C30,10 40,30 60,20 C80,10 90,30 95,20" strokeLinecap="round" />
                  </svg>
                </div>
                
                <button
                  onClick={openLeadModal}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer border-none rounded-lg"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>
            </Reveal>

            {/* Card 2: Johnatan Moralle */}
            <Reveal direction="up" delay={0.1}>
              <div className="bg-bg-page border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col h-[360px] text-left group">
                <div className="relative flex-grow w-full bg-bg-dark overflow-hidden">
                  <Image
                    src="/team-johnatan.jpg"
                    alt="Johnatan Moralle"
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-text-page leading-tight">
                    Johnatan Moralle
                  </h3>
                  <p className="text-xs text-text-page/60 font-semibold mt-1">
                    Founder
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Daniel Brila */}
            <Reveal direction="up" delay={0.2}>
              <div className="bg-bg-page border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col h-[360px] text-left group">
                <div className="relative flex-grow w-full bg-bg-dark overflow-hidden">
                  <Image
                    src="/team-daniel.jpg"
                    alt="Daniel Brila"
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-text-page leading-tight">
                    Daniel Brila
                  </h3>
                  <p className="text-xs text-text-page/60 font-semibold mt-1">
                    President
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 4: Rebeca Johnson */}
            <Reveal direction="up" delay={0.3}>
              <div className="bg-bg-page border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col h-[360px] text-left group">
                <div className="relative flex-grow w-full bg-bg-dark overflow-hidden">
                  <Image
                    src="/team-rebeca.jpg"
                    alt="Rebeca Johnson"
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-text-page leading-tight">
                    Rebeca Johnson
                  </h3>
                  <p className="text-xs text-text-page/60 font-semibold mt-1">
                    Senior Tax Manager
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
