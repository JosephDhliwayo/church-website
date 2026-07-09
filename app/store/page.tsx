import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Book Store | ${siteConfig.name}` };

export default function StorePage() {
  return (
    <Reveal as="div" className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Book Store</h1>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        Coming Soon &mdash; books, resources, and teaching materials will be available here.
      </p>
    </Reveal>
  );
}
