export interface CreatePaymentOptions {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  provider: 'razorpay' | 'paypal';
  clientPayload: any; // Returned to mobile app for checkout sheet/SDK initialization
}

export interface VerifyPaymentOptions {
  orderId: string;
  paymentId: string;
  signature?: string;
  rawPayload?: any;
}

export interface VerifyPaymentResult {
  isVerified: boolean;
  orderId: string;
  paymentId: string;
  status: 'captured' | 'failed' | 'authorized';
  rawResponse: any;
}

export interface RefundOptions {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface PaymentProvider {
  readonly providerName: 'razorpay' | 'paypal';

  createPayment(options: CreatePaymentOptions): Promise<PaymentOrderResult>;
  verifyPayment(options: VerifyPaymentOptions): Promise<VerifyPaymentResult>;
  refundPayment(options: RefundOptions): Promise<{ refundId: string; status: string }>;
  getPaymentStatus(paymentId: string): Promise<string>;
}
