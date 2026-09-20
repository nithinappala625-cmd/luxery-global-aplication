import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../models/listing.dart';
import '../../providers/wishlist_provider.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';
import 'luxury_image.dart';
import 'luxury_price.dart';

enum ListingCardLayout { horizontal, grid, compact }

class LuxuryListingCard extends ConsumerWidget {
  final LuxuryListing listing;
  final ListingCardLayout layout;
  final double? width;
  final VoidCallback? onTap;

  const LuxuryListingCard({
    super.key,
    required this.listing,
    this.layout = ListingCardLayout.horizontal,
    this.width,
    this.onTap,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSaved = ref.watch(wishlistProvider).contains(listing.id);

    final cardWidth = width ?? (layout == ListingCardLayout.horizontal ? 300.0 : double.infinity);
    final imageHeight = layout == ListingCardLayout.horizontal ? 210.0 : 240.0;

    return Container(
      width: cardWidth,
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(2),
          onTap: onTap ?? () {
            context.push('/listing/${listing.id}');
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Media Header with Badges & Wishlist
              Stack(
                children: [
                  LuxuryImage(
                    imageUrl: listing.coverImageUrl,
                    width: cardWidth,
                    height: imageHeight,
                    fit: BoxFit.cover,
                  ),
                  // Subtle gradient vignette at top for badge legibility
                  Positioned.fill(
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.center,
                          colors: [
                            Colors.black.withOpacity(0.55),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    ),
                  ),
                  // Top Row: Verification Badge + Wishlist button
                  Positioned(
                    top: 10,
                    left: 10,
                    right: 10,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        if (listing.isCuratorVerified)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                            decoration: BoxDecoration(
                              color: LuxuryColors.pureBlack.withOpacity(0.85),
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: LuxuryColors.champagne, width: 0.6),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(Icons.verified, size: 11, color: LuxuryColors.champagne),
                                const SizedBox(width: 4),
                                Text(
                                  'VERIFIED',
                                  style: LuxuryTypography.microCaps.copyWith(
                                    color: LuxuryColors.champagne,
                                    fontSize: 8,
                                    letterSpacing: 1.5,
                                  ),
                                ),
                              ],
                            ),
                          )
                        else
                          const SizedBox.shrink(),
                        GestureDetector(
                          onTap: () {
                            ref.read(wishlistProvider.notifier).toggleSave(listing.id);
                          },
                          child: Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: LuxuryColors.pureBlack.withOpacity(0.65),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              isSaved ? Icons.bookmark : Icons.bookmark_border,
                              size: 16,
                              color: isSaved ? LuxuryColors.champagne : LuxuryColors.pureWhite,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Year badge at bottom right of image
                  if (listing.year != null)
                    Positioned(
                      bottom: 8,
                      right: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: LuxuryColors.pureBlack.withOpacity(0.8),
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          listing.year.toString(),
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.pureWhite,
                            fontSize: 9,
                          ),
                        ),
                      ),
                    ),
                ],
              ),

              // Editorial Metadata Section
              Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Category & Brand
                    Row(
                      children: [
                        Text(
                          (listing.categoryName ?? 'EXCEPTIONAL ASSET').toUpperCase(),
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.champagne,
                            fontSize: 9,
                            letterSpacing: 1.8,
                          ),
                        ),
                        if (listing.brandName != null) ...[
                          Text(
                            ' • ',
                            style: TextStyle(color: LuxuryColors.mutedGrey, fontSize: 10),
                          ),
                          Flexible(
                            child: Text(
                              listing.brandName!.toUpperCase(),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: LuxuryTypography.microCaps.copyWith(
                                color: LuxuryColors.mutedGrey,
                                fontSize: 9,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 6),
                    // Title
                    Text(
                      listing.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: LuxuryTypography.editorialHeading3.copyWith(
                        color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 4),
                    // Location
                    Row(
                      children: [
                        const Icon(
                          Icons.location_on_outlined,
                          size: 13,
                          color: LuxuryColors.mutedGrey,
                        ),
                        const SizedBox(width: 3),
                        Expanded(
                          child: Text(
                            listing.location.formattedLocation,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: LuxuryTypography.bodySmall.copyWith(
                              color: LuxuryColors.mutedGrey,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                    const SizedBox(height: 8),
                    // Bottom Row: Price & Condition
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        LuxuryPrice(
                          amount: listing.price,
                          currency: listing.currency,
                          size: LuxuryPriceSize.medium,
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                        ),
                        Flexible(
                          child: Text(
                            listing.condition,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: LuxuryTypography.bodySmall.copyWith(
                              color: LuxuryColors.mutedGrey,
                              fontSize: 11,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
