"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FUNDS, type FundValue } from "@/lib/funds";

type PaymentMethod = "ecocash" | "onemoney" | "paynow_card" | "stripe_card";

const PAYMENT_METHODS: { value: PaymentMethod; label: string; description: string }[] = [
  {
    value: "ecocash",
    label: "EcoCash",
    description: "Mobile money via Paynow",
  },
  {
    value: "onemoney",
    label: "OneMoney",
    description: "Mobile money via Paynow",
  },
  {
    value: "paynow_card",
    label: "Card / ZimSwitch",
    description: "Local card via Paynow",
  },
  {
    value: "stripe_card",
    label: "International Card",
    description: "USD card via Stripe",
  },
];

const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 3 * 60 * 1000;

export function DonationForm() {
  const router = useRouter();

  const [fund, setFund] = useState<FundValue>("tithe");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ecocash");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobilePending, setMobilePending] = useState<{
    reference: string;
    instructions: string;
  } | null>(null);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, []);

  function isMobileMethod(method: PaymentMethod) {
    return method === "ecocash" || method === "onemoney";
  }

  function startPolling(reference: string) {
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/paynow/status?reference=${reference}`);
        const data = await res.json();

        if (data.status === "paid") {
          stopPolling();
          router.push(`/give/success?reference=${reference}`);
        } else if (data.status === "failed") {
          stopPolling();
          setMobilePending(null);
          setError("The payment was not completed. Please try again.");
        }
      } catch {
        // keep polling; a transient network error shouldn't abort the flow
      }
    }, POLL_INTERVAL_MS);

    pollTimeoutRef.current = setTimeout(() => {
      stopPolling();
      setError(
        "We haven't received confirmation yet. If you approved the payment on your phone, it may still be processing."
      );
    }, POLL_TIMEOUT_MS);
  }

  function stopPolling() {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    pollIntervalRef.current = null;
    pollTimeoutRef.current = null;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (paymentMethod === "stripe_card") {
        const res = await fetch("/api/payments/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fund, amount, donorName, donorEmail, note }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
        window.location.href = data.url;
        return;
      }

      const mobile = isMobileMethod(paymentMethod);
      const res = await fetch("/api/payments/paynow/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fund,
          amount,
          donorName,
          donorEmail,
          note,
          donorPhone: mobile ? donorPhone : undefined,
          mobileMethod: mobile ? paymentMethod : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      if (data.instructions) {
        setMobilePending({ reference: data.reference, instructions: data.instructions });
        startPolling(data.reference);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (mobilePending) {
    return (
      <div className="rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
        <h2 className="text-xl font-semibold">Check your phone</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">{mobilePending.instructions}</p>
        <p className="mt-6 text-sm text-zinc-500">
          Waiting for confirmation&hellip; this page will update automatically.
        </p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    );
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

      {isMobileMethod(paymentMethod) && (
        <div>
          <label className="block text-sm font-medium">Mobile Money Number</label>
          <input
            type="tel"
            required
            value={donorPhone}
            onChange={(e) => setDonorPhone(e.target.value)}
            placeholder="07XXXXXXXX"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      )}

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
