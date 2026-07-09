import { DonationForm } from "@/components/DonationForm";
import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: `Give | ${siteConfig.name}` };

export default function GivePage() {
  return (
    <Reveal as="div" className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Give</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Thank you for supporting {siteConfig.name}. Choose a fund, enter an amount, and pay
        securely via EcoCash, OneMoney, ZimSwitch, local card, or an international card.
      </p>
      <div className="mt-8">
        <DonationForm />
      </div>
    </Reveal>
  );
}
