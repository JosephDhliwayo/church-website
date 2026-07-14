"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/config";

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 bg-brand-purple-dark">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <Logo className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-white sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {siteConfig.navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-white/80 transition-colors hover:text-brand-gold"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="flex items-center gap-1 text-white/80 transition-colors hover:text-brand-gold"
            >
              More
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {moreOpen && (
              <div className="animate-fade-in-up absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-white/10 bg-brand-purple-dark shadow-xl">
                {siteConfig.navMore.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-brand-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/give"
            className="rounded-full bg-brand-gold px-3 py-1.5 text-xs font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95 sm:px-5 sm:py-2 sm:text-sm"
          >
            Give
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-fade-in-up flex flex-col gap-1 border-t border-white/10 px-4 py-3 lg:hidden">
          {siteConfig.navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-brand-gold"
            >
              {item.label}
            </Link>
          ))}
          <div className="my-1 border-t border-white/10" />
          {siteConfig.navMore.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-brand-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
