enum ChauffeurOption {
  selfDriveOnly('SELF_DRIVE', 'Self-Drive Only'),
  chauffeurOnly('CHAUFFEUR', 'Chauffeur Driven Only'),
  bothAvailable('BOTH', 'Self-Drive or Chauffeur');

  final String code;
  final String label;
  const ChauffeurOption(this.code, this.label);
}

class RentalVehicle {
  final String id;
  final String listingId;
  final String sellerId;
  final String brand;
  final String model;
  final int year;
  final String transmission;
  final int seats;
  final String powerHp;
  final String locationCity;
  final String locationCountry;
  final double hourlyRate;
  final double dailyRate;
  final double weeklyRate;
  final double weekendRate;
  final double securityDeposit;
  final String currency;
  final int freeKmPerDay;
  final double extraKmRate;
  final ChauffeurOption chauffeurOption;
  final bool deliveryAvailable;
  final double deliveryFee;
  final List<String> images;
  final String coverImageUrl;
  final List<String> rentalRequirements;
  final String insuranceCoverage;
  final bool isAvailableNow;

  const RentalVehicle({
    required this.id,
    required this.listingId,
    required this.sellerId,
    required this.brand,
    required this.model,
    required this.year,
    required this.transmission,
    required this.seats,
    required this.powerHp,
    required this.locationCity,
    required this.locationCountry,
    required this.hourlyRate,
    required this.dailyRate,
    required this.weeklyRate,
    required this.weekendRate,
    required this.securityDeposit,
    this.currency = 'INR',
    this.freeKmPerDay = 150,
    this.extraKmRate = 250.0,
    this.chauffeurOption = ChauffeurOption.bothAvailable,
    this.deliveryAvailable = true,
    this.deliveryFee = 0.0,
    this.images = const [],
    required this.coverImageUrl,
    this.rentalRequirements = const [
      'Valid Driving License (Min 25 Yrs)',
      'Security Deposit Hold',
      'Passport / Government ID Verification'
    ],
    this.insuranceCoverage = 'Full Comprehensive Luxury Fleet Coverage (₹0 Deductible with Super CDW)',
    this.isAvailableNow = true,
  });

  String get title => '$year $brand $model';
  String get formattedLocation => '$locationCity, $locationCountry';
}

class RentalBooking {
  final String id;
  final String vehicleId;
  final String userId;
  final DateTime startDateTime;
  final DateTime endDateTime;
  final String pickupLocation;
  final String returnLocation;
  final bool withChauffeur;
  final double totalRentalAmount;
  final double securityDeposit;
  final String currency;
  final String status; // 'pending', 'confirmed', 'active', 'completed', 'cancelled'
  final DateTime createdAt;

  const RentalBooking({
    required this.id,
    required this.vehicleId,
    required this.userId,
    required this.startDateTime,
    required this.endDateTime,
    required this.pickupLocation,
    required this.returnLocation,
    required this.withChauffeur,
    required this.totalRentalAmount,
    required this.securityDeposit,
    required this.currency,
    required this.status,
    required this.createdAt,
  });
}
