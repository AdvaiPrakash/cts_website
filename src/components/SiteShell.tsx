"use client";

import React from "react";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Courses } from "@/components/Courses";
import { BusinessImpact } from "@/components/BusinessImpact";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import Image from "next/image";

interface SiteShellProps {
  children?: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  // Initialize Lenis smooth inertia scrolling
  useLenis();

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-page text-text-page selection:bg-primary/30 selection:text-primary transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children || (
          <>
            <Hero />
            <WhyChooseUs />
            <Courses />
            <BusinessImpact />
            <Testimonials />
            <ContactCTA />
          </>
        )}
      </main>
      <Footer />
      <LeadModal />

      {/* Floating Action Buttons: WhatsApp Chat & Apply Now Portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-none">
        {/* WhatsApp Chat Button */}
        <a
          href="https://wa.me/919447726158"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 pointer-events-auto cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} className="object-contain" />
        </a>

        {/* Apply Now Portal Button */}
        <a
          href="/enroll"
          className="px-5 py-3 rounded-lg bg-[#0f2d1e] text-[#eef3e8] hover:bg-[#0c1f14] text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105 pointer-events-auto cursor-pointer flex items-center gap-2"
        >
          <span>🎓 Apply Now</span>
        </a>
      </div>
    </div>
  );
}
