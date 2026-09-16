import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';

class LuxurySearchBar extends StatelessWidget {
  final TextEditingController controller;
  final ValueChanged<String> onChanged;
  final VoidCallback onFilterTap;
  final bool hasActiveFilters;

  const LuxurySearchBar({
    super.key,
    required this.controller,
    required this.onChanged,
    required this.onFilterTap,
    this.hasActiveFilters = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Row(
      children: [
        Expanded(
          child: Container(
            height: 48,
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              borderRadius: BorderRadius.circular(2),
              border: Border.all(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                width: 0.8,
              ),
            ),
            child: TextField(
              controller: controller,
              onChanged: onChanged,
              cursorColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
              style: LuxuryTypography.bodyMedium.copyWith(
                color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
              ),
              decoration: InputDecoration(
                hintText: 'Search watches, jewels, hypercars, yachts...',
                hintStyle: LuxuryTypography.bodySmall.copyWith(
                  color: LuxuryColors.mutedGrey,
                  fontSize: 13,
                ),
                prefixIcon: Icon(
                  Icons.search,
                  size: 20,
                  color: isDark ? LuxuryColors.champagneLight : LuxuryColors.charcoal,
                ),
                suffixIcon: controller.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 18, color: LuxuryColors.mutedGrey),
                        onPressed: () {
                          controller.clear();
                          onChanged('');
                        },
                      )
                    : null,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
              ),
            ),
          ),
        ),
        const SizedBox(width: 10),
        // Filter button
        GestureDetector(
          onTap: onFilterTap,
          child: Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: hasActiveFilters
                  ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                  : (isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite),
              borderRadius: BorderRadius.circular(2),
              border: Border.all(
                color: hasActiveFilters
                    ? Colors.transparent
                    : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                width: 0.8,
              ),
            ),
            child: Center(
              child: Icon(
                Icons.tune,
                size: 20,
                color: hasActiveFilters
                    ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                    : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
