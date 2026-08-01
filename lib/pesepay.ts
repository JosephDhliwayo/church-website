import { createDecipheriv } from "crypto";
import { Pesepay } from "pesepay";
import { getSiteUrl } from "./site";

function getEncryptionKey() {
  const encryptionKey = process.env.PESEPAY_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error("PESEPAY_ENCRYPTION_KEY is not set in your environment.");
  }
  return encryptionKey;
}

export function getPesepayClient(returnUrl: string) {
  const integrationKey = process.env.PESEPAY_INTEGRATION_KEY;
  const encryptionKey = process.env.PESEPAY_ENCRYPTION_KEY;

  if (!integrationKey || !encryptionKey) {
    throw new Error(
      "Pesepay is not configured. Set PESEPAY_INTEGRATION_KEY and PESEPAY_ENCRYPTION_KEY in your environment."
    );
  }

  const pesepay = new Pesepay(integrationKey, encryptionKey);
  pesepay.resultUrl = `${getSiteUrl()}/api/payments/pesepay/webhook`;
  pesepay.returnUrl = returnUrl;
  return pesepay;
}

// Pesepay's resultUrl webhook POSTs `{ payload }`, AES-256-CBC-encrypted the
// same way as its poll responses. The SDK only exposes decryption for the
// URLs it fetches itself (pollTransaction/checkPayment), so webhook payloads
// need this to be decrypted here using the same scheme.
export function decryptPesepayPayload(payload: string): unknown {
  const encryptionKey = getEncryptionKey();
  const key = Buffer.from(encryptionKey, "utf8");
  const iv = Buffer.from(encryptionKey.slice(0, 16), "utf8");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = decipher.update(payload, "base64", "utf8") + decipher.final("utf8");
  return JSON.parse(decrypted);
}
