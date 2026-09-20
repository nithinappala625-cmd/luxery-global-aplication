enum AviationType {
  sale('AIRCRAFT_SALE', 'Aircraft For Sale'),
  charter('AIRCRAFT_CHARTER', 'Private Charter Route');

  final String code;
  final String label;
  const AviationType(this.code, this.label);
}

class AircraftListing {
  final String id;
  final String listingId;
  final AviationType aviationType;
  final String manufacturer;
  final String model;
  final int year;
  final String tailNumber; // Registration
  final int totalAirframeHours;
  final int flightCycles;
  final int engineHours;
  final String engineModel;
  final int passengerCapacity;
  final int maxRangeNm;
  final String interiorConfig;
  final String avionicsSuite;
  final String maintenanceProgram;
  final String hangarLocation;
  final String departureCity;
  final String? destinationCity;
  final double priceOrHourlyRate;
  final String currency;
  final String brokerName;
  final bool isBrokerVerified;
  final List<String> images;
  final String coverImageUrl;
  final String complianceDisclaimer;

  const AircraftListing({
    required this.id,
    required this.listingId,
    required this.aviationType,
    required this.manufacturer,
    required this.model,
    required this.year,
    required this.tailNumber,
    required this.totalAirframeHours,
    required this.flightCycles,
    required this.engineHours,
    required this.engineModel,
    required this.passengerCapacity,
    required this.maxRangeNm,
    required this.interiorConfig,
    required this.avionicsSuite,
    required this.maintenanceProgram,
    required this.hangarLocation,
    required this.departureCity,
    this.destinationCity,
    required this.priceOrHourlyRate,
    this.currency = 'USD',
    required this.brokerName,
    this.isBrokerVerified = true,
    this.images = const [],
    required this.coverImageUrl,
    this.complianceDisclaimer =
        'DISCLAIMER: Aircraft specifications, maintenance records, and operational airworthiness are subject to formal pre-purchase inspection (PPI) and civil aviation authority compliance. NP GROUPS acts solely as transaction platform.',
  });

  String get title => '$year $manufacturer $model';
  bool get isSale => aviationType == AviationType.sale;
  bool get isCharter => aviationType == AviationType.charter;
}
