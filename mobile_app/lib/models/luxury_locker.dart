class LuxuryLocker {
  final String id;
  final String title;
  final String manufacturer; // 'Dottling', 'Stockinger', 'Buben & Zorweg', 'Brown Safe'
  final String vaultType; // 'Armored Free-Standing Safe', 'Walk-In Panic Room Vault', 'Swiss Bank-Grade Depository'
  final String securityRating; // 'VdS Class V / EN 1143-1', 'Ballistic Level 7', 'NATO Secret Grade'
  final String lockingMechanism; // 'Dual Biometric Fingerprint + 24K Gold Dial + Encrypted Retina'
  final double fireRatingHours;
  final String exteriorFinish;
  final int watchWindersCount;
  final double weightKg;
  final String dimensions;
  final double priceInr;
  final String priceDisplay;
  final List<String> mediaUrls;
  final List<String> specifications;
  final String description;
  final String sellerId;
  final String sellerName;
  final bool turnkeyInstallationIncluded;

  const LuxuryLocker({
    required this.id,
    required this.title,
    required this.manufacturer,
    required this.vaultType,
    required this.securityRating,
    required this.lockingMechanism,
    required this.fireRatingHours,
    required this.exteriorFinish,
    required this.watchWindersCount,
    required this.weightKg,
    required this.dimensions,
    required this.priceInr,
    required this.priceDisplay,
    required this.mediaUrls,
    required this.specifications,
    required this.description,
    required this.sellerId,
    required this.sellerName,
    this.turnkeyInstallationIncluded = true,
  });
}
