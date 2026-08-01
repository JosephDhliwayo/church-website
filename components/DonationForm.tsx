"use client";

import { useState } from "react";
import { FUNDS, type FundValue } from "@/lib/funds";

type PaymentMethod = "pesepay" | "stripe_card";

const PAYMENT_METHODS: { value: PaymentMethod; label: string; description: string }[] = [
  {
    value: "pesepay",
    label: "EcoCash / OneMoney / Card",
    description: "Local payment via Pesepay",
  },
  {
    value: "stripe_card",
    label: "International Card",
    description: "USD card via Stripe",
  },
];

export function DonationForm() {
  const [fund, setFund] = useState<FundValue>("tithe");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pesepay");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const endpoint =
        paymentMethod === "stripe_card"
          ? "/api/payments/stripe/checkout"
          : "/api/payments/pesepay/initiate";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fund, amount, donorName, donorEmail, note }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      const redirectUrl = paymentMethod === "stripe_card" ? data.url : data.redirectUrl;
      if (!redirectUrl) throw new Error("Something went wrong.");
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Fund</label>
        <select
          value={fund}
          onChange={(e) => setFund(e.target.value as FundValue)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {FUNDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Amount (USD)</label>
        <input
          type="number"
          min="1"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="20.00"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            required
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. In memory of..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Payment Method</label>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className={`flex cursor-pointer flex-col rounded-lg border px-4 py-3 transition-colors ${
                paymentMethod === method.value
                  ? "border-brand-magenta bg-brand-magenta/10 dark:bg-brand-magenta/15"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={() => setPaymentMethod(method.value)}
                />
                {method.label}
              </span>
              <span className="mt-1 text-xs text-zinc-500">{method.description}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-purple-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple disabled:opacity-60"
      >
        {submitting ? "Processing..." : "Give Now"}
      </button>
    </form>
  );
}
