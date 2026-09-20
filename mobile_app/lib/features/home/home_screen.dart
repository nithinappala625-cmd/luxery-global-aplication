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
  String _selectedMode = 'BUY'; // 'BUY', 'RENT', 'CREW'

  @override
  Widget build(BuildContext context) {
    final categories = ref.watch(categoriesProvider);
    final listings = ref.watch(listingsProvider);
    final auctionsState = ref.watch(auctionsProvider);
    final rentalsState = ref.watch(rentalsProvider);
    final aviationState = ref.watch(aviationProvider);
    final realEstateState = ref.watch(realEstateProvider);
    final lockersState = ref.watch(lockersProvider);
    final crewState = ref.watch(crewProvider);

    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: const LuxuryAppBar(
        showBack: false,
        showSearch: true,
        showWishlist: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const HomeHeroBanner(),
            Container(
              margin: const EdgeInsets.fromLTRB(16, 20, 16, 10),
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: const Color(0xFF101010),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.goldBorder, width: 1.0),
              ),
              child: Row(
                children: [
                  _modeTab('BUY', '✦ BUY ASSETS'),
                  _modeTab('RENT', '✈ RENT FLEET & JETS'),
                  _modeTab('CREW', '❖ ELITE CREW'),
                ],
              ),
            ),
            const SizedBox(height: 20),
            if (_selectedMode == 'BUY') ...[
              _buildBuySection(categories, realEstateState, lockersState, auctionsState, listings),
            ] else if (_selectedMode == 'RENT') ...[
              _buildRentSection(rentalsState, aviationState),
            ] else ...[
              _buildCrewSection(crewState),
            ],
            const SizedBox(height: 36),
            _buildWealthTierMembershipCard(),
            const SizedBox(height: 36),
            _buildPrivateRequestBanner(),
            const SizedBox(height: 36),
            const CurationStatement(),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }

  Widget _modeTab(String modeKey, String label) {
    final isSelected = _selectedMode == modeKey;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedMode = modeKey),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? LuxuryColors.gold : Colors.transparent,
            borderRadius: BorderRadius.circular(2),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: LuxuryTypography.microCaps.copyWith(
              color: isSelected ? LuxuryColors.pureBlack : LuxuryColors.platinum,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
              fontSize: 10.5,
              letterSpacing: 1.0,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBuySection(categories, realEstateState, lockersState, auctionsState, listings) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('NP GROUPS PORTFOLIO', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.2)),
                  const SizedBox(height: 4),
                  Text('CURATED ACQUISITIONS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite, letterSpacing: 1.2)),
                ],
              ),
              TextButton(
                onPressed: () => context.go('/discover'),
                child: Text('ALL SALONS', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
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
                    color: LuxuryColors.darkCard,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: LuxuryColors.borderDark, width: 0.8),
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
                          errorBuilder: (_, __, ___) => Container(height: 85, color: const Color(0xFF1E1E1E)),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(cat.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: LuxuryTypography.bodyMedium.copyWith(fontSize: 11.5, fontWeight: FontWeight.w600, color: LuxuryColors.pureWhite)),
                            const SizedBox(height: 2),
                            Text(cat.tagline ?? 'Curated Salon', maxLines: 1, overflow: TextOverflow.ellipsis, style: LuxuryTypography.bodySmall.copyWith(fontSize: 9.5, color: LuxuryColors.gold)),
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
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('SOVEREIGN DOMAINS', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
                  const SizedBox(height: 4),
                  Text('REAL ESTATE & ISLANDS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
                ],
              ),
              TextButton(
                onPressed: () => context.push('/real-estate'),
                child: Text('EXPLORE ALL', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 240,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: realEstateState.listings.take(4).length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final prop = realEstateState.listings[index];
              return GestureDetector(
                onTap: () => context.push('/real-estate'),
                child: Container(
                  width: 250,
                  decoration: BoxDecoration(
                    color: LuxuryColors.darkCard,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Stack(
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: LuxuryImage(imageUrl: prop.mediaUrls.first, height: 135, width: double.infinity, fit: BoxFit.cover),
                          ),
                          Positioned(
                            top: 8,
                            left: 8,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                              color: Colors.black.withOpacity(0.85),
                              child: Text(prop.estateType.toUpperCase(), style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontSize: 8.5)),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(prop.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13)),
                            const SizedBox(height: 4),
                            Text(prop.priceDisplay, style: TextStyle(color: LuxuryColors.gold, fontWeight: FontWeight.bold, fontSize: 12)),
                            const SizedBox(height: 2),
                            Text(',  •  sq ft', style: const TextStyle(color: Colors.grey, fontSize: 10)),
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
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('HIGH-SECURITY PROTECTION', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
                  const SizedBox(height: 4),
                  Text('LUXURY LOCKERS & VAULTS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
                ],
              ),
              TextButton(
                onPressed: () => context.push('/lockers'),
                child: Text('VIEW ALL SAFES', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 230,
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
                  width: 240,
                  decoration: BoxDecoration(
                    color: LuxuryColors.darkCard,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(imageUrl: locker.mediaUrls.first, height: 130, width: double.infinity, fit: BoxFit.cover),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(locker.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 12.5)),
                            const SizedBox(height: 4),
                            Text(locker.priceDisplay, style: TextStyle(color: LuxuryColors.gold, fontWeight: FontWeight.bold, fontSize: 12)),
                            const SizedBox(height: 2),
                            Text(' • ', maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.grey, fontSize: 10)),
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
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 20),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: const Color(0xFF111111),
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: LuxuryColors.goldBorder, width: 1.0),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(width: 8, height: 8, decoration: const BoxDecoration(color: Colors.redAccent, shape: BoxShape.circle)),
                      const SizedBox(width: 8),
                      Text('NP LIVE AUCTIONS FLOOR', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.w700, letterSpacing: 2.0)),
                    ],
                  ),
                  Text('10 LIVE LOTS', style: LuxuryTypography.microCaps.copyWith(color: Colors.white70, fontSize: 10)),
                ],
              ),
              const SizedBox(height: 12),
              if (auctionsState.auctions.isNotEmpty) ...[
                Text(auctionsState.auctions.first.assetTitle, style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 17, color: Colors.white)),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('CURRENT HIGH BID', style: LuxuryTypography.microCaps.copyWith(fontSize: 9.5, color: Colors.white60)),
                    Text('₹  LAKHS', style: LuxuryTypography.priceMedium.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
              const SizedBox(height: 14),
              LuxuryButton(
                text: 'ENTER LIVE BIDDING FLOOR',
                backgroundColor: LuxuryColors.gold,
                textColor: LuxuryColors.pureBlack,
                height: 40,
                onPressed: () => context.push('/auctions'),
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('COLLECTOR HIGHLIGHTS', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.2)),
              const SizedBox(height: 4),
              Text('FEATURED ASSETS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
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
            return LuxuryListingCard(listing: item, onTap: () => context.push('/listings/'));
          },
        ),
      ],
    );
  }

  Widget _buildRentSection(rentalsState, aviationState) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('NP LUXE FLEET HIRE', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
                  const SizedBox(height: 4),
                  Text('WEDDINGS, GALAS & CONVOYS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
                ],
              ),
              TextButton(
                onPressed: () => context.push('/rentals'),
                child: Text('ALL FLEET', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 235,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: rentalsState.vehicles.take(5).length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final car = rentalsState.vehicles[index];
              return GestureDetector(
                onTap: () => context.push('/rentals'),
                child: Container(
                  width: 230,
                  decoration: BoxDecoration(
                    color: LuxuryColors.darkCard,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(imageUrl: car.coverImageUrl, height: 130, width: double.infinity, fit: BoxFit.cover),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(car.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13)),
                            const SizedBox(height: 4),
                            Text('₹ K / Day • ', style: TextStyle(color: LuxuryColors.gold, fontWeight: FontWeight.w600, fontSize: 11)),
                            const SizedBox(height: 2),
                            const Text('VIP Marriage Escort & Chauffeur', style: TextStyle(color: Colors.grey, fontSize: 10)),
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
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('PRIVATE JETS & HELICOPTERS', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
                  const SizedBox(height: 4),
                  Text('VIP TRANSFERS & CHARTERS', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
                ],
              ),
              TextButton(
                onPressed: () => context.push('/aviation'),
                child: Text('VIEW JETS', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 235,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: aviationState.salesListings.take(4).length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (context, index) {
              final jet = aviationState.salesListings[index];
              return GestureDetector(
                onTap: () => context.push('/aviation'),
                child: Container(
                  width: 230,
                  decoration: BoxDecoration(
                    color: LuxuryColors.darkCard,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: LuxuryColors.borderDark),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                        child: LuxuryImage(imageUrl: jet.mediaUrls.first, height: 130, width: double.infinity, fit: BoxFit.cover),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(jet.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13)),
                            const SizedBox(height: 4),
                            Text('₹  Crore •  Pax', style: TextStyle(color: LuxuryColors.gold, fontSize: 11)),
                            const SizedBox(height: 2),
                            Text(' NM Range • Mach ', style: const TextStyle(color: Colors.grey, fontSize: 10)),
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
      ],
    );
  }

  Widget _buildCrewSection(crewState) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('CONFIDENTIAL HUMAN TALENT', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
                  const SizedBox(height: 4),
                  Text('CAPTAINS, PILOTS & SECURITY', style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite)),
                ],
              ),
              TextButton(
                onPressed: () => context.push('/crew'),
                child: Text('ALL CREW', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
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
          separatorBuilder: (_, __) => const SizedBox(height: 16),
          itemBuilder: (context, index) {
            final crew = crewState.profiles[index];
            return Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: LuxuryColors.darkCard,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
              ),
              child: Row(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: LuxuryColors.gold),
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
                            Text(crew.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                            const SizedBox(width: 4),
                            const Icon(Icons.verified, color: LuxuryColors.gold, size: 14),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(crew.role.toUpperCase(), style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, fontSize: 9)),
                        const SizedBox(height: 4),
                        Text(' • ', style: const TextStyle(color: Colors.grey, fontSize: 11)),
                      ],
                    ),
                  ),
                  OutlinedButton(
                    onPressed: () => context.push('/crew'),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: LuxuryColors.gold, width: 0.8),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                    ),
                    child: Text('BOOK', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold)),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildWealthTierMembershipCard() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1C1605), Color(0xFF0C0A03)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: LuxuryColors.gold, width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'SOVEREIGN WEALTH PRIVILEGES',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.gold,
                  letterSpacing: 2.2,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(color: LuxuryColors.gold, borderRadius: BorderRadius.circular(2)),
                child: const Text('4 WEALTH BRACKETS', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 8.5)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Patron Acquisition Authority',
            style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite, fontSize: 20),
          ),
          const SizedBox(height: 8),
          Text(
            'Membership scales precisely with buying capacity: Sovereign Select (₹10K), Privé Gold (₹1L), Obsidian Royal (₹15L), and Dynasty Syndicate (₹1Cr).',
            style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.platinum, fontSize: 12.5),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _tierPill('₹10K', '< ₹1 Cr'),
              const SizedBox(width: 8),
              _tierPill('₹1L', '₹1-50 Cr'),
              const SizedBox(width: 8),
              _tierPill('₹15L', '₹50-500 Cr'),
              const SizedBox(width: 8),
              _tierPill('₹1Cr', '> ₹500 Cr', isHighTier: true),
            ],
          ),
          const SizedBox(height: 18),
          LuxuryButton(
            text: 'VIEW WEALTH TIERS & PRIVILEGES',
            backgroundColor: LuxuryColors.gold,
            textColor: LuxuryColors.pureBlack,
            onPressed: () => context.push('/membership'),
          ),
        ],
      ),
    );
  }

  Widget _tierPill(String fee, String cap, {bool isHighTier = false}) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: isHighTier ? LuxuryColors.gold.withOpacity(0.2) : const Color(0xFF141414),
          borderRadius: BorderRadius.circular(2),
          border: Border.all(color: isHighTier ? LuxuryColors.gold : LuxuryColors.borderDark),
        ),
        alignment: Alignment.center,
        child: Column(
          children: [
            Text(fee, style: TextStyle(color: isHighTier ? LuxuryColors.goldLight : Colors.white, fontWeight: FontWeight.bold, fontSize: 11)),
            const SizedBox(height: 2),
            Text(cap, style: const TextStyle(color: Colors.grey, fontSize: 8.5)),
          ],
        ),
      ),
    );
  }

  Widget _buildPrivateRequestBanner() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: LuxuryColors.darkCard,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: LuxuryColors.borderDark),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.shield, color: LuxuryColors.gold, size: 18),
              const SizedBox(width: 8),
              Text('PRIVATE REQUEST SERVICE', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold, letterSpacing: 2.0)),
            ],
          ),
          const SizedBox(height: 8),
          const Text('Looking for an Unlisted Asset?', style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          const Text('Post a confidential acquisition request. Verified dealers and family offices match your criteria privately.', style: TextStyle(color: Colors.grey, fontSize: 12)),
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
