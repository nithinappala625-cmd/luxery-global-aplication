class LuxuryCategory {
  final String id;
  final String slug;
  final String name;
  final String? tagline;
  final String iconName;
  final String bannerUrl;
  final int sortOrder;

  const LuxuryCategory({
    required this.id,
    required this.slug,
    required this.name,
    this.tagline,
    required this.iconName,
    required this.bannerUrl,
    required this.sortOrder,
  });

  factory LuxuryCategory.fromJson(Map<String, dynamic> json) {
    return LuxuryCategory(
      id: json['id'] as String,
      slug: json['slug'] as String,
      name: json['name'] as String,
      tagline: json['tagline'] as String?,
      iconName: json['icon_name'] ?? json['iconName'] ?? 'star',
      bannerUrl: json['banner_url'] ?? json['bannerUrl'] ?? '',
      sortOrder: json['sort_order'] ?? json['sortOrder'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'slug': slug,
        'name': name,
        'tagline': tagline,
        'icon_name': iconName,
        'banner_url': bannerUrl,
        'sort_order': sortOrder,
      };
}

class LuxurySubcategory {
  final String id;
  final String categoryId;
  final String slug;
  final String name;
  final String? tagline;
  final String? iconName;
  final String? bannerUrl;
  final String? badgeText;
  final Map<String, dynamic> specSchema;

  const LuxurySubcategory({
    required this.id,
    required this.categoryId,
    required this.slug,
    required this.name,
    this.tagline,
    this.iconName,
    this.bannerUrl,
    this.badgeText,
    this.specSchema = const {},
  });

  factory LuxurySubcategory.fromJson(Map<String, dynamic> json) {
    return LuxurySubcategory(
      id: json['id'] as String,
      categoryId: json['category_id'] ?? json['categoryId'] ?? '',
      slug: json['slug'] as String,
      name: json['name'] as String,
      tagline: json['tagline'] as String?,
      iconName: json['icon_name'] ?? json['iconName'],
      bannerUrl: json['banner_url'] ?? json['bannerUrl'],
      badgeText: json['badge_text'] ?? json['badgeText'],
      specSchema: json['spec_schema'] as Map<String, dynamic>? ?? {},
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'category_id': categoryId,
        'slug': slug,
        'name': name,
        'tagline': tagline,
        'icon_name': iconName,
        'banner_url': bannerUrl,
        'badge_text': badgeText,
        'spec_schema': specSchema,
      };
}
