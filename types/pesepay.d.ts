declare module "pesepay" {
  export class Transaction {
    resultUrl?: string;
    returnUrl?: string;
    merchantReference?: string;
    transactionType: string;
    reasonForPayment: string;
    constructor(
      amount: number,
      currencyCode: string,
      reasonForPayment: string,
      merchantReference?: string
    );
  }

  export class Payment {
    resultUrl?: string;
    returnUrl?: string;
    reasonForPayment?: string;
  }

  export class PesepayResponse {
    success: boolean;
    message?: string;
    referenceNumber?: string;
    pollUrl?: string;
    redirectUrl?: string;
    paid: boolean;
  }

  export class Pesepay {
    resultUrl?: string;
    returnUrl?: string;
    constructor(integrationKey: string, encryptionKey: string);
    initiateTransaction(transaction: Transaction): Promise<PesepayResponse>;
    checkPayment(referenceNumber: string): Promise<PesepayResponse>;
    pollTransaction(pollUrl: string): Promise<PesepayResponse>;
    makeSeamlessPayment(
      payment: Payment,
      reasonForPayment: string,
      amount: number,
      requiredFields?: Record<string, string>
    ): Promise<PesepayResponse>;
    createPayment(
      currencyCode: string,
      paymentMethodCode: string,
      email?: string,
      phone?: string,
      name?: string
    ): Payment;
    createTransaction(
      amount: number,
      currencyCode: string,
      paymentReason: string,
      merchantReference?: string
    ): Transaction;
  }
}
