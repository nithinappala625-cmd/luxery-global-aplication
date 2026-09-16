import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_image.dart';
import '../../core/widgets/luxury_price.dart';
import '../../models/listing.dart';
import '../../providers/listings_provider.dart';

class SellerDashboardScreen extends ConsumerStatefulWidget {
  const SellerDashboardScreen({super.key});

  @override
  ConsumerState<SellerDashboardScreen> createState() => _SellerDashboardScreenState();
}

class _SellerDashboardScreenState extends ConsumerState<SellerDashboardScreen>
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
    final allListings = ref.watch(allListingsProvider);

    final activeListings = allListings.where((l) => l.status == 'verified').toList();
    final pendingListings = allListings.where((l) => l.status == 'pending_review').toList();
    final draftListings = allListings.where((l) => l.status == 'draft').toList();
    final soldListings = allListings.where((l) => l.status == 'sold').toList();

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'SALON PORTFOLIO',
        actions: [
          IconButton(
            icon: const Icon(Icons.add, size: 24),
            onPressed: () => context.push('/sell/new'),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
          labelColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
          unselectedLabelColor: LuxuryColors.mutedGrey,
          labelStyle: LuxuryTypography.microCaps.copyWith(fontWeight: FontWeight.w700),
          tabs: [
            Tab(text: 'ACTIVE (${activeListings.length})'),
            Tab(text: 'PENDING (${pendingListings.length})'),
            Tab(text: 'DRAFTS (${draftListings.length})'),
            Tab(text: 'SOLD (${soldListings.length})'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Portfolio KPI / Analytics Summary Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
              border: Border(
                bottom: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildKpiItem('PORTFOLIO VALUE', '€1.92M'),
                Container(width: 1, height: 28, color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                _buildKpiItem('TOTAL VIEWS', '14.2K'),
                Container(width: 1, height: 28, color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                _buildKpiItem('UNLOCK REQUESTS', '28'),
                Container(width: 1, height: 28, color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                _buildKpiItem('INQUIRIES', '12'),
              ],
            ),
          ),

          // Tab Bar View with Listings
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildListingsList(activeListings, 'active'),
                _buildListingsList(pendingListings, 'pending'),
                _buildListingsList(draftListings, 'draft'),
                _buildListingsList(soldListings, 'sold'),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
        foregroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
        icon: const Icon(Icons.add),
        label: Text('LIST NEW ASSET', style: LuxuryTypography.buttonLabel),
        onPressed: () => context.push('/sell/new'),
      ),
    );
  }

  Widget _buildKpiItem(String title, String value) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        Text(
          value,
          style: LuxuryTypography.priceMedium.copyWith(
            color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          title,
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.mutedGrey,
            fontSize: 8.0,
            letterSpacing: 1.0,
          ),
        ),
      ],
    );
  }

  Widget _buildListingsList(List<LuxuryListing> items, String tabType) {
    if (items.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.inventory_2_outlined, size: 36, color: LuxuryColors.mutedGrey.withOpacity(0.5)),
              const SizedBox(height: 12),
              Text(
                'NO ASSETS IN THIS CATEGORY',
                style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
              ),
              const SizedBox(height: 6),
              Text(
                'Use "List New Asset" to consign an asset into your private salon.',
                style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
              ),
            ],
          ),
        ),
      );
    }

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: items.length,
      separatorBuilder: (context, index) => const SizedBox(height: 16),
      itemBuilder: (context, index) {
        final item = items[index];
        return Container(
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            borderRadius: BorderRadius.circular(2),
            border: Border.all(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(12),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    LuxuryImage(
                      imageUrl: item.coverImageUrl,
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              VerificationBadge(
                                isVerified: item.isCuratorVerified,
                                customLabel: item.status.toUpperCase(),
                              ),
                              Text(
                                '${item.viewCount} VIEWS',
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: LuxuryColors.mutedGrey,
                                  fontSize: 8.5,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            item.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 15),
                          ),
                          const SizedBox(height: 4),
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
              Divider(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                height: 1,
              ),
              // Seller Actions Bar: Edit, Pause, Mark Sold, Delete
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildActionButton(
                      icon: Icons.visibility_outlined,
                      label: 'PREVIEW',
                      onTap: () => context.push('/listing/${item.id}'),
                    ),
                    _buildActionButton(
                      icon: Icons.check_circle_outline,
                      label: 'MARK SOLD',
                      onTap: () {
                        ref.read(allListingsProvider.notifier).updateListingStatus(item.id, 'sold');
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Asset marked as SOLD.')),
                        );
                      },
                    ),
                    _buildActionButton(
                      icon: Icons.pause_circle_outline,
                      label: 'PAUSE',
                      onTap: () {
                        ref.read(allListingsProvider.notifier).updateListingStatus(item.id, 'draft');
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Listing paused & saved to drafts.')),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Icon(icon, size: 14, color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal),
          const SizedBox(width: 4),
          Text(
            label,
            style: LuxuryTypography.microCaps.copyWith(
              color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
              fontSize: 9,
            ),
          ),
        ],
      ),
    );
  }
}
