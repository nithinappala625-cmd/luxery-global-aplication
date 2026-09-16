import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_image.dart';
import '../../core/widgets/luxury_price.dart';
import '../../models/listing.dart';
import '../../providers/listings_provider.dart';

class AdminDashboardScreen extends ConsumerWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final allListings = ref.watch(allListingsProvider);
    final pendingListings = allListings.where((l) => l.status == 'pending_review').toList();

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'CURATORIAL BOARD',
        showBack: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Admin Board Metrics
            Row(
              children: [
                Expanded(
                  child: _buildMetricCard(
                    context,
                    label: 'PENDING REVIEWS',
                    value: pendingListings.length.toString(),
                    color: LuxuryColors.pendingAmber,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMetricCard(
                    context,
                    label: 'ACTIVE VERIFIED',
                    value: allListings.where((l) => l.status == 'verified').length.toString(),
                    color: LuxuryColors.verifiedGreen,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            Text(
              'CONSIGNMENTS AWAITING AUTHENTICATION',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 12),

            if (pendingListings.isEmpty)
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                  border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                ),
                child: Center(
                  child: Column(
                    children: [
                      const Icon(Icons.check_circle_outline, size: 36, color: LuxuryColors.verifiedGreen),
                      const SizedBox(height: 10),
                      Text(
                        'ALL SUBMISSIONS CURATED',
                        style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'No pending consignments requiring title or provenance inspection.',
                        style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                      ),
                    ],
                  ),
                ),
              )
            else
              ...pendingListings.map((listing) => _buildReviewCard(context, ref, listing)),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricCard(
    BuildContext context, {
    required String label,
    required String value,
    required Color color,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.mutedGrey,
              fontSize: 8.5,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            value,
            style: LuxuryTypography.editorialHeading1.copyWith(
              color: color,
              fontSize: 28,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReviewCard(BuildContext context, WidgetRef ref, LuxuryListing listing) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            leading: LuxuryImage(
              imageUrl: listing.coverImageUrl,
              width: 50,
              height: 50,
            ),
            title: Text(
              listing.title,
              style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 15),
            ),
            subtitle: Text(
              '${listing.categoryName} • ${listing.location.city}',
              style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
            ),
            trailing: LuxuryPrice(
              amount: listing.price,
              currency: listing.currency,
              size: LuxuryPriceSize.small,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text(
              listing.description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
            ),
          ),
          Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () {
                    ref.read(allListingsProvider.notifier).updateListingStatus(listing.id, 'rejected');
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Consignment rejected with feedback.')),
                    );
                  },
                  child: Text(
                    'REJECT',
                    style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.rejectionRed),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: LuxuryColors.deepForestGreen,
                    foregroundColor: LuxuryColors.pureWhite,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  onPressed: () {
                    ref.read(allListingsProvider.notifier).updateListingStatus(listing.id, 'verified');
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Asset authenticated and published to global salon!')),
                    );
                  },
                  child: Text(
                    'APPROVE & VERIFY',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.pureWhite,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
