"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";
import { useLead } from "@/lead";

export function Navbar() {
  const { openLeadModal } = useLead();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border-subtle/50 shadow-sm"
          : "bg-bg-page border-b border-border-subtle"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative h-9 w-12">
            <Image
              src="/logo.webp"
              alt={CONTENT.brand.logoText}
              fill
              className="object-contain brightness-0"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {CONTENT.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-text-page/80 hover:text-text-page transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Area (Phone, CTA) */}
        <div className="flex items-center gap-6">
          {/* Phone */}
          <a
            href="tel:1-800-356-8933"
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-text-page/90 hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4 text-text-page/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>1-800-356-8933</span>
          </a>

          {/* CTA Button */}
          <button
            onClick={openLeadModal}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <span>Free Consultation</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
