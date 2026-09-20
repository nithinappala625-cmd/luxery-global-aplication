import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface SubscribeMembershipDto {
  userId: string;
  planSlug: 'access' | 'prive' | 'black';
  billingCycle: 'monthly' | 'annual';
}

@Injectable()
export class MembershipsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private plans = [
    {
      slug: 'access',
      name: 'NP ACCESS',
      badge: 'SELECT COLLECTOR',
      priceMonthly: 15000.0,
      priceAnnual: 150000.0,
      currency: 'INR',
      contactUnlockCredits: 3,
      perks: [
        '3 Verified Custodian Contact Unlocks per month',
        'Direct Messaging with Certified Dealers',
        'Early 2-hour Access to Live Timed Auctions',
        'Standard Concierge Support',
      ],
      isMostPopular: false,
    },
    {
      slug: 'prive',
      name: 'NP PRIVÉ',
      badge: 'CURATED PATRON',
      priceMonthly: 45000.0,
      priceAnnual: 450000.0,
      currency: 'INR',
      contactUnlockCredits: 10,
      perks: [
        '10 Verified Custodian Contact Unlocks per month',
        'Confidential Private Deal Room Access',
        'Dedicated Acquisition Concierge via WhatsApp/Signal',
        'Priority Verification for Consigned Assets',
        'Complimentary Provenance & Title Verification Reports',
      ],
      isMostPopular: true,
    },
    {
      slug: 'black',
      name: 'NP BLACK',
      badge: 'BY INVITATION ONLY',
      priceMonthly: 125000.0,
      priceAnnual: 1200000.0,
      currency: 'INR',
      contactUnlockCredits: 999, // Unlimited
      perks: [
        'Unlimited Verified Custodian Contact Unlocks',
        'Physical Escrow & Vault Inspection Logistics',
        'Zero Buyer Commission on Off-Market Sourcing',
        'Bespoke Aviation Charter & Marine Berth Bookings',
        'Exclusive Invitation to Monaco & Geneva Private Salons',
      ],
      isMostPopular: false,
    },
  ];

  async getPlans() {
    return this.plans;
  }

  async subscribe(dto: SubscribeMembershipDto) {
    const plan = this.plans.find((p) => p.slug === dto.planSlug);
    if (!plan) throw new Error('Invalid plan slug');

    const subscription = {
      id: `sub-${Date.now()}`,
      userId: dto.userId,
      planSlug: dto.planSlug,
      planName: plan.name,
      billingCycle: dto.billingCycle,
      amount: dto.billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly,
      currency: plan.currency,
      creditsGranted: plan.contactUnlockCredits,
      status: 'ACTIVE',
      activatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      subscription,
      message: `Enrolled successfully into ${plan.name}. Privileges and contact unlock credits credited.`,
    };
  }
}
