import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Testimonials | ${siteConfig.name}` };

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal as="div">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Stories of what God has done in the lives of our community.
        </p>
      </Reveal>

      {testimonials.length === 0 ? (
        <p className="mt-10 text-zinc-600 dark:text-zinc-400">
          Testimonies coming soon &mdash; check back for stories of God&apos;s faithfulness.
        </p>
      ) : (
        <div className="mt-10 space-y-6">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 100}
              className="flex gap-4 rounded-xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800"
            >
              {testimonial.image && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  &ldquo;{testimonial.story}&rdquo;
                </p>
                <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">
                  {testimonial.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
