import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { getPaynowClient, getSiteUrl } from "@/lib/paynow";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  const [donation] = await db
    .select()
    .from(donations)
    .where(eq(donations.reference, reference))
    .limit(1);

  if (!donation) {
    return NextResponse.json({ error: "Donation not found." }, { status: 404 });
  }

  let status = donation.status;

  if (status === "pending" && donation.pollUrl) {
    try {
      const paynow = getPaynowClient(`${getSiteUrl()}/give/success?reference=${reference}`);
      const result = await paynow.pollTransaction(donation.pollUrl);
      const paynowStatus = result?.status?.toLowerCase();

      if (paynowStatus === "paid") {
        status = "paid";
        await db
          .update(donations)
          .set({ status: "paid", updatedAt: new Date() })
          .where(eq(donations.reference, reference));
      } else if (paynowStatus === "cancelled") {
        status = "failed";
        await db
          .update(donations)
          .set({ status: "failed", updatedAt: new Date() })
          .where(eq(donations.reference, reference));
      }
    } catch {
      // Keep returning the last known status if the poll request itself fails.
    }
  }

  return NextResponse.json({ status });
}
