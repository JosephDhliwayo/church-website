import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { FUNDS, fundLabel } from "@/lib/funds";
import { getStripeClient } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/paynow";

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
  if (typeof donorName !== "string" || !donorName.trim() || typeof donorEmail !== "string" || !donorEmail.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const reference = `DON-${randomUUID()}`;
  const siteUrl = getSiteUrl();

  await db.insert(donations).values({
    reference,
    donorName: donorName.trim(),
    donorEmail: donorEmail.trim(),
    fund,
    note: note?.trim() || null,
    amount: amountNumber.toFixed(2),
    currency: "USD",
    gateway: "stripe",
    method: "card",
    status: "pending",
  });

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: donorEmail.trim(),
      client_reference_id: reference,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amountNumber * 100),
            product_data: { name: fundLabel(fund) },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/give/success?reference=${reference}`,
      cancel_url: `${siteUrl}/give/cancel?reference=${reference}`,
      metadata: { reference, fund },
    });

    await db
      .update(donations)
      .set({ stripeSessionId: session.id, updatedAt: new Date() })
      .where(eq(donations.reference, reference));

    return NextResponse.json({ url: session.url });
  } catch (error) {
    await db
      .update(donations)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(donations.reference, reference));

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to start checkout." },
      { status: 500 }
    );
  }
}
