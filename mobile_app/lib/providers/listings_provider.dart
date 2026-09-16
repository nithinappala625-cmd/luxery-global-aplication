import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/listing.dart';
import '../services/mock_data.dart';

enum ListingSortOption {
  newest,
  priceLowToHigh,
  priceHighToLow,
  featured,
}

class ListingFilterState {
  final String? searchQuery;
  final String? categoryId;
  final double? minPrice;
  final double? maxPrice;
  final String? currency;
  final String? condition;
  final bool? verifiedOnly;
  final ListingSortOption sortOption;

  const ListingFilterState({
    this.searchQuery,
    this.categoryId,
    this.minPrice,
    this.maxPrice,
    this.currency,
    this.condition,
    this.verifiedOnly,
    this.sortOption = ListingSortOption.featured,
  });

  ListingFilterState copyWith({
    String? searchQuery,
    String? categoryId,
    double? minPrice,
    double? maxPrice,
    String? currency,
    String? condition,
    bool? verifiedOnly,
    ListingSortOption? sortOption,
    bool clearCategory = false,
  }) {
    return ListingFilterState(
      searchQuery: searchQuery ?? this.searchQuery,
      categoryId: clearCategory ? null : (categoryId ?? this.categoryId),
      minPrice: minPrice ?? this.minPrice,
      maxPrice: maxPrice ?? this.maxPrice,
      currency: currency ?? this.currency,
      condition: condition ?? this.condition,
      verifiedOnly: verifiedOnly ?? this.verifiedOnly,
      sortOption: sortOption ?? this.sortOption,
    );
  }
}

class ListingsNotifier extends StateNotifier<List<LuxuryListing>> {
  ListingsNotifier() : super(MockLuxuryData.listings);

  void addListing(LuxuryListing listing) {
    state = [listing, ...state];
  }

  void updateListingStatus(String listingId, String status) {
    state = [
      for (final item in state)
        if (item.id == listingId) item.copyWith(status: status) else item
    ];
  }

  void incrementViewCount(String listingId) {
    state = [
      for (final item in state)
        if (item.id == listingId)
          item.copyWith(viewCount: item.viewCount + 1)
        else
          item
    ];
  }
}

final allListingsProvider =
    StateNotifierProvider<ListingsNotifier, List<LuxuryListing>>((ref) {
  return ListingsNotifier();
});

final listingFilterProvider =
    StateNotifierProvider<ListingFilterNotifier, ListingFilterState>((ref) {
  return ListingFilterNotifier();
});

class ListingFilterNotifier extends StateNotifier<ListingFilterState> {
  ListingFilterNotifier() : super(const ListingFilterState());

  void setSearchQuery(String query) {
    state = state.copyWith(searchQuery: query.trim().isEmpty ? null : query.trim());
  }

  void setCategory(String? categoryId) {
    if (categoryId == null) {
      state = state.copyWith(clearCategory: true);
    } else {
      state = state.copyWith(categoryId: categoryId);
    }
  }

  void setSortOption(ListingSortOption option) {
    state = state.copyWith(sortOption: option);
  }

  void setFilters({
    double? minPrice,
    double? maxPrice,
    String? currency,
    String? condition,
    bool? verifiedOnly,
  }) {
    state = state.copyWith(
      minPrice: minPrice,
      maxPrice: maxPrice,
      currency: currency,
      condition: condition,
      verifiedOnly: verifiedOnly,
    );
  }

  void resetFilters() {
    state = const ListingFilterState();
  }
}

/// Filtered & Sorted Listings Provider
final filteredListingsProvider = Provider<List<LuxuryListing>>((ref) {
  final all = ref.watch(allListingsProvider);
  final filter = ref.watch(listingFilterProvider);

  var list = all.where((item) {
    // Only verified or public listings in discover/home
    if (item.status != 'verified' && item.status != 'sold') {
      return false;
    }

    if (filter.searchQuery != null && filter.searchQuery!.isNotEmpty) {
      final q = filter.searchQuery!.toLowerCase();
      final matchTitle = item.title.toLowerCase().contains(q);
      final matchDesc = item.description.toLowerCase().contains(q);
      final matchBrand = item.brandName?.toLowerCase().contains(q) ?? false;
      final matchCity = item.location.city.toLowerCase().contains(q);
      final matchCountry = item.location.country.toLowerCase().contains(q);
      if (!matchTitle && !matchDesc && !matchBrand && !matchCity && !matchCountry) {
        return false;
      }
    }

    if (filter.categoryId != null && item.categoryId != filter.categoryId) {
      return false;
    }

    if (filter.currency != null && item.currency != filter.currency) {
      return false;
    }

    if (filter.minPrice != null && item.price < filter.minPrice!) {
      return false;
    }

    if (filter.maxPrice != null && item.price > filter.maxPrice!) {
      return false;
    }

    if (filter.condition != null && !item.condition.toLowerCase().contains(filter.condition!.toLowerCase())) {
      return false;
    }

    return true;
  }).toList();

  switch (filter.sortOption) {
    case ListingSortOption.priceLowToHigh:
      list.sort((a, b) => a.price.compareTo(b.price));
      break;
    case ListingSortOption.priceHighToLow:
      list.sort((a, b) => b.price.compareTo(a.price));
      break;
    case ListingSortOption.newest:
      list.sort((a, b) => b.createdAt.compareTo(a.createdAt));
      break;
    case ListingSortOption.featured:
      list.sort((a, b) {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.createdAt.compareTo(a.createdAt);
      });
      break;
  }

  return list;
});

final featuredListingsProvider = Provider<List<LuxuryListing>>((ref) {
  final all = ref.watch(allListingsProvider);
  return all.where((item) => item.isFeatured && item.status == 'verified').toList();
});
