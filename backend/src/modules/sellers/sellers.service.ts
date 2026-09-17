import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface RegisterSellerDto {
  userId: string;
  sellerType: string;
  displayName: string;
  legalName?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  bio?: string;
  country: string;
  stateProvince?: string;
  city: string;
  address?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  yearsExperience?: number;
  yearEstablished?: number;
  languages?: string[];
  categoriesSold?: string[];
  businessProfile?: any;
  brokerProfile?: any;
  auctionHouseProfile?: any;
}

@Injectable()
export class SellersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockSellers = [
    {
      id: 'seller-001',
      user_id: 'user-auth-current',
      seller_type: 'DEALER',
      display_name: 'Monaco Private Heritage Salons',
      legal_name: 'Monaco Heritage Salons S.A.M.',
      profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      cover_photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
      bio: 'Established in Monte-Carlo in 1984. Curating museum-grade horology and historic automotive machinery for international connoisseurs.',
      country: 'Monaco',
      city: 'Monte-Carlo',
      email: 'curator@monacoheritage.mc',
      phone: '+377 98 06 20 00',
      whatsapp: '+377 98 06 20 01',
      website: 'https://monacoheritage.mc',
      years_experience: 42,
      year_established: 1984,
      languages: ['English', 'French', 'Italian'],
      categories_sold: ['Luxury Watches', 'Luxury & Exotic Cars'],
      verification_status: 'VERIFIED',
      verification_level: 'LEVEL_3',
      reputation_score: 4.98,
      is_active: true,
      business_profiles: [
        {
          legal_name: 'Monaco Heritage Salons S.A.M.',
          registration_country: 'Monaco',
          business_address: 'Place du Casino, 98000 Monaco',
          brands_represented: ['Patek Philippe', 'Rolex', 'Ferrari'],
        },
      ],
    },
    {
      id: '00000000-0000-0000-0000-000000000001',
      user_id: 'user-00000000-0000-0000-0000-000000000001',
      seller_type: 'YACHT_BROKER',
      display_name: 'Oceanic Yachts & Marine',
      legal_name: 'Oceanic International Yachting SARL',
      profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      cover_photo: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
      bio: 'Leading Mediterranean yacht brokerage specializing in sailing catamarans, superyachts, and turnkey marina berths from Cannes to Saint-Tropez.',
      country: 'France',
      city: 'Cannes',
      email: 'charter@oceanicyachts.fr',
      phone: '+33 4 93 39 12 34',
      whatsapp: '+33 6 12 34 56 78',
      website: 'https://oceanicyachts.fr',
      years_experience: 26,
      year_established: 1998,
      languages: ['English', 'French'],
      categories_sold: ['Yachts & Marine'],
      verification_status: 'VERIFIED',
      verification_level: 'LEVEL_3',
      reputation_score: 4.97,
      is_active: true,
      broker_profiles: [
        {
          agency_name: 'Oceanic International Yachting',
          specialization: 'Yachts & Marine Broker',
          has_owner_representation_authorization: true,
          authorization_ref: 'MYBA-2026-FR-09',
        },
      ],
    },
  ];

  async findAll() {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('seller_profiles_v2')
        .select(`
          id, user_id, seller_type, display_name, legal_name, profile_photo, cover_photo,
          bio, country, state_province, city, email, phone, whatsapp, website,
          years_experience, year_established, languages, categories_sold,
          verification_status, verification_level, reputation_score, is_active, created_at,
          business_profiles ( legal_name, trading_name, business_type, registration_country, business_address, brands_represented ),
          broker_profiles ( agency_name, specialization, years_experience, has_owner_representation_authorization, authorization_ref ),
          auction_house_profiles ( legal_entity_name, license_number, buyer_premium_percentage )
        `)
        .eq('is_active', true);

      if (error || !data || data.length === 0) {
        return this.mockSellers;
      }
      return data;
    } catch {
      return this.mockSellers;
    }
  }

  async findById(id: string) {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('seller_profiles_v2')
        .select(`
          id, user_id, seller_type, display_name, legal_name, profile_photo, cover_photo,
          bio, country, state_province, city, email, phone, whatsapp, website,
          years_experience, year_established, languages, categories_sold,
          verification_status, verification_level, reputation_score, is_active, created_at,
          business_profiles ( legal_name, trading_name, business_type, registration_country, business_address, brands_represented ),
          broker_profiles ( agency_name, specialization, years_experience, has_owner_representation_authorization, authorization_ref ),
          auction_house_profiles ( legal_entity_name, license_number, buyer_premium_percentage )
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        const found = this.mockSellers.find((s) => s.id === id);
        if (found) return found;
        return this.mockSellers[0];
      }
      return data;
    } catch {
      const found = this.mockSellers.find((s) => s.id === id);
      return found || this.mockSellers[0];
    }
  }

  async register(dto: RegisterSellerDto) {
    const newProfile = {
      id: `seller-${Date.now()}`,
      user_id: dto.userId || 'user-current',
      seller_type: dto.sellerType,
      display_name: dto.displayName,
      legal_name: dto.legalName,
      profile_photo: dto.profilePhoto,
      cover_photo: dto.coverPhoto,
      bio: dto.bio,
      country: dto.country,
      state_province: dto.stateProvince,
      city: dto.city,
      email: dto.email,
      phone: dto.phone,
      whatsapp: dto.whatsapp,
      website: dto.website,
      years_experience: dto.yearsExperience || 0,
      year_established: dto.yearEstablished,
      languages: dto.languages || ['English'],
      categories_sold: dto.categoriesSold || [],
      verification_status: 'PENDING',
      verification_level: 'LEVEL_1',
      reputation_score: 5.0,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('seller_profiles_v2')
        .insert({
          seller_type: dto.sellerType,
          display_name: dto.displayName,
          legal_name: dto.legalName,
          profile_photo: dto.profilePhoto,
          cover_photo: dto.coverPhoto,
          bio: dto.bio,
          country: dto.country,
          state_province: dto.stateProvince,
          city: dto.city,
          email: dto.email,
          phone: dto.phone,
          whatsapp: dto.whatsapp,
          website: dto.website,
          years_experience: dto.yearsExperience || 0,
          year_established: dto.yearEstablished,
          languages: dto.languages || ['English'],
          categories_sold: dto.categoriesSold || [],
          verification_status: 'PENDING',
          verification_level: 'LEVEL_1',
        })
        .select()
        .single();

      if (error || !data) {
        this.mockSellers.push(newProfile as any);
        return newProfile;
      }
      return data;
    } catch {
      this.mockSellers.push(newProfile as any);
      return newProfile;
    }
  }

  async updateVerification(sellerId: string, status: string, level: string) {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('seller_profiles_v2')
        .update({
          verification_status: status,
          verification_level: level,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sellerId)
        .select()
        .single();

      if (error || !data) {
        const found = this.mockSellers.find((s) => s.id === sellerId);
        if (found) {
          found.verification_status = status;
          found.verification_level = level;
          return found;
        }
      }
      return data;
    } catch {
      const found = this.mockSellers.find((s) => s.id === sellerId);
      if (found) {
        found.verification_status = status;
        found.verification_level = level;
      }
      return found;
    }
  }
}
