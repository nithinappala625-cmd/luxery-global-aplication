import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_bottom_sheet.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../providers/categories_provider.dart';
import '../../../providers/listings_provider.dart';

class FilterBottomSheet extends ConsumerStatefulWidget {
  const FilterBottomSheet({super.key});

  static Future<void> show(BuildContext context) {
    return LuxuryBottomSheet.show(
      context: context,
      title: 'Filter & Refine',
      child: const FilterBottomSheet(),
    );
  }

  @override
  ConsumerState<FilterBottomSheet> createState() => _FilterBottomSheetState();
}

class _FilterBottomSheetState extends ConsumerState<FilterBottomSheet> {
  late String? _selectedCategoryId;
  late String? _selectedCurrency;
  late ListingSortOption _selectedSort;

  final List<String> _currencies = ['ALL', 'USD', 'EUR', 'GBP', 'CHF', 'AED'];

  @override
  void initState() {
    super.initState();
    final current = ref.read(listingFilterProvider);
    _selectedCategoryId = current.categoryId;
    _selectedCurrency = current.currency;
    _selectedSort = current.sortOption;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final categories = ref.watch(categoriesProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. Sort Section
        Text(
          'SORT BY',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.8,
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildSortChip('Featured', ListingSortOption.featured),
            _buildSortChip('Newest', ListingSortOption.newest),
            _buildSortChip('Price: Low to High', ListingSortOption.priceLowToHigh),
            _buildSortChip('Price: High to Low', ListingSortOption.priceHighToLow),
          ],
        ),

        const SizedBox(height: 20),
        Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
        const SizedBox(height: 16),

        // 2. Category Section
        Text(
          'CATEGORY',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.8,
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildCategoryChip('All Categories', null),
            ...categories.map((c) => _buildCategoryChip(c.name, c.id)),
          ],
        ),

        const SizedBox(height: 20),
        Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
        const SizedBox(height: 16),

        // 3. Currency Selector
        Text(
          'CURRENCY',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.8,
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _currencies.map((curr) {
            final isSelected = (_selectedCurrency == null && curr == 'ALL') ||
                _selectedCurrency == curr;
            return GestureDetector(
              onTap: () {
                setState(() {
                  _selectedCurrency = curr == 'ALL' ? null : curr;
                });
              },
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
                  ),
                ),
                child: Text(
                  curr,
                  style: LuxuryTypography.microCaps.copyWith(
                    color: isSelected
                        ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                        : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
                    fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  ),
                ),
              ),
            );
          }).toList(),
        ),

        const SizedBox(height: 24),

        // 4. Action Buttons (Reset & Apply)
        Row(
          children: [
            Expanded(
              child: LuxuryButton(
                text: 'RESET',
                variant: LuxuryButtonVariant.secondary,
                onPressed: () {
                  ref.read(listingFilterProvider.notifier).resetFilters();
                  Navigator.of(context).pop();
                },
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: LuxuryButton(
                text: 'APPLY FILTERS',
                variant: LuxuryButtonVariant.primary,
                onPressed: () {
                  final notifier = ref.read(listingFilterProvider.notifier);
                  notifier.setCategory(_selectedCategoryId);
                  notifier.setSortOption(_selectedSort);
                  notifier.setFilters(
                    currency: _selectedCurrency,
                  );
                  Navigator.of(context).pop();
                },
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSortChip(String label, ListingSortOption option) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSelected = _selectedSort == option;

    return GestureDetector(
      onTap: () => setState(() => _selectedSort = option),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(2),
          border: Border.all(
            color: isSelected
                ? Colors.transparent
                : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
        ),
        child: Text(
          label.toUpperCase(),
          style: LuxuryTypography.microCaps.copyWith(
            color: isSelected
                ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryChip(String label, String? categoryId) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSelected = _selectedCategoryId == categoryId;

    return GestureDetector(
      onTap: () => setState(() => _selectedCategoryId = categoryId),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(2),
          border: Border.all(
            color: isSelected
                ? Colors.transparent
                : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
        ),
        child: Text(
          label.toUpperCase(),
          style: LuxuryTypography.microCaps.copyWith(
            color: isSelected
                ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
