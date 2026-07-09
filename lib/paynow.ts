import { Paynow } from "paynow";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getPaynowClient(returnUrl: string) {
  const integrationId = process.env.PAYNOW_INTEGRATION_ID;
  const integrationKey = process.env.PAYNOW_INTEGRATION_KEY;

  if (!integrationId || !integrationKey) {
    throw new Error(
      "Paynow is not configured. Set PAYNOW_INTEGRATION_ID and PAYNOW_INTEGRATION_KEY in your environment."
    );
  }

  return new Paynow(
    integrationId,
    integrationKey,
    `${getSiteUrl()}/api/payments/paynow/webhook`,
    returnUrl
  );
}
