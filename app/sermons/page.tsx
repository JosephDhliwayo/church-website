import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Sermons | ${siteConfig.name}` };

export default function SermonsPage() {
  return (
    <Reveal as="div" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Sermons</h1>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        Placeholder content &mdash; embed recordings, a YouTube playlist, or a podcast feed of
        past messages here.
      </p>
    </Reveal>
  );
}
