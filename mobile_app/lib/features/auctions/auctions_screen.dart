import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/auction.dart';
import '../../providers/auctions_provider.dart';
import 'widgets/auction_card.dart';
import 'widgets/auction_house_sheet.dart';

class AuctionsScreen extends ConsumerStatefulWidget {
  const AuctionsScreen({super.key});

  @override
  ConsumerState<AuctionsScreen> createState() => _AuctionsScreenState();
}

class _AuctionsScreenState extends ConsumerState<AuctionsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final auctions = ref.watch(auctionsProvider);
    final houses = ref.watch(auctionHousesProvider);

    final liveAuctions = auctions.where((a) => a.status == 'live').toList();
    final upcomingAuctions = auctions.where((a) => a.status == 'upcoming').toList();
    final endingSoonAuctions = auctions.where((a) => a.status == 'live').toList();

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'CURATED AUCTIONS',
        showBack: false,
        showWishlist: true,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
          labelColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
          unselectedLabelColor: LuxuryColors.mutedGrey,
          labelStyle: LuxuryTypography.microCaps.copyWith(fontWeight: FontWeight.w700),
          tabs: const [
            Tab(text: 'LIVE'),
            Tab(text: 'UPCOMING'),
            Tab(text: 'ENDING SOON'),
            Tab(text: 'HOUSES'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildAuctionsList(liveAuctions, 'No live sales currently taking bids.'),
          _buildAuctionsList(upcomingAuctions, 'No upcoming sales registered.'),
          _buildAuctionsList(endingSoonAuctions, 'No sales closing in the next 24 hours.'),
          _buildHousesList(houses),
        ],
      ),
    );
  }

  Widget _buildAuctionsList(List<LuxuryAuction> list, String emptyMsg) {
    if (list.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.gavel_outlined, size: 36, color: LuxuryColors.mutedGrey.withOpacity(0.5)),
              const SizedBox(height: 12),
              Text(emptyMsg, style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey)),
            ],
          ),
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: list.length,
      separatorBuilder: (context, index) => const SizedBox(height: 20),
      itemBuilder: (context, index) {
        final item = list[index];
        return LuxuryAuctionCard(
          auction: item,
          onSelect: () => _openAuctionRedirect(item),
        );
      },
    );
  }

  void _openAuctionRedirect(LuxuryAuction auction) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: Theme.of(context).brightness == Brightness.dark
            ? LuxuryColors.darkCard
            : LuxuryColors.pureWhite,
        title: Text(
          'EXTERNAL BIDDING ROOM',
          style: LuxuryTypography.editorialHeading3.copyWith(letterSpacing: 1.8),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'You are transitioning to the official live saleroom of ${auction.auctionHouseName}:',
              style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
            ),
            const SizedBox(height: 10),
            Text(
              auction.title,
              style: LuxuryTypography.bodyMedium.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            Text(
              '${auction.totalLots} Lots • Starting Bids & Estimates Curated by ${auction.auctionHouseName}',
              style: LuxuryTypography.bodySmall.copyWith(fontSize: 11, color: LuxuryColors.champagne),
            ),
          ],
        ),
        actions: [
          LuxuryButton(
            text: 'CANCEL',
            variant: LuxuryButtonVariant.secondary,
            onPressed: () => Navigator.of(ctx).pop(),
          ),
          const SizedBox(height: 8),
          LuxuryButton(
            text: 'CONTINUE TO LIVE BIDDING',
            variant: LuxuryButtonVariant.gold,
            onPressed: () {
              Navigator.of(ctx).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Redirecting to: ${auction.externalBiddingUrl}')),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildHousesList(List<AuctionHouse> houses) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: houses.length,
      separatorBuilder: (context, index) => const SizedBox(height: 16),
      itemBuilder: (context, index) {
        final house = houses[index];
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            borderRadius: BorderRadius.circular(2),
            border: Border.all(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF222222) : const Color(0xFFEFECE5),
                  borderRadius: BorderRadius.circular(2),
                ),
                child: Center(
                  child: Text(
                    house.name.substring(0, 1),
                    style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.champagne),
                  ),
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
                          house.name,
                          style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
                        ),
                        const SizedBox(width: 6),
                        const Icon(Icons.verified, size: 14, color: LuxuryColors.champagne),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${house.city}, ${house.country}'.toUpperCase(),
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey),
                    ),
                  ],
                ),
              ),
              OutlinedButton(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  side: BorderSide(
                    color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    width: 0.8,
                  ),
                ),
                onPressed: () => AuctionHouseSheet.show(context, house),
                child: Text(
                  'SALONS',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    fontSize: 8.5,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
