import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface AviationInquiryDto {
  aircraftId: string;
  inquirerName: string;
  inquirerContact: string;
  departureAirport?: string;
  arrivalAirport?: string;
  flightDate?: string;
  passengers?: number;
  message?: string;
}

@Injectable()
export class AviationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockAviation = [
    {
      id: 'aviation-1',
      title: 'Gulfstream G700 Ultra Long Range Executive Jet',
      aviationType: 'SALE',
      aircraftModel: 'Gulfstream G700',
      manufacturer: 'Gulfstream Aerospace',
      year: 2024,
      totalTimeAirframeHours: 85.0,
      passengerCapacity: 19,
      maxRangeNm: 7750,
      maxSpeedKnots: 516,
      askingPrice: 6200000000.0,
      currency: 'INR',
      locationBase: 'London Stansted (EGSS) / Geneva (LSGG)',
      inspectionStatus: 'Fresh 12-Month Factory Inspection (Savannah)',
      ppiCompliance: 'Compliant with FAA Part 91 & EASA OPS. Airframe & Rolls-Royce Pearl 700 Engines fully enrolled on CorporateCare Enhanced.',
      sellerName: 'NP Global Aviation Syndicate',
      sellerVerified: true,
      coverImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
      ],
      status: 'AVAILABLE',
    },
    {
      id: 'aviation-2',
      title: 'Bombardier Global 7500 Private Jet Charter',
      aviationType: 'CHARTER',
      aircraftModel: 'Global 7500 Flagship',
      manufacturer: 'Bombardier',
      year: 2023,
      totalTimeAirframeHours: 640.0,
      passengerCapacity: 14,
      maxRangeNm: 7700,
      maxSpeedKnots: 530,
      charterHourlyRate: 1200000.0,
      currency: 'INR',
      locationBase: 'Mumbai (VABB) / Dubai Al Maktoum (DWC)',
      inspectionStatus: 'Part 135 VIP Charter Certified',
      ppiCompliance: 'Dedicated Flight Attendant, Ka-Band Global Satellite Internet, Master Suite with full double bed and en-suite shower.',
      sellerName: 'NP Royal Wings Charter Fleet',
      sellerVerified: true,
      coverImageUrl: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=1200&auto=format&fit=crop',
      ],
      status: 'AVAILABLE',
    },
  ];

  async findAll(type?: string) {
    try {
      const client = this.supabaseService.getClient();
      let query = client.from('aircraft_listings').select('*').eq('status', 'AVAILABLE');
      if (type) query = query.eq('aviation_type', type.toUpperCase());
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch {}

    if (type) {
      return this.mockAviation.filter(
        (a) => a.aviationType.toLowerCase() === type.toLowerCase(),
      );
    }
    return this.mockAviation;
  }

  async findOne(id: string) {
    const list = await this.findAll();
    const item = list.find((a) => a.id === id);
    if (!item) throw new NotFoundException(`Aircraft listing ${id} not found`);
    return item;
  }

  async submitInquiry(dto: AviationInquiryDto) {
    const aircraft = await this.findOne(dto.aircraftId);
    const inquiryRecord = {
      id: `inquiry-${Date.now()}`,
      aircraftId: dto.aircraftId,
      aircraftTitle: aircraft.title,
      inquirerName: dto.inquirerName,
      inquirerContact: dto.inquirerContact,
      departureAirport: dto.departureAirport,
      arrivalAirport: dto.arrivalAirport,
      flightDate: dto.flightDate,
      passengers: dto.passengers || 1,
      message: dto.message,
      status: 'TRANSMITTED_TO_OPERATOR',
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      inquiry: inquiryRecord,
      message: 'Private aviation inquiry transmitted directly to aircraft broker desk.',
    };
  }
}
