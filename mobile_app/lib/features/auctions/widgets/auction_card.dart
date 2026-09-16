import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../core/widgets/luxury_image.dart';
import '../../../models/auction.dart';

class LuxuryAuctionCard extends StatelessWidget {
  final LuxuryAuction auction;
  final VoidCallback onSelect;

  const LuxuryAuctionCard({
    super.key,
    required this.auction,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final dateFormat = DateFormat('MMM dd, yyyy • HH:mm');

    return Container(
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner Media with Live badge
          Stack(
            children: [
              LuxuryImage(
                imageUrl: auction.coverImageUrl,
                width: double.infinity,
                height: 180,
                fit: BoxFit.cover,
              ),
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withOpacity(0.5),
                        Colors.transparent,
                        Colors.black.withOpacity(0.7),
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: auction.isLive
                        ? LuxuryColors.auctionLiveRed
                        : LuxuryColors.pureBlack.withOpacity(0.8),
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (auction.isLive) ...[
                        Container(
                          width: 6,
                          height: 6,
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 5),
                      ],
                      Text(
                        (auction.isLive ? 'LIVE NOW' : 'UPCOMING SALE').toUpperCase(),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.pureWhite,
                          fontSize: 8.5,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 10,
                right: 12,
                child: Text(
                  '${auction.totalLots} LOTS',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.champagne,
                    fontSize: 9,
                  ),
                ),
              ),
            ],
          ),

          // Metadata Details
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      auction.auctionHouseName?.toUpperCase() ?? 'SOTHEBY\'S',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Row(
                      children: [
                        const Icon(Icons.location_on_outlined, size: 12, color: LuxuryColors.mutedGrey),
                        const SizedBox(width: 3),
                        Text(
                          auction.location,
                          style: LuxuryTypography.bodySmall.copyWith(
                            color: LuxuryColors.mutedGrey,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  auction.title,
                  style: LuxuryTypography.editorialHeading3.copyWith(
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  auction.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: LuxuryTypography.bodySmall.copyWith(
                    color: LuxuryColors.mutedGrey,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    const Icon(Icons.access_time, size: 13, color: LuxuryColors.champagne),
                    const SizedBox(width: 6),
                    Text(
                      dateFormat.format(auction.startDate),
                      style: LuxuryTypography.bodySmall.copyWith(
                        color: isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal,
                        fontWeight: FontWeight.w500,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                LuxuryButton(
                  text: auction.isLive ? 'VIEW LIVE BIDDING ROOM' : 'VIEW AUCTION CATALOG',
                  variant: auction.isLive ? LuxuryButtonVariant.gold : LuxuryButtonVariant.primary,
                  height: 44,
                  onPressed: onSelect,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
