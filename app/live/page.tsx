import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Live | ${siteConfig.name}` };

export default function LivePage() {
  return (
    <Reveal as="div" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Watch Live</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Join our services and events live on YouTube. If nothing is streaming right now, check
        back at service time or watch our most recent broadcast on the channel.
      </p>
      <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${siteConfig.youtube.channelId}`}
          title="Prayer Movement International live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <a
        href={siteConfig.youtube.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
      >
        Subscribe on YouTube
      </a>
    </Reveal>
  );
}
