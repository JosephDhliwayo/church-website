import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { events } from "@/lib/events";
import { heroSlides } from "@/lib/heroSlides";
import { galleryPhotos } from "@/lib/gallery";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "@/components/Reveal";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export default function Home() {
  const nextEvent = events[0];
  const galleryPreview = galleryPhotos.slice(3, 9);
  const testimonialsPreview = testimonials.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <section className="relative overflow-hidden">
        <HeroSlideshow slides={heroSlides} />
        <div className="animate-gradient-move absolute inset-0 bg-gradient-to-br from-brand-purple-dark/65 via-brand-purple/50 to-brand-magenta/40 bg-[length:200%_200%]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-24">
          <h1
            className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ animationDelay: "0ms" }}
          >
            {siteConfig.name}
          </h1>
          <p
            className="animate-fade-in-up max-w-xl text-lg text-white/80"
            style={{ animationDelay: "150ms" }}
          >
            {siteConfig.tagline}
          </p>
          <div
            className="animate-fade-in-up flex w-full flex-col gap-3 min-[380px]:w-auto min-[380px]:flex-row min-[380px]:gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/give"
              className="rounded-full bg-brand-gold px-6 py-3 text-center text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
            >
              Give Online
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {nextEvent && (
        <section className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold">Upcoming Event</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800">
              <div className="bg-gradient-to-r from-brand-purple-dark via-brand-purple to-brand-magenta px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
                  {nextEvent.date}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-white">{nextEvent.name}</h3>
              </div>
              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-zinc-900 dark:text-zinc-100">{nextEvent.time}</p>
                  <p className="text-zinc-600 dark:text-zinc-400">{nextEvent.venue}</p>
                  <p className="mt-1 text-sm text-zinc-500">{nextEvent.speakers.join(" · ")}</p>
                </div>
                <Link
                  href="/events"
                  className="shrink-0 rounded-full border border-brand-purple-dark px-5 py-2 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:bg-brand-purple-dark hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-purple-dark"
                >
                  View Details
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold">Watch Live</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Join our services and events live on YouTube.
          </p>
        </Reveal>
        <Reveal
          delay={100}
          className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
        >
          <iframe
            src={`https://www.youtube.com/embed/live_stream?channel=${siteConfig.youtube.channelId}`}
            title="Prayer Movement International live stream"
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
            Subscribe on YouTube
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold">Service Times</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {siteConfig.serviceTimes.map((service, index) => (
            <Reveal
              key={service.label}
              as="li"
              delay={index * 100}
              className="rounded-xl border border-zinc-200 p-6 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800"
            >
              <p className="font-semibold">{service.label}</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {service.day} &middot; {service.time}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Moments from our services, events, and community life.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryPreview.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 100}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/gallery"
            className="inline-block rounded-full border border-brand-purple-dark px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:bg-brand-purple-dark hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-purple-dark"
          >
            View Full Gallery
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <Reveal className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Stories of what God has done in the lives of our community.
          </p>

          {testimonialsPreview.length === 0 ? (
            <p className="mt-8 text-zinc-600 dark:text-zinc-400">
              Testimonies coming soon &mdash; check back for stories of God&apos;s faithfulness.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {testimonialsPreview.map((testimonial, index) => (
                <Reveal
                  key={testimonial.name}
                  delay={index * 100}
                  className="rounded-xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800"
                >
                  <p className="text-zinc-600 dark:text-zinc-400">
                    &ldquo;{testimonial.story}&rdquo;
                  </p>
                  <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    {testimonial.name}
                  </p>
                </Reveal>
              ))}
            </div>
          )}

          <Link
            href="/testimonials"
            className="mt-8 inline-block rounded-full border border-brand-purple-dark px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:bg-brand-purple-dark hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-purple-dark"
          >
            View All Testimonials
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <Reveal className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Need Prayer?</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Share what&apos;s on your heart and our prayer team will stand with you in faith.
          </p>
          <Link
            href="/prayer-requests"
            className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
          >
            Submit a Prayer Request
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <Reveal className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Join Our WhatsApp Prayer Group</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            We pray together every day. Join the WhatsApp group to receive prayer points and
            connect with the community.
          </p>
          <ul className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row sm:gap-6">
            {siteConfig.whatsappTimeZones.map((zone) => (
              <li key={zone.region} className="text-sm">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{zone.region}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{zone.time}</p>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-float mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
          >
            Join WhatsApp Group
          </a>
        </Reveal>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <Reveal className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Support the Ministry</h2>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Give your tithes, offerings, and gifts securely online via EcoCash, OneMoney,
            ZimSwitch, or card &mdash; from Zimbabwe or abroad.
          </p>
          <Link
            href="/give"
            className="animate-float mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-95"
          >
            Give Now
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
