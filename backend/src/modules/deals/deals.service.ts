import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface SubmitOfferDto {
  dealId: string;
  senderId: string;
  amount: number;
  currency: string;
  terms: string;
}

export interface SendDealMessageDto {
  dealId: string;
  senderId: string;
  message: string;
  attachmentUrl?: string;
}

@Injectable()
export class DealsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockDeals = [
    {
      id: 'deal-101',
      listingId: 'l1000000-0000-0000-0000-000000000012',
      listingTitle: 'Rolls-Royce Phantom VIII Extended Wheelbase Maharaja Edition',
      askingPrice: 118000000.0,
      currentOffer: 112000000.0,
      currency: 'INR',
      status: 'NEGOTIATING',
      buyerId: 'user-vip-1',
      buyerName: 'Private Family Office (London)',
      sellerId: '00000000-0000-0000-0000-000000000001',
      sellerName: 'NP Curated Motors & Automobili',
      escrowRequiredAmount: 11200000.0, // 10% escrow
      isEscrowFunded: false,
      documents: [
        {
          id: 'doc-1',
          title: 'Full Chassis & Service Provenance (PDF)',
          fileUrl: 'https://pub-473db82f62034523b2052c8f064f7142.r2.dev/chassis_inspection.pdf',
          isVerified: true,
        },
        {
          id: 'doc-2',
          title: 'Official Rolls-Royce Bespoke Certificate of Authenticity',
          fileUrl: 'https://pub-473db82f62034523b2052c8f064f7142.r2.dev/bespoke_certificate.pdf',
          isVerified: true,
        },
      ],
      messages: [
        {
          id: 'msg-1',
          senderName: 'Private Family Office (London)',
          text: 'We are prepared to close at ₹11.20 Cr inclusive of all export documentation.',
          timestamp: '2026-03-18T10:30:00Z',
        },
        {
          id: 'msg-2',
          senderName: 'NP Curated Motors & Automobili',
          text: 'Counter-offer under review. Ready to facilitate physical inspection in Geneva or Mumbai terminal.',
          timestamp: '2026-03-18T11:45:00Z',
        },
      ],
    },
  ];

  async getDealRoom(dealId: string) {
    const deal = this.mockDeals.find((d) => d.id === dealId);
    if (!deal) {
      // return default mock deal with that ID
      return {
        ...this.mockDeals[0],
        id: dealId,
      };
    }
    return deal;
  }

  async submitOffer(dto: SubmitOfferDto) {
    const deal = await this.getDealRoom(dto.dealId);
    deal.currentOffer = dto.amount;
    deal.status = 'COUNTER_OFFER_SUBMITTED';

    deal.messages.push({
      id: `msg-${Date.now()}`,
      senderName: dto.senderId,
      text: `Formal Offer of ${dto.currency} ${dto.amount.toLocaleString()} submitted. Terms: ${dto.terms}`,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      deal,
      message: 'Formal binding offer logged in Deal Room with escrow notice.',
    };
  }

  async sendMessage(dto: SendDealMessageDto) {
    const deal = await this.getDealRoom(dto.dealId);
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: dto.senderId,
      text: dto.message,
      timestamp: new Date().toISOString(),
    };
    deal.messages.push(newMsg);

    return {
      success: true,
      message: newMsg,
    };
  }
}
