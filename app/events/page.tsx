import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { upcomingEvents } from "@/lib/events";

export const metadata = { title: `Events | ${siteConfig.name}` };

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Upcoming Events</h1>

      {upcomingEvents.length === 0 ? (
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          No upcoming events at the moment &mdash; check back soon.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.name}
              style={{ animationDelay: `${index * 150}ms` }}
              className="animate-fade-in-up overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 sm:flex"
            >
              {event.image && (
                <div className="relative aspect-[3/4] w-full shrink-0 sm:w-64">
                  <Image
                    src={event.image}
                    alt={`${event.name} flyer`}
                    fill
                    sizes="(min-width: 640px) 16rem, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="bg-gradient-to-r from-brand-purple-dark via-brand-purple to-brand-magenta px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
                    {event.date}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{event.name}</h2>
                </div>
                <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-5">
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">Time</p>
                    <p className="text-zinc-900 dark:text-zinc-100">{event.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">Venue</p>
                    <p className="text-zinc-900 dark:text-zinc-100">{event.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">Speakers</p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {event.speakers.map((speaker) => (
                        <li
                          key={speaker}
                          className="rounded-full bg-brand-purple-dark/10 px-3 py-1 text-sm font-medium text-brand-purple-dark dark:bg-white/10 dark:text-white"
                        >
                          {speaker}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
