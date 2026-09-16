import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { RazorpayProvider } from './providers/razorpay.provider';
import { PayPalProvider } from './providers/paypal.provider';
import { SupabaseService } from '../supabase/supabase.service';
import { SupportedProvider, PaymentPurpose } from './dto/create-payment.dto';

describe('PaymentsService Abstraction Layer', () => {
  let service: PaymentsService;
  let razorpayProvider: RazorpayProvider;
  let paypalProvider: PayPalProvider;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'payments.razorpay.keyId':
          return 'rzp_test_key';
        case 'payments.razorpay.keySecret':
          return 'rzp_test_secret';
        case 'payments.paypal.clientId':
          return 'paypal_client';
        case 'payments.paypal.clientSecret':
          return 'paypal_secret';
        case 'payments.paypal.mode':
          return 'sandbox';
        default:
          return null;
      }
    }),
  };

  const mockSupabaseService = {
    getClient: jest.fn(() => ({
      from: jest.fn(() => ({
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
      })),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        RazorpayProvider,
        PayPalProvider,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: SupabaseService, useValue: mockSupabaseService },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    razorpayProvider = module.get<RazorpayProvider>(RazorpayProvider);
    paypalProvider = module.get<PayPalProvider>(PayPalProvider);
  });

  it('should be defined with both providers registered', () => {
    expect(service).toBeDefined();
    expect(razorpayProvider).toBeDefined();
    expect(paypalProvider).toBeDefined();
  });

  it('should create Razorpay payment order for Contact Unlock', async () => {
    const res = await service.createPaymentOrder('user-123', {
      amount: 150.0,
      currency: 'EUR',
      provider: SupportedProvider.RAZORPAY,
      purpose: PaymentPurpose.CONTACT_UNLOCK,
      targetId: 'listing-456',
    });

    expect(res).toBeDefined();
    expect(res.provider).toEqual('razorpay');
    expect(res.amount).toEqual(150.0);
    expect(res.currency).toEqual('EUR');
    expect(res.orderId).toContain('order_rzp_');
    expect(res.clientPayload.key).toEqual('rzp_test_key');
  });

  it('should create PayPal payment order for Contact Unlock', async () => {
    const res = await service.createPaymentOrder('user-123', {
      amount: 250.0,
      currency: 'USD',
      provider: SupportedProvider.PAYPAL,
      purpose: PaymentPurpose.CONTACT_UNLOCK,
      targetId: 'listing-789',
    });

    expect(res).toBeDefined();
    expect(res.provider).toEqual('paypal');
    expect(res.amount).toEqual(250.0);
    expect(res.currency).toEqual('USD');
    expect(res.orderId).toContain('PAYPAL-ORD-');
    expect(res.clientPayload.intent).toEqual('CAPTURE');
  });

  it('should verify payment signature via provider', async () => {
    const verifyRes = await service.verifyPayment({
      provider: SupportedProvider.RAZORPAY,
      orderId: 'order_rzp_test_123',
      paymentId: 'pay_test_456',
      signature: 'mock_signature',
    });

    expect(verifyRes).toBeDefined();
    expect(verifyRes.isVerified).toBe(true);
    expect(verifyRes.status).toEqual('captured');
  });
});
