import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_image.dart';
import '../../core/widgets/luxury_price.dart';
import '../../models/listing.dart';
import '../../providers/listings_provider.dart';
import '../../providers/wishlist_provider.dart';
import 'widgets/contact_unlock_dialog.dart';
import 'widgets/enquiry_dialog.dart';
import 'widgets/fullscreen_gallery.dart';

class ListingDetailScreen extends ConsumerStatefulWidget {
  final String listingId;

  const ListingDetailScreen({super.key, required this.listingId});

  @override
  ConsumerState<ListingDetailScreen> createState() => _ListingDetailScreenState();
}

class _ListingDetailScreenState extends ConsumerState<ListingDetailScreen> {
  int _activeImageIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(allListingsProvider.notifier).incrementViewCount(widget.listingId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final allListings = ref.watch(allListingsProvider);
    final listing = allListings.firstWhere(
      (l) => l.id == widget.listingId,
      orElse: () => allListings.first,
    );

    final isSaved = ref.watch(wishlistProvider).contains(listing.id);

    return Scaffold(
      appBar: LuxuryAppBar(
        showBack: true,
        title: listing.categoryName?.toUpperCase() ?? 'EXCEPTIONAL ASSET',
        actions: [
          IconButton(
            icon: Icon(
              isSaved ? Icons.bookmark : Icons.bookmark_border,
              color: isSaved ? LuxuryColors.champagne : null,
            ),
            onPressed: () {
              ref.read(wishlistProvider.notifier).toggleSave(listing.id);
            },
          ),
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Private salon invitation link copied to clipboard.'),
                  duration: Duration(seconds: 2),
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. Large Image Gallery
            _buildGallerySection(context, listing),

            const SizedBox(height: 20),

            // 2. Title, Hallmark & Location
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      VerificationBadge(isVerified: listing.isCuratorVerified),
                      if (listing.year != null)
                        Text(
                          'YEAR ${listing.year}',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.mutedGrey,
                            letterSpacing: 1.5,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    listing.title,
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: 8,
                    runSpacing: 4,
                    children: [
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.location_on_outlined, size: 15, color: LuxuryColors.mutedGrey),
                          const SizedBox(width: 4),
                          Text(
                            listing.location.formattedLocation,
                            style: LuxuryTypography.bodyMedium.copyWith(
                              color: LuxuryColors.mutedGrey,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                      Text('•', style: TextStyle(color: LuxuryColors.mutedGrey)),
                      Text(
                        'CONDITION: ${listing.condition.toUpperCase()}',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  // Price Banner
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
                      borderRadius: BorderRadius.circular(2),
                      border: Border.all(
                        color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                        width: 0.8,
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'VALUATION / ASKING PRICE',
                              style: LuxuryTypography.microCaps.copyWith(
                                color: LuxuryColors.mutedGrey,
                                letterSpacing: 1.5,
                              ),
                            ),
                            const SizedBox(height: 4),
                            LuxuryPrice(
                              amount: listing.price,
                              currency: listing.currency,
                              size: LuxuryPriceSize.large,
                              showCurrencyCode: true,
                              color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: isDark ? const Color(0xFF222222) : const Color(0xFFECE8DE),
                            borderRadius: BorderRadius.circular(2),
                          ),
                          child: Text(
                            'DIRECT POSSESSION',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal,
                              fontSize: 9,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 28),
            Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            const SizedBox(height: 24),

            // 3. Editorial Curatorial Description
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'CURATORIAL SUMMARY',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    listing.description,
                    style: LuxuryTypography.bodyLarge.copyWith(
                      color: isDark ? const Color(0xFFDDDDDD) : const Color(0xFF333333),
                      height: 1.65,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 28),
            Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            const SizedBox(height: 24),

            // 4. Detailed Technical Specifications
            if (listing.specifications.isNotEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'SPECIFICATIONS & PROVENANCE',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.0,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Container(
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
                        borderRadius: BorderRadius.circular(2),
                        border: Border.all(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                          width: 0.8,
                        ),
                      ),
                      child: Column(
                        children: listing.specifications.map((spec) {
                          final isLast = listing.specifications.last == spec;
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            decoration: BoxDecoration(
                              border: isLast
                                  ? null
                                  : Border(
                                      bottom: BorderSide(
                                        color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                                        width: 0.6,
                                      ),
                                    ),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: 140,
                                  child: Text(
                                    spec.key.toUpperCase(),
                                    style: LuxuryTypography.microCaps.copyWith(
                                      color: LuxuryColors.mutedGrey,
                                      fontSize: 9.5,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    spec.value,
                                    style: LuxuryTypography.bodyMedium.copyWith(
                                      fontWeight: FontWeight.w600,
                                      fontSize: 13,
                                      color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  ],
                ),
              ),

            const SizedBox(height: 28),
            Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            const SizedBox(height: 24),

            // 5. Verification Documents Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'DOCUMENTATION & CERTIFICATES',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildDocumentItem(
                    context,
                    title: 'Certificate of Origin & Authenticity',
                    source: 'Official Manufacturer Archive / GIA Dossier',
                    isVerified: true,
                  ),
                  const SizedBox(height: 8),
                  _buildDocumentItem(
                    context,
                    title: 'Service & Maintenance Records',
                    source: 'Authorized European Salons 2021-2025',
                    isVerified: true,
                  ),
                ],
              ),
            ),

            const SizedBox(height: 28),
            Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            const SizedBox(height: 24),

            // 6. Seller / Custodian Information
            if (listing.seller != null)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ASSET CUSTODIAN',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 2.0,
                      ),
                    ),
                    const SizedBox(height: 12),
                    InkWell(
                      onTap: () => context.push('/seller/${listing.sellerId}'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
                          borderRadius: BorderRadius.circular(2),
                          border: Border.all(
                            color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                            width: 0.8,
                          ),
                        ),
                        child: Row(
                          children: [
                            if (listing.seller?.avatarUrl != null)
                              ClipRRect(
                                borderRadius: BorderRadius.circular(2),
                                child: LuxuryImage(
                                  imageUrl: listing.seller!.avatarUrl!,
                                  width: 48,
                                  height: 48,
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
                                        listing.seller!.name,
                                        style: LuxuryTypography.editorialHeading3.copyWith(
                                          fontSize: 15,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      const Icon(Icons.verified, size: 14, color: LuxuryColors.champagne),
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    '${listing.seller!.sellerType.replaceAll('_', ' ').toUpperCase()} • ${listing.seller!.city ?? ''}',
                                    style: LuxuryTypography.microCaps.copyWith(
                                      color: LuxuryColors.mutedGrey,
                                      fontSize: 9,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Icon(
                              Icons.arrow_forward_ios,
                              size: 14,
                              color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),

            const SizedBox(height: 120), // Bottom padding for floating CTA
          ],
        ),
      ),

      // Persistent Bottom Action CTA Bar
      bottomSheet: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(
          color: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
          border: Border(
            top: BorderSide(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: Row(
            children: [
              Expanded(
                child: LuxuryButton(
                  text: 'ENQUIRE',
                  variant: LuxuryButtonVariant.secondary,
                  onPressed: () => EnquiryDialog.show(context, listing),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                flex: 2,
                child: LuxuryButton(
                  text: 'REQUEST SELLER CONTACT',
                  variant: LuxuryButtonVariant.gold,
                  onPressed: () => ContactUnlockDialog.show(context, listing),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildGallerySection(BuildContext context, LuxuryListing listing) {
    final images = listing.images;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Main Image Viewer
        GestureDetector(
          onTap: () => FullscreenGalleryViewer.open(context, images, _activeImageIndex),
          child: Stack(
            children: [
              SizedBox(
                height: 340,
                width: double.infinity,
                child: LuxuryImage(
                  imageUrl: images.isNotEmpty ? images[_activeImageIndex].originalUrl : listing.coverImageUrl,
                  fit: BoxFit.cover,
                ),
              ),
              // Fullscreen hint badge
              Positioned(
                bottom: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: LuxuryColors.pureBlack.withOpacity(0.75),
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.fullscreen, size: 14, color: LuxuryColors.pureWhite),
                      const SizedBox(width: 4),
                      Text(
                        '${_activeImageIndex + 1} / ${images.length}',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.pureWhite,
                          fontSize: 9,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),

        // Thumbnail strip
        if (images.length > 1)
          Container(
            height: 64,
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              scrollDirection: Axis.horizontal,
              itemCount: images.length,
              separatorBuilder: (context, index) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final isSelected = index == _activeImageIndex;
                return GestureDetector(
                  onTap: () => setState(() => _activeImageIndex = index),
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: isSelected
                            ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                            : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                        width: isSelected ? 1.5 : 0.8,
                      ),
                    ),
                    child: LuxuryImage(
                      imageUrl: images[index].originalUrl,
                      fit: BoxFit.cover,
                    ),
                  ),
                );
              },
            ),
          ),
      ],
    );
  }

  Widget _buildDocumentItem(
    BuildContext context, {
    required String title,
    required String source,
    required bool isVerified,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
      ),
      child: Row(
        children: [
          const Icon(Icons.description_outlined, size: 20, color: LuxuryColors.champagne),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: LuxuryTypography.bodyMedium.copyWith(
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  source,
                  style: LuxuryTypography.bodySmall.copyWith(
                    color: LuxuryColors.mutedGrey,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          if (isVerified)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: LuxuryColors.deepForestGreen.withOpacity(0.12),
                borderRadius: BorderRadius.circular(2),
              ),
              child: Text(
                'VERIFIED',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.deepForestGreen,
                  fontSize: 8.5,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
