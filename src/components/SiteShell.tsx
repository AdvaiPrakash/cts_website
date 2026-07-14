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
    </div>
  );
}
