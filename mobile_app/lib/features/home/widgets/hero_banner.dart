import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../core/widgets/luxury_image.dart';

class HomeHeroBanner extends StatelessWidget {
  const HomeHeroBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 480,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: LuxuryColors.borderDark, width: 0.8),
        ),
      ),
      child: Stack(
        children: [
          // Fullscreen editorial luxury background image
          const Positioned.fill(
            child: LuxuryImage(
              imageUrl:
                  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop',
              fit: BoxFit.cover,
            ),
          ),
          // Multi-stage editorial gradient overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withOpacity(0.4),
                    Colors.black.withOpacity(0.55),
                    Colors.black.withOpacity(0.85),
                  ],
                  stops: const [0.0, 0.4, 1.0],
                ),
              ),
            ),
          ),
          // Editorial typography and buttons
          Positioned(
            left: 20,
            right: 20,
            bottom: 36,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                // Quiet luxury prestige label
                Row(
                  children: [
                    Container(
                      width: 24,
                      height: 1,
                      color: LuxuryColors.champagne,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'PRIVATE SALON COLLECTION',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.8,
                        fontSize: 9.5,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Heading: "EXCEPTIONAL POSSESSIONS."
                Text(
                  'EXCEPTIONAL\nPOSSESSIONS.',
                  style: LuxuryTypography.editorialHero.copyWith(
                    color: LuxuryColors.pureWhite,
                    letterSpacing: 1.5,
                  ),
                ),
                const SizedBox(height: 12),
                // Subheading: "Discover exceptional pre-owned luxury from around the world."
                Text(
                  'Discover exceptional pre-owned luxury from around the world.',
                  style: LuxuryTypography.bodyMedium.copyWith(
                    color: LuxuryColors.softIvory.withOpacity(0.9),
                    fontSize: 14,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 24),
                // Buttons: EXPLORE LUXURY & LIST YOUR ASSET
                Row(
                  children: [
                    Expanded(
                      child: LuxuryButton(
                        text: 'EXPLORE LUXURY',
                        variant: LuxuryButtonVariant.gold,
                        height: 48,
                        onPressed: () => context.go('/discover'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: LuxuryButton(
                        text: 'LIST YOUR ASSET',
                        variant: LuxuryButtonVariant.secondary,
                        height: 48,
                        onPressed: () => context.go('/sell'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
