import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';

class CurationStatement extends StatelessWidget {
  const CurationStatement({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF141414) : const Color(0xFFEFECE5),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
      ),
      child: Column(
        children: [
          Icon(
            Icons.shield_outlined,
            size: 28,
            color: LuxuryColors.champagne,
          ),
          const SizedBox(height: 16),
          Text(
            'THE PRIVILEGE OF RARITY',
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.champagne,
              letterSpacing: 2.5,
              fontSize: 10,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            'Curated Assets. Verified Ownership. Direct Acquisition.',
            textAlign: TextAlign.center,
            style: LuxuryTypography.editorialHeading2.copyWith(
              color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
              fontSize: 20,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Every timepiece, high jewellery masterpiece, collector automobile, and luxury vessel presented within our salon undergoes rigorous physical provenance analysis and title verification before inclusion.',
            textAlign: TextAlign.center,
            style: LuxuryTypography.bodySmall.copyWith(
              color: LuxuryColors.mutedGrey,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildTrustPillar(context, '100%', 'PROVENANCE'),
              Container(width: 1, height: 24, color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              _buildTrustPillar(context, '0%', 'PLATFORM COMM'),
              Container(width: 1, height: 24, color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              _buildTrustPillar(context, 'GLOBAL', 'CONCIERGE'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTrustPillar(BuildContext context, String value, String label) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Column(
      children: [
        Text(
          value,
          style: LuxuryTypography.priceMedium.copyWith(
            color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.mutedGrey,
            fontSize: 8.5,
            letterSpacing: 1.2,
          ),
        ),
      ],
    );
  }
}
