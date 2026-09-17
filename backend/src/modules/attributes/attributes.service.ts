import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface CreateAttributeDto {
  categoryId: string;
  name: string;
  slug: string;
  label: string;
  description?: string;
  dataType: string;
  unit?: string;
  required?: boolean;
  filterable?: boolean;
  options?: string[];
}

@Injectable()
export class AttributesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockAttributes = [
    // 1. WATCHES
    {
      id: 'def-w-1',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      name: 'Reference Number',
      slug: 'reference_number',
      label: 'Reference Number',
      data_type: 'TEXT',
      required: true,
      display_order: 1,
      options: [],
      is_active: true,
    },
    {
      id: 'def-w-2',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      name: 'Case Material',
      slug: 'case_material',
      label: 'Case Material',
      data_type: 'SELECT',
      required: true,
      display_order: 2,
      options: ['Platinum 950', '18K White Gold', '18K Rose Gold', '18K Yellow Gold', 'Stainless Steel', 'Titanium Grade 5', 'Ceramic', 'Carbon Composite'],
      is_active: true,
    },
    {
      id: 'def-w-3',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      name: 'Movement',
      slug: 'movement_type',
      label: 'Movement Type',
      data_type: 'SELECT',
      required: true,
      display_order: 3,
      options: ['Manual-winding Mechanical', 'Self-winding Automatic', 'Quartz', 'Tourbillon', 'Minute Repeater'],
      is_active: true,
    },
    {
      id: 'def-w-4',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      name: 'Case Diameter',
      slug: 'case_diameter_mm',
      label: 'Case Diameter',
      data_type: 'DECIMAL',
      unit: 'mm',
      required: true,
      display_order: 4,
      options: [],
      is_active: true,
    },
    {
      id: 'def-w-5',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      name: 'Complications',
      slug: 'complications',
      label: 'Horological Complications',
      data_type: 'MULTI_SELECT',
      required: false,
      display_order: 5,
      options: ['Tourbillon', 'Perpetual Calendar', 'Chronograph', 'Split-Seconds', 'Minute Repeater', 'Moonphase', 'GMT / World Time', 'Flyback'],
      is_active: true,
    },
    // 2. JEWELLERY & DIAMONDS
    {
      id: 'def-j-1',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      name: 'Gemstone Type',
      slug: 'gemstone_type',
      label: 'Primary Gemstone',
      data_type: 'SELECT',
      required: true,
      display_order: 1,
      options: ['Natural Diamond', 'Fancy Colored Diamond', 'Burma Ruby', 'Kashmir Sapphire', 'Colombian Emerald', 'Paraiba Tourmaline', 'Natural Pearl'],
      is_active: true,
    },
    {
      id: 'def-j-2',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      name: 'Total Carat Weight',
      slug: 'total_carat_weight',
      label: 'Total Carat Weight (TCW)',
      data_type: 'DECIMAL',
      unit: 'carats',
      required: true,
      display_order: 2,
      options: [],
      is_active: true,
    },
    {
      id: 'def-j-3',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      name: 'Color Grade',
      slug: 'diamond_color',
      label: 'Color Grade',
      data_type: 'SELECT',
      required: true,
      display_order: 3,
      options: ['D (Colorless)', 'E (Colorless)', 'F (Colorless)', 'G (Near Colorless)', 'H (Near Colorless)', 'Fancy Vivid Yellow', 'Fancy Vivid Pink', 'Fancy Vivid Blue'],
      is_active: true,
    },
    {
      id: 'def-j-4',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      name: 'Clarity Grade',
      slug: 'diamond_clarity',
      label: 'Clarity Grade',
      data_type: 'SELECT',
      required: true,
      display_order: 4,
      options: ['FL (Flawless)', 'IF (Internally Flawless)', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1'],
      is_active: true,
    },
    {
      id: 'def-j-5',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      name: 'Gemological Certificate',
      slug: 'certification_lab',
      label: 'Gemological Certification',
      data_type: 'SELECT',
      required: true,
      display_order: 5,
      options: ['GIA (Gemological Institute of America)', 'IGI', 'HRD Antwerp', 'SSEF Swiss Gemmological Institute', 'Gübelin Gem Lab'],
      is_active: true,
    },
    // 3. CARS
    {
      id: 'def-c-1',
      category_id: 'c1000000-0000-0000-0000-000000000003',
      name: 'Chassis / VIN',
      slug: 'vin_chassis',
      label: 'Chassis Number (Encrypted)',
      data_type: 'TEXT',
      required: true,
      display_order: 1,
      options: [],
      is_active: true,
    },
    {
      id: 'def-c-2',
      category_id: 'c1000000-0000-0000-0000-000000000003',
      name: 'Engine Powertrain',
      slug: 'engine_type',
      label: 'Powertrain Configuration',
      data_type: 'SELECT',
      required: true,
      display_order: 2,
      options: ['Naturally Aspirated V12', 'Twin-Turbo V8', 'Quad-Turbo W16', 'V10 High-Revving', 'Full Electric Tri-Motor', 'Hybrid Hypercar'],
      is_active: true,
    },
    {
      id: 'def-c-3',
      category_id: 'c1000000-0000-0000-0000-000000000003',
      name: 'Mileage Odometer',
      slug: 'mileage_km',
      label: 'Recorded Odometer',
      data_type: 'NUMBER',
      unit: 'km',
      required: true,
      display_order: 3,
      options: [],
      is_active: true,
    },
    // 4. YACHTS
    {
      id: 'def-y-1',
      category_id: 'c1000000-0000-0000-0000-000000000004',
      name: 'Length Overall',
      slug: 'length_overall_meters',
      label: 'Length Overall (LOA)',
      data_type: 'DECIMAL',
      unit: 'meters',
      required: true,
      display_order: 1,
      options: [],
      is_active: true,
    },
    {
      id: 'def-y-2',
      category_id: 'c1000000-0000-0000-0000-000000000004',
      name: 'Hull Material',
      slug: 'hull_material',
      label: 'Hull Construction',
      data_type: 'SELECT',
      required: true,
      display_order: 2,
      options: ['GRP / Fiberglass', 'Steel & Aluminum Superstructure', 'Full Carbon Composite', 'Wood / Cold-Molded Mahogany'],
      is_active: true,
    },
    {
      id: 'def-y-3',
      category_id: 'c1000000-0000-0000-0000-000000000004',
      name: 'VAT Compliance',
      slug: 'vat_status',
      label: 'VAT Status',
      data_type: 'SELECT',
      required: true,
      display_order: 3,
      options: ['VAT Paid', 'VAT Not Paid', 'Commercial Exemption', 'Export Scheme Eligible'],
      is_active: true,
    },
  ];

  async findByCategory(categoryId: string) {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('attribute_definitions')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return this.mockAttributes.filter((a) => a.category_id === categoryId);
      }
      return data;
    } catch {
      return this.mockAttributes.filter((a) => a.category_id === categoryId);
    }
  }

  async create(dto: CreateAttributeDto) {
    const newDef = {
      id: `def-${Date.now()}`,
      category_id: dto.categoryId,
      name: dto.name,
      slug: dto.slug,
      label: dto.label,
      description: dto.description,
      data_type: dto.dataType,
      unit: dto.unit,
      is_required: dto.required || false,
      is_filterable: dto.filterable || false,
      options: dto.options || [],
      display_order: this.mockAttributes.filter((a) => a.category_id === dto.categoryId).length + 1,
      is_active: true,
    };

    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('attribute_definitions')
        .insert(newDef)
        .select()
        .single();

      if (error || !data) {
        this.mockAttributes.push(newDef as any);
        return newDef;
      }
      return data;
    } catch {
      this.mockAttributes.push(newDef as any);
      return newDef;
    }
  }

  async delete(id: string) {
    try {
      const client = this.supabaseService.getClient();
      await client.from('attribute_definitions').update({ is_active: false }).eq('id', id);
      this.mockAttributes = this.mockAttributes.filter((a) => a.id !== id);
      return { success: true, id };
    } catch {
      this.mockAttributes = this.mockAttributes.filter((a) => a.id !== id);
      return { success: true, id };
    }
  }
}
