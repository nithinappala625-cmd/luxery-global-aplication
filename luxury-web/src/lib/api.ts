import { supabase } from './supabase';
import { ALL_CATEGORIES, FEATURED_LISTINGS, LIVE_AUCTIONS, MEMBERSHIP_PLANS } from './constants';
import { LuxuryCategory, LuxuryListing, LuxuryAuction, MembershipPlan } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export async function getCategories(): Promise<LuxuryCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return ALL_CATEGORIES.map(cat => {
          const remote = json.data.find((c: any) => c.slug === cat.slug);
          return remote ? { ...cat, ...remote } : cat;
        });
      }
    }
  } catch {}

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, subcategories(*)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return ALL_CATEGORIES.map(cat => {
        const remote = data.find((c: any) => c.slug === cat.slug);
        return remote ? { ...cat, ...remote } : cat;
      });
    }
  } catch {}

  return ALL_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<LuxuryCategory | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getListings(params?: {
  categoryId?: string;
  categorySlug?: string;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<LuxuryListing[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const res = await fetch(`${API_BASE}/listings?${searchParams.toString()}`, { next: { revalidate: 30 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {}

  try {
    let query = supabase
      .from('listings')
      .select('*, categories(name, slug), listing_locations(*), listing_images(*), listing_specifications(*)')
      .eq('status', 'verified');

    if (params?.categoryId) {
      query = query.eq('category_id', params.categoryId);
    }
    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as LuxuryListing[];
    }
  } catch {}

  let list = [...FEATURED_LISTINGS];
  if (params?.categorySlug) {
    list = list.filter(item => {
      const cat = ALL_CATEGORIES.find(c => c.slug === params.categorySlug);
      return cat ? item.category_id === cat.id : true;
    });
  }
  if (params?.limit) {
    list = list.slice(0, params.limit);
  }
  return list;
}

export async function getListingById(id: string): Promise<LuxuryListing | null> {
  try {
    const res = await fetch(`${API_BASE}/listings/${id}`, { next: { revalidate: 30 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {}

  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*, categories(name, slug), listing_locations(*), listing_images(*), listing_specifications(*)')
      .eq('id', id)
      .single();

    if (!error && data) return data as LuxuryListing;
  } catch {}

  return FEATURED_LISTINGS.find(l => l.id === id) || null;
}

export async function getAuctions(): Promise<LuxuryAuction[]> {
  try {
    const res = await fetch(`${API_BASE}/auctions`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch {}

  return LIVE_AUCTIONS;
}

export async function getMembershipPlans(): Promise<MembershipPlan[]> {
  try {
    const res = await fetch(`${API_BASE}/memberships/plans`, { next: { revalidate: 300 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch {}

  return MEMBERSHIP_PLANS;
}
