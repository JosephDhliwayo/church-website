import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations } from "@/lib/schema";
import { decryptPesepayPayload } from "@/lib/pesepay";

const FAILED_STATUSES = new Set([
  "CANCELLED",
  "FAILED",
  "DECLINED",
  "AUTHORIZATION_FAILED",
  "TIMED_OUT",
]);

export async function POST(request: NextRequest) {
  let body: { payload?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.payload) {
    return NextResponse.json({ error: "Missing payload." }, { status: 400 });
  }

  let result: {
    merchantReference?: string;
    referenceNumber?: string;
    transactionStatus?: string;
  };
  try {
    result = decryptPesepayPayload(body.payload) as typeof result;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { merchantReference, referenceNumber, transactionStatus } = result;

  if (!merchantReference && !referenceNumber) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  const status =
    transactionStatus === "SUCCESS"
      ? "paid"
      : transactionStatus && FAILED_STATUSES.has(transactionStatus)
        ? "failed"
        : "pending";

  await db
    .update(donations)
    .set({
      status,
      pesepayReference: referenceNumber ? String(referenceNumber) : undefined,
      updatedAt: new Date(),
    })
    .where(
      merchantReference
        ? eq(donations.reference, merchantReference)
        : eq(donations.pesepayReference, referenceNumber!)
    );

  return new NextResponse("OK", { status: 200 });
}
