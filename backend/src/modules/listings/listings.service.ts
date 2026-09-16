import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from '../supabase/supabase.service';
import { FilterListingsDto, ListingSort } from './dto/filter-listings.dto';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  private readonly logger = new Logger(ListingsService.name);

  // In-memory sample dataset matching DB seed for immediate offline/hybrid capability
  private mockListings: any[] = [
    {
      id: 'l1000000-0000-0000-0000-000000000001',
      seller_id: '00000000-0000-0000-0000-000000000001',
      category_id: 'c1000000-0000-0000-0000-000000000004',
      category_name: 'Yachts & Marine',
      title: 'Bali 4.0 Lounge Catamaran',
      slug: 'bali-4-0-lounge-2017-cannes',
      description: 'Exceptional 2017 Bali 4.0 Catamaran presented in impeccable turnkey condition in Cannes.',
      price: 260000.0,
      currency: 'EUR',
      year: 2017,
      condition: 'Pristine / Turnkey Marina Ready',
      status: 'verified',
      is_featured: true,
      view_count: 1420,
      contact_unlock_fee: 150.0,
      location: { city: 'Cannes', country: 'France', country_code: 'FR' },
      images: [
        { id: 'img-1', original_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop', is_cover: true },
        { id: 'img-2', original_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop', is_cover: false },
      ],
      specifications: [
        { spec_key: 'Length Overall', spec_value: '11.93 m (39 ft 2 in)', spec_group: 'Dimensions' },
        { spec_key: 'Beam', spec_value: '6.72 m', spec_group: 'Dimensions' },
        { spec_key: 'Engines', spec_value: '2x Yanmar 40 HP Diesel', spec_group: 'Mechanical' },
      ],
      seller: {
        id: '00000000-0000-0000-0000-000000000001',
        business_name: 'Monaco & Cannes Yacht Salons',
        seller_type: 'boutique_dealer',
        location_city: 'Cannes',
        location_country: 'France',
        reputation_score: 4.97,
        is_verified: true,
      },
      created_at: new Date('2026-02-10').toISOString(),
    },
    {
      id: 'l1000000-0000-0000-0000-000000000002',
      seller_id: '00000000-0000-0000-0000-000000000001',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      category_name: 'Luxury Watches',
      title: 'Patek Philippe 5270P Perpetual Calendar Chronograph',
      slug: 'patek-philippe-5270p-salmon-dial-geneva',
      description: 'Reference 5270P in 950 Platinum housing the in-house manual-wind Caliber CH 29-535 PS Q.',
      price: 195000.0,
      currency: 'USD',
      year: 2022,
      condition: 'Unworn / Double Sealed with Papers',
      status: 'verified',
      is_featured: true,
      view_count: 3190,
      contact_unlock_fee: 200.0,
      location: { city: 'Geneva', country: 'Switzerland', country_code: 'CH' },
      images: [
        { id: 'img-3', original_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop', is_cover: true },
      ],
      specifications: [
        { spec_key: 'Case Metal', spec_value: '950 Platinum', spec_group: 'Case' },
        { spec_key: 'Dial Color', spec_value: 'Golden Opaline Salmon', spec_group: 'Dial' },
      ],
      seller: {
        id: '00000000-0000-0000-0000-000000000001',
        business_name: 'Maison Horlogère Genève',
        seller_type: 'authorized_dealer',
        location_city: 'Geneva',
        location_country: 'Switzerland',
        reputation_score: 5.0,
        is_verified: true,
      },
      created_at: new Date('2026-03-01').toISOString(),
    },
    {
      id: 'l1000000-0000-0000-0000-000000000003',
      seller_id: '00000000-0000-0000-0000-000000000001',
      category_id: 'c1000000-0000-0000-0000-000000000003',
      category_name: 'Luxury & Exotic Cars',
      title: 'Ferrari SF90 Stradale Assetto Fiorano',
      slug: 'ferrari-sf90-assetto-fiorano-dubai',
      description: 'Factory Assetto Fiorano lightweight package in historic Grigio Ferro with Giallo livery.',
      price: 620000.0,
      currency: 'USD',
      year: 2023,
      condition: 'Collector Grade / Mint',
      status: 'verified',
      is_featured: true,
      view_count: 2870,
      contact_unlock_fee: 250.0,
      location: { city: 'Dubai', country: 'United Arab Emirates', country_code: 'AE' },
      images: [
        { id: 'img-4', original_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', is_cover: true },
      ],
      specifications: [
        { spec_key: 'Power Output', spec_value: '1,000 cv (986 bhp)', spec_group: 'Performance' },
        { spec_key: 'Mileage', spec_value: '890 km', spec_group: 'General' },
      ],
      seller: {
        id: '00000000-0000-0000-0000-000000000001',
        business_name: 'Emirates Private Vault & Supercars',
        seller_type: 'boutique_dealer',
        location_city: 'Dubai',
        location_country: 'UAE',
        reputation_score: 4.95,
        is_verified: true,
      },
      created_at: new Date('2026-02-28').toISOString(),
    },
    {
      id: 'l1000000-0000-0000-0000-000000000004',
      seller_id: '00000000-0000-0000-0000-000000000001',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      category_name: 'Fine Jewellery & Diamonds',
      title: 'Graff 10.50ct Fancy Vivid Yellow Diamond Solitaire',
      slug: 'graff-10ct-vivid-yellow-diamond-london',
      description: 'A monument of gemstone rarity: A 10.50-carat radiant-cut Fancy Vivid Yellow diamond certified GIA VS1.',
      price: 850000.0,
      currency: 'GBP',
      year: 2021,
      condition: 'Mint / Original Graff Presentation Box',
      status: 'verified',
      is_featured: true,
      view_count: 1980,
      contact_unlock_fee: 300.0,
      location: { city: 'London', country: 'United Kingdom', country_code: 'GB' },
      images: [
        { id: 'img-5', original_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop', is_cover: true },
      ],
      specifications: [
        { spec_key: 'Center Stone Weight', spec_value: '10.50 Carats', spec_group: 'Gemology' },
        { spec_key: 'Color Grade', spec_value: 'Fancy Vivid Yellow', spec_group: 'Gemology' },
      ],
      seller: {
        id: '00000000-0000-0000-0000-000000000001',
        business_name: 'Mayfair High Jewellery Vaults',
        seller_type: 'authorized_dealer',
        location_city: 'London',
        location_country: 'UK',
        reputation_score: 4.99,
        is_verified: true,
      },
      created_at: new Date('2026-03-05').toISOString(),
    },
  ];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findFiltered(dto: FilterListingsDto) {
    try {
      const client = this.supabaseService.getClient();
      let query = client
        .from('listings')
        .select(`
          *,
          categories(name, slug),
          brands(name, slug),
          listing_locations(*),
          listing_images(*)
        `)
        .eq('status', 'verified');

      if (dto.categoryId) query = query.eq('category_id', dto.categoryId);
      if (dto.currency) query = query.eq('currency', dto.currency);
      if (dto.minPrice) query = query.gte('price', dto.minPrice);
      if (dto.maxPrice) query = query.lte('price', dto.maxPrice);

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return {
          items: data,
          meta: { total: data.length, page: dto.page || 1, limit: dto.limit || 20 },
        };
      }
    } catch {}

    // In-memory fallback
    let items = [...this.mockListings];

    if (dto.q) {
      const q = dto.q.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.city.toLowerCase().includes(q) ||
          i.location.country.toLowerCase().includes(q),
      );
    }

    if (dto.categoryId) {
      items = items.filter((i) => i.category_id === dto.categoryId);
    }

    if (dto.currency) {
      items = items.filter((i) => i.currency === dto.currency);
    }

    if (dto.minPrice) {
      items = items.filter((i) => i.price >= dto.minPrice!);
    }

    if (dto.maxPrice) {
      items = items.filter((i) => i.price <= dto.maxPrice!);
    }

    if (dto.sort === ListingSort.PRICE_ASC) {
      items.sort((a, b) => a.price - b.price);
    } else if (dto.sort === ListingSort.PRICE_DESC) {
      items.sort((a, b) => b.price - a.price);
    }

    return {
      items,
      meta: {
        total: items.length,
        page: dto.page || 1,
        limit: dto.limit || 20,
      },
    };
  }

  async findById(id: string) {
    const item = this.mockListings.find((l) => l.id === id);
    if (!item) {
      throw new NotFoundException(`Asset not found with ID: ${id}`);
    }
    item.view_count += 1;
    return item;
  }

  async createListing(sellerId: string, dto: CreateListingDto) {
    const newId = uuidv4();
    const newListing = {
      id: newId,
      seller_id: sellerId,
      category_id: dto.categoryId,
      subcategoryId: dto.subcategoryId,
      brand_id: dto.brandId,
      title: dto.title,
      slug: `listing-${Date.now()}`,
      description: dto.description,
      price: dto.price,
      currency: dto.currency,
      year: dto.year,
      condition: dto.condition,
      status: 'pending_review', // CRITICAL: Never automatically verified
      is_featured: false,
      view_count: 0,
      contact_unlock_fee: dto.contactUnlockFee || 150.0,
      location: {
        city: dto.city,
        country: dto.country,
      },
      images: dto.images?.map((img, index) => ({
        id: uuidv4(),
        original_url: img.originalUrl,
        is_cover: index === 0,
      })) || [],
      specifications: dto.specifications?.map((spec) => ({
        spec_key: spec.key,
        spec_value: spec.value,
        spec_group: spec.group || 'General',
      })) || [],
      created_at: new Date().toISOString(),
    };

    this.mockListings.unshift(newListing);
    return newListing;
  }

  async updateStatus(id: string, status: 'verified' | 'rejected' | 'sold' | 'draft' | 'archived') {
    const item = await this.findById(id);
    item.status = status;
    return item;
  }
}
