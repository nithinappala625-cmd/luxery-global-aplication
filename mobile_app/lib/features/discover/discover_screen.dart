import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
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
    final subcategories = filter.categoryId != null
        ? ref.watch(subcategoriesByCategoryProvider(filter.categoryId!))
        : const [];

    final hasFilters = filter.categoryId != null ||
        filter.subcategoryId != null ||
        filter.currency != null ||
        filter.minPrice != null ||
        filter.maxPrice != null;

    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final bgColor = LuxuryColors.scaffoldBg(isDark);

    return Scaffold(
      backgroundColor: bgColor,
      appBar: const LuxuryAppBar(
        title: 'NP GROUPS DISCOVERY',
        showBack: false,
        showWishlist: true,
        showThemeToggle: true,
      ),
      body: Column(
        children: [
          // Search & Filter header
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 10),
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
                  isDark: isDark,
                  onTap: () => ref.read(listingFilterProvider.notifier).setCategory(null),
                ),
                ...categories.map((c) => _buildQuickCategoryChip(
                      label: c.name.toUpperCase(),
                      isSelected: filter.categoryId == c.id,
                      isDark: isDark,
                      onTap: () {
                        if (c.slug == 'rentals') {
                          context.push('/rentals');
                        } else if (c.slug == 'aviation') {
                          context.push('/aviation');
                        } else if (c.slug == 'materials') {
                          context.push('/materials');
                        } else if (c.slug == 'auctions') {
                          context.push('/auctions');
                        } else if (c.slug == 'deal_rooms') {
                          context.push('/deals/deal-101');
                        } else {
                          ref.read(listingFilterProvider.notifier).setCategory(c.id);
                        }
                      },
                    )),
              ],
            ),
          ),

          // Subcategory Filter Chips Row (if subcategories available)
          if (subcategories.isNotEmpty) ...[
            const SizedBox(height: 8),
            SizedBox(
              height: 32,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  _buildSubcategoryChip(
                    label: 'ALL',
                    isSelected: filter.subcategoryId == null,
                    isDark: isDark,
                    onTap: () => ref.read(listingFilterProvider.notifier).setSubcategory(null),
                  ),
                  ...subcategories.map((s) => _buildSubcategoryChip(
                        label: s.name.toUpperCase(),
                        isSelected: filter.subcategoryId == s.id,
                        isDark: isDark,
                        onTap: () => ref.read(listingFilterProvider.notifier).setSubcategory(s.id),
                      )),
                ],
              ),
            ),
          ],

          const SizedBox(height: 8),

          // Results Count and Sort Indicator
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${listings.length} VERIFIED POSSESSIONS',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.textSecondary(isDark),
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
                          color: goldColor,
                          letterSpacing: 1.2,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.keyboard_arrow_down,
                        size: 14,
                        color: goldColor,
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
                            color: LuxuryColors.mutedGrey.withValues(alpha: 0.6),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'NO MATCHING CURATED ASSETS',
                            style: LuxuryTypography.editorialHeading2.copyWith(
                              fontSize: 16,
                              color: LuxuryColors.textPrimary(isDark),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Try adjusting your search criteria, price range, or category filter.',
                            textAlign: TextAlign.center,
                            style: LuxuryTypography.bodySmall.copyWith(
                              color: LuxuryColors.textSecondary(isDark),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(20),
                    itemCount: listings.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 20),
                    itemBuilder: (context, index) {
                      final item = listings[index];
                      return LuxuryListingCard(
                        listing: item,
                        onTap: () => context.push('/listing/${item.id}'),
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
    required bool isDark,
    required VoidCallback onTap,
  }) {
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? goldColor
                : (isDark ? LuxuryColors.darkCard : LuxuryColors.lightCard),
            borderRadius: BorderRadius.circular(2),
            border: Border.all(
              color: isSelected
                  ? Colors.transparent
                  : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              width: 0.8,
            ),
          ),
          child: Center(
            child: Text(
              label,
              style: LuxuryTypography.microCaps.copyWith(
                color: isSelected
                    ? LuxuryColors.pureWhite
                    : LuxuryColors.textPrimary(isDark),
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                fontSize: 10,
                letterSpacing: 1.2,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSubcategoryChip({
    required String label,
    required bool isSelected,
    required bool isDark,
    required VoidCallback onTap,
  }) {
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(
            color: isSelected
                ? goldColor.withValues(alpha: 0.18)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected
                  ? goldColor
                  : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              width: 0.7,
            ),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: isSelected ? goldColor : LuxuryColors.textSecondary(isDark),
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                fontSize: 9.5,
                letterSpacing: 0.8,
              ),
            ),
          ),
        ),
      ),
    );
  }

  String _sortLabel(ListingSortOption option) {
    switch (option) {
      case ListingSortOption.newest:
        return 'NEWEST';
      case ListingSortOption.priceLowToHigh:
        return 'PRICE: LOW TO HIGH';
      case ListingSortOption.priceHighToLow:
        return 'PRICE: HIGH TO LOW';
      case ListingSortOption.featured:
        return 'CURATED';
    }
  }
}
