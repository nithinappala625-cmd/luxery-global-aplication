import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from '../supabase/supabase.service';
import { PaymentsService } from '../payments/payments.service';
import { SupportedProvider, PaymentPurpose } from '../payments/dto/create-payment.dto';

@Injectable()
export class ContactUnlocksService {
  private readonly logger = new Logger(ContactUnlocksService.name);

  // In-memory unlocked contacts store
  private unlockRecords: Map<string, any> = new Map();

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async requestContactUnlock(buyerId: string, listingId: string, provider: SupportedProvider) {
    const key = `${buyerId}_${listingId}`;
    if (this.unlockRecords.has(key)) {
      return this.unlockRecords.get(key);
    }

    const unlockFee = 150.0;
    const currency = 'EUR';

    // 1. Create payment order via PaymentService
    const orderResult = await this.paymentsService.createPaymentOrder(buyerId, {
      amount: unlockFee,
      currency,
      provider,
      purpose: PaymentPurpose.CONTACT_UNLOCK,
      targetId: listingId,
    });

    const record = {
      id: uuidv4(),
      buyer_id: buyerId,
      listing_id: listingId,
      seller_id: '00000000-0000-0000-0000-000000000001',
      payment_id: orderResult.orderId,
      status: 'pending',
      created_at: new Date().toISOString(),
      order: orderResult,
    };

    this.unlockRecords.set(key, record);
    return record;
  }

  async confirmUnlockPayment(buyerId: string, listingId: string, paymentId: string) {
    const key = `${buyerId}_${listingId}`;
    let record = this.unlockRecords.get(key);

    if (!record) {
      record = {
        id: uuidv4(),
        buyer_id: buyerId,
        listing_id: listingId,
        seller_id: '00000000-0000-0000-0000-000000000001',
        payment_id: paymentId,
        created_at: new Date().toISOString(),
      };
    }

    record.status = 'paid';
    record.unlocked_contact_info = {
      custodian_name: 'Monaco Private Heritage Salons',
      authorized_officer: 'Lord Alexander Vance',
      direct_telephone: '+377 98 06 20 00',
      confidential_email: 'vance.private.office@monacosalons.mc',
      physical_jurisdiction: 'Monaco / Cannes',
    };

    this.unlockRecords.set(key, record);
    return record;
  }
}
