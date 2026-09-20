class BuyerRequest {
  final String id;
  final String userId;
  final String clientMaskedName; // e.g. "VIP Client #902"
  final String categorySlug;
  final String categoryName;
  final String assetDesired;
  final String? preferredBrand;
  final double budgetMax;
  final String currency;
  final String targetLocation;
  final String timeline; // 'Immediate', 'Within 30 Days', 'Q3/Q4'
  final String specificRequirements;
  final DateTime createdAt;
  final int matchedPropositionsCount;

  const BuyerRequest({
    required this.id,
    required this.userId,
    required this.clientMaskedName,
    required this.categorySlug,
    required this.categoryName,
    required this.assetDesired,
    this.preferredBrand,
    required this.budgetMax,
    this.currency = 'INR',
    required this.targetLocation,
    required this.timeline,
    required this.specificRequirements,
    required this.createdAt,
    this.matchedPropositionsCount = 0,
  });
}
