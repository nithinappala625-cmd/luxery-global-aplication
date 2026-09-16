class AuctionHouse {
  final String id;
  final String name;
  final String slug;
  final String? logoUrl;
  final String city;
  final String country;
  final String? description;
  final String websiteUrl;
  final bool isVerified;

  const AuctionHouse({
    required this.id,
    required this.name,
    required this.slug,
    this.logoUrl,
    required this.city,
    required this.country,
    this.description,
    required this.websiteUrl,
    this.isVerified = true,
  });

  factory AuctionHouse.fromJson(Map<String, dynamic> json) {
    return AuctionHouse(
      id: json['id'] as String,
      name: json['name'] as String,
      slug: json['slug'] as String,
      logoUrl: json['logo_url'] ?? json['logoUrl'],
      city: json['city'] as String? ?? 'London',
      country: json['country'] as String? ?? 'UK',
      description: json['description'] as String?,
      websiteUrl: json['website_url'] ?? json['websiteUrl'] ?? 'https://sothebys.com',
      isVerified: json['is_verified'] ?? json['isVerified'] ?? true,
    );
  }
}

class LuxuryAuction {
  final String id;
  final String auctionHouseId;
  final String? auctionHouseName;
  final String? auctionHouseLogo;
  final String title;
  final String slug;
  final String description;
  final String coverImageUrl;
  final String? bannerImageUrl;
  final String location;
  final DateTime startDate;
  final DateTime endDate;
  final String status; // 'upcoming', 'live', 'ended'
  final int totalLots;
  final String currency;
  final String externalBiddingUrl;

  const LuxuryAuction({
    required this.id,
    required this.auctionHouseId,
    this.auctionHouseName,
    this.auctionHouseLogo,
    required this.title,
    required this.slug,
    required this.description,
    required this.coverImageUrl,
    this.bannerImageUrl,
    required this.location,
    required this.startDate,
    required this.endDate,
    required this.status,
    required this.totalLots,
    required this.currency,
    required this.externalBiddingUrl,
  });

  bool get isLive => status == 'live';

  factory LuxuryAuction.fromJson(Map<String, dynamic> json) {
    return LuxuryAuction(
      id: json['id'] as String,
      auctionHouseId: json['auction_house_id'] ?? json['auctionHouseId'] ?? '',
      auctionHouseName: json['auction_house_name'] ?? json['auctionHouseName'] ?? 'Sotheby\'s',
      auctionHouseLogo: json['auction_house_logo'] ?? json['auctionHouseLogo'],
      title: json['title'] as String,
      slug: json['slug'] as String? ?? '',
      description: json['description'] as String? ?? '',
      coverImageUrl: json['cover_image_url'] ?? json['coverImageUrl'] ?? '',
      bannerImageUrl: json['banner_image_url'] ?? json['bannerImageUrl'],
      location: json['location'] as String? ?? 'Geneva',
      startDate: json['start_date'] != null ? DateTime.parse(json['start_date']) : DateTime.now(),
      endDate: json['end_date'] != null ? DateTime.parse(json['end_date']) : DateTime.now().add(const Duration(days: 2)),
      status: json['status'] as String? ?? 'upcoming',
      totalLots: json['total_lots'] ?? json['totalLots'] ?? 0,
      currency: json['currency'] as String? ?? 'USD',
      externalBiddingUrl: json['external_bidding_url'] ?? json['externalBiddingUrl'] ?? 'https://sothebys.com',
    );
  }
}
