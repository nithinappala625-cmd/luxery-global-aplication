import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { RazorpayProvider } from './providers/razorpay.provider';
import { PayPalProvider } from './providers/paypal.provider';
import { PaymentProvider } from './interfaces/payment-provider.interface';
import { CreatePaymentDto, SupportedProvider, PaymentPurpose } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly providers: Map<string, PaymentProvider> = new Map();

  constructor(
    private readonly razorpayProvider: RazorpayProvider,
    private readonly paypalProvider: PayPalProvider,
    private readonly supabaseService: SupabaseService,
  ) {
    this.providers.set(SupportedProvider.RAZORPAY, this.razorpayProvider);
    this.providers.set(SupportedProvider.PAYPAL, this.paypalProvider);
  }

  private getProvider(providerName: SupportedProvider): PaymentProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new BadRequestException(`Unsupported payment provider: ${providerName}`);
    }
    return provider;
  }

  async createPaymentOrder(userId: string, dto: CreatePaymentDto) {
    const provider = this.getProvider(dto.provider);

    const orderResult = await provider.createPayment({
      amount: dto.amount,
      currency: dto.currency,
      receipt: `${dto.purpose}_${dto.targetId || Date.now()}`,
      notes: {
        userId,
        purpose: dto.purpose,
        targetId: dto.targetId || '',
      },
    });

    // Save record to Supabase payments table
    try {
      const client = this.supabaseService.getClient();
      await client.from('payments').insert({
        user_id: userId,
        amount: dto.amount,
        currency: dto.currency,
        provider: dto.provider,
        provider_order_id: orderResult.orderId,
        status: 'created',
        purpose: dto.purpose,
        metadata: {
          targetId: dto.targetId,
          ...dto.metadata,
        },
      });
    } catch (err: any) {
      this.logger.warn(`Failed to persist payment order in Supabase: ${err.message}`);
    }

    return orderResult;
  }

  async verifyPayment(dto: VerifyPaymentDto) {
    const provider = this.getProvider(dto.provider);

    const result = await provider.verifyPayment({
      orderId: dto.orderId,
      paymentId: dto.paymentId,
      signature: dto.signature,
      rawPayload: dto.rawPayload,
    });

    // Update payment record in Supabase
    try {
      const client = this.supabaseService.getClient();
      await client
        .from('payments')
        .update({
          provider_payment_id: dto.paymentId,
          provider_signature: dto.signature,
          status: result.isVerified ? 'captured' : 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('provider_order_id', dto.orderId);

      // Record in audit ledger
      await client.from('payment_transactions').insert({
        raw_response: result.rawResponse,
        status: result.status,
      });
    } catch (err: any) {
      this.logger.warn(`Failed to record payment transaction in Supabase: ${err.message}`);
    }

    return result;
  }
}
