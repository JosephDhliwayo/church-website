import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { FUNDS, fundLabel } from "@/lib/funds";
import { getPesepayClient } from "@/lib/pesepay";
import { getSiteUrl } from "@/lib/site";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fund, amount, donorName, donorEmail, note } = body;

  const amountNumber = Number(amount);

  if (typeof fund !== "string" || !FUNDS.some((f) => f.value === fund)) {
    return NextResponse.json({ error: "Please select a valid fund." }, { status: 400 });
  }
  if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
    return NextResponse.json({ error: "Please enter a valid amount." }, { status: 400 });
  }
  if (
    typeof donorName !== "string" ||
    !donorName.trim() ||
    typeof donorEmail !== "string" ||
    !donorEmail.trim()
  ) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const reference = `DON-${randomUUID()}`;
  const returnUrl = `${getSiteUrl()}/give/success?reference=${reference}`;

  await db.insert(donations).values({
    reference,
    donorName: donorName.trim(),
    donorEmail: donorEmail.trim(),
    fund,
    note: note?.trim() || null,
    amount: amountNumber.toFixed(2),
    currency: "USD",
    gateway: "pesepay",
    method: "card",
    status: "pending",
  });

  try {
    const pesepay = getPesepayClient(returnUrl);
    const transaction = pesepay.createTransaction(amountNumber, "USD", fundLabel(fund), reference);
    const response = await pesepay.initiateTransaction(transaction);

    if (!response || !response.success) {
      await db
        .update(donations)
        .set({ status: "failed", updatedAt: new Date() })
        .where(eq(donations.reference, reference));

      return NextResponse.json(
        { error: response?.message ?? "Pesepay declined the request." },
        { status: 502 }
      );
    }

    await db
      .update(donations)
      .set({
        pesepayReference: response.referenceNumber ? String(response.referenceNumber) : null,
        pollUrl: response.pollUrl ? String(response.pollUrl) : null,
        updatedAt: new Date(),
      })
      .where(eq(donations.reference, reference));

    return NextResponse.json({
      reference,
      redirectUrl: response.redirectUrl ? String(response.redirectUrl) : null,
    });
  } catch (error) {
    await db
      .update(donations)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(donations.reference, reference));

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initiate payment." },
      { status: 500 }
    );
  }
}
