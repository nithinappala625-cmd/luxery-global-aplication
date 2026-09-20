enum AuctionStatus {
  draft('DRAFT', 'Draft'),
  pendingApproval('PENDING_APPROVAL', 'Pending Approval'),
  scheduled('SCHEDULED', 'Scheduled'),
  live('LIVE', 'Live Auction'),
  ended('ENDED', 'Auction Ended'),
  settled('SETTLED', 'Settled'),
  cancelled('CANCELLED', 'Cancelled');

  final String code;
  final String label;
  const AuctionStatus(this.code, this.label);
}

enum AuctionFormat {
  timed('TIMED', 'Timed Online'),
  live('LIVE', 'Live Curated Floor'),
  reserve('RESERVE', 'Reserve Auction'),
  noReserve('NO_RESERVE', 'No-Reserve'),
  private('PRIVATE', 'Private Invitation Only');

  final String code;
  final String label;
  const AuctionFormat(this.code, this.label);
}

class AuctionBid {
  final String id;
  final String auctionId;
  final String bidderId;
  final String bidderMaskedName; // e.g. "Bidder #4910"
  final double amount;
  final DateTime timestamp;
  final bool isWinningBid;

  const AuctionBid({
    required this.id,
    required this.auctionId,
    required this.bidderId,
    required this.bidderMaskedName,
    required this.amount,
    required this.timestamp,
    this.isWinningBid = false,
  });
}

class AuctionHouse {
  final String id;
  final String name;
  final String city;
  final String country;
  final String? description;
  final String? websiteUrl;

  const AuctionHouse({
    required this.id,
    required this.name,
    required this.city,
    required this.country,
    this.description,
    this.websiteUrl,
  });
}

class LuxuryAuction {
  final String id;
  final String assetTitle;
  final String categoryName;
  final String description;
  final String coverImageUrl;
  final List<String> galleryImages;
  final double startingBid;
  final double? reservePrice;
  final bool isReserveMet;
  final double currentBid;
  final double minBidIncrement;
  final String currency;
  final DateTime startDate;
  final DateTime endDate;
  final AuctionStatus status;
  final AuctionFormat format;
  final String auctionHouseName;
  final String location;
  final int totalBidsCount;
  final List<AuctionBid> bidHistory;
  final String terms;
  final double buyerPremiumPercentage;

  const LuxuryAuction({
    required this.id,
    required this.assetTitle,
    required this.categoryName,
    required this.description,
    required this.coverImageUrl,
    this.galleryImages = const [],
    required this.startingBid,
    this.reservePrice,
    this.isReserveMet = true,
    required this.currentBid,
    this.minBidIncrement = 50000.0,
    this.currency = 'INR',
    required this.startDate,
    required this.endDate,
    this.status = AuctionStatus.live,
    this.format = AuctionFormat.timed,
    required this.auctionHouseName,
    this.location = 'Monaco / Geneva',
    this.totalBidsCount = 0,
    this.bidHistory = const [],
    this.terms = 'Standard NP GROUPS Curated Auction Terms. 10% Escrow deposit required to place binding bids.',
    this.buyerPremiumPercentage = 12.5,
  });

  bool get isLive => status == AuctionStatus.live;
  double get nextMinimumBid => currentBid + minBidIncrement;

  Duration get timeRemaining {
    final now = DateTime.now();
    if (now.isAfter(endDate)) return Duration.zero;
    return endDate.difference(now);
  }

  LuxuryAuction copyWith({
    double? currentBid,
    int? totalBidsCount,
    List<AuctionBid>? bidHistory,
    bool? isReserveMet,
    AuctionStatus? status,
  }) {
    return LuxuryAuction(
      id: id,
      assetTitle: assetTitle,
      categoryName: categoryName,
      description: description,
      coverImageUrl: coverImageUrl,
      galleryImages: galleryImages,
      startingBid: startingBid,
      reservePrice: reservePrice,
      isReserveMet: isReserveMet ?? this.isReserveMet,
      currentBid: currentBid ?? this.currentBid,
      minBidIncrement: minBidIncrement,
      currency: currency,
      startDate: startDate,
      endDate: endDate,
      status: status ?? this.status,
      format: format,
      auctionHouseName: auctionHouseName,
      location: location,
      totalBidsCount: totalBidsCount ?? this.totalBidsCount,
      bidHistory: bidHistory ?? this.bidHistory,
      terms: terms,
      buyerPremiumPercentage: buyerPremiumPercentage,
    );
  }
}
