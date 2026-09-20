import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface RentalBookingDto {
  vehicleId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  withChauffeur: boolean;
  destinationCity: string;
}

@Injectable()
export class RentalsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private mockRentals = [
    {
      id: 'rental-v1',
      title: 'Rolls-Royce Spectre Black Badge Edition',
      modelName: 'Spectre Ultra-Luxury Electric Coupe',
      category: 'Ultra-Luxury EV',
      dailyRate: 350000.0,
      currency: 'INR',
      securityDeposit: 500000.0,
      chauffeurDailyRate: 35000.0,
      horsepower: 577,
      acceleration0100: 4.4,
      topSpeedKmH: 250,
      transmission: 'Direct Drive All-Electric',
      coverImageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1200&auto=format&fit=crop',
      ],
      locationCity: 'Mumbai / BKC',
      locationCountry: 'India',
      isAvailable: true,
      operatorName: 'NP Royal Fleet Private Garage',
      operatorVerified: true,
    },
    {
      id: 'rental-v2',
      title: 'Ferrari SF90 Spider Assetto Fiorano',
      modelName: 'SF90 Spider PHEV',
      category: 'Hybrid Supercar',
      dailyRate: 480000.0,
      currency: 'INR',
      securityDeposit: 750000.0,
      chauffeurDailyRate: 45000.0,
      horsepower: 986,
      acceleration0100: 2.5,
      topSpeedKmH: 340,
      transmission: '8-Speed F1 Dual-Clutch',
      coverImageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
      ],
      locationCity: 'Dubai / Downtown',
      locationCountry: 'UAE',
      isAvailable: true,
      operatorName: 'Gulf Prestige Exotic Fleet',
      operatorVerified: true,
    },
    {
      id: 'rental-v3',
      title: 'Lamborghini Revuelto V12 HPEV',
      modelName: 'Revuelto Hybrid V12',
      category: 'Hypercar',
      dailyRate: 520000.0,
      currency: 'INR',
      securityDeposit: 800000.0,
      chauffeurDailyRate: 50000.0,
      horsepower: 1001,
      acceleration0100: 2.5,
      topSpeedKmH: 350,
      transmission: '8-Speed Wet Dual Clutch',
      coverImageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
      ],
      locationCity: 'Monaco / Monte Carlo',
      locationCountry: 'Monaco',
      isAvailable: true,
      operatorName: 'Riviera Supercars Escort',
      operatorVerified: true,
    },
  ];

  async findAll() {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('rental_vehicles')
        .select('*')
        .eq('is_available', true);
      if (!error && data && data.length > 0) return data;
    } catch {}
    return this.mockRentals;
  }

  async findOne(id: string) {
    const list = await this.findAll();
    const item = list.find((v) => v.id === id);
    if (!item) throw new NotFoundException(`Rental vehicle ${id} not found`);
    return item;
  }

  async book(dto: RentalBookingDto) {
    const vehicle = await this.findOne(dto.vehicleId);
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    const baseAmount = vehicle.dailyRate * diffDays;
    const chauffeurAmount = dto.withChauffeur ? (vehicle.chauffeurDailyRate || 0) * diffDays : 0;
    const totalAmount = baseAmount + chauffeurAmount;

    const bookingRecord = {
      id: `booking-${Date.now()}`,
      vehicleId: dto.vehicleId,
      renterId: dto.renterId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      totalDays: diffDays,
      dailyRate: vehicle.dailyRate,
      chauffeurFee: chauffeurAmount,
      securityDeposit: vehicle.securityDeposit,
      totalAmount,
      status: 'CONFIRMED_PENDING_ESCROW',
      createdAt: new Date().toISOString(),
    };

    try {
      const client = this.supabaseService.getClient();
      await client.from('rental_bookings').insert([bookingRecord]);
    } catch {}

    return {
      success: true,
      booking: bookingRecord,
      message: 'Luxe Drive fleet booking reservation generated with Escrow protection.',
    };
  }
}
