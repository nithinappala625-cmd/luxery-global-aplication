import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../providers/categories_provider.dart';
import 'widgets/category_card.dart';
import 'widgets/curation_statement.dart';
import 'widgets/featured_carousel.dart';
import 'widgets/hero_banner.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final categories = ref.watch(categoriesProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        showBack: false,
        showSearch: true,
        showWishlist: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. Editorial Hero Section
            const HomeHeroBanner(),

            const SizedBox(height: 36),

            // 2. Featured Categories Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'CURATED HOUSES',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'FEATURED CATEGORIES',
                    style: LuxuryTypography.editorialHeading2.copyWith(
                      color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 4 Distinct Luxury Category Cards Grid
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  Row(
                    children: [
                      if (categories.isNotEmpty)
                        Expanded(
                          child: LuxuryCategoryCard(
                            category: categories[0], // Luxury Watches
                            height: 160,
                          ),
                        ),
                      const SizedBox(width: 12),
                      if (categories.length > 1)
                        Expanded(
                          child: LuxuryCategoryCard(
                            category: categories[1], // Fine Jewellery
                            height: 160,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      if (categories.length > 2)
                        Expanded(
                          child: LuxuryCategoryCard(
                            category: categories[2], // Exotic Cars
                            height: 160,
                          ),
                        ),
                      const SizedBox(width: 12),
                      if (categories.length > 3)
                        Expanded(
                          child: LuxuryCategoryCard(
                            category: categories[3], // Yachts & Marine
                            height: 160,
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 40),

            // 3. Horizontal Scrolling Featured Assets
            const FeaturedAssetsCarousel(),

            const SizedBox(height: 40),

            // 4. Curation / Trust Statement
            const CurationStatement(),

            const SizedBox(height: 48),

            // 5. Restrained Editorial Brand Footer
            Center(
              child: Column(
                children: [
                  Container(
                    width: 32,
                    height: 1,
                    color: LuxuryColors.champagne.withOpacity(0.5),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'PARIS • GENEVA • LONDON • MONACO • DUBAI • NEW YORK',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.mutedGrey,
                      fontSize: 8.5,
                      letterSpacing: 2.0,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '© 2026 MAISON DU LUXE INTERNATIONAL',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.mutedGrey.withOpacity(0.6),
                      fontSize: 8.0,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 36),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
