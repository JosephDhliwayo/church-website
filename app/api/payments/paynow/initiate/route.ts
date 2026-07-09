import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { FUNDS, fundLabel } from "@/lib/funds";
import { getPaynowClient, getSiteUrl } from "@/lib/paynow";

const MOBILE_METHODS = new Set(["ecocash", "onemoney"]);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fund, amount, donorName, donorEmail, donorPhone, note, mobileMethod } = body;

  const amountNumber = Number(amount);

  if (typeof fund !== "string" || !FUNDS.some((f) => f.value === fund)) {
    return NextResponse.json({ error: "Please select a valid fund." }, { status: 400 });
  }
  if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
    return NextResponse.json({ error: "Please enter a valid amount." }, { status: 400 });
  }
  if (typeof donorName !== "string" || !donorName.trim() || typeof donorEmail !== "string" || !donorEmail.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (mobileMethod && !MOBILE_METHODS.has(mobileMethod)) {
    return NextResponse.json({ error: "Unsupported mobile money method." }, { status: 400 });
  }
  if (mobileMethod && (typeof donorPhone !== "string" || !donorPhone.trim())) {
    return NextResponse.json(
      { error: "A phone number is required for mobile money payments." },
      { status: 400 }
    );
  }

  const reference = `DON-${randomUUID()}`;
  const returnUrl = `${getSiteUrl()}/give/success?reference=${reference}`;

  await db.insert(donations).values({
    reference,
    donorName: donorName.trim(),
    donorEmail: donorEmail.trim(),
    donorPhone: donorPhone?.trim() || null,
    fund,
    note: note?.trim() || null,
    amount: amountNumber.toFixed(2),
    currency: "USD",
    gateway: "paynow",
    method: mobileMethod ?? "card",
    status: "pending",
  });

  try {
    const paynow = getPaynowClient(returnUrl);
    const payment = paynow.createPayment(reference, donorEmail.trim());
    payment.add(fundLabel(fund), amountNumber);

    const response = mobileMethod
      ? await paynow.sendMobile(payment, donorPhone.trim(), mobileMethod)
      : await paynow.send(payment);

    if (!response || !response.success) {
      await db
        .update(donations)
        .set({ status: "failed", updatedAt: new Date() })
        .where(eq(donations.reference, reference));

      return NextResponse.json(
        { error: response?.error ? String(response.error) : "Paynow declined the request." },
        { status: 502 }
      );
    }

    await db
      .update(donations)
      .set({
        pollUrl: response.pollUrl ? String(response.pollUrl) : null,
        updatedAt: new Date(),
      })
      .where(eq(donations.reference, reference));

    return NextResponse.json({
      reference,
      redirectUrl: response.hasRedirect ? String(response.redirectUrl) : null,
      instructions: response.instructions ? String(response.instructions) : null,
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
