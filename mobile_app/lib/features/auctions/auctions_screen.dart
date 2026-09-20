import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/auction.dart';
import '../../providers/auctions_provider.dart';
import 'widgets/auction_card.dart';

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
                        'PLACE BINDING AUCTION BID',
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
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                  ),
                  Text(
                    'Curated by: ${lot.auctionHouseName}',
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Current High Bid:', style: TextStyle(fontSize: 13)),
                      Text('₹ ${(lot.currentBid / 10000000).toStringAsFixed(2)} Cr',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Next Minimum Bid:', style: TextStyle(fontSize: 13)),
                      Text('₹ ${(lot.nextMinimumBid / 10000000).toStringAsFixed(2)} Cr',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: LuxuryColors.champagne)),
                    ],
                  ),
                  const SizedBox(height: 18),

                  // Bid increment selector
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.remove_circle_outline),
                        onPressed: proposedBid <= lot.nextMinimumBid
                            ? null
                            : () {
                                setSheetState(() {
                                  proposedBid -= lot.minBidIncrement;
                                });
                              },
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF0C0C0C) : const Color(0xFFEEEEEE),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: LuxuryColors.champagne),
                        ),
                        child: Text(
                          '₹ ${(proposedBid / 10000000).toStringAsFixed(2)} Cr',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: LuxuryColors.champagne,
                          ),
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.add_circle_outline),
                        onPressed: () {
                          setSheetState(() {
                            proposedBid += lot.minBidIncrement;
                          });
                        },
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF0D140F) : const Color(0xFFEBF3ED),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'Terms: Bids are legally binding under NP AUCTIONS regulations. A 10% refundable escrow deposit is pre-authorized. Buyer Premium: ${lot.buyerPremiumPercentage}%.',
                      style: const TextStyle(fontSize: 10.5, height: 1.35),
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
                              backgroundColor: LuxuryColors.deepForestGreen,
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
                    'BID AUDIT TRAIL',
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

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'NP AUCTIONS',
        showBack: true,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: LuxuryColors.champagne,
          labelColor: LuxuryColors.champagne,
          unselectedLabelColor: isDark ? Colors.white54 : Colors.black54,
          labelStyle: LuxuryTypography.microCaps.copyWith(fontWeight: FontWeight.w700),
          tabs: const [
            Tab(text: 'LIVE (10)'),
            Tab(text: 'TIMED'),
            Tab(text: 'ENDING SOON'),
            Tab(text: 'ALL LOTS'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Live Lots
          _buildAuctionList(state.auctions, isDark),
          // Timed Lots
          _buildAuctionList(state.auctions.where((a) => a.format == AuctionFormat.timed).toList(), isDark),
          // Ending Soon
          _buildAuctionList(state.auctions.take(4).toList(), isDark),
          // All Lots
          _buildAuctionList(state.auctions, isDark),
        ],
      ),
    );
  }

  Widget _buildAuctionList(List<LuxuryAuction> lots, bool isDark) {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: lots.length,
      separatorBuilder: (_, __) => const SizedBox(height: 20),
      itemBuilder: (context, index) {
        final lot = lots[index];
        return LuxuryAuctionCard(
          auction: lot,
          onPlaceBid: () => _openPlaceBidSheet(lot),
          onViewHistory: () => _openBidHistorySheet(lot),
        );
      },
    );
  }
}
