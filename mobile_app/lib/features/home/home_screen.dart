import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_listing_card.dart';
import '../../core/widgets/luxury_image.dart';
import '../../providers/categories_provider.dart';
import '../../providers/listings_provider.dart';
import '../../providers/auctions_provider.dart';
import '../../providers/rentals_provider.dart';
import '../../providers/aviation_provider.dart';
import '../../providers/real_estate_provider.dart';
import '../../providers/lockers_provider.dart';
import '../../providers/crew_provider.dart';
import 'widgets/curation_statement.dart';
import 'widgets/hero_banner.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  String _selectedMode = 'BUY'; // 'BUY', 'RENT', 'SELL'
  String _selectedSubcategoryPill = 'ALL';

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final categories = ref.watch(categoriesProvider);
    final listings = ref.watch(listingsProvider);
    final auctionsState = ref.watch(auctionsProvider);
    final rentalsState = ref.watch(rentalsProvider);
    final aviationState = ref.watch(aviationProvider);
    final realEstateState = ref.watch(realEstateProvider);
    final lockersState = ref.watch(lockersProvider);
    final crewState = ref.watch(crewProvider);

    final bgColor = LuxuryColors.scaffoldBg(isDark);
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final borderColor = LuxuryColors.border(isDark);

    return Scaffold(
      backgroundColor: bgColor,
      appBar: const LuxuryAppBar(
        showBack: false,
        showSearch: true,
        showWishlist: true,
        showThemeToggle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const HomeHeroBanner(),

            // ==========================================
            // TOP ACTION SELECTOR: BUY • RENT • SELL
            // ==========================================
            Container(
              margin: const EdgeInsets.fromLTRB(16, 20, 16, 12),
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF101010) : LuxuryColors.lightCard,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
                  width: 1.0,
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
              child: Row(
                children: [
                  _buildModeTab('BUY', '✦ BUY ASSETS', isDark),
                  _buildModeTab('RENT', '✈ RENT FLEET', isDark),
                  _buildModeTab('SELL', '👑 SELL & CONSIGN', isDark),
                ],
              ),
            ),

            const SizedBox(height: 12),

            // Mode Content Router
            if (_selectedMode == 'BUY') ...[
              _buildBuySubcategoryPills(isDark),
              const SizedBox(height: 20),
              _buildBuySection(isDark, categories, realEstateState, lockersState, auctionsState, listings, aviationState),
            ] else if (_selectedMode == 'RENT') ...[
              _buildRentSection(isDark, rentalsState, aviationState, crewState),
            ] else ...[
              _buildSellConsignSection(isDark),
            ],

            const SizedBox(height: 36),
            _buildWealthTierMembershipCard(isDark),
            const SizedBox(height: 36),
            _buildPrivateRequestBanner(isDark),
            const SizedBox(height: 36),
            const CurationStatement(),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }

  Widget _buildModeTab(String modeKey, String label, bool isDark) {
    final isSelected = _selectedMode == modeKey;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedMode = modeKey),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected
                ? (isDark ? LuxuryColors.gold : LuxuryColors.goldDark)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(2),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: LuxuryTypography.microCaps.copyWith(
              color: isSelected
                  ? LuxuryColors.pureWhite
                  : (isDark ? LuxuryColors.platinum : LuxuryColors.darkOnyx),
              fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
              fontSize: 10.5,
              letterSpacing: 1.0,
            ),
          ),
        ),
      ),
    );
  }

  // ==========================================
  // SUBCATEGORY PILL BAR (Horizontal Carousel)
  // ==========================================
  Widget _buildBuySubcategoryPills(bool isDark) {
    final subcategories = [
      {'id': 'ALL', 'label': '✦ ALL ASSETS', 'icon': Icons.auto_awesome},
      {'id': 'FAST_CARS', 'label': '🏎️ FAST SUPERCARS', 'icon': Icons.flash_on},
      {'id': 'COMFY_CARS', 'label': '👑 COMFY LIMOUSINES', 'icon': Icons.airline_seat_recline_extra},
      {'id': 'VINTAGE_CARS', 'label': '🏛️ VINTAGE CARS', 'icon': Icons.history_edu},
      {'id': 'JETS', 'label': '✈️ PRIVATE JETS', 'icon': Icons.flight_takeoff},
      {'id': 'HELICOPTERS', 'label': '🚁 VIP HELICOPTERS', 'icon': Icons.toys},
      {'id': 'ISLANDS', 'label': '🏝️ PRIVATE ISLANDS', 'icon': Icons.wb_sunny},
      {'id': 'FORTS', 'label': '🏰 FORTS & PALACES', 'icon': Icons.castle},
      {'id': 'VILLAS', 'label': '💎 ULTRA VILLAS', 'icon': Icons.villa},
      {'id': 'PENTHOUSES', 'label': '🏙️ SKY PENTHOUSES', 'icon': Icons.apartment},
      {'id': 'HIGH_COMPLICATIONS', 'label': '⏱️ HIGH COMPLICATIONS', 'icon': Icons.watch},
      {'id': 'VINTAGE_WATCHES', 'label': '🕰️ VINTAGE WATCHES', 'icon': Icons.alarm_on},
      {'id': 'NATURAL_DIAMONDS', 'label': '💎 NATURAL DIAMONDS', 'icon': Icons.diamond},
      {'id': 'LAB_DIAMONDS', 'label': '🧪 LAB DIAMONDS', 'icon': Icons.science},
      {'id': 'RARE_GEMS', 'label': '🟢 RARE EARTH GEMS', 'icon': Icons.spa},
      {'id': 'GOLD', 'label': '🪙 24K PURE GOLD', 'icon': Icons.monetization_on},
      {'id': 'LOCKERS', 'label': '🛡️ HIGH-SECURITY SAFES', 'icon': Icons.shield},
      {'id': 'YACHTS', 'label': '🛥️ MEGA SUPERYACHTS', 'icon': Icons.directions_boat},
    ];

    return SizedBox(
      height: 38,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        itemCount: subcategories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final item = subcategories[index];
          final isSelected = _selectedSubcategoryPill == item['id'];
          final activeColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
          final inactiveBg = isDark ? LuxuryColors.darkCard : LuxuryColors.lightCard;
          final inactiveBorder = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;
          final inactiveText = isDark ? LuxuryColors.platinum : LuxuryColors.darkOnyx;

          return GestureDetector(
            onTap: () {
              setState(() => _selectedSubcategoryPill = item['id'] as String);
              _handleSubcategoryNavigation(item['id'] as String);
            },
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(
                color: isSelected ? activeColor : inactiveBg,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? activeColor : inactiveBorder,
                  width: 0.9,
                ),
              ),
              child: Text(
                item['label'] as String,
                style: LuxuryTypography.microCaps.copyWith(
                  color: isSelected ? LuxuryColors.pureWhite : inactiveText,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                  fontSize: 10.5,
                  letterSpacing: 0.8,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  void _handleSubcategoryNavigation(String subcategoryKey) {
    switch (subcategoryKey) {
      case 'ISLANDS':
      case 'FORTS':
      case 'VILLAS':
      case 'PENTHOUSES':
        context.push('/real-estate');
        break;
      case 'JETS':
      case 'HELICOPTERS':
        context.push('/aviation');
        break;
      case 'LOCKERS':
        context.push('/lockers');
        break;
      case 'NATURAL_DIAMONDS':
      case 'LAB_DIAMONDS':
      case 'RARE_GEMS':
      case 'GOLD':
        context.push('/materials');
        break;
      case 'FAST_CARS':
      case 'COMFY_CARS':
      case 'VINTAGE_CARS':
        ref.read(listingFilterProvider.notifier).setCategory('cat-cars');
        context.go('/discover');
        break;
      case 'HIGH_COMPLICATIONS':
      case 'VINTAGE_WATCHES':
        ref.read(listingFilterProvider.notifier).setCategory('cat-watches');
        context.go('/discover');
        break;
      default:
        break;
    }
  }

  // ==========================================
  // BUY SECTION: Curated Salons & Spotlights
  // ==========================================
  Widget _buildBuySection(
    bool isDark,
    categories,
    realEstateState,
    lockersState,
    auctionsState,
    listings,
    aviationState,
  ) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. Curated Salon Circles/Thumbnails
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('NP GROUPS CURATED SALONS', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('EXPLORE BY VERTICAL', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.go('/discover'),
                child: Text('ALL SALONS', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 155,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: categories.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final cat = categories[index];
              return GestureDetector(
                onTap: () {
                  if (cat.slug == 'real_estate') {
                    context.push('/real-estate');
                  } else if (cat.slug == 'lockers') {
                    context.push('/lockers');
                  } else if (cat.slug == 'crew') {
                    context.push('/crew');
                  } else if (cat.slug == 'rentals') {
                    context.push('/rentals');
                  } else if (cat.slug == 'aviation') {
                    context.push('/aviation');
                  } else if (cat.slug == 'materials') {
                    context.push('/materials');
                  } else if (cat.slug == 'auctions') {
                    context.push('/auctions');
                  } else {
                    ref.read(listingFilterProvider.notifier).setCategory(cat.id);
                    context.go('/discover');
                  }
                },
                child: Container(
                  width: 140,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                    boxShadow: isDark
                        ? []
                        : [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: Image.network(
                          cat.bannerUrl,
                          height: 85,
                          width: double.infinity,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => Container(
                            height: 85,
                            color: isDark ? const Color(0xFF1E1E1E) : const Color(0xFFEFEFEF),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              cat.name,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: LuxuryTypography.bodyMedium.copyWith(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w600,
                                color: textPrimary,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              cat.tagline ?? 'Curated Salon',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: LuxuryTypography.bodySmall.copyWith(
                                fontSize: 9.5,
                                color: goldAccent,
                              ),
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
        ),

        const SizedBox(height: 32),

        // 2. Spotlight: Sovereign Real Estate & Private Islands
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('SOVEREIGN DOMAINS', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('ISLANDS, FORTS & VILLAS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/real-estate'),
                child: Text('VIEW ALL (48)', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 260,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: realEstateState.listings.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final prop = realEstateState.listings[index];
              return GestureDetector(
                onTap: () => context.push('/real-estate'),
                child: Container(
                  width: 260,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                    boxShadow: isDark
                        ? []
                        : [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Stack(
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: LuxuryImage(
                              imageUrl: prop.mediaUrls.first,
                              height: 140,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Positioned(
                            top: 8,
                            left: 8,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                              decoration: BoxDecoration(
                                color: Colors.black.withValues(alpha: 0.85),
                                borderRadius: BorderRadius.circular(2),
                              ),
                              child: Text(
                                prop.estateType.toUpperCase(),
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: LuxuryColors.goldLight,
                                  fontSize: 8.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          if (prop.hasHelipad)
                            Positioned(
                              top: 8,
                              right: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.gold.withValues(alpha: 0.9),
                                  borderRadius: BorderRadius.circular(2),
                                ),
                                child: const Text(
                                  '🚁 HELIPAD',
                                  style: TextStyle(color: Colors.black, fontSize: 8, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              prop.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontWeight: FontWeight.bold, color: textPrimary, fontSize: 13),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              prop.priceDisplay,
                              style: TextStyle(color: goldAccent, fontWeight: FontWeight.bold, fontSize: 12.5),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${prop.location} • ${prop.builtUpAreaSqFt.toInt()} sq ft',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(color: textSecondary, fontSize: 10.5),
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
        ),

        const SizedBox(height: 32),

        // 3. Spotlight: Private Aviation & VIP Helicopters
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('PRIVATE AVIATION HANGAR', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('JETS & VIP HELICOPTERS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/aviation'),
                child: Text('VIEW HANGAR', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 260,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: aviationState.jets.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final jet = aviationState.jets[index];
              return GestureDetector(
                onTap: () => context.push('/aviation'),
                child: Container(
                  width: 260,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                    boxShadow: isDark
                        ? []
                        : [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Stack(
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: LuxuryImage(
                              imageUrl: jet.imageUrl,
                              height: 140,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Positioned(
                            top: 8,
                            left: 8,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                              decoration: BoxDecoration(
                                color: Colors.black.withValues(alpha: 0.85),
                                borderRadius: BorderRadius.circular(2),
                              ),
                              child: Text(
                                jet.category.toUpperCase(),
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: LuxuryColors.goldLight,
                                  fontSize: 8.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              jet.model,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontWeight: FontWeight.bold, color: textPrimary, fontSize: 13),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '₹${(jet.purchasePrice / 10000000).toStringAsFixed(1)} Cr Acquisition',
                              style: TextStyle(color: goldAccent, fontWeight: FontWeight.bold, fontSize: 12.5),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${jet.rangeNm} nm Range • ${jet.passengerCapacity} VIP Seats',
                              style: TextStyle(color: textSecondary, fontSize: 10.5),
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
        ),

        const SizedBox(height: 32),

        // 4. Spotlight: High-Security Vaults & Armored Safes
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('HIGH-SECURITY PROTECTION', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('VAULTS & ARMORED SAFES', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/lockers'),
                child: Text('VIEW ALL SAFES', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 260,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: lockersState.lockers.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final locker = lockersState.lockers[index];
              return GestureDetector(
                onTap: () => context.push('/lockers'),
                child: Container(
                  width: 250,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                    boxShadow: isDark
                        ? []
                        : [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(
                          imageUrl: locker.mediaUrls.first,
                          height: 135,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              locker.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontWeight: FontWeight.bold, color: textPrimary, fontSize: 12.5),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              locker.priceDisplay,
                              style: TextStyle(color: goldAccent, fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${locker.manufacturer} • ${locker.securityRating}',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(color: textSecondary, fontSize: 10.5),
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
        ),

        const SizedBox(height: 32),

        // 5. Live VIP Auctions Floor
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 20),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF111111) : LuxuryColors.lightCard,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(
              color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
              width: 1.0,
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: Colors.redAccent,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Flexible(
                          child: Text(
                            'NP LIVE AUCTIONS FLOOR',
                            overflow: TextOverflow.ellipsis,
                            style: LuxuryTypography.microCaps.copyWith(
                              color: goldAccent,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.0,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '${auctionsState.auctions.length} LIVE LOTS',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: textSecondary,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              if (auctionsState.auctions.isNotEmpty) ...[
                Text(
                  auctionsState.auctions.first.assetTitle,
                  style: LuxuryTypography.editorialHeading2.copyWith(
                    fontSize: 17,
                    color: textPrimary,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      child: Text(
                        'CURRENT HIGH BID',
                        overflow: TextOverflow.ellipsis,
                        style: LuxuryTypography.microCaps.copyWith(fontSize: 9.5, color: textSecondary),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '₹${(auctionsState.auctions.first.currentBid / 100000).toStringAsFixed(1)} LAKHS',
                      style: LuxuryTypography.priceMedium.copyWith(
                        color: goldAccent,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
              const SizedBox(height: 14),
              LuxuryButton(
                text: 'ENTER LIVE BIDDING FLOOR',
                variant: LuxuryButtonVariant.gold,
                height: 40,
                onPressed: () => context.push('/auctions'),
              ),
            ],
          ),
        ),

        const SizedBox(height: 32),

        // 6. Featured Curated Acquisitions
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('COLLECTOR HIGHLIGHTS', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.2)),
              const SizedBox(height: 4),
              Text('FEATURED ACQUISITIONS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary)),
            ],
          ),
        ),
        const SizedBox(height: 14),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: listings.take(4).length,
          separatorBuilder: (_, __) => const SizedBox(height: 16),
          itemBuilder: (context, index) {
            final item = listings[index];
            return LuxuryListingCard(
              listing: item,
              onTap: () => context.push('/listing/${item.id}'),
            );
          },
        ),
      ],
    );
  }

  // ==========================================
  // RENT SECTION: Fleet, Jets & Elite Crew
  // ==========================================
  Widget _buildRentSection(bool isDark, rentalsState, aviationState, crewState) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. Luxe Drive Fleet
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('NP LUXE DRIVE FLEET', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('WEDDINGS, GALAS & CONVOYS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/rentals'),
                child: Text('ALL FLEET', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 255,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: rentalsState.vehicles.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final car = rentalsState.vehicles[index];
              return GestureDetector(
                onTap: () => context.push('/rentals'),
                child: Container(
                  width: 240,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                    boxShadow: isDark
                        ? []
                        : [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(
                          imageUrl: car.coverImageUrl,
                          height: 135,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              car.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontWeight: FontWeight.bold, color: textPrimary, fontSize: 13),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '₹${(car.dailyRate / 1000).toInt()}K / Day Escort',
                              style: TextStyle(color: goldAccent, fontWeight: FontWeight.w600, fontSize: 11.5),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'VIP Marriage & Chauffeur Protocol',
                              style: TextStyle(color: textSecondary, fontSize: 10),
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
        ),

        const SizedBox(height: 32),

        // 2. Private Jet Charters
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('AVIATION CHARTERS', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('JETS & HELICOPTER FLIGHTS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/aviation'),
                child: Text('CHARTER NOW', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 260,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: aviationState.jets.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final jet = aviationState.jets[index];
              return GestureDetector(
                onTap: () => context.push('/aviation'),
                child: Container(
                  width: 250,
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: borderColor, width: 0.8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(
                          imageUrl: jet.imageUrl,
                          height: 135,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              jet.model,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontWeight: FontWeight.bold, color: textPrimary, fontSize: 13),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '₹${(jet.hourlyCharterRate / 1000).toInt()}K / Flight Hour',
                              style: TextStyle(color: goldAccent, fontWeight: FontWeight.w600, fontSize: 11.5),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Worldwide VIP Dispatch Available',
                              style: TextStyle(color: textSecondary, fontSize: 10),
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
        ),

        const SizedBox(height: 32),

        // 3. Elite Crew Booking
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('CREW & CLOSE PROTECTION', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0)),
                    const SizedBox(height: 4),
                    Text('PILOTS & 3000 GT MASTERS', style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 18)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => context.push('/crew'),
                child: Text('VIEW ROSTER', style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: crewState.profiles.length,
          separatorBuilder: (_, __) => const SizedBox(height: 14),
          itemBuilder: (context, index) {
            final crew = crewState.profiles[index];
            return Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: borderColor, width: 0.8),
              ),
              child: Row(
                children: [
                  Container(
                    width: 58,
                    height: 58,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: goldAccent),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(3),
                      child: LuxuryImage(imageUrl: crew.avatarUrl, fit: BoxFit.cover),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Flexible(
                              child: Text(
                                crew.name,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(color: textPrimary, fontWeight: FontWeight.bold, fontSize: 13.5),
                              ),
                            ),
                            const SizedBox(width: 4),
                            Icon(Icons.verified, color: goldAccent, size: 14),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(
                          crew.role.toUpperCase(),
                          style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontSize: 9),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '₹${(crew.dayRate / 1000).toInt()}K / Day • Retainer: ₹${(crew.monthlyRetainer / 100000).toStringAsFixed(1)}L',
                          style: TextStyle(color: textSecondary, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  OutlinedButton(
                    onPressed: () => context.push('/crew'),
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: goldAccent, width: 0.9),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                    ),
                    child: Text('BOOK', style: LuxuryTypography.microCaps.copyWith(color: goldAccent)),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  // ==========================================
  // SELL SECTION: VIP Consignment Portal
  // ==========================================
  Widget _buildSellConsignSection(bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(22),
            decoration: BoxDecoration(
              gradient: isDark
                  ? const LinearGradient(
                      colors: [Color(0xFF1E1805), Color(0xFF0D0A02)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    )
                  : const LinearGradient(
                      colors: [Color(0xFFFAF6EB), Color(0xFFF3EBD4)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: goldAccent, width: 1.2),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'CONSIGNMENT CONCIERGE',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: goldAccent,
                        letterSpacing: 2.2,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: goldAccent,
                        borderRadius: BorderRadius.circular(2),
                      ),
                      child: const Text(
                        'HNWI GATEWAY',
                        style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 8.5),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  'List Your Sovereign Asset',
                  style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 21),
                ),
                const SizedBox(height: 8),
                Text(
                  'Connect with verified ultra-high-net-worth collectors, sovereign wealth syndicates, and accredited institutions across 48 jurisdictions.',
                  style: LuxuryTypography.bodyMedium.copyWith(color: textSecondary, fontSize: 13),
                ),
                const SizedBox(height: 20),
                LuxuryButton(
                  text: '✦ LAUNCH 5-STEP LISTING WIZARD',
                  variant: LuxuryButtonVariant.gold,
                  height: 48,
                  onPressed: () => context.push('/sell/new'),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          Text(
            'SELLER PILLARS & GUARANTEES',
            style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0),
          ),
          const SizedBox(height: 12),

          // Pillar 1: Escrow & Title Security
          _buildSellerFeatureCard(
            isDark: isDark,
            icon: Icons.shield,
            title: 'Tier-1 Institutional Escrow',
            subtitle: '100% safeguarded funds through registered sovereign escrow agents and legal title verification.',
          ),
          const SizedBox(height: 12),

          // Pillar 2: Assay & Provenance
          _buildSellerFeatureCard(
            isDark: isDark,
            icon: Icons.biotech,
            title: 'Assay & Provenance Certification',
            subtitle: 'Independent GIA, IGI, VdS, and MCA physical authentication prior to syndicate release.',
          ),
          const SizedBox(height: 12),

          // Pillar 3: Confidential Deal Rooms
          _buildSellerFeatureCard(
            isDark: isDark,
            icon: Icons.vpn_key,
            title: 'Bespoke Confidential Deal Rooms',
            subtitle: 'End-to-end encrypted private negotiating rooms with legally binding NDA signatures.',
          ),

          const SizedBox(height: 24),

          // Action Buttons
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => context.push('/seller/register'),
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: goldAccent, width: 1.0),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                  ),
                  child: Text(
                    'BECOME FOUNDING DEALER',
                    textAlign: TextAlign.center,
                    style: LuxuryTypography.microCaps.copyWith(color: goldAccent, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton(
                  onPressed: () => context.go('/sell'),
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: borderColor, width: 1.0),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                  ),
                  child: Text(
                    'SELLER DASHBOARD',
                    textAlign: TextAlign.center,
                    style: LuxuryTypography.microCaps.copyWith(color: textPrimary, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSellerFeatureCard({
    required bool isDark,
    required IconData icon,
    required String title,
    required String subtitle,
  }) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: borderColor, width: 0.8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: goldAccent.withValues(alpha: 0.12),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: goldAccent, size: 20),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(color: textPrimary, fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 3),
                Text(subtitle, style: TextStyle(color: textSecondary, fontSize: 11.5, height: 1.4)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================
  // WEALTH MEMBERSHIP TIERS (4 Brackets)
  // ==========================================
  Widget _buildWealthTierMembershipCard(bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: isDark
            ? const LinearGradient(
                colors: [Color(0xFF1C1605), Color(0xFF0C0A03)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : const LinearGradient(
                colors: [Color(0xFFFAF6EC), Color(0xFFF0E5CC)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: goldAccent, width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'SOVEREIGN WEALTH PRIVILEGES',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LuxuryTypography.microCaps.copyWith(
                    color: goldAccent,
                    letterSpacing: 1.2,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: goldAccent,
                  borderRadius: BorderRadius.circular(2),
                ),
                child: const Text(
                  '4 WEALTH BRACKETS',
                  style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 8.5),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Patron Acquisition Authority',
            style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary, fontSize: 20),
          ),
          const SizedBox(height: 8),
          Text(
            'Membership scales precisely with buying capacity: Sovereign Select (₹10K), Privé Gold (₹1L), Obsidian Royal (₹15L), and Dynasty Syndicate (₹1Cr).',
            style: LuxuryTypography.bodyMedium.copyWith(color: textSecondary, fontSize: 12.5),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _tierPill('₹10K', '< ₹1 Cr', isDark),
              const SizedBox(width: 8),
              _tierPill('₹1L', '₹1-50 Cr', isDark),
              const SizedBox(width: 8),
              _tierPill('₹15L', '₹50-500 Cr', isDark),
              const SizedBox(width: 8),
              _tierPill('₹1Cr', '> ₹500 Cr', isDark, isHighTier: true),
            ],
          ),
          const SizedBox(height: 18),
          LuxuryButton(
            text: 'VIEW WEALTH TIERS & PRIVILEGES',
            variant: LuxuryButtonVariant.gold,
            onPressed: () => context.push('/membership'),
          ),
        ],
      ),
    );
  }

  Widget _tierPill(String fee, String cap, bool isDark, {bool isHighTier = false}) {
    final activeGold = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: isHighTier
              ? activeGold.withValues(alpha: 0.18)
              : (isDark ? const Color(0xFF141414) : Colors.white),
          borderRadius: BorderRadius.circular(2),
          border: Border.all(
            color: isHighTier ? activeGold : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
        ),
        alignment: Alignment.center,
        child: Column(
          children: [
            Text(
              fee,
              style: TextStyle(
                color: isHighTier ? activeGold : LuxuryColors.textPrimary(isDark),
                fontWeight: FontWeight.bold,
                fontSize: 11,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              cap,
              style: TextStyle(color: LuxuryColors.textSecondary(isDark), fontSize: 8.5),
            ),
          ],
        ),
      ),
    );
  }

  // ==========================================
  // CONFIDENTIAL ACQUISITION REQUEST
  // ==========================================
  Widget _buildPrivateRequestBanner(bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldAccent = LuxuryColors.goldAccent(isDark);
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: borderColor),
        boxShadow: isDark
            ? []
            : [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.shield, color: goldAccent, size: 18),
              const SizedBox(width: 8),
              Text(
                'PRIVATE REQUEST SERVICE',
                style: LuxuryTypography.microCaps.copyWith(color: goldAccent, letterSpacing: 2.0),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Looking for an Unlisted Asset?',
            style: TextStyle(color: textPrimary, fontSize: 17, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            'Post a confidential acquisition request. Verified dealers and family offices match your criteria privately.',
            style: TextStyle(color: textSecondary, fontSize: 12),
          ),
          const SizedBox(height: 14),
          LuxuryButton(
            text: 'SUBMIT CONFIDENTIAL REQUEST',
            variant: LuxuryButtonVariant.secondary,
            height: 42,
            onPressed: () => context.push('/requests'),
          ),
        ],
      ),
    );
  }
}
