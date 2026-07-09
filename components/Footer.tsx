import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-brand-purple-dark">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-white/70 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-white">{siteConfig.name}</p>
          <p>{siteConfig.address}</p>
          <p>
            {siteConfig.phone} &middot; {siteConfig.email}
          </p>
          <p className="mt-4 text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
