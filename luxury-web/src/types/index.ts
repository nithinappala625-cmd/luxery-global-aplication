export interface Subcategory {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  sort_order: number;
}

export interface LuxuryCategory {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  icon_name: string;
  banner_url?: string;
  sort_order: number;
  is_active: boolean;
  subcategories?: Subcategory[];
  asset_types?: string[];
  listing_types?: string[];
}

export interface ListingImage {
  id: string;
  listing_id?: string;
  r2_key?: string;
  original_url: string;
  optimized_url?: string;
  thumbnail_url?: string;
  is_cover: boolean;
}

export interface ListingLocation {
  city: string;
  state_province?: string;
  country: string;
  country_code: string;
  latitude?: number;
  longitude?: number;
}

export interface ListingSpecification {
  spec_key: string;
  spec_value: string;
  spec_group?: string;
}

export interface SellerProfile {
  id: string;
  business_name?: string;
  seller_type: 'private_collector' | 'boutique_dealer' | 'authorized_dealer' | 'broker' | 'auction_house';
  location_city?: string;
  location_country?: string;
  reputation_score: number;
  is_verified: boolean;
  avatar_url?: string;
}

export interface LuxuryListing {
  id: string;
  seller_id: string;
  category_id: string;
  category_name?: string;
  subcategory_id?: string;
  brand_id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  year?: number;
  condition: string;
  status: 'draft' | 'pending_review' | 'verified' | 'rejected' | 'sold' | 'archived';
  is_featured: boolean;
  view_count: number;
  contact_unlock_fee: number;
  location?: ListingLocation;
  images: ListingImage[];
  specifications: ListingSpecification[];
  seller?: SellerProfile;
  created_at: string;
}

export interface LuxuryAuction {
  id: string;
  title: string;
  slug: string;
  auction_house_id?: string;
  auction_house_name?: string;
  auction_house_logo?: string;
  category_name?: string;
  start_time: string;
  end_time: string;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  total_lots_count: number;
  banner_url: string;
  featured_lot_title: string;
  featured_lot_estimate: string;
  current_bid?: number;
  currency: string;
  location: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'platinum';
  tagline: string;
  price_annual: number;
  currency: string;
  features: string[];
  is_popular?: boolean;
}
