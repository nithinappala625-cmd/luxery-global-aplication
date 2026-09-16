import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_listing_card.dart';
import '../../providers/categories_provider.dart';
import '../../providers/listings_provider.dart';
import 'widgets/filter_bottom_sheet.dart';
import 'widgets/luxury_search_bar.dart';

class DiscoverScreen extends ConsumerStatefulWidget {
  const DiscoverScreen({super.key});

  @override
  ConsumerState<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends ConsumerState<DiscoverScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final listings = ref.watch(filteredListingsProvider);
    final filter = ref.watch(listingFilterProvider);
    final categories = ref.watch(categoriesProvider);

    final hasFilters = filter.categoryId != null ||
        filter.currency != null ||
        filter.minPrice != null ||
        filter.maxPrice != null;

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'SALON DISCOVERY',
        showBack: false,
        showWishlist: true,
      ),
      body: Column(
        children: [
          // Search & Filter header
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
            child: LuxurySearchBar(
              controller: _searchController,
              onChanged: (val) {
                ref.read(listingFilterProvider.notifier).setSearchQuery(val);
              },
              onFilterTap: () => FilterBottomSheet.show(context),
              hasActiveFilters: hasFilters,
            ),
          ),

          // Horizontal Quick Category Filter Chips
          SizedBox(
            height: 38,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              children: [
                _buildQuickCategoryChip(
                  label: 'ALL ASSETS',
                  isSelected: filter.categoryId == null,
                  onTap: () => ref.read(listingFilterProvider.notifier).setCategory(null),
                ),
                ...categories.map((c) => _buildQuickCategoryChip(
                      label: c.name.toUpperCase(),
                      isSelected: filter.categoryId == c.id,
                      onTap: () => ref.read(listingFilterProvider.notifier).setCategory(c.id),
                    )),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // Results Count and Sort Indicator
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${listings.length} EXCEPTIONAL PIECES',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.mutedGrey,
                    letterSpacing: 1.5,
                  ),
                ),
                GestureDetector(
                  onTap: () => FilterBottomSheet.show(context),
                  child: Row(
                    children: [
                      Text(
                        _sortLabel(filter.sortOption),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.keyboard_arrow_down,
                        size: 14,
                        color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          Divider(
            color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
            height: 1,
          ),

          // Discovery List Feed
          Expanded(
            child: listings.isEmpty
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(32),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.search_off_outlined,
                            size: 40,
                            color: LuxuryColors.mutedGrey.withOpacity(0.6),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'NO MATCHING POSSESSIONS',
                            style: LuxuryTypography.editorialHeading3.copyWith(
                              letterSpacing: 1.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Try adjusting your search terms or expanding your filter criteria.',
                            textAlign: TextAlign.center,
                            style: LuxuryTypography.bodySmall.copyWith(
                              color: LuxuryColors.mutedGrey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(20),
                    itemCount: listings.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 20),
                    itemBuilder: (context, index) {
                      final item = listings[index];
                      return LuxuryListingCard(
                        listing: item,
                        layout: ListingCardLayout.grid,
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickCategoryChip({
    required String label,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(2),
            border: Border.all(
              color: isSelected
                  ? Colors.transparent
                  : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              width: 0.8,
            ),
          ),
          child: Text(
            label,
            style: LuxuryTypography.microCaps.copyWith(
              color: isSelected
                  ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                  : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
              fontSize: 9,
              letterSpacing: 1.2,
              fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }

  String _sortLabel(ListingSortOption option) {
    switch (option) {
      case ListingSortOption.featured:
        return 'FEATURED';
      case ListingSortOption.newest:
        return 'NEWEST';
      case ListingSortOption.priceLowToHigh:
        return 'PRICE: LOW-HIGH';
      case ListingSortOption.priceHighToLow:
        return 'PRICE: HIGH-LOW';
    }
  }
}
