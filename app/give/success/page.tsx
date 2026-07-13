import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { fundLabel } from "@/lib/funds";
import { getPaynowClient, getSiteUrl } from "@/lib/paynow";
import { siteConfig } from "@/lib/config";

export const metadata = { title: `Thank You | ${siteConfig.name}` };

type Props = {
  searchParams: Promise<{ reference?: string }>;
};

function Wrapper({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">{body}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold dark:border-zinc-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default async function GiveSuccessPage({ searchParams }: Props) {
  const { reference } = await searchParams;

  if (!reference) {
    return (
      <Wrapper
        title="Thank You"
        body="Your gift is on its way. If you completed a payment, you should receive confirmation shortly."
      />
    );
  }

  const [donation] = await db
    .select()
    .from(donations)
    .where(eq(donations.reference, reference))
    .limit(1);

  if (!donation) {
    return (
      <Wrapper
        title="We couldn't find that donation"
        body="If you completed a payment, please contact us with your reference number so we can confirm it."
      />
    );
  }

  let status = donation.status;

  if (status === "pending" && donation.gateway === "paynow" && donation.pollUrl) {
    try {
      const paynow = getPaynowClient(`${getSiteUrl()}/give/success?reference=${reference}`);
      const result = await paynow.pollTransaction(donation.pollUrl);
      if (result?.status?.toLowerCase() === "paid") {
        status = "paid";
        await db
          .update(donations)
          .set({ status: "paid", updatedAt: new Date() })
          .where(eq(donations.reference, reference));
      }
    } catch {
      // fall back to the last known status recorded in the database
    }
  }

  const amountLabel = `$${Number(donation.amount).toFixed(2)} ${donation.currency}`;

  if (status === "paid") {
    return (
      <Wrapper
        title="Thank You for Your Gift!"
        body={`Your ${fundLabel(donation.fund)} of ${amountLabel} was received. A confirmation has been sent to ${donation.donorEmail}.`}
      />
    );
  }

  if (status === "failed") {
    return (
      <Wrapper
        title="Payment Not Completed"
        body="It looks like this payment wasn't completed. Please return to the Give page to try again."
      />
    );
  }

  return (
    <Wrapper
      title="Payment Processing"
      body={`We're still confirming your ${fundLabel(donation.fund)} of ${amountLabel}. This page will show as paid once it's confirmed — no need to submit again.`}
    />
  );
}
