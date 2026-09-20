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
      height: 200,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: LuxuryColors.borderDark, width: 0.8),
        ),
      ),
      child: Stack(
        children: [
          // Fullscreen editorial luxury background image (Verified Gulfstream G650ER)
          const Positioned.fill(
            child: LuxuryImage(
              imageUrl:
                  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg',
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
                    Colors.black.withOpacity(0.65),
                    Colors.black.withOpacity(0.92),
                  ],
                  stops: const [0.0, 0.5, 1.0],
                ),
              ),
            ),
          ),
          // Editorial typography
          Positioned(
            left: 20,
            right: 20,
            bottom: 20,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                // NP GROUPS Prestige crest
                Row(
                  children: [
                    Container(
                      width: 20,
                      height: 1.5,
                      color: LuxuryColors.champagne,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'NP GROUPS • GLOBAL LUXURY SYNDICATE',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.0,
                        fontSize: 9.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                // Heading: "THE WORLD'S EXCEPTIONAL ASSETS."
                Text(
                  "THE WORLD'S EXCEPTIONAL ASSETS.",
                  style: LuxuryTypography.editorialHero.copyWith(
                    color: LuxuryColors.pureWhite,
                    letterSpacing: 1.2,
                    height: 1.15,
                    fontSize: 22,
                  ),
                ),
                const SizedBox(height: 4),
                // Subheading
                Text(
                  'Private Jets • Superyachts • High-Security Vaults • Sovereign Domains',
                  style: LuxuryTypography.bodyMedium.copyWith(
                    color: LuxuryColors.platinum,
                    fontSize: 11.5,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
