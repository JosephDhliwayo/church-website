import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Contact | ${siteConfig.name}` };

export default function ContactPage() {
  return (
    <Reveal as="div" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
      <dl className="mt-6 space-y-2 text-zinc-600 dark:text-zinc-400">
        <div>
          <dt className="font-semibold text-zinc-900 dark:text-zinc-100">Address</dt>
          <dd>{siteConfig.address}</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-900 dark:text-zinc-100">Phone</dt>
          <dd>{siteConfig.phone}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
