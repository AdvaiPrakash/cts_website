"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";
import { useLead } from "@/lead";

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const { openLeadModal } = useLead();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Automatically close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerBgClass = isMenuOpen
    ? "bg-white/90 backdrop-blur-md border-b border-border-subtle/50 shadow-sm"
    : isScrolled
      ? "bg-transparent border-none shadow-none md:bg-white/90 md:backdrop-blur-md md:border-b md:border-border-subtle/50 md:shadow-sm"
      : isHomepage
        ? "bg-transparent border-none shadow-none md:bg-bg-page md:border-b md:border-border-subtle"
        : "bg-transparent border-none shadow-none md:bg-bg-page md:border-b md:border-border-subtle";

  const logoFilterClass = isMenuOpen
    ? "brightness-0 md:logo-green-filter"
    : isScrolled
      ? "brightness-0 md:logo-green-filter"
      : isHomepage
        ? "brightness-0 invert md:logo-green-filter"
        : "logo-green-filter";

  const hamburgerColorClass = isMenuOpen
    ? "text-gray-900 bg-transparent hover:bg-black/5 rounded-full"
    : isScrolled
      ? "text-[#0f2d1e] bg-[#bef264] shadow-md rounded-full scale-100 hover:scale-105"
      : isHomepage
        ? "text-white bg-transparent hover:bg-white/10 rounded-full"
        : "text-text-page bg-transparent hover:bg-black/5 rounded-full";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`group transition-all duration-500 transform ${
            !isHomepage ? "invisible md:visible" : "visible"
          } flex items-center ${
            isScrolled
              ? "opacity-0 scale-75 -translate-y-12 pointer-events-none"
              : "opacity-100 scale-100 translate-y-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative h-[38px] w-[50px] md:h-9 md:w-12 transition-all duration-500">
            <Image
              src="/logo.webp"
              alt={CONTENT.brand.logoText}
              fill
              className={`object-contain transition-all duration-300 ${logoFilterClass}`}
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

        {/* Action Area (Phone, CTA, Hamburger) */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Phone */}
          <a
            href="tel:+919447726158"
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-text-page/90 hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4 text-text-page/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 9447726158</span>
          </a>

          {/* CTA Button (Hidden on mobile) */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openLeadModal();
            }}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <span>Free Consultation</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2.5 transition-all duration-300 focus:outline-none cursor-pointer ${hamburgerColorClass}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6 transition-transform duration-200 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 h-[calc(100vh-73px)] bg-white/95 backdrop-blur-md border-t border-border-subtle/50 animate-fade-in overflow-y-auto">
          <div className="px-6 py-8 flex flex-col justify-between h-full max-h-[500px]">
            <nav className="flex flex-col gap-6">
              {CONTENT.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-text-page/80 hover:text-text-page transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-border-subtle/50">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openLeadModal();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Free Consultation</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="tel:+919447726158"
                className="flex items-center gap-3 text-sm font-semibold text-text-page/90 hover:opacity-80 transition-opacity"
              >
                <div className="p-2.5 rounded-lg bg-neutral-100 text-text-page/60">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-text-page/50 font-bold uppercase tracking-wider">Call Us</div>
                  <span className="text-base font-semibold">+91 9447726158</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
