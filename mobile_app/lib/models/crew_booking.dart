class EliteCrewProfile {
  final String id;
  final String name;
  final String role; // 'Superyacht Captain', 'Private Jet Flight Captain', 'VIP Helicopter Pilot', 'Armed Close Protection Officer', 'Executive Royal Chauffeur'
  final String credentials; // 'Master 3000 GT Unlimited', 'Gulfstream G700 / Bombardier Global 7500 Type Rated', 'FAA/EASA Airline Transport Pilot', 'Ex-Special Air Service (SAS) Close Protection'
  final int experienceYears;
  final int totalHoursOrNauticalMiles;
  final List<String> languages;
  final double dayRateInr;
  final String dayRateDisplay;
  final double monthlyRetainerInr;
  final String monthlyRetainerDisplay;
  final String avatarUrl;
  final String bio;
  final bool verifiedBadge;
  final List<String> pastDeployments;
  final String securityClearance;

  const EliteCrewProfile({
    required this.id,
    required this.name,
    required this.role,
    required this.credentials,
    required this.experienceYears,
    required this.totalHoursOrNauticalMiles,
    required this.languages,
    required this.dayRateInr,
    required this.dayRateDisplay,
    required this.monthlyRetainerInr,
    required this.monthlyRetainerDisplay,
    required this.avatarUrl,
    required this.bio,
    this.verifiedBadge = true,
    required this.pastDeployments,
    required this.securityClearance,
  });
}

class CrewBookingRequest {
  final String id;
  final String crewId;
  final String clientName;
  final String clientContact;
  final String serviceType;
  final DateTime startDate;
  final DateTime endDate;
  final String operationalBase;
  final String specialInstructions;
  final double estimatedTotalInr;
  final String status; // 'Pending Curatorial Review', 'Contract Dispatched', 'Confirmed'

  const CrewBookingRequest({
    required this.id,
    required this.crewId,
    required this.clientName,
    required this.clientContact,
    required this.serviceType,
    required this.startDate,
    required this.endDate,
    required this.operationalBase,
    required this.specialInstructions,
    required this.estimatedTotalInr,
    this.status = 'Pending Curatorial Review',
  });
}
