"use client";

import { useEffect, useRef, useState } from "react";
import type { BibleVerse } from "@/lib/bibleVerses";

const ROTATE_MS = 5 * 60 * 1000;
const FADE_MS = 400;

export function BibleVerseBanner({ verses }: { verses: BibleVerse[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (verses.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      fadeTimeout.current = setTimeout(() => {
        setIndex((i) => (i + 1) % verses.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);

    return () => {
      clearInterval(interval);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [verses.length]);

  const verse = verses[index];

  return (
    <div className="border-b border-white/10 bg-brand-purple-dark">
      <div
        className={`mx-auto max-w-5xl px-4 py-3 text-center transition-opacity duration-300 ease-in-out sm:px-6 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm italic text-white/90">&ldquo;{verse.text}&rdquo;</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-gold">
          {verse.reference}
        </p>
      </div>
    </div>
  );
}
