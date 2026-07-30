import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Sermons | ${siteConfig.name}` };

export default function SermonsPage() {
  const uploadsPlaylistId = `UU${siteConfig.youtube.channelId.slice(2)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal as="div">
        <h1 className="text-3xl font-bold tracking-tight">Sermons</h1>
        <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
          Catch up on past messages and teachings from our YouTube channel.
        </p>
      </Reveal>

      <Reveal
        delay={100}
        className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
      >
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId}`}
          title={`${siteConfig.name} sermon playlist`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </Reveal>

      <div className="mt-6">
        <a
          href={siteConfig.youtube.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-brand-purple-dark px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:bg-brand-purple-dark hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-purple-dark"
        >
          View All Sermons on YouTube
        </a>
      </div>
    </div>
  );
}
