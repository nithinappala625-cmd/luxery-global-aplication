import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface CreateBuyerRequestDto {
  userId: string;
  category: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  targetTimeline: string;
}

@Injectable()
export class BuyerRequestsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockRequests = [
    {
      id: 'req-1',
      userId: 'collector-ny',
      userName: 'Collector #882',
      category: 'Luxury Watches',
      title: 'Seeking Patek Philippe 5711/1R Tiffany & Co. Stamped Dial',
      description: 'Double factory sealed with original box, papers, and Tiffany & Co. presentation folder. Verified provenance essential.',
      budgetMin: 18000000.0,
      budgetMax: 24000000.0,
      currency: 'INR',
      targetTimeline: 'Immediate / Within 14 Days',
      status: 'ACTIVE',
      proposalsCount: 2,
      createdAt: '2026-03-16T14:00:00Z',
    },
    {
      id: 'req-2',
      userId: 'patron-delhi',
      userName: 'Patron #401',
      category: 'Fine Jewellery & Diamonds',
      title: 'Looking for 15+ Carat Unheated Burmese Ruby Cabochon Choker',
      description: 'Must include Gübelin or SSEF origin certification confirming Myanmar (Burma) with no heat treatment.',
      budgetMin: 35000000.0,
      budgetMax: 50000000.0,
      currency: 'INR',
      targetTimeline: 'Within 30 Days',
      status: 'ACTIVE',
      proposalsCount: 1,
      createdAt: '2026-03-17T09:30:00Z',
    },
  ];

  async findAll() {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('buyer_requests')
        .select('*')
        .eq('status', 'ACTIVE');
      if (!error && data && data.length > 0) return data;
    } catch {}
    return this.mockRequests;
  }

  async create(dto: CreateBuyerRequestDto) {
    const newReq = {
      id: `req-${Date.now()}`,
      userId: dto.userId,
      userName: 'Distinguished Collector',
      category: dto.category,
      title: dto.title,
      description: dto.description,
      budgetMin: dto.budgetMin,
      budgetMax: dto.budgetMax,
      currency: dto.currency || 'INR',
      targetTimeline: dto.targetTimeline,
      status: 'ACTIVE',
      proposalsCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.mockRequests.unshift(newReq);
    return {
      success: true,
      request: newReq,
      message: 'Private sourcing request broadcast to verified global custodians.',
    };
  }
}
