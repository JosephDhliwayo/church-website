import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = { title: `Payment Cancelled | ${siteConfig.name}` };

export default function GiveCancelPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-bold">Payment Cancelled</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Your payment was cancelled and you have not been charged. You can try again anytime.
      </p>
      <Link
        href="/give"
        className="mt-6 inline-block rounded-full bg-brand-purple-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple"
      >
        Try Again
      </Link>
    </div>
  );
}
