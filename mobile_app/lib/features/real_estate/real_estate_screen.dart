import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';
import '../../models/real_estate.dart';
import '../../providers/real_estate_provider.dart';

class RealEstateScreen extends ConsumerStatefulWidget {
  const RealEstateScreen({super.key});

  @override
  ConsumerState<RealEstateScreen> createState() => _RealEstateScreenState();
}

class _RealEstateScreenState extends ConsumerState<RealEstateScreen> {
  String _mode = 'BUY';
  final List<String> _types = [
    'All',
    'Private Island',
    'Royal Palace',
    'Historic Chateau',
    'Waterfront Villa',
    'Super Penthouse',
  ];

  void _openInquirySheet(LuxuryRealEstate property, bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final sheetBg = isDark ? const Color(0xFF0D0D0D) : Colors.white;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: sheetBg,
      shape: RoundedRectangleBorder(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(
          color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
          width: 1.0,
        ),
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
                style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary),
              ),
              const SizedBox(height: 6),
              Text(
                'Price: ${property.priceDisplay} • ${property.city}, ${property.country}',
                style: LuxuryTypography.bodySmall.copyWith(color: goldColor, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Text(
                'Includes confidential title deed verification, escrow guarantees, and private aviation site inspection arrangement.',
                style: LuxuryTypography.bodySmall.copyWith(color: textSecondary),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'CONNECT PRIVATE SOLICITOR',
                variant: LuxuryButtonVariant.gold,
                height: 48,
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      backgroundColor: isDark ? const Color(0xFF161616) : Colors.white,
                      content: Text(
                        'Private real estate solicitor assigned. Dossier dispatched.',
                        style: LuxuryTypography.bodySmall.copyWith(color: textPrimary),
                      ),
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

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(realEstateProvider);
    final notifier = ref.read(realEstateProvider.notifier);
    final bg = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    return Scaffold(
      backgroundColor: bg,
      appBar: const LuxuryAppBar(
        title: 'SOVEREIGN DOMAINS',
        showBack: true,
        showSearch: true,
        showThemeToggle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SectionActionBar(
              selectedMode: _mode,
              onModeChanged: (m) => setState(() => _mode = m),
              isDark: isDark,
              buyLabel: '✦ ACQUIRE',
              bookLabel: '📍 SITE VISIT',
              sellLabel: '♛ CONSIGN',
            ),

            // Subcategories Pill Strip
            SizedBox(
              height: 44,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _types.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final type = _types[i];
                  final isSelected = state.selectedType == type;
                  return GestureDetector(
                    onTap: () => notifier.setTypeFilter(type),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                      decoration: BoxDecoration(
                        color: isSelected ? LuxuryColors.gold : Colors.transparent,
                        border: Border.all(
                          color: isSelected ? LuxuryColors.gold : LuxuryColors.goldBorder,
                          width: 0.8,
                        ),
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: Text(
                        type.toUpperCase(),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isSelected
                              ? Colors.black
                              : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
                          fontSize: 10,
                          letterSpacing: 1.2,
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),

            if (_mode == 'SELL')
              _buildConsignmentPanel(isDark)
            else if (_mode == 'BOOK')
              _buildSiteVisitPanel(isDark, state.filteredListings)
            else
              _buildGrid(isDark, state.filteredListings),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildGrid(bool isDark, List<LuxuryRealEstate> listings) {
    if (listings.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(40),
        child: Center(
          child: Text(
            'No matching sovereign estates found.',
            style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
          ),
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.62,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: listings.length,
        itemBuilder: (context, index) {
          final prop = listings[index];
          final imgUrl = prop.mediaUrls.isNotEmpty ? prop.mediaUrls.first : '';
          final spec = '${prop.bedrooms} Bed • ${prop.builtUpAreaSqFt.toInt()} sq ft';

          return LuxuryAssetCard(
            imageUrl: imgUrl,
            title: prop.title,
            category: prop.estateType.toUpperCase(),
            price: prop.priceDisplay,
            subtitle: spec,
            badgeText: prop.hasHelipad ? 'HELIPAD' : (prop.hasPrivateMarina ? 'MARINA' : null),
            isDark: isDark,
            onBuy: () => _openInquirySheet(prop, isDark),
            onBook: () => _openInquirySheet(prop, isDark),
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () => _openInquirySheet(prop, isDark),
          );
        },
      ),
    );
  }

  Widget _buildSiteVisitPanel(bool isDark, List<LuxuryRealEstate> listings) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF0F1A12), Color(0xFF050505)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.flight_takeoff, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'PRIVATE HELICOPTER SITE INSPECTION',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Confidential Aerial & Ground\nEstate Site Tours.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Fly directly to private islands, palaces, or châteaux via Sikorsky VIP helicopter. Private security detail and title solicitors included.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'SCHEDULE VIP SITE INSPECTION',
              variant: LuxuryButtonVariant.gold,
              height: 50,
              width: double.infinity,
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Site inspection flight desk notified. Concierge will contact you.'),
                    backgroundColor: Color(0xFF161616),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConsignmentPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF1A1508), Color(0xFF050505)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.villa, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'SOVEREIGN REAL ESTATE CONSIGNMENT',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Consign Your Sovereign Domain\nto the Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Private islands, heritage forts, palaces, and ultra-penthouses. Confidential non-MLS private treaty listings marketed exclusively to UHNWIs.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'CONSIGN MY ESTATE',
              variant: LuxuryButtonVariant.gold,
              height: 50,
              width: double.infinity,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
