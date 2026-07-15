"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@/lib/roles";
import { logoutAction } from "@/app/admin/actions";

interface AdminShellProps {
  user: User;
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links = [
    { href: "/admin", label: "Overview", icon: "📊" },
    { href: "/admin/courses", label: "Courses", icon: "🎓" },
    { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/admin/students", label: "Students", icon: "👥" },
    { href: "/admin/certificates", label: "Certificates", icon: "📜" },
    { href: "/admin/enquiries", label: "Enquiries", icon: "✉️" },
  ];

  return (
    <div className="min-h-screen bg-bg-page flex">
      
      {/* SIDEBAR - DESKTOP (md+) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border-subtle shrink-0 text-left">
        {/* Logo/Brand */}
        <div className="h-16 px-6 border-b border-border-subtle flex items-center gap-2">
          <span className="font-serif text-lg font-bold tracking-tight text-text-page">
            CTS Admin
          </span>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border-subtle">
          <p className="font-semibold text-sm text-text-page line-clamp-1">{user.name || user.email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-page/50">{user.role}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow p-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isActive
                    ? "bg-primary text-text-accent-dark shadow-sm"
                    : "text-text-page/60 hover:text-text-page hover:bg-black/5"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-border-subtle space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-text-page/60 hover:text-text-page transition-colors"
          >
            <span>🌐</span>
            <span>View Live Site</span>
          </Link>
          <button
            onClick={() => logoutAction()}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER (overlay + menu) */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-100 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute top-0 bottom-0 left-0 w-64 bg-white border-r border-border-subtle flex flex-col justify-between text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="h-16 px-6 border-b border-border-subtle flex items-center justify-between">
                <span className="font-serif text-lg font-bold tracking-tight text-text-page">
                  CTS Admin
                </span>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="text-text-page/60 hover:text-text-page w-8 h-8 rounded-full bg-black/5 flex items-center justify-center cursor-pointer border-none"
                >
                  ✕
                </button>
              </div>

              {/* User */}
              <div className="p-6 border-b border-border-subtle">
                <p className="font-semibold text-sm text-text-page line-clamp-1">{user.name || user.email}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-page/40 mt-0.5">{user.role}</p>
              </div>

              {/* Nav */}
              <nav className="p-4 space-y-1">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                        isActive
                          ? "bg-primary text-text-accent-dark shadow-sm"
                          : "text-text-page/60 hover:text-text-page hover:bg-black/5"
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-subtle space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-text-page/60 hover:text-text-page"
              >
                <span>🌐</span>
                <span>View Live Site</span>
              </Link>
              <button
                onClick={() => logoutAction()}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              >
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 px-6 border-b border-border-subtle bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg text-text-page/60 hover:text-text-page hover:bg-black/5 cursor-pointer border-none bg-transparent"
              aria-label="Open menu"
            >
              ☰
            </button>
            <span className="hidden md:inline text-xs font-bold uppercase tracking-wider text-text-page/40">
              Administrative Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-[9px] font-bold uppercase tracking-wider text-text-page/70 border border-border-subtle">
              Role: {user.role}
            </span>
            <div className="h-4 w-[1px] bg-border-subtle hidden sm:block" />
            <Link
              href="/"
              className="text-xs font-semibold text-text-page/60 hover:text-text-page transition-colors"
            >
              View live site ↗
            </Link>
          </div>
        </header>

        {/* Inner Main Scroll area */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
