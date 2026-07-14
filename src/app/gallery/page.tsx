"use client";

import { useState, useEffect } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Inauguration Ceremony - Welcome Address",
    category: "Inauguration Ceremony",
    image: "/gallery/1.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
  {
    id: 2,
    title: "Inauguration Ceremony - Ribbon Cutting",
    category: "Inauguration Ceremony",
    image: "/gallery/2.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 3,
    title: "Inauguration Ceremony - Lamp Lighting",
    category: "Inauguration Ceremony",
    image: "/gallery/3.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 4,
    title: "Inauguration Ceremony - Keynote Presentation",
    category: "Inauguration Ceremony",
    image: "/gallery/4.webp",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
  },
  {
    id: 5,
    title: "Add on Course 2019-2020 - Group Photo",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0002.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 6,
    title: "Add on Course 2019-2020 - Batch Interactive Lecture",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0003.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
  {
    id: 7,
    title: "Add on Course 2019-2020 - Live GST Filing Session",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0025.webp",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
  },
  {
    id: 8,
    title: "Add on Course 2019-2020 - Tally Accounting Workshop",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0029.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 9,
    title: "Add on Course 2019-2020 - Practical Income Tax Training",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0030.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 10,
    title: "Add on Course 2019-2020 - Certificate Distribution Ceremony",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0031.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
  {
    id: 11,
    title: "Add on Course 2019-2020 - Professional Guest Lecture",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0033.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 12,
    title: "Add on Course 2019-2020 - Hands-on Excel Laboratory Work",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0034.webp",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
  },
  {
    id: 13,
    title: "Add on Course 2019-2020 - Q&A Seminar Session",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200730-WA0035.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
  {
    id: 14,
    title: "Add on Course 2019-2020 - Career Guidance Mentorship",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200809-WA0223.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 15,
    title: "Add on Course 2019-2020 - Independence Day Celebration",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0001_(1).webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 16,
    title: "Add on Course 2019-2020 - Faculty felicitation",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0002.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
  {
    id: 17,
    title: "Add on Course 2019-2020 - Student Project Presentation",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0003.webp",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
  },
  {
    id: 18,
    title: "Add on Course 2019-2020 - Accounting Softwares Lab Exam",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0004.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 19,
    title: "Add on Course 2019-2020 - Annual Campus Meetup",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0007.webp",
    gridClass: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 20,
    title: "Add on Course 2019-2020 - Closing Ceremony Group Photo",
    category: "Add on Course 2019-2020",
    image: "/gallery/IMG-20200815-WA0008.webp",
    gridClass: "md:col-span-2 md:row-span-1 h-full",
  },
];

const CATEGORIES = ["All", "Inauguration Ceremony", "Add on Course 2019-2020"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading dynamic gallery items:", err));
  }, []);

  // Filter gallery items
  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter((item) => item.category === activeCategory);

  const activeImage = items.find((item) => item.id === activeImageId);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageId === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
    if (currentIndex > -1) {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setActiveImageId(filteredItems[prevIndex].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageId === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeImageId);
    if (currentIndex > -1) {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setActiveImageId(filteredItems[nextIndex].id);
    }
  };

  return (
    <SiteShell>
      {/* Page Header */}
      <section className="relative w-full pt-36 pb-12 px-6 bg-black/[0.01] dark:bg-white/[0.01] border-b border-border-subtle">
        <div className="max-w-7xl mx-auto text-left space-y-4">
          <Reveal direction="down">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-page/60 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-md">
              Moments
            </span>
          </Reveal>
          <Reveal direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif font-medium tracking-tight text-text-page leading-tight">
              Our Gallery
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-text-page/70 max-w-2xl leading-relaxed font-sans">
              Explore our training campus, interactive seminars, workshops, and practical classrooms. Experience how our students prepare for jobs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="relative w-full pt-10 pb-6 px-6 bg-bg-page">
        <div className="max-w-7xl mx-auto text-left">
          <Reveal direction="up">
            <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle/50 pb-6">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveImageId(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    activeCategory === category
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-black/5 dark:bg-white/5 text-text-page/60 hover:text-text-page hover:bg-black/[0.08]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative w-full pb-24 px-6 bg-bg-page">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px] grid-flow-row-dense transition-all duration-500">
            {filteredItems.map((item, idx) => (
              <Reveal
                key={item.id}
                direction="up"
                delay={0.05 * (idx % 3)}
                className={`group relative overflow-hidden rounded-xl border border-border-subtle cursor-pointer shadow-sm hover:shadow-md transition-all duration-500 ${
                  // If category filtering is active, we render items without custom row/col spans to maintain layout
                  activeCategory === "All" ? item.gridClass : "h-full"
                }`}
              >
                <div 
                  className="relative w-full h-full"
                  onClick={() => setActiveImageId(item.id)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill Overlay */}
                  <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white border border-white/10 z-10">
                    {item.category}
                  </span>

                  {/* Title Caption overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#bef264] mb-1">
                      View Photo
                    </p>
                    <h3 className="font-serif text-lg font-medium leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-fade-in"
          onClick={() => setActiveImageId(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-105 transition-all w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer text-lg font-semibold border-none"
            onClick={() => setActiveImageId(null)}
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Navigation Controls */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-105 transition-all w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer border-none z-50 font-bold"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-105 transition-all w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer border-none z-50 font-bold"
            onClick={handleNext}
            aria-label="Next image"
          >
            →
          </button>

          {/* Modal Container */}
          <div 
            className="relative max-w-4xl w-full h-[70vh] flex flex-col items-center justify-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()} // Stop closing on clicking image itself
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Modal Info Block */}
            <div className="text-white max-w-xl space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#bef264]/20 border border-[#bef264]/30 text-[10px] font-bold uppercase tracking-wider text-[#bef264]">
                {activeImage.category}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                {activeImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
