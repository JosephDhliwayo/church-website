import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";
import { PrayerRequestForm } from "@/components/PrayerRequestForm";

export const metadata = { title: `Prayer Requests | ${siteConfig.name}` };

export default function PrayerRequestsPage() {
  return (
    <Reveal as="div" className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Prayer Requests</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Share what&apos;s on your heart and our prayer team will stand with you in faith. Your
        request is sent directly to us via WhatsApp.
      </p>
      <div className="mt-8">
        <PrayerRequestForm />
      </div>
    </Reveal>
  );
}
