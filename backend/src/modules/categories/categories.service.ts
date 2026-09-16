import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Fallback in-memory categories matching DB seed
  private defaultCategories = [
    {
      id: 'c1000000-0000-0000-0000-000000000001',
      slug: 'watches',
      name: 'Luxury Watches',
      tagline: 'Horological masterpieces & haute horlogerie',
      icon_name: 'watch',
      banner_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      sort_order: 1,
      is_active: true,
    },
    {
      id: 'c1000000-0000-0000-0000-000000000002',
      slug: 'jewellery',
      name: 'Fine Jewellery & Diamonds',
      tagline: 'Exquisite gemstones & heritage pieces',
      icon_name: 'diamond',
      banner_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 'c1000000-0000-0000-0000-000000000003',
      slug: 'cars',
      name: 'Luxury & Exotic Cars',
      tagline: 'Rare collector automobiles & hypercars',
      icon_name: 'directions_car',
      banner_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      sort_order: 3,
      is_active: true,
    },
    {
      id: 'c1000000-0000-0000-0000-000000000004',
      slug: 'yachts',
      name: 'Yachts & Marine',
      tagline: 'Superyachts, catamarans & nautical prestige',
      icon_name: 'sailing',
      banner_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop',
      sort_order: 4,
      is_active: true,
    },
  ];

  async findAll() {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('categories')
        .select('*, subcategories(*)')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {}

    return this.defaultCategories;
  }

  async findBySlug(slug: string) {
    const all = await this.findAll();
    return all.find((c) => c.slug === slug);
  }
}
