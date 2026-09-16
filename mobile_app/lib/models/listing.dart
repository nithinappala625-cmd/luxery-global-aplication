class ListingImage {
  final String id;
  final String originalUrl;
  final String? optimizedUrl;
  final String? thumbnailUrl;
  final bool isCover;
  final int sortOrder;

  const ListingImage({
    required this.id,
    required this.originalUrl,
    this.optimizedUrl,
    this.thumbnailUrl,
    this.isCover = false,
    this.sortOrder = 0,
  });

  factory ListingImage.fromJson(Map<String, dynamic> json) {
    return ListingImage(
      id: json['id'] as String,
      originalUrl: json['original_url'] ?? json['originalUrl'] ?? '',
      optimizedUrl: json['optimized_url'] ?? json['optimizedUrl'],
      thumbnailUrl: json['thumbnail_url'] ?? json['thumbnailUrl'],
      isCover: json['is_cover'] ?? json['isCover'] ?? false,
      sortOrder: json['sort_order'] ?? json['sortOrder'] ?? 0,
    );
  }
}

class ListingSpecification {
  final String key;
  final String value;
  final String group;

  const ListingSpecification({
    required this.key,
    required this.value,
    this.group = 'General',
  });

  factory ListingSpecification.fromJson(Map<String, dynamic> json) {
    return ListingSpecification(
      key: json['spec_key'] ?? json['key'] ?? '',
      value: json['spec_value'] ?? json['value'] ?? '',
      group: json['spec_group'] ?? json['group'] ?? 'General',
    );
  }
}

class ListingLocation {
  final String city;
  final String? stateProvince;
  final String country;
  final String countryCode;
  final double? latitude;
  final double? longitude;

  const ListingLocation({
    required this.city,
    this.stateProvince,
    required this.country,
    this.countryCode = 'US',
    this.latitude,
    this.longitude,
  });

  String get formattedLocation {
    if (city.isNotEmpty && country.isNotEmpty) {
      return '$city, $country';
    }
    return city.isNotEmpty ? city : country;
  }

  factory ListingLocation.fromJson(Map<String, dynamic> json) {
    return ListingLocation(
      city: json['city'] ?? '',
      stateProvince: json['state_province'] ?? json['stateProvince'],
      country: json['country'] ?? '',
      countryCode: json['country_code'] ?? json['countryCode'] ?? 'US',
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
    );
  }
}

class SellerSnippet {
  final String id;
  final String name;
  final String sellerType; // 'private_collector', 'boutique_dealer', 'authorized_dealer'
  final String? avatarUrl;
  final String? city;
  final String? country;
  final double reputationScore;
  final bool isVerified;

  const SellerSnippet({
    required this.id,
    required this.name,
    required this.sellerType,
    this.avatarUrl,
    this.city,
    this.country,
    this.reputationScore = 5.0,
    this.isVerified = true,
  });

  factory SellerSnippet.fromJson(Map<String, dynamic> json) {
    return SellerSnippet(
      id: json['id'] as String,
      name: json['business_name'] ?? json['full_name'] ?? json['name'] ?? 'Private Collector',
      sellerType: json['seller_type'] ?? json['sellerType'] ?? 'private_collector',
      avatarUrl: json['avatar_url'] ?? json['avatarUrl'],
      city: json['location_city'] ?? json['city'],
      country: json['location_country'] ?? json['country'],
      reputationScore: (json['reputation_score'] as num?)?.toDouble() ?? 5.0,
      isVerified: json['is_verified'] ?? json['isVerified'] ?? true,
    );
  }
}

class LuxuryListing {
  final String id;
  final String sellerId;
  final String categoryId;
  final String? categoryName;
  final String? subcategoryId;
  final String? brandId;
  final String? brandName;
  final String title;
  final String slug;
  final String description;
  final double price;
  final String currency;
  final int? year;
  final String condition;
  final String status; // 'draft', 'pending_review', 'verified', 'rejected', 'sold'
  final bool isFeatured;
  final int viewCount;
  final double contactUnlockFee;
  final ListingLocation location;
  final List<ListingImage> images;
  final List<ListingSpecification> specifications;
  final SellerSnippet? seller;
  final bool isSaved;
  final DateTime createdAt;

  const LuxuryListing({
    required this.id,
    required this.sellerId,
    required this.categoryId,
    this.categoryName,
    this.subcategoryId,
    this.brandId,
    this.brandName,
    required this.title,
    required this.slug,
    required this.description,
    required this.price,
    required this.currency,
    this.year,
    required this.condition,
    required this.status,
    this.isFeatured = false,
    this.viewCount = 0,
    this.contactUnlockFee = 0.0,
    required this.location,
    required this.images,
    this.specifications = const [],
    this.seller,
    this.isSaved = false,
    required this.createdAt,
  });

  String get coverImageUrl {
    if (images.isEmpty) {
      return 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop';
    }
    final cover = images.firstWhere((img) => img.isCover, orElse: () => images.first);
    return cover.originalUrl;
  }

  bool get isCuratorVerified => status == 'verified';

  LuxuryListing copyWith({
    bool? isSaved,
    String? status,
    int? viewCount,
  }) {
    return LuxuryListing(
      id: id,
      sellerId: sellerId,
      categoryId: categoryId,
      categoryName: categoryName,
      subcategoryId: subcategoryId,
      brandId: brandId,
      brandName: brandName,
      title: title,
      slug: slug,
      description: description,
      price: price,
      currency: currency,
      year: year,
      condition: condition,
      status: status ?? this.status,
      isFeatured: isFeatured,
      viewCount: viewCount ?? this.viewCount,
      contactUnlockFee: contactUnlockFee,
      location: location,
      images: images,
      specifications: specifications,
      seller: seller,
      isSaved: isSaved ?? this.isSaved,
      createdAt: createdAt,
    );
  }

  factory LuxuryListing.fromJson(Map<String, dynamic> json) {
    var rawImages = json['images'] as List? ?? json['listing_images'] as List? ?? [];
    var imagesList = rawImages.map((img) => ListingImage.fromJson(img as Map<String, dynamic>)).toList();

    var rawSpecs = json['specifications'] as List? ?? json['listing_specifications'] as List? ?? [];
    var specsList = rawSpecs.map((sp) => ListingSpecification.fromJson(sp as Map<String, dynamic>)).toList();

    ListingLocation loc;
    if (json['location'] != null) {
      loc = ListingLocation.fromJson(json['location'] as Map<String, dynamic>);
    } else if (json['listing_locations'] != null && (json['listing_locations'] as List).isNotEmpty) {
      loc = ListingLocation.fromJson((json['listing_locations'] as List).first as Map<String, dynamic>);
    } else {
      loc = ListingLocation(
        city: json['city'] ?? json['location_city'] ?? 'Geneva',
        country: json['country'] ?? json['location_country'] ?? 'Switzerland',
      );
    }

    SellerSnippet? sellerInfo;
    if (json['seller'] != null) {
      sellerInfo = SellerSnippet.fromJson(json['seller'] as Map<String, dynamic>);
    }

    return LuxuryListing(
      id: json['id'] as String,
      sellerId: json['seller_id'] ?? json['sellerId'] ?? '',
      categoryId: json['category_id'] ?? json['categoryId'] ?? '',
      categoryName: json['category_name'] ?? json['categoryName'],
      subcategoryId: json['subcategory_id'] ?? json['subcategoryId'],
      brandId: json['brand_id'] ?? json['brandId'],
      brandName: json['brand_name'] ?? json['brandName'],
      title: json['title'] as String,
      slug: json['slug'] as String? ?? '',
      description: json['description'] as String? ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      currency: json['currency'] as String? ?? 'USD',
      year: json['year'] as int?,
      condition: json['condition'] as String? ?? 'Pristine',
      status: json['status'] as String? ?? 'draft',
      isFeatured: json['is_featured'] ?? json['isFeatured'] ?? false,
      viewCount: json['view_count'] ?? json['viewCount'] ?? 0,
      contactUnlockFee: (json['contact_unlock_fee'] as num?)?.toDouble() ?? 0.0,
      location: loc,
      images: imagesList,
      specifications: specsList,
      seller: sellerInfo,
      isSaved: json['is_saved'] ?? json['isSaved'] ?? false,
      createdAt: json['created_at'] != null ? DateTime.parse(json['created_at']) : DateTime.now(),
    );
  }
}
