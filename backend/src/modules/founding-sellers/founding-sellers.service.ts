import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface ApplyFoundingSellerDto {
  businessName: string;
  sellerType: string;
  country: string;
  city: string;
  contactEmail: string;
  contactPhone: string;
  portfolioValueEstimate: string;
  yearsInOperation: number;
  inventorySummary: string;
}

@Injectable()
export class FoundingSellersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private campaign = {
    totalSlots: 50,
    filledSlots: 37,
    remainingSlots: 13,
    isActive: true,
    perks: [
      'Lifetime 0% Platform Commission on all listed assets',
      'Permanent "FOUNDING SELLER" Gold Curatorial Badge',
      'Top Priority Placement in Global Search & Category Carousels',
      'Complimentary Dedicated Account Concierge and Escrow Officer',
      'Direct Deal Room priority invitations for institutional buyers',
    ],
    recentlyAccepted: [
      { name: 'Kashmir Sapphire & Gem Syndicate', city: 'Srinagar / Jaipur', category: 'Fine Jewellery & Gemstones' },
      { name: 'Geneva Horological Archive', city: 'Geneva', category: 'Luxury Watches' },
      { name: 'Monaco Marine & Yachting Heritage', city: 'Monaco', category: 'Superyachts' },
      { name: 'Emirates Hypercar Vault', city: 'Dubai', category: 'Exotic Automobiles' },
    ],
  };

  async getCampaign() {
    return this.campaign;
  }

  async apply(dto: ApplyFoundingSellerDto) {
    const application = {
      id: `founding-app-${Date.now()}`,
      ...dto,
      status: 'PENDING_CURATORIAL_REVIEW',
      submittedAt: new Date().toISOString(),
      slotHoldNumber: this.campaign.filledSlots + 1,
    };

    return {
      success: true,
      application,
      message: 'Founding Seller application submitted. The NP Curatorial Board will complete the audit within 24 hours.',
    };
  }
}
