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

  void _openInquirySheet(LuxuryRealEstate property, bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final cardBg = isDark ? const Color(0xFF141414) : LuxuryColors.lightCardElevated;
    final sheetBg = isDark ? const Color(0xFF0D0D0D) : Colors.white;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: sheetBg,
      shape: RoundedRectangleBorder(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight, width: 1.0),
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
                      color: goldColor,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.close, color: textSecondary, size: 20),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                property.title,
                style: LuxuryTypography.editorialHeading2.copyWith(
                  color: textPrimary,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Offered at ${property.priceDisplay} • ${property.city}, ${property.country}',
                style: LuxuryTypography.bodyMedium.copyWith(
                  color: goldColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: cardBg,
                  border: Border.all(color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight, width: 0.8),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Column(
                  children: [
                    _buildRow('Freehold Title', property.sovereignFreehold ? 'Sovereign 100% Freehold' : 'Leasehold', textSecondary, textPrimary),
                    const SizedBox(height: 6),
                    _buildRow('Helipad Access', property.hasHelipad ? 'Certified Helipad On-Site' : 'Nearest Heliport 15m', textSecondary, textPrimary),
                    const SizedBox(height: 6),
                    _buildRow('Private Marina', property.hasPrivateMarina ? 'Deepwater Berth Included' : 'Mooring by Arrangement', textSecondary, textPrimary),
                    const SizedBox(height: 6),
                    _buildRow('Security Sanctuary', property.hasArmoredSecurityVault ? 'Ballistic Armored Panic Vault' : 'Perimeter Sensor Net', textSecondary, textPrimary),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'TRANSACT VIA NP ESCROW',
                variant: LuxuryButtonVariant.gold,
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Private acquisition request dispatched to Senior Escrow Partner for ${property.title}'),
                      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
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

  Widget _buildRow(String label, String value, Color labelColor, Color valColor) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: LuxuryTypography.bodySmall.copyWith(color: labelColor)),
        Text(value, style: LuxuryTypography.bodySmall.copyWith(color: valColor, fontWeight: FontWeight.w600)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(realEstateProvider);
    final notifier = ref.read(realEstateProvider.notifier);

    final bgColor = LuxuryColors.scaffoldBg(isDark);
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Scaffold(
      backgroundColor: bgColor,
      appBar: const LuxuryAppBar(
        title: 'REAL ESTATE & ISLANDS',
        showBack: true,
        showSearch: true,
        showThemeToggle: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Hero Header
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: borderColor, width: 0.8)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'NP GROUPS SOVEREIGN DOMAINS',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: goldColor,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Private Islands, Mega Penthouses & Historic Châteaux',
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Vetted sovereign freehold titles, fortified private retreats, and global architectural icons.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: textSecondary,
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
                        color: isSelected
                            ? LuxuryColors.pureWhite
                            : (isDark ? LuxuryColors.platinum : LuxuryColors.darkOnyx),
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: goldColor,
                    backgroundColor: isDark ? const Color(0xFF141414) : LuxuryColors.lightCard,
                    side: BorderSide(
                      color: isSelected ? goldColor : borderColor,
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
                      color: cardBg,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(
                        color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
                        width: 0.8,
                      ),
                      boxShadow: isDark
                          ? []
                          : [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.04),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
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
                                  color: Colors.black.withValues(alpha: 0.85),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                                ),
                                child: Text(
                                  property.estateType.toUpperCase(),
                                  style: LuxuryTypography.microCaps.copyWith(
                                    color: LuxuryColors.goldLight,
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
                                  color: Colors.black.withValues(alpha: 0.9),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: goldColor, width: 0.8),
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
                                  color: goldColor,
                                  letterSpacing: 1.8,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                property.title,
                                style: LuxuryTypography.editorialHeading2.copyWith(
                                  color: textPrimary,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                property.description,
                                style: LuxuryTypography.bodyMedium.copyWith(
                                  color: textSecondary,
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
                                  _featureBadge(Icons.bed, '${property.bedrooms} Beds', isDark),
                                  _featureBadge(Icons.bathtub, '${property.bathrooms} Baths', isDark),
                                  _featureBadge(Icons.square_foot, '${property.builtUpAreaSqFt.toInt()} sq ft', isDark),
                                  if (property.hasHelipad)
                                    _featureBadge(Icons.flight_takeoff, 'Helipad', isDark, isHighlight: true),
                                  if (property.hasPrivateMarina)
                                    _featureBadge(Icons.sailing, 'Marina', isDark, isHighlight: true),
                                  if (property.hasArmoredSecurityVault)
                                    _featureBadge(Icons.shield, 'Vault Room', isDark, isHighlight: true),
                                ],
                              ),

                              const SizedBox(height: 18),

                              // Action Row
                              Row(
                                children: [
                                  Expanded(
                                    child: LuxuryButton(
                                      text: 'INQUIRE ESCROW DOSSIER',
                                      variant: LuxuryButtonVariant.gold,
                                      height: 44,
                                      onPressed: () => _openInquirySheet(property, isDark),
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
                },
                childCount: state.filteredListings.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _featureBadge(IconData icon, String text, bool isDark, {bool isHighlight = false}) {
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    return Container(
      constraints: const BoxConstraints(maxWidth: 280),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isHighlight
            ? goldColor.withValues(alpha: 0.16)
            : (isDark ? const Color(0xFF181818) : LuxuryColors.lightCardElevated),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isHighlight ? goldColor : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          width: 0.6,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: isHighlight ? goldColor : (isDark ? LuxuryColors.silver : LuxuryColors.slate)),
          const SizedBox(width: 4),
          Flexible(
            child: Text(
              text,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: isHighlight ? goldColor : LuxuryColors.textPrimary(isDark),
                fontSize: 10.5,
                fontWeight: isHighlight ? FontWeight.bold : FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
