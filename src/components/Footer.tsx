"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTENT } from "@/content";

export function Footer() {
  return (
    <footer className="relative bg-[#041e17] text-white border-t border-white/5 pt-16 pb-8 px-6 text-left transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
        
        {/* Left Column (Brand & Description) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center">
            <div className="relative h-9 w-12">
              <Image
                src="/logo.webp"
                alt={CONTENT.brand.logoText}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            Providing practical accounting training and corporate compliance advisory to scale careers and businesses nationwide.
          </p>
        </div>

        {/* Center-Left Column (Services/Courses) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Services
          </h4>
          <ul className="space-y-2.5">
            {CONTENT.courses.items.map((course) => (
              <li key={course.id}>
                <Link
                  href={course.link}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center-Right Column (Contact Info) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Head Office
          </h4>
          <p className="text-xs text-white/60 leading-relaxed uppercase">
            JANATHA ROAD, LANE NO 40,<br />
            VYTTILA, KOCHI, KERALA 682019
          </p>
          <div className="space-y-1 text-xs text-white/60">
            <p>P: +91 9447726158</p>
            <p>E: creativetaxsolutionsekm@gmail.com</p>
          </div>
        </div>

        {/* Right Column (Socials & Navigation) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Connect
          </h4>
          <div className="flex items-center gap-4 text-white/60">
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Block (Copyright & Policies) */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>{CONTENT.footer.copyright}</p>
        <div className="flex items-center gap-6">
          {CONTENT.footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
