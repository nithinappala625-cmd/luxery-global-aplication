import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_listing_card.dart';
import '../../providers/categories_provider.dart';
import '../../providers/listings_provider.dart';
import '../../providers/auctions_provider.dart';
import '../../providers/rentals_provider.dart';
import '../../providers/aviation_provider.dart';
import 'widgets/curation_statement.dart';
import 'widgets/hero_banner.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final categories = ref.watch(categoriesProvider);
    final listings = ref.watch(listingsProvider);
    final auctionsState = ref.watch(auctionsProvider);
    final rentalsState = ref.watch(rentalsProvider);
    final aviationState = ref.watch(aviationProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        showBack: false,
        showSearch: true,
        showWishlist: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. Editorial Hero Section
            const HomeHeroBanner(),

            const SizedBox(height: 36),

            // 2. Ten Core Marketplace Verticals
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'NP GROUPS PORTFOLIO',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: LuxuryColors.champagne,
                              letterSpacing: 2.2,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'CURATED VERTICALS',
                            style: LuxuryTypography.editorialHeading2.copyWith(
                              color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                              letterSpacing: 1.2,
                            ),
                          ),
                        ],
                      ),
                      TextButton(
                        onPressed: () => context.go('/discover'),
                        child: Text(
                          'VIEW ALL',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.champagne,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Horizontal Carousel of All 10 Categories
            SizedBox(
              height: 155,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: categories.length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final cat = categories[index];
                  return GestureDetector(
                    onTap: () {
                      if (cat.slug == 'rentals') {
                        context.push('/rentals');
                      } else if (cat.slug == 'aviation') {
                        context.push('/aviation');
                      } else if (cat.slug == 'materials') {
                        context.push('/materials');
                      } else if (cat.slug == 'auctions') {
                        context.push('/auctions');
                      } else if (cat.slug == 'deal_rooms') {
                        context.push('/deals/deal-101');
                      } else {
                        ref.read(listingFilterProvider.notifier).setCategory(cat.id);
                        context.go('/discover');
                      }
                    },
                    child: Container(
                      width: 135,
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF141414) : LuxuryColors.cardLight,
                        borderRadius: BorderRadius.circular(4),
                        border: Border.all(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                          width: 0.8,
                        ),
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
                                color: Colors.grey[900],
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
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  cat.tagline ?? 'Curated Salon',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: LuxuryTypography.bodySmall.copyWith(
                                    fontSize: 10,
                                    color: LuxuryColors.champagne,
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

            const SizedBox(height: 36),

            // 3. NP AUCTIONS Live Ticker
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF111713) : const Color(0xFFF3F7F4),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: LuxuryColors.champagne.withOpacity(0.4),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
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
                          Text(
                            'NP AUCTIONS • LIVE CURATED FLOOR',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: LuxuryColors.champagne,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 2.0,
                            ),
                          ),
                        ],
                      ),
                      Text(
                        '10 LIVE LOTS',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isDark ? Colors.white70 : Colors.black54,
                          fontSize: 10,
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
                        color: isDark ? Colors.white : Colors.black,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'CURRENT HIGH BID',
                              style: LuxuryTypography.microCaps.copyWith(
                                fontSize: 9.5,
                                color: isDark ? Colors.white54 : Colors.black54,
                              ),
                            ),
                            Text(
                              '₹ ${(auctionsState.auctions.first.currentBid / 10000000).toStringAsFixed(1)} Cr',
                              style: LuxuryTypography.editorialHeading2.copyWith(
                                color: LuxuryColors.champagne,
                                fontSize: 18,
                              ),
                            ),
                          ],
                        ),
                        ElevatedButton(
                          onPressed: () => context.push('/auctions'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: LuxuryColors.champagne,
                            foregroundColor: Colors.black,
                            elevation: 0,
                            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                          ),
                          child: const Text('ENTER AUCTION', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),

            const SizedBox(height: 36),

            // 4. NP LUXE DRIVE Rental Fleet Highlight
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'SUPERCAR FLEET & CHAUFFEUR HIRE',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.0,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'NP LUXE DRIVE',
                        style: LuxuryTypography.editorialHeading2.copyWith(
                          color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () => context.push('/rentals'),
                    child: Text(
                      'BOOK RENTAL',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 220,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: rentalsState.fleet.take(5).length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final car = rentalsState.fleet[index];
                  return GestureDetector(
                    onTap: () => context.push('/rentals'),
                    child: Container(
                      width: 200,
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF141414) : Colors.white,
                        borderRadius: BorderRadius.circular(4),
                        border: Border.all(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: Image.network(
                              car.coverImageUrl,
                              height: 110,
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
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '₹ ${(car.dailyRate / 1000).toStringAsFixed(0)}K / Day  •  ${car.locationCity}',
                                  style: TextStyle(
                                    color: LuxuryColors.champagne,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  'Chauffeur or Self-Drive',
                                  style: TextStyle(fontSize: 10, color: isDark ? Colors.white60 : Colors.black54),
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

            const SizedBox(height: 36),

            // 5. PRIVATE AVIATION Highlight
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'GLOBAL AIRCRAFT SALON',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.0,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'BUY & CHARTER JETS',
                        style: LuxuryTypography.editorialHeading2.copyWith(
                          color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () => context.push('/aviation'),
                    child: Text(
                      'VIEW HANGAR',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 220,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: aviationState.salesListings.take(5).length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final jet = aviationState.salesListings[index];
                  return GestureDetector(
                    onTap: () => context.push('/aviation'),
                    child: Container(
                      width: 220,
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF141414) : Colors.white,
                        borderRadius: BorderRadius.circular(4),
                        border: Border.all(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: Image.network(
                              jet.coverImageUrl,
                              height: 110,
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
                                  jet.title,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '\$ ${(jet.priceOrHourlyRate / 1000000).toStringAsFixed(1)}M  •  ${jet.passengerCapacity} Pax',
                                  style: TextStyle(
                                    color: LuxuryColors.champagne,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  'Hangar: ${jet.hangarLocation}',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(fontSize: 10, color: isDark ? Colors.white60 : Colors.black54),
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

            const SizedBox(height: 36),

            // 6. Featured Exceptional Assets (Watches, Diamonds, Cars, Yachts)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'FEATURED ASSETS',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.2,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'THE EXTRAORDINARY',
                        style: LuxuryTypography.editorialHeading2.copyWith(
                          color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () => context.go('/discover'),
                    child: Text(
                      'EXPLORE ALL',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Grid of 6 Featured Luxury Listings
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: ListView.separated(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: listings.take(6).length,
                separatorBuilder: (context, index) => const SizedBox(height: 16),
                itemBuilder: (context, index) {
                  final item = listings[index];
                  return LuxuryListingCard(
                    listing: item,
                    onTap: () => context.push('/listings/${item.id}'),
                  );
                },
              ),
            ),

            const SizedBox(height: 36),

            // 7. PRIVATE REQUEST Banner ("Looking for...")
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: isDark
                      ? [const Color(0xFF141E16), const Color(0xFF0D140F)]
                      : [const Color(0xFFEBF3ED), const Color(0xFFDEEAE1)],
                ),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: LuxuryColors.deepForestGreen.withOpacity(0.5),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.security, color: LuxuryColors.champagne, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'PRIVATE REQUEST SERVICE',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.2,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'Looking for an Unlisted Asset?',
                    style: LuxuryTypography.editorialHeading2.copyWith(
                      color: isDark ? Colors.white : Colors.black,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Post a confidential acquisition request (e.g. "Looking for Patek 5711 under ₹80L" or "Global 7500 delivery slot"). Verified dealers and private salons match your criteria privately.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      fontSize: 13,
                      height: 1.4,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 18),
                  LuxuryButton(
                    text: 'SUBMIT CONFIDENTIAL REQUEST',
                    variant: LuxuryButtonVariant.primary,
                    height: 44,
                    onPressed: () => context.push('/requests'),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 36),

            // 8. FIRST 50 FOUNDING SELLERS Program Banner
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1A1608) : const Color(0xFFFBF6E9),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: LuxuryColors.champagne,
                  width: 1.2,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.stars, color: LuxuryColors.champagne, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'FOUNDING ACCREDITATION',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.2,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'FIRST 50 FOUNDING SELLERS',
                    style: LuxuryTypography.editorialHeading2.copyWith(
                      color: isDark ? Colors.white : Colors.black,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Accredited luxury salons, high-jewellery dealers, and aircraft brokers receive 0% commission privileges, priority homepage placement, and permanent Founding status.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      fontSize: 13,
                      height: 1.4,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => context.push('/founding-sellers'),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: LuxuryColors.champagne),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                          ),
                          child: const Text('APPLY FOR FOUNDING STATUS', style: TextStyle(color: LuxuryColors.champagne, fontWeight: FontWeight.bold, fontSize: 11)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 36),

            // 9. Curatorial Integrity Statement
            const CurationStatement(),

            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }
}
