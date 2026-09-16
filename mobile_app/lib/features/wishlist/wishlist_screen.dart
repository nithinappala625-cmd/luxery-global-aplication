import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_listing_card.dart';
import '../../providers/wishlist_provider.dart';

class WishlistScreen extends ConsumerWidget {
  const WishlistScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final savedItems = ref.watch(savedListingsProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'PRIVATE VAULT',
        showBack: true,
        showWishlist: false,
      ),
      body: savedItems.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.bookmark_border,
                      size: 44,
                      color: LuxuryColors.champagne,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'YOUR VAULT IS EMPTY',
                      style: LuxuryTypography.editorialHeading3.copyWith(
                        letterSpacing: 2.0,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Save exceptional possessions to your private vault to monitor valuations and direct custodian access.',
                      textAlign: TextAlign.center,
                      style: LuxuryTypography.bodySmall.copyWith(
                        color: LuxuryColors.mutedGrey,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 24),
                    LuxuryButton(
                      text: 'DISCOVER POSSESSIONS',
                      variant: LuxuryButtonVariant.gold,
                      onPressed: () => context.go('/discover'),
                    ),
                  ],
                ),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: savedItems.length,
              separatorBuilder: (context, index) => const SizedBox(height: 20),
              itemBuilder: (context, index) {
                final item = savedItems[index];
                return LuxuryListingCard(
                  listing: item,
                  layout: ListingCardLayout.grid,
                );
              },
            ),
    );
  }
}
