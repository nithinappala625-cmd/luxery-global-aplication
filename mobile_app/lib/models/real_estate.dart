class LuxuryRealEstate {
  final String id;
  final String title;
  final String estateType; // 'Private Island', 'Super Penthouse', 'Royal Palace', 'Historic Chateau', 'Waterfront Villa'
  final String city;
  final String country;
  final double priceInr;
  final String priceDisplay;
  final double plotAreaSqFt;
  final double builtUpAreaSqFt;
  final int bedrooms;
  final int bathrooms;
  final bool hasHelipad;
  final bool hasPrivateMarina;
  final bool hasArmoredSecurityVault;
  final bool sovereignFreehold;
  final List<String> mediaUrls;
  final List<String> highlights;
  final String description;
  final String architecturalStyle;
  final String sellerId;
  final String sellerName;
  final bool verifiedListing;

  const LuxuryRealEstate({
    required this.id,
    required this.title,
    required this.estateType,
    required this.city,
    required this.country,
    required this.priceInr,
    required this.priceDisplay,
    required this.plotAreaSqFt,
    required this.builtUpAreaSqFt,
    required this.bedrooms,
    required this.bathrooms,
    required this.hasHelipad,
    required this.hasPrivateMarina,
    required this.hasArmoredSecurityVault,
    required this.sovereignFreehold,
    required this.mediaUrls,
    required this.highlights,
    required this.description,
    required this.architecturalStyle,
    required this.sellerId,
    required this.sellerName,
    this.verifiedListing = true,
  });

  String get location => '$city, $country';
}
