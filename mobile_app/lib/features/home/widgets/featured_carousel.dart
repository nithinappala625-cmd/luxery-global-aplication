import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_listing_card.dart';
import '../../../providers/listings_provider.dart';

class FeaturedAssetsCarousel extends ConsumerWidget {
  const FeaturedAssetsCarousel({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final featuredList = ref.watch(featuredListingsProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Section Header
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'CURATED SELECTION',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'FEATURED ASSETS',
                    style: LuxuryTypography.editorialHeading2.copyWith(
                      color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () => context.go('/discover'),
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(
                    children: [
                      Text(
                        'VIEW ALL',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          letterSpacing: 1.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.arrow_forward,
                        size: 13,
                        color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Horizontal scrolling listing cards
        SizedBox(
          height: 360,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: featuredList.length,
            separatorBuilder: (context, index) => const SizedBox(width: 16),
            itemBuilder: (context, index) {
              final listing = featuredList[index];
              return LuxuryListingCard(
                listing: listing,
                layout: ListingCardLayout.horizontal,
                width: 290,
              );
            },
          ),
        ),
      ],
    );
  }
}
