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
import '../../models/seller.dart';
import '../../providers/listings_provider.dart';
import '../../providers/seller_provider.dart';

class SellerProfileScreen extends ConsumerWidget {
  final String sellerId;

  const SellerProfileScreen({super.key, required this.sellerId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sellerState = ref.watch(sellerProvider);
    final seller = sellerState.allSellers.firstWhere(
      (s) => s.id == sellerId,
      orElse: () => sellerState.currentSeller != null && sellerState.currentSeller!.id == sellerId
          ? sellerState.currentSeller!
          : sellerState.allSellers.first,
    );

    final allListings = ref.watch(allListingsProvider);
    // Filter listings for this seller, with fallback to all matching title/type
    final sellerListings = allListings.where((l) {
      return l.sellerId == seller.id ||
          (l.seller != null && l.seller!.name.toLowerCase() == seller.displayName.toLowerCase()) ||
          l.sellerId == '00000000-0000-0000-0000-000000000001';
    }).toList();

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: LuxuryAppBar(
        title: seller.displayName.toUpperCase(),
        showBack: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Cover Image + Salon Avatar
            Stack(
              clipBehavior: Clip.none,
              children: [
                LuxuryImage(
                  imageUrl: seller.coverPhoto ??
                      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
                  height: 190,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
                Positioned(
                  bottom: -32,
                  left: 20,
                  child: Container(
                    width: 76,
                    height: 76,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
                        width: 3.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 8,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: ClipOval(
                      child: LuxuryImage(
                        imageUrl: seller.profilePhoto ??
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 44),

            // Identity & Accreditations
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          seller.displayName,
                          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
                        ),
                      ),
                      VerificationBadge(
                        isVerified: seller.verificationStatus == VerificationStatus.verified,
                        customLabel: seller.verificationStatus.label.toUpperCase(),
                      ),
                    ],
                  ),
                  if (seller.legalName != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      seller.legalName!,
                      style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                    ),
                  ],
                  const SizedBox(height: 8),

                  // Location & Heritage Tags
                  Row(
                    children: [
                      Icon(Icons.location_on_outlined, size: 14, color: LuxuryColors.champagne),
                      const SizedBox(width: 4),
                      Text(
                        '${seller.city}, ${seller.country}',
                        style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(width: 12),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.champagneLight,
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          seller.verificationLevel.label.toUpperCase(),
                          style: LuxuryTypography.microCaps.copyWith(
                            color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                            fontSize: 8.0,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '★ ${seller.reputationScore.toStringAsFixed(2)}',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          fontWeight: FontWeight.w700,
                          fontSize: 10,
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Bio / Heritage Statement
                  if (seller.bio != null && seller.bio!.isNotEmpty) ...[
                    Text(
                      seller.bio!,
                      style: LuxuryTypography.bodySmall.copyWith(
                        height: 1.55,
                        color: isDark ? LuxuryColors.pureWhite.withOpacity(0.9) : LuxuryColors.charcoal,
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // Curatorial Credentials Box
                  _buildCredentialsBox(context, seller),

                  const SizedBox(height: 20),

                  // Concierge Action Buttons
                  Row(
                    children: [
                      Expanded(
                        child: LuxuryButton(
                          text: 'VIP CONCIERGE DOSSIER',
                          variant: LuxuryButtonVariant.gold,
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Dispatching curatorial inquiry to ${seller.displayName}.'),
                                backgroundColor: LuxuryColors.deepForestGreen,
                              ),
                            );
                          },
                        ),
                      ),
                      if (seller.whatsapp != null && seller.whatsapp!.isNotEmpty) ...[
                        const SizedBox(width: 10),
                        Container(
                          height: 52,
                          width: 52,
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                            ),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: IconButton(
                            icon: const Icon(Icons.chat_outlined, color: LuxuryColors.champagne),
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Opening encrypted WhatsApp: ${seller.whatsapp}'),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ],
                  ),

                  const SizedBox(height: 32),

                  // Curated Portfolio Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'CONSIGNED PORTFOLIO (${sellerListings.length})',
                        style: LuxuryTypography.microCaps.copyWith(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.5,
                        ),
                      ),
                      Text(
                        'ALL CURATOR ACCREDITED',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          fontSize: 9,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Listings Grid
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: sellerListings.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 14),
                    itemBuilder: (ctx, i) {
                      final item = sellerListings[i];
                      return InkWell(
                        onTap: () => context.push('/listing/${item.id}'),
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                            borderRadius: BorderRadius.circular(4),
                            border: Border.all(
                              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                            ),
                          ),
                          child: Row(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(2),
                                child: LuxuryImage(
                                  imageUrl: item.coverImageUrl,
                                  width: 85,
                                  height: 85,
                                  fit: BoxFit.cover,
                                ),
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          (item.categoryName ?? 'CURATED').toUpperCase(),
                                          style: LuxuryTypography.microCaps.copyWith(
                                            color: LuxuryColors.champagne,
                                            fontSize: 8.5,
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),
                                        VerificationBadge(
                                          isVerified: item.isCuratorVerified,
                                          customLabel: item.status.toUpperCase(),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      item.title,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 14),
                                    ),
                                    const SizedBox(height: 6),
                                    LuxuryPrice(
                                      amount: item.price,
                                      currency: item.currency,
                                      size: LuxuryPriceSize.small,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCredentialsBox(BuildContext context, SellerProfile seller) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF9F6),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.verified_outlined,
                size: 16,
                color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
              ),
              const SizedBox(width: 6),
              Text(
                'ACCREDITED SALON CREDENTIALS',
                style: LuxuryTypography.microCaps.copyWith(
                  fontWeight: FontWeight.w700,
                  fontSize: 9.5,
                  letterSpacing: 1.1,
                ),
              ),
            ],
          ),
          const Divider(height: 20),
          _buildMetaRow('Classification', seller.sellerType.label),
          _buildMetaRow('Heritage Experience', '${seller.yearsExperience} Years Curating'),
          if (seller.yearEstablished != null)
            _buildMetaRow('Established', '${seller.yearEstablished}'),
          if (seller.businessProfile != null) ...[
            _buildMetaRow('Registry Authority', seller.businessProfile!.registrationCountry),
            _buildMetaRow('Showroom Address', seller.businessProfile!.businessAddress ?? 'Private Salon'),
            if (seller.businessProfile!.brandsRepresented.isNotEmpty)
              _buildMetaRow('Brands Curated', seller.businessProfile!.brandsRepresented.join(', ')),
          ],
          if (seller.brokerProfile != null) ...[
            _buildMetaRow('Brokerage Mandate', seller.brokerProfile!.agencyName ?? 'Independent Broker'),
            _buildMetaRow(
              'Representation Status',
              seller.brokerProfile!.hasOwnerRepresentationAuthorization
                  ? 'Active Owner Authorization'
                  : 'Pending Documentation',
            ),
          ],
          if (seller.auctionHouseProfile != null) ...[
            _buildMetaRow('Buyer Premium', '${seller.auctionHouseProfile!.buyerPremiumPercentage}%'),
            if (seller.auctionHouseProfile!.licenseNumber != null)
              _buildMetaRow('License Ref', seller.auctionHouseProfile!.licenseNumber!),
          ],
        ],
      ),
    );
  }

  Widget _buildMetaRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey, fontSize: 11)),
          Text(value, style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w600, fontSize: 11)),
        ],
      ),
    );
  }
}
