import { siteConfig } from "@/lib/config";

export const metadata = { title: `Site Unavailable | ${siteConfig.name}` };

export default function MaintenancePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Site Temporarily Unavailable</h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        We&apos;re currently unavailable. Please check back soon.
      </p>
      <a
        href="/give"
        className="mt-8 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
      >
        Give Online
      </a>
    </div>
  );
}
