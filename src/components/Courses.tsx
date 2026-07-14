"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";
import { Reveal } from "@/components/Reveal";

export function Courses() {
  const { badge, title, subtitle, items: staticItems } = CONTENT.courses;
  const [items, setItems] = useState(staticItems);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex, items.length]);

  return (
    <section className="relative w-full py-24 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-t border-border-subtle overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Split Header Layout */}
        <div className="grid md:grid-cols-12 gap-8 items-end w-full border-b border-border-subtle/40 pb-10">
          <div className="md:col-span-7 space-y-4 text-left">
            <Reveal direction="down">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
                {badge}
              </span>
            </Reveal>
            <Reveal direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-medium tracking-tight text-text-page leading-tight">
                {title}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 text-left pb-2">
            <Reveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-text-page/70 leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3D Focal Carousel container */}
        <div className="relative w-full max-w-4xl mx-auto h-[500px] mt-16 flex items-center justify-center select-none">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-border-subtle flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105 text-text-page"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-border-subtle flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105 text-text-page"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, idx) => {
              // Calculate positional offset relative to activeIndex
              let diff = idx - activeIndex;
              if (diff < -items.length / 2) diff += items.length;
              if (diff > items.length / 2) diff -= items.length;

              const isActive = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isVisible = isActive || isLeft || isRight;

              return (
                <div
                  key={item.id}
                  style={{
                    transform: `translateX(${diff * 280}px) scale(${isActive ? 1 : 0.82})`,
                    zIndex: isActive ? 20 : 10,
                    opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                    pointerEvents: isActive ? "auto" : "none",
                    filter: isActive ? "none" : "brightness(60%) grayscale(20%) blur(0.5px)",
                  }}
                  className="absolute w-[280px] sm:w-[350px] h-[450px] border border-border-subtle rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out text-left bg-bg-dark"
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                  />
                  
                  {/* Backdrop shadow green dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/60 to-emerald-900/20" />

                  {/* Centered Serif Card Title (Fades out when active) */}
                  <div className={`absolute inset-0 flex items-center justify-center p-8 pb-20 transition-all duration-500 ${
                    isActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                  }`}>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white text-center tracking-tight leading-tight select-none drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>

                  {/* Floating Dark-Green Glassmorphic details block (Only visible on Center Active Card) */}
                  <div className={`absolute bottom-3 left-3 right-3 bg-[#041e17]/90 backdrop-blur-md rounded-lg border border-white/10 p-5 flex flex-col justify-between h-[155px] z-20 shadow-xl text-left transition-all duration-500 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}>
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                          {item.title}
                        </h4>
                        {item.rating && (
                          <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 shrink-0 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            ★ {item.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">
                        {item.duration} | {item.batch.split("–")[0].trim()}
                      </p>
                    </div>

                    <Link
                      href={item.link}
                      className="w-full pt-3 border-t border-white/10 text-white/70 hover:text-primary font-bold text-[10px] tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer group/link"
                    >
                      <span>Learn More</span>
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-text-page/20 hover:bg-text-page/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Explore All Courses CTA */}
        <Reveal direction="up" delay={0.2}>
          <div className="flex justify-center mt-12">
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-sm transition-all hover:scale-102 cursor-pointer shadow-md shadow-primary/10"
            >
              <span>Explore All Courses</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
