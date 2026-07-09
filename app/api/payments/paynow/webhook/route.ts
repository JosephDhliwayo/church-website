import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { getPaynowClient, getSiteUrl } from "@/lib/paynow";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  let statusUpdate;
  try {
    const paynow = getPaynowClient(getSiteUrl());
    statusUpdate = paynow.parseStatusUpdate(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const reference = String(statusUpdate.reference);
  const paynowStatus = String(statusUpdate.status).toLowerCase();
  const status = paynowStatus === "paid" ? "paid" : paynowStatus === "cancelled" ? "failed" : "pending";

  await db
    .update(donations)
    .set({
      status,
      paynowReference: statusUpdate.paynowReference ? String(statusUpdate.paynowReference) : null,
      updatedAt: new Date(),
    })
    .where(eq(donations.reference, reference));

  return new NextResponse("OK", { status: 200 });
}
