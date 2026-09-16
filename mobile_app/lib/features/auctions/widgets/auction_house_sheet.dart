import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_bottom_sheet.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../models/auction.dart';

class AuctionHouseSheet extends StatelessWidget {
  final AuctionHouse house;

  const AuctionHouseSheet({super.key, required this.house});

  static Future<void> show(BuildContext context, AuctionHouse house) {
    return LuxuryBottomSheet.show(
      context: context,
      title: house.name,
      child: AuctionHouseSheet(house: house),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF222222) : const Color(0xFFEFECE5),
                borderRadius: BorderRadius.circular(2),
                border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
              ),
              child: Center(
                child: Text(
                  house.name.substring(0, 1),
                  style: LuxuryTypography.editorialHeading1.copyWith(
                    color: LuxuryColors.champagne,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        house.name,
                        style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 18),
                      ),
                      const SizedBox(width: 6),
                      const Icon(Icons.verified, size: 14, color: LuxuryColors.champagne),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${house.city}, ${house.country}'.toUpperCase(),
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.mutedGrey,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          house.description ??
              'Premier international auction establishment renowned for rare horological masterpieces, fine art, and historic luxury machinery.',
          style: LuxuryTypography.bodyMedium.copyWith(
            color: isDark ? const Color(0xFFCCCCCC) : const Color(0xFF444444),
            height: 1.5,
          ),
        ),
        const SizedBox(height: 18),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
            border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStat('VERIFIED STATUS', 'ACCREDITED'),
              _buildStat('UPCOMING SALES', '4 SALES'),
              _buildStat('GLOBAL HUBS', 'LONDON • GENEVA'),
            ],
          ),
        ),
        const SizedBox(height: 24),
        LuxuryButton(
          text: 'VISIT OFFICIAL AUCTION PORTAL',
          variant: LuxuryButtonVariant.gold,
          onPressed: () {
            Navigator.of(context).pop();
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Redirecting to official portal: ${house.websiteUrl}')),
            );
          },
        ),
      ],
    );
  }

  Widget _buildStat(String label, String val) {
    return Column(
      children: [
        Text(
          val,
          style: LuxuryTypography.bodyMedium.copyWith(
            fontWeight: FontWeight.w700,
            fontSize: 12,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.mutedGrey,
            fontSize: 8.5,
          ),
        ),
      ],
    );
  }
}
