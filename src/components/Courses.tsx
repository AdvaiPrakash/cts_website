"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";
import { Reveal } from "@/components/Reveal";
import { motion, AnimatePresence } from "motion/react";

// Responsive window size hook for centering offsets
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function Courses() {
  const { badge, title, subtitle, items: staticItems } = CONTENT.courses;
  const [items, setItems] = useState(staticItems);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  // Responsive offset X in pixels to align side cards
  const xOffset = isMobile ? 120 : (isTablet ? 240 : 320);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading dynamic courses:", err));
  }, []);

  // Auto-play slider every 5 seconds, resetting the timer on index change
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, items.length]);

  // Predefined sophisticated background colors for the cards to complement the course images
  const cardBgColors = [
    "#1d332d", // Slate green
    "#4a3525", // Deep warm brown
    "#705940", // Brass golden brown
    "#162421", // Dark charcoal green
    "#2f3e36", // Soft moss green
    "#534031", // Espresso cocoa
    "#2c383f", // Slate charcoal blue
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
  };

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    // If clicking an inactive side card, expand it instead of navigating
    if (index !== activeIndex) {
      e.preventDefault();
      selectCard(index);
    }
  };

  // Math to compute position styles for looping circular 3D carousel
  const getCardStyles = (index: number) => {
    const diff = (index - activeIndex + items.length) % items.length;
    
    // Active Card (Center)
    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        borderRadius: isMobile ? 32 : 48,
      };
    }
    
    // Right Adjacent Card
    if (diff === 1) {
      return {
        x: xOffset,
        scale: isMobile ? 0.72 : 0.78,
        opacity: 0.5,
        zIndex: 20,
        borderRadius: isMobile ? 24 : 32,
      };
    }
    
    // Left Adjacent Card
    if (diff === items.length - 1) {
      return {
        x: -xOffset,
        scale: isMobile ? 0.72 : 0.78,
        opacity: 0.5,
        zIndex: 20,
        borderRadius: isMobile ? 24 : 32,
      };
    }
    
    // Hidden Behind Cards
    const isFarRight = diff > 1 && diff <= items.length / 2;
    return {
      x: isFarRight ? xOffset * 1.5 : -xOffset * 1.5,
      scale: 0.5,
      opacity: 0,
      zIndex: 10,
      borderRadius: isMobile ? 24 : 32,
    };
  };

  return (
    <section className="relative w-full bg-[#f4f6f3] text-gray-900 border-t border-border-subtle py-20 md:py-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        
        {/* Header Layout: Left-aligned Badge & Heading, Right-aligned Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-20">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <Reveal direction="down">
              <span className="inline-block px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 bg-white border border-black/5 rounded-md shadow-sm">
                {badge}
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif font-normal tracking-tight text-gray-900 leading-[1.15]">
                {title}
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3D Circular Carousel Section */}
        <div className="relative w-full mt-12 flex flex-col items-center justify-center">
          
          {/* Circular Superimposed Control Chevrons (Hidden on mobile) */}
          <button
            onClick={handlePrev}
            className="absolute left-[1%] sm:left-[8%] md:left-[14%] lg:left-[20%] xl:left-[24%] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-gray-800 border border-black/10 hidden sm:flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
            aria-label="Previous Course"
          >
            <svg className="w-5 h-5 -translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-[1%] sm:right-[8%] md:right-[14%] lg:right-[20%] xl:right-[24%] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-gray-800 border border-black/10 hidden sm:flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
            aria-label="Next Course"
          >
            <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Track Container */}
          <div className="relative w-full h-[360px] sm:h-[500px] flex items-center justify-center overflow-hidden">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const bgHex = cardBgColors[index % cardBgColors.length];
              const styles = getCardStyles(index);

              return (
                <motion.div
                  key={item.id}
                  animate={styles}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28
                  }}
                  className="absolute w-[240px] sm:w-[350px] h-[300px] sm:h-[440px] overflow-hidden shadow-lg select-none cursor-pointer group"
                  style={{ backgroundColor: bgHex }}
                >
                  <Link
                    href={item.link}
                    onClick={(e) => handleCardClick(e, index)}
                    className="absolute inset-0 block w-full h-full"
                  >
                    {/* Background Image */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-750 ease-out group-hover:scale-103"
                      sizes="(max-w-768px) 100vw, 360px"
                      priority={index < 2}
                    />

                    {/* Dark Shade Overlay with Gradient for text readability */}
                    <div className="absolute inset-0 bg-black/65" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/80 transition-opacity duration-300 group-hover:opacity-95" />

                    {/* Center details content overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center text-white z-20">
                      
                      {/* Top part: Metadata tag */}
                      <div className="h-6">
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#bef264] bg-black/45 backdrop-blur-md rounded-full border border-white/10"
                            >
                              {item.duration}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Center part: Title & Description */}
                      <div className="flex flex-col items-center justify-center flex-grow py-4">
                        <h3 className={`font-serif tracking-tight font-normal leading-tight text-white transition-all duration-500 drop-shadow-md ${
                          isActive ? "text-xl sm:text-2xl mb-2" : "text-xs sm:text-base line-clamp-3"
                        }`}>
                          {item.title}
                        </h3>
                        
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-[11px] sm:text-xs text-white/80 max-w-xs leading-relaxed font-sans overflow-hidden"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom part: CTA Button & Pricing */}
                      <div className="h-10 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="flex items-center gap-3"
                            >
                              <span className="text-[11px] font-semibold text-[#bef264] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                                {item.fees.split("/")[0].trim()}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white text-gray-950 px-4.5 py-2 rounded-full shadow hover:bg-neutral-100 transition-colors">
                                <span>View Details</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectCard(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? "w-8 bg-[#0f2d1e]" : "w-3.5 bg-[#0f2d1e]/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* View All Courses Button */}
          <Reveal direction="up" delay={0.15} className="flex justify-center mt-12">
            <Link
              href="/features"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2d1e] text-[#eef3e8] hover:bg-[#0c1f14] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>View All Courses</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
