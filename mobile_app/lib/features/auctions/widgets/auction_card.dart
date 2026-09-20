import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../core/widgets/luxury_image.dart';
import '../../../models/auction.dart';

class LuxuryAuctionCard extends StatelessWidget {
  final LuxuryAuction auction;
  final VoidCallback onPlaceBid;
  final VoidCallback onViewHistory;

  const LuxuryAuctionCard({
    super.key,
    required this.auction,
    required this.onPlaceBid,
    required this.onViewHistory,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        borderRadius: BorderRadius.circular(4),
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
                height: 190,
                fit: BoxFit.cover,
              ),
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withOpacity(0.4),
                        Colors.transparent,
                        Colors.black.withOpacity(0.75),
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: auction.isLive
                        ? Colors.redAccent.withOpacity(0.9)
                        : Colors.black.withOpacity(0.7),
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (auction.isLive) ...[
                        const Icon(Icons.circle, size: 8, color: Colors.white),
                        const SizedBox(width: 5),
                      ],
                      Text(
                        auction.isLive ? 'LIVE LOT' : auction.status.label.toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.0,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.8),
                    borderRadius: BorderRadius.circular(2),
                    border: Border.all(color: LuxuryColors.champagne, width: 0.8),
                  ),
                  child: Text(
                    auction.auctionHouseName,
                    style: const TextStyle(
                      color: LuxuryColors.champagne,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              Positioned(
                bottom: 12,
                left: 14,
                child: Row(
                  children: [
                    const Icon(Icons.timer_outlined, size: 14, color: Colors.white70),
                    const SizedBox(width: 4),
                    Text(
                      '${auction.timeRemaining.inHours}h ${auction.timeRemaining.inMinutes % 60}m Remaining',
                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
            ],
          ),

          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  auction.categoryName.toUpperCase(),
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.champagne,
                    letterSpacing: 1.8,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  auction.assetTitle,
                  style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 17),
                ),
                const SizedBox(height: 6),
                Text(
                  auction.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 12,
                    height: 1.35,
                    color: isDark ? Colors.white70 : Colors.black87,
                  ),
                ),
                const Divider(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'CURRENT BID (${auction.totalBidsCount} BIDS)',
                          style: LuxuryTypography.microCaps.copyWith(
                            fontSize: 9.5,
                            color: isDark ? Colors.white54 : Colors.black54,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '₹ ${(auction.currentBid / 10000000).toStringAsFixed(2)} Cr',
                          style: TextStyle(
                            color: LuxuryColors.champagne,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          'MIN INCREMENT',
                          style: LuxuryTypography.microCaps.copyWith(
                            fontSize: 9.5,
                            color: isDark ? Colors.white54 : Colors.black54,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '+₹ ${(auction.minBidIncrement / 100000).toStringAsFixed(0)} Lakh',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: isDark ? Colors.white70 : Colors.black87,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: LuxuryButton(
                        text: 'PLACE BINDING BID',
                        variant: LuxuryButtonVariant.gold,
                        height: 42,
                        onPressed: onPlaceBid,
                      ),
                    ),
                    const SizedBox(width: 10),
                    OutlinedButton(
                      onPressed: onViewHistory,
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                      ),
                      child: const Text('HISTORY', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
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
