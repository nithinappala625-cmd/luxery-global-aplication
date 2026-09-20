import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';
import '../../models/auction.dart';
import '../../providers/auctions_provider.dart';

class AuctionsScreen extends ConsumerStatefulWidget {
  const AuctionsScreen({super.key});

  @override
  ConsumerState<AuctionsScreen> createState() => _AuctionsScreenState();
}

class _AuctionsScreenState extends ConsumerState<AuctionsScreen> {
  String _mode = 'BUY';
  String _subTab = 'ALL';

  static const _subTabs = [
    'ALL',
    'FINE ART',
    'TIMEPIECES',
    'MOTORCARS',
    'JEWELS',
    'AIRCRAFT',
  ];

  void _openPlaceBidSheet(LuxuryAuction lot) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    double proposedBid = lot.nextMinimumBid;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'TRANSMIT BINDING BID • LOT #${lot.id.substring(lot.id.length - 3)}',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, size: 20),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    lot.assetTitle,
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 12),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Current Highest Bid:', style: LuxuryTypography.bodySmall),
                      Text(
                        '₹ ${(lot.currentBid / 10000000).toStringAsFixed(2)} Cr',
                        style: LuxuryTypography.priceMedium.copyWith(color: LuxuryColors.gold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Bid increment stepper
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      border: Border.all(color: LuxuryColors.gold, width: 1.0),
                      borderRadius: BorderRadius.circular(4),
                      color: isDark ? const Color(0xFF0C0C0C) : const Color(0xFFFAF7F0),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.remove_circle_outline, color: LuxuryColors.gold),
                          onPressed: proposedBid > lot.nextMinimumBid
                              ? () => setSheetState(() => proposedBid -= lot.minBidIncrement)
                              : null,
                        ),
                        Column(
                          children: [
                            Text('YOUR BID VALUE', style: LuxuryTypography.microCaps.copyWith(fontSize: 9)),
                            Text(
                              '₹ ${(proposedBid / 10000000).toStringAsFixed(2)} Cr',
                              style: LuxuryTypography.priceLarge.copyWith(
                                color: isDark ? Colors.white : LuxuryColors.darkOnyx,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        IconButton(
                          icon: const Icon(Icons.add_circle_outline, color: LuxuryColors.gold),
                          onPressed: () => setSheetState(() => proposedBid += lot.minBidIncrement),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF161616) : const Color(0xFFF2ECE0),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'Terms: Bids are irrevocable under NP AUCTIONS regulations. Escrow deposit pre-authorized. Buyer Premium: ${lot.buyerPremiumPercentage}%.',
                      style: LuxuryTypography.bodySmall.copyWith(fontSize: 10.5, height: 1.35),
                    ),
                  ),
                  const SizedBox(height: 20),

                  LuxuryButton(
                    text: 'CONFIRM & TRANSMIT BINDING BID',
                    variant: LuxuryButtonVariant.gold,
                    onPressed: () async {
                      final success = await ref.read(auctionsProvider.notifier).placeBid(
                            auctionId: lot.id,
                            bidAmount: proposedBid,
                            bidderMaskedName: 'You (VIP Bidder #884)',
                          );
                      if (context.mounted) {
                        Navigator.pop(context);
                        if (success) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Bid Accepted! You are currently the highest bidder on this lot.'),
                              backgroundColor: Color(0xFF10B981),
                            ),
                          );
                        }
                      }
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  void _openBidHistorySheet(LuxuryAuction lot) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'BID AUDIT TRAIL • LOT #${lot.id.substring(lot.id.length - 3)}',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                lot.assetTitle,
                style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
              ),
              const Divider(height: 20),
              if (lot.bidHistory.isEmpty)
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text('No bids recorded yet. Be the first to place the starting bid.'),
                )
              else
                ...lot.bidHistory.map((b) {
                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: b.isWinningBid
                          ? (isDark ? const Color(0xFF142418) : const Color(0xFFE2F0E5))
                          : (isDark ? const Color(0xFF1C1C1E) : const Color(0xFFEEEEEE)),
                      borderRadius: BorderRadius.circular(4),
                      border: b.isWinningBid ? Border.all(color: LuxuryColors.champagne) : null,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            if (b.isWinningBid)
                              const Icon(Icons.check_circle, size: 16, color: LuxuryColors.champagne),
                            if (b.isWinningBid) const SizedBox(width: 8),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(b.bidderMaskedName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                Text('${b.timestamp.hour}:${b.timestamp.minute.toString().padLeft(2, '0')}',
                                    style: const TextStyle(fontSize: 10, color: Colors.grey)),
                              ],
                            ),
                          ],
                        ),
                        Text(
                          '₹ ${(b.amount / 10000000).toStringAsFixed(2)} Cr',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: b.isWinningBid ? LuxuryColors.champagne : null,
                          ),
                        ),
                      ],
                    ),
                  );
                }),
              const SizedBox(height: 16),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(auctionsProvider);
    final bg = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    final filtered = state.auctions.where((lot) {
      if (_subTab == 'ALL') return true;
      final t = lot.assetTitle.toLowerCase();
      if (_subTab == 'FINE ART') return t.contains('painting') || t.contains('art') || t.contains('canvas') || t.contains('portrait');
      if (_subTab == 'TIMEPIECES') return t.contains('watch') || t.contains('patek') || t.contains('rolex') || t.contains('timepiece');
      if (_subTab == 'MOTORCARS') return t.contains('ferrari') || t.contains('bugatti') || t.contains('porsche') || t.contains('car');
      if (_subTab == 'JEWELS') return t.contains('diamond') || t.contains('ruby') || t.contains('emerald') || t.contains('ring');
      if (_subTab == 'AIRCRAFT') return t.contains('jet') || t.contains('gulfstream') || t.contains('aviation');
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: bg,
      appBar: const LuxuryAppBar(
        title: 'NP LIVE AUCTIONS',
        showBack: true,
        showSearch: true,
        showThemeToggle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Live Marquee Ticker
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: const BoxDecoration(
                color: Color(0xFFFF2A2A),
              ),
              child: Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'LIVE SYNDICATE FLOOR: LOT 401 CLOSING IN 42M 18S',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      fontSize: 10,
                    ),
                  ),
                ],
              ),
            ),

            SectionActionBar(
              selectedMode: _mode,
              onModeChanged: (m) => setState(() => _mode = m),
              isDark: isDark,
              buyLabel: '✦ LIVE BIDDING',
              bookLabel: '⏱ TIMED LOTS',
              sellLabel: '♛ CONSIGN LOT',
            ),

            // Subcategories Pill Strip
            SizedBox(
              height: 44,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _subTabs.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final tab = _subTabs[i];
                  final isSelected = _subTab == tab;
                  return GestureDetector(
                    onTap: () => setState(() => _subTab = tab),
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
                        tab,
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
              _buildConsignLotPanel(isDark)
            else
              _buildGrid(isDark, filtered),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildGrid(bool isDark, List<LuxuryAuction> lots) {
    if (lots.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(40),
        child: Center(
          child: Text(
            'No matching lots currently in session.',
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
        itemCount: lots.length,
        itemBuilder: (context, index) {
          final lot = lots[index];
          final imgUrl = lot.coverImageUrl;
          final priceCr = '₹ ${(lot.currentBid / 10000000).toStringAsFixed(2)} Cr';
          final reserveStr = lot.reservePrice != null
              ? '₹${(lot.reservePrice! / 10000000).toStringAsFixed(1)}Cr'
              : 'No Reserve';
          final spec = '${lot.totalBidsCount} Bids • Reserve: $reserveStr';

          return LuxuryAssetCard(
            imageUrl: imgUrl,
            title: lot.assetTitle,
            category: 'LOT #${lot.id.substring(lot.id.length - 3)}',
            price: priceCr,
            subtitle: spec,
            badgeText: lot.status == AuctionStatus.live ? '🔴 LIVE' : 'TIMED',
            isDark: isDark,
            onBuy: () => _openPlaceBidSheet(lot),
            onBook: () => _openBidHistorySheet(lot),
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () => _openPlaceBidSheet(lot),
          );
        },
      ),
    );
  }

  Widget _buildConsignLotPanel(bool isDark) {
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
            const Icon(Icons.gavel, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'AUCTION CONSIGNMENT & CURATION',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Consign Blue-Chip Masterpieces,\nClassic Cars & Rare Assets.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Global auction catalog distribution to 10,000+ vetted private collectors. Confidential reserve price agreements and zero-commission consignor terms for museum-grade lots.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'SUBMIT LOT FOR AUCTION VALUATION',
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
