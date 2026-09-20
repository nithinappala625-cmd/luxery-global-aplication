enum SellerType {
  individual('INDIVIDUAL_SELLER', 'Individual Seller'),
  verifiedSeller('VERIFIED_SELLER', 'Verified Private Collector'),
  dealer('DEALER', 'Independent Luxury Dealer'),
  luxuryDealer('LUXURY_DEALER', 'High Luxury Salon Dealer'),
  jewelleryDealer('JEWELLERY_DEALER', 'High Joaillerie & Diamond Dealer'),
  watchDealer('WATCH_DEALER', 'Haute Horlogerie Dealer'),
  automotiveDealer('AUTOMOTIVE_DEALER', 'Exotic & Supercar Dealer'),
  aircraftBroker('AIRCRAFT_BROKER', 'Accredited Aircraft Broker'),
  yachtBroker('YACHT_BROKER', 'Yacht & Superyacht Broker'),
  rentalOperator('RENTAL_OPERATOR', 'NP Luxe Drive Rental Fleet Operator'),
  corporateSeller('CORPORATE_SELLER', 'Corporate / Strategic Asset Enterprise'),
  auctionHouse('AUCTION_HOUSE', 'Accredited Auction House');

  final String code;
  final String label;
  const SellerType(this.code, this.label);

  // Backward-compatibility aliases
  static const SellerType carDealer = SellerType.automotiveDealer;
  static const SellerType broker = SellerType.aircraftBroker;

  static SellerType fromCode(String code) {
    return SellerType.values.firstWhere(
      (e) => e.code == code || e.name.toLowerCase() == code.toLowerCase(),
      orElse: () => SellerType.individual,
    );
  }
}

enum VerificationStatus {
  unverified('UNVERIFIED', 'Unverified'),
  pending('PENDING', 'Under 24-Hour Review'),
  verified('VERIFIED', 'Verified Seller'),
  rejected('REJECTED', 'Changes Required'),
  suspended('SUSPENDED', 'Suspended');

  final String code;
  final String label;
  const VerificationStatus(this.code, this.label);

  static VerificationStatus fromCode(String code) {
    return VerificationStatus.values.firstWhere(
      (e) => e.code == code || e.name.toLowerCase() == code.toLowerCase(),
      orElse: () => VerificationStatus.unverified,
    );
  }
}

enum VerificationLevel {
  unverified('UNVERIFIED', 'Tier 0 - Unverified'),
  identityVerified('IDENTITY_VERIFIED', 'Tier 1 - Identity Verified'),
  businessVerified('BUSINESS_VERIFIED', 'Tier 2 - Business Verified'),
  dealerVerified('DEALER_VERIFIED', 'Tier 3 - Accredited Dealer'),
  premiumSeller('PREMIUM_SELLER', 'Tier 4 - Premium Partner'),
  foundingSeller('FOUNDING_SELLER', 'Tier 5 - Founding Seller');

  // Backward-compatibility aliases
  static const VerificationLevel level0 = VerificationLevel.unverified;
  static const VerificationLevel level1 = VerificationLevel.identityVerified;
  static const VerificationLevel level2 = VerificationLevel.businessVerified;
  static const VerificationLevel level3 = VerificationLevel.dealerVerified;

  final String code;
  final String label;
  const VerificationLevel(this.code, this.label);

  static VerificationLevel fromCode(String code) {
    return VerificationLevel.values.firstWhere(
      (e) => e.code == code || e.name.toLowerCase() == code.toLowerCase(),
      orElse: () => VerificationLevel.unverified,
    );
  }
}

class SellerProfile {
  final String id;
  final String userId;
  final SellerType sellerType;
  final String displayName;
  final String? legalName;
  final String? profilePhoto;
  final String? coverPhoto;
  final String? bio;
  final String country;
  final String? stateProvince;
  final String city;
  final String? address;
  final String email;
  final String? phone;
  final String? whatsapp;
  final String? website;
  final int yearsExperience;
  final int? yearEstablished;
  final String preferredContactMethod;
  final List<String> languages;
  final List<String> categoriesSold;
  final VerificationStatus verificationStatus;
  final VerificationLevel verificationLevel;
  final bool isActive;
  final double reputationScore;
  final int activeListingsCount;
  final int activeAuctionsCount;
  final int rentalFleetCount;
  final BusinessProfile? businessProfile;
  final BrokerProfile? brokerProfile;
  final AuctionHouseProfile? auctionHouseProfile;
  final DateTime createdAt;

  const SellerProfile({
    required this.id,
    required this.userId,
    required this.sellerType,
    required this.displayName,
    this.legalName,
    this.profilePhoto,
    this.coverPhoto,
    this.bio,
    required this.country,
    this.stateProvince,
    required this.city,
    this.address,
    required this.email,
    this.phone,
    this.whatsapp,
    this.website,
    this.yearsExperience = 0,
    this.yearEstablished,
    this.preferredContactMethod = 'IN_APP',
    this.languages = const ['English'],
    this.categoriesSold = const [],
    this.verificationStatus = VerificationStatus.pending,
    this.verificationLevel = VerificationLevel.unverified,
    this.isActive = true,
    this.reputationScore = 5.00,
    this.activeListingsCount = 0,
    this.activeAuctionsCount = 0,
    this.rentalFleetCount = 0,
    this.businessProfile,
    this.brokerProfile,
    this.auctionHouseProfile,
    required this.createdAt,
  });

  bool get isVerified => verificationStatus == VerificationStatus.verified;
  bool get isFoundingSeller => verificationLevel == VerificationLevel.foundingSeller;
  String get locationString => '$city, $country';

  SellerProfile copyWith({
    String? displayName,
    String? legalName,
    String? profilePhoto,
    String? coverPhoto,
    String? bio,
    String? country,
    String? city,
    String? email,
    String? phone,
    String? whatsapp,
    String? website,
    int? yearsExperience,
    VerificationStatus? verificationStatus,
    VerificationLevel? verificationLevel,
    int? activeListingsCount,
    int? activeAuctionsCount,
    int? rentalFleetCount,
  }) {
    return SellerProfile(
      id: id,
      userId: userId,
      sellerType: sellerType,
      displayName: displayName ?? this.displayName,
      legalName: legalName ?? this.legalName,
      profilePhoto: profilePhoto ?? this.profilePhoto,
      coverPhoto: coverPhoto ?? this.coverPhoto,
      bio: bio ?? this.bio,
      country: country ?? this.country,
      stateProvince: stateProvince,
      city: city ?? this.city,
      address: address,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      whatsapp: whatsapp ?? this.whatsapp,
      website: website ?? this.website,
      yearsExperience: yearsExperience ?? this.yearsExperience,
      yearEstablished: yearEstablished,
      preferredContactMethod: preferredContactMethod,
      languages: languages,
      categoriesSold: categoriesSold,
      verificationStatus: verificationStatus ?? this.verificationStatus,
      verificationLevel: verificationLevel ?? this.verificationLevel,
      isActive: isActive,
      reputationScore: reputationScore,
      activeListingsCount: activeListingsCount ?? this.activeListingsCount,
      activeAuctionsCount: activeAuctionsCount ?? this.activeAuctionsCount,
      rentalFleetCount: rentalFleetCount ?? this.rentalFleetCount,
      businessProfile: businessProfile,
      brokerProfile: brokerProfile,
      auctionHouseProfile: auctionHouseProfile,
      createdAt: createdAt,
    );
  }
}

class BusinessProfile {
  final String id;
  final String sellerId;
  final String legalName;
  final String? tradingName;
  final String businessType;
  final String registrationCountry;
  final String? registrationNumber;
  final String? taxNumber;
  final String? website;
  final String? businessEmail;
  final String? businessPhone;
  final String? businessAddress;
  final int? yearEstablished;
  final String? numberOfEmployees;
  final String? description;
  final List<String> brandsRepresented;

  const BusinessProfile({
    required this.id,
    required this.sellerId,
    required this.legalName,
    this.tradingName,
    required this.businessType,
    required this.registrationCountry,
    this.registrationNumber,
    this.taxNumber,
    this.website,
    this.businessEmail,
    this.businessPhone,
    this.businessAddress,
    this.yearEstablished,
    this.numberOfEmployees,
    this.description,
    this.brandsRepresented = const [],
  });
}

class BrokerProfile {
  final String id;
  final String sellerId;
  final String? agencyName;
  final String specialization;
  final int yearsExperience;
  final bool hasOwnerRepresentationAuthorization;
  final String? authorizationRef;
  final String? authorizationDocUrl;
  final DateTime? authorizationExpiresAt;
  final String? description;

  const BrokerProfile({
    required this.id,
    required this.sellerId,
    this.agencyName,
    required this.specialization,
    this.yearsExperience = 0,
    this.hasOwnerRepresentationAuthorization = false,
    this.authorizationRef,
    this.authorizationDocUrl,
    this.authorizationExpiresAt,
    this.description,
  });
}

class AuctionHouseProfile {
  final String id;
  final String sellerId;
  final String legalName;
  final String displayName;
  final String registrationCountry;
  final String? licenseNumber;
  final double buyerPremiumPercentage;
  final String? businessAddress;
  final String? website;
  final String? upcomingAuctionInfo;
  final List<String> specializations;
  final String? description;

  const AuctionHouseProfile({
    required this.id,
    required this.sellerId,
    required this.legalName,
    required this.displayName,
    this.registrationCountry = 'Monaco',
    this.licenseNumber,
    this.buyerPremiumPercentage = 15.0,
    this.businessAddress,
    this.website,
    this.upcomingAuctionInfo,
    this.specializations = const [],
    this.description,
  });
}

class SellerVerificationRecord {
  final String id;
  final String sellerId;
  final String verificationType;
  final String status;
  final String? documentId;
  final String? reviewNotes;
  final DateTime submittedAt;
  final DateTime? reviewedAt;

  const SellerVerificationRecord({
    required this.id,
    required this.sellerId,
    required this.verificationType,
    required this.status,
    this.documentId,
    this.reviewNotes,
    required this.submittedAt,
    this.reviewedAt,
  });
}
