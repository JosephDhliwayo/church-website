"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export function PrayerRequestForm() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const message = [`Prayer Request${name ? ` from ${name}` : ""}:`, "", request].join("\n");
    const number = siteConfig.phone.replace(/\D/g, "");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Your Name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Your Prayer Request</label>
        <textarea
          required
          rows={5}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Share what you'd like us to pray with you about..."
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
      >
        Send via WhatsApp
      </button>
      <p className="text-center text-xs text-zinc-500">
        This opens WhatsApp with your request pre-filled &mdash; just hit send.
      </p>
    </form>
  );
}
