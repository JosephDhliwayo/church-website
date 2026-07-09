import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `About | ${siteConfig.name}` };

const timeline = [
  {
    place: "Gweru",
    year: "2023",
    detail:
      "The Prayer Movement started at Midlands State University in Gweru — a small group of people just coming together in one room for Apostle Elisha, a student called to minister and spread the Gospel. By the grace of God, the numbers grew and a branch was opened in Gweru.",
  },
  {
    place: "Harare",
    detail:
      "Even during holidays when students were away from the university, God kept growing it. A branch opened in Harare, and elderly people started coming because of the notable signs and wonders.",
  },
  {
    place: "Mutare",
    detail: "Now, by God's grace, we also have a branch in Mutare.",
  },
  {
    place: "Prayer Movement International",
    year: "January 2026",
    detail:
      "The ministry was revolutionized from The Prayer Movement into Prayer Movement International.",
  },
];

const coreValues = [
  { title: "Prayer", description: "Prayer as a spiritual technology." },
  { title: "Excellence", description: "Excellence as a spirit." },
  { title: "Faith", description: "Faith as a currency." },
];

export default function AboutPage() {
  return (
    <Reveal as="div" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        {siteConfig.name} is a community of believers in {siteConfig.address} dedicated to
        worship, discipleship, and service.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Our Vision</h2>
      <p className="mt-4 text-xl font-semibold text-brand-purple-dark dark:text-brand-gold">
        Transforming lives through the Superpower of Prophecy.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Our History</h2>
      <p className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
        In short: Prayer Movement International is a home for prayer and the ministration of
        the Spirit.
      </p>

      <ol className="mt-8 space-y-8 border-l-2 border-brand-purple-dark/20 pl-6 dark:border-white/10">
        {timeline.map((stop, index) => (
          <Reveal as="li" key={stop.place} delay={index * 120} className="relative">
            <span className="absolute -left-[1.94rem] top-1 h-3 w-3 rounded-full bg-brand-gold ring-4 ring-white dark:ring-zinc-950" />
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {stop.place}
              {stop.year && (
                <span className="ml-2 text-xs font-normal uppercase tracking-wide text-brand-magenta">
                  {stop.year}
                </span>
              )}
            </p>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">{stop.detail}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12 rounded-xl border-l-4 border-brand-gold bg-brand-purple-dark/5 p-6 dark:bg-white/5">
        <p className="text-zinc-700 dark:text-zinc-300">
          That&apos;s Acts 2 energy right there &mdash; &ldquo;they devoted themselves to
          prayer&rdquo; (Acts 2:42), and God added to their numbers (Acts 2:47).
        </p>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Signs and wonders following, young and old coming together (Acts 2:17), and multiple
          locations being planted &mdash; that&apos;s God&apos;s hand.
        </p>
      </Reveal>

      <h2 className="mt-12 text-2xl font-semibold">Our Story</h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        {siteConfig.name} is a diverse prophetic ministry founded by Apostle Elisha. Our
        mission is to transform lives through biblical revelations, faith as a spiritual
        currency, through signs and wonders, prophetic insights, declarations in tangible
        faith, prayer, fasting and giving. We are a family-oriented ministry that believes in
        the transformative power and glory of Jesus Christ in the demonstration of the power
        of prophecy, in partnership with the outpouring of the Holy Spirit of the Almighty
        living God.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Our Mission</h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        To unify, edify and embody Jesus Christ as a whole, by reaching out to the lost,
        broken-hearted, the poor, and unfortunate members of the community, bringing about the
        love, compassion, care, and revelation, as well as the knowledge of Jesus Christ,
        through fellowshipping with God the Father, the Son and the Holy Spirit.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Core Values</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {coreValues.map((value, index) => (
          <Reveal
            key={value.title}
            delay={index * 100}
            className="rounded-xl border border-zinc-200 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800"
          >
            <p className="text-lg font-semibold text-brand-purple-dark dark:text-brand-gold">
              {value.title}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {value.description}
            </p>
          </Reveal>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Leadership</h2>
      <Reveal className="mt-6 overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 sm:flex">
        <div className="relative aspect-[3/4] w-full shrink-0 sm:w-72">
          <Image
            src="/apostle-elisha.jpg"
            alt="Apostle Elisha, Founder and Leader"
            fill
            sizes="(min-width: 640px) 18rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-4 px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Founder and Leader
            </p>
            <h3 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Apostle Elisha
            </h3>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Preacher, Teacher, Prophet, Mentor, Advisor, Counsellor, Spiritual Father &mdash;
            all these are the things that we see in him and through his work.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            One thing that is very undeniable about him and inspiring is his persistent
            dedication to the work of God. Strange things, manifestations, prophetic insights,
            and visions have been revealed, and many have witnessed and testified to the power
            of Jesus Christ through demonstration of power in signs and wonders &mdash;
            tangible things that have propelled the prophetic ministry and revealed the
            Kingdom of God on the earth.
          </p>
          <p className="border-l-4 border-brand-gold pl-4 italic text-zinc-700 dark:text-zinc-300">
            &ldquo;Through Faith we believe, through Faith we receive, through Faith we
            testify.&rdquo;
          </p>
        </div>
      </Reveal>
    </Reveal>
  );
}
