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
      height: 520,
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
                  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop',
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
                    Colors.black.withOpacity(0.35),
                    Colors.black.withOpacity(0.55),
                    Colors.black.withOpacity(0.92),
                  ],
                  stops: const [0.0, 0.45, 1.0],
                ),
              ),
            ),
          ),
          // Editorial typography and buttons
          Positioned(
            left: 20,
            right: 20,
            bottom: 32,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                // NP GROUPS Prestige crest
                Row(
                  children: [
                    Container(
                      width: 24,
                      height: 1.5,
                      color: LuxuryColors.champagne,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'NP GROUPS • A PRIVATE MARKETPLACE',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.5,
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Heading: "THE WORLD'S EXCEPTIONAL ASSETS."
                Text(
                  "THE WORLD'S\nEXCEPTIONAL ASSETS.",
                  style: LuxuryTypography.editorialHero.copyWith(
                    color: LuxuryColors.pureWhite,
                    letterSpacing: 1.2,
                    height: 1.15,
                    fontSize: 30,
                  ),
                ),
                const SizedBox(height: 12),
                // Subheading: "Discover, acquire, rent and auction extraordinary assets through a trusted private marketplace."
                Text(
                  'Discover, acquire, rent and auction extraordinary assets through a trusted private marketplace.',
                  style: LuxuryTypography.bodyMedium.copyWith(
                    color: LuxuryColors.platinum,
                    fontSize: 13.5,
                    height: 1.45,
                  ),
                ),
                const SizedBox(height: 24),
                // Buttons: EXPLORE COLLECTION & SELL YOUR ASSET
                Row(
                  children: [
                    Expanded(
                      child: LuxuryButton(
                        text: 'EXPLORE COLLECTION',
                        variant: LuxuryButtonVariant.gold,
                        height: 48,
                        onPressed: () => context.go('/discover'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: LuxuryButton(
                        text: 'SELL YOUR ASSET',
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
