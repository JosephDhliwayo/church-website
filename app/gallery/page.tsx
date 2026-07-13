import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { galleryPhotos } from "@/lib/gallery";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Gallery | ${siteConfig.name}` };

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <Reveal as="div">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Moments from our services, events, and community life.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {galleryPhotos.map((photo, index) => (
          <Reveal
            key={photo.src}
            delay={index * 100}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
