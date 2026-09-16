import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuctionsService {
  private mockAuctions = [
    {
      id: 'e1000000-0000-0000-0000-000000000001',
      auction_house_id: 'a1000000-0000-0000-0000-000000000001',
      auction_house_name: 'Sotheby\'s',
      title: 'Important Watches: Geneva Spring Sale',
      slug: 'geneva-spring-watches-2026',
      description: 'Featuring museum-grade Patek Philippe perpetual calendars and prototype Rolex Daytona chronographs.',
      cover_image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
      location: 'Hôtel Beau-Rivage, Geneva',
      start_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'upcoming',
      total_lots: 142,
      currency: 'CHF',
      external_bidding_url: 'https://www.sothebys.com/en/auctions/geneva-watches',
    },
    {
      id: 'e1000000-0000-0000-0000-000000000002',
      auction_house_id: 'a1000000-0000-0000-0000-000000000003',
      auction_house_name: 'RM Sotheby\'s',
      title: 'Villa d\'Este & Monaco Historic Concours',
      slug: 'monaco-historic-concours-2026',
      description: 'A curated assembly of the most historically significant GT and sports racing cars.',
      cover_image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      location: 'Monte Carlo Sporting, Monaco',
      start_date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      status: 'live',
      total_lots: 88,
      currency: 'EUR',
      external_bidding_url: 'https://rmsothebys.com/en/auctions/monaco',
    },
  ];

  private mockHouses = [
    {
      id: 'a1000000-0000-0000-0000-000000000001',
      name: 'Sotheby\'s',
      slug: 'sothebys',
      city: 'London',
      country: 'United Kingdom',
      website_url: 'https://www.sothebys.com',
      is_verified: true,
    },
    {
      id: 'a1000000-0000-0000-0000-000000000002',
      name: 'Christie\'s',
      slug: 'christies',
      city: 'Geneva',
      country: 'Switzerland',
      website_url: 'https://www.christies.com',
      is_verified: true,
    },
    {
      id: 'a1000000-0000-0000-0000-000000000003',
      name: 'RM Sotheby\'s',
      slug: 'rm-sothebys',
      city: 'Monaco',
      country: 'Monaco',
      website_url: 'https://rmsothebys.com',
      is_verified: true,
    },
  ];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAllAuctions(status?: string) {
    if (status) {
      return this.mockAuctions.filter((a) => a.status === status);
    }
    return this.mockAuctions;
  }

  async findAllAuctionHouses() {
    return this.mockHouses;
  }
}
