import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_image.dart';
import '../../models/real_estate.dart';
import '../../providers/real_estate_provider.dart';

class RealEstateScreen extends ConsumerStatefulWidget {
  const RealEstateScreen({super.key});

  @override
  ConsumerState<RealEstateScreen> createState() => _RealEstateScreenState();
}

class _RealEstateScreenState extends ConsumerState<RealEstateScreen> {
  final List<String> _types = [
    'All',
    'Super Penthouse',
    'Private Island',
    'Waterfront Villa',
    'Historic Chateau',
    'Royal Palace',
  ];

  void _openInquirySheet(LuxuryRealEstate property) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF0D0D0D),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(color: LuxuryColors.goldBorder, width: 1.0),
      ),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 24,
            bottom: MediaQuery.of(context).viewInsets.bottom + 28,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'ACQUISITION DOSSIER',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: LuxuryColors.mutedGrey, size: 20),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                property.title,
                style: LuxuryTypography.editorialHeading2.copyWith(
                  color: LuxuryColors.pureWhite,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Offered at ${property.priceDisplay} • ${property.city}, ${property.country}',
                style: LuxuryTypography.bodyMedium.copyWith(
                  color: LuxuryColors.gold,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF141414),
                  border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Column(
                  children: [
                    _buildRow('Freehold Title', property.sovereignFreehold ? 'Sovereign 100% Freehold' : 'Leasehold'),
                    const SizedBox(height: 6),
                    _buildRow('Helipad Access', property.hasHelipad ? 'Certified Helipad On-Site' : 'Nearest Heliport 15m'),
                    const SizedBox(height: 6),
                    _buildRow('Private Marina', property.hasPrivateMarina ? 'Deepwater Berth Included' : 'Mooring by Arrangement'),
                    const SizedBox(height: 6),
                    _buildRow('Security Sanctuary', property.hasArmoredSecurityVault ? 'Ballistic Armored Panic Vault' : 'Perimeter Sensor Net'),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'DISPATCH PRIVATE ESCROW DOSSIER',
                backgroundColor: LuxuryColors.gold,
                textColor: LuxuryColors.pureBlack,
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      backgroundColor: const Color(0xFF161616),
                      content: Row(
                        children: [
                          const Icon(Icons.verified_user, color: LuxuryColors.gold, size: 18),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'Confidential NDA & Acquisition dossier sent to family office liaison.',
                              style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.pureWhite),
                            ),
                          ),
                        ],
                      ),
                      duration: const Duration(seconds: 4),
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        Text(value, style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.pureWhite, fontWeight: FontWeight.w500)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(realEstateProvider);
    final notifier = ref.read(realEstateProvider.notifier);

    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: const LuxuryAppBar(
        title: 'REAL ESTATE & ISLANDS',
        showBack: true,
        showSearch: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Hero Header
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: LuxuryColors.borderDark, width: 0.8)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'NP GROUPS SOVEREIGN DOMAINS',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Private Islands, Mega Penthouses & Historic Châteaux',
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: LuxuryColors.pureWhite,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Vetted sovereign freehold titles, fortified private retreats, and global architectural icons.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: LuxuryColors.mutedGrey,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Filter chips
          SliverToBoxAdapter(
            child: Container(
              height: 48,
              margin: const EdgeInsets.only(top: 12, bottom: 8),
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: _types.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final type = _types[i];
                  final isSelected = state.selectedType == type;
                  return ChoiceChip(
                    label: Text(
                      type.toUpperCase(),
                      style: LuxuryTypography.microCaps.copyWith(
                        color: isSelected ? LuxuryColors.pureBlack : LuxuryColors.platinum,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: LuxuryColors.gold,
                    backgroundColor: const Color(0xFF141414),
                    side: BorderSide(
                      color: isSelected ? LuxuryColors.gold : LuxuryColors.borderDark,
                      width: 0.8,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                    onSelected: (_) => notifier.setTypeFilter(type),
                  );
                },
              ),
            ),
          ),

          // Property Listings
          SliverPadding(
            padding: const EdgeInsets.all(20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final property = state.filteredListings[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    decoration: BoxDecoration(
                      color: LuxuryColors.darkCard,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Image Stack
                        Stack(
                          children: [
                            SizedBox(
                              height: 240,
                              width: double.infinity,
                              child: ClipRRect(
                                borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                                child: LuxuryImage(
                                  imageUrl: property.mediaUrls.isNotEmpty ? property.mediaUrls.first : '',
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            Positioned(
                              top: 12,
                              left: 12,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.pureBlack.withOpacity(0.85),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                                ),
                                child: Text(
                                  property.estateType.toUpperCase(),
                                  style: LuxuryTypography.microCaps.copyWith(
                                    color: LuxuryColors.gold,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 12,
                              right: 12,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.pureBlack.withOpacity(0.9),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: LuxuryColors.gold, width: 0.8),
                                ),
                                child: Text(
                                  property.priceDisplay,
                                  style: LuxuryTypography.priceMedium.copyWith(
                                    color: LuxuryColors.pureWhite,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),

                        // Details
                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${property.city.toUpperCase()}, ${property.country.toUpperCase()}',
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: LuxuryColors.champagne,
                                  letterSpacing: 1.8,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                property.title,
                                style: LuxuryTypography.editorialHeading2.copyWith(
                                  color: LuxuryColors.pureWhite,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                property.description,
                                style: LuxuryTypography.bodyMedium.copyWith(
                                  color: LuxuryColors.mutedGrey,
                                  height: 1.45,
                                ),
                                maxLines: 3,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(height: 14),

                              // Feature Badges
                              Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                children: [
                                  _featureBadge(Icons.bed, '${property.bedrooms} Beds'),
                                  _featureBadge(Icons.bathtub, '${property.bathrooms} Baths'),
                                  _featureBadge(Icons.square_foot, '${property.builtUpAreaSqFt.toInt()} sq ft'),
                                  if (property.hasHelipad)
                                    _featureBadge(Icons.flight_takeoff, 'Helipad', isGold: true),
                                  if (property.hasPrivateMarina)
                                    _featureBadge(Icons.sailing, 'Marina', isGold: true),
                                  if (property.hasArmoredSecurityVault)
                                    _featureBadge(Icons.shield, 'Armored Safe Room', isGold: true),
                                ],
                              ),
                              const SizedBox(height: 18),

                              // Action Button
                              LuxuryButton(
                                text: 'REQUEST ACQUISITION DOSSIER',
                                backgroundColor: LuxuryColors.gold,
                                textColor: LuxuryColors.pureBlack,
                                onPressed: () => _openInquirySheet(property),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: state.filteredListings.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _featureBadge(IconData icon, String text, {bool isGold = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFF181818),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isGold ? LuxuryColors.gold : LuxuryColors.borderDark,
          width: 0.8,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: isGold ? LuxuryColors.gold : LuxuryColors.mutedGrey),
          const SizedBox(width: 5),
          Text(
            text,
            style: LuxuryTypography.microCaps.copyWith(
              color: isGold ? LuxuryColors.goldLight : LuxuryColors.platinum,
              fontWeight: isGold ? FontWeight.bold : FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
