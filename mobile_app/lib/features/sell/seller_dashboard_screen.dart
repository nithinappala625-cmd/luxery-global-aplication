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
import '../../models/seller.dart';
import '../../providers/listings_provider.dart';
import '../../providers/seller_provider.dart';

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
    final currentSeller = ref.watch(currentSellerProfileProvider);

    final activeListings = allListings.where((l) => l.status == 'verified').toList();
    final pendingListings = allListings.where((l) => l.status == 'pending_review').toList();
    final draftListings = allListings.where((l) => l.status == 'draft').toList();
    final soldListings = allListings.where((l) => l.status == 'sold').toList();

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'SALON PORTFOLIO',
        actions: [
          IconButton(
            tooltip: 'Dynamic Field Builder',
            icon: const Icon(Icons.tune_outlined, size: 22),
            onPressed: () => context.push('/admin/fields'),
          ),
          IconButton(
            tooltip: 'Consign Asset',
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
          // Accredited Salon Header Strip
          if (currentSeller != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.pureBlack : const Color(0xFFF7F5F0),
                border: Border(
                  bottom: BorderSide(
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  ),
                ),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 14,
                    backgroundImage: NetworkImage(currentSeller.profilePhoto ?? 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop'),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Flexible(
                              child: Text(
                                currentSeller.displayName.toUpperCase(),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: LuxuryTypography.microCaps.copyWith(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 9.5,
                                  letterSpacing: 1.1,
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                            VerificationBadge(
                              isVerified: currentSeller.verificationStatus == VerificationStatus.verified,
                              customLabel: currentSeller.verificationStatus.label.toUpperCase(),
                            ),
                          ],
                        ),
                        Text(
                          '${currentSeller.verificationLevel.label} • ${currentSeller.city}, ${currentSeller.country}',
                          style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey, fontSize: 10),
                        ),
                      ],
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.push('/seller/${currentSeller.id}'),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    child: Text(
                      'SALON PROFILE',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                        fontSize: 8.5,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            )
          else
            Container(
              padding: const EdgeInsets.all(16),
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.pureBlack : const Color(0xFFFAF7F2),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.champagne.withOpacity(0.5)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.hourglass_top_rounded, color: LuxuryColors.champagne, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'UNDER 24-HOUR CURATORIAL AUDIT',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.2,
                          fontSize: 10.5,
                        ),
                      ),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: LuxuryColors.champagne.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          'IN REVIEW',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.champagne,
                            fontSize: 7.5,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your entity documents and asset dossiers are currently undergoing curatorial vetting by the Maison Du Luxe Board. Genuine verification completes within 24 hours. Your portfolio will then be published globally.',
                    style: LuxuryTypography.bodySmall.copyWith(
                      color: isDark ? LuxuryColors.mutedGrey : LuxuryColors.charcoal,
                      fontSize: 11,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () => context.push('/seller/register'),
                      style: TextButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        backgroundColor: LuxuryColors.champagne.withOpacity(0.12),
                      ),
                      child: Text(
                        'UPDATE AUDIT DOSSIERS',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          fontSize: 8.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

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
              // Seller Actions Bar: Preview, Edit, Pause, Sold, Delete
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildActionButton(
                      icon: Icons.visibility_outlined,
                      label: 'PREVIEW',
                      onTap: () => context.push('/listing/${item.id}'),
                    ),
                    _buildActionButton(
                      icon: Icons.edit_outlined,
                      label: 'EDIT',
                      onTap: () => _showEditListingModal(context, item),
                    ),
                    _buildActionButton(
                      icon: Icons.pause_circle_outline,
                      label: item.status == 'draft' ? 'RESUME' : 'PAUSE',
                      onTap: () {
                        final newStatus = item.status == 'draft' ? 'pending_review' : 'draft';
                        ref.read(allListingsProvider.notifier).updateListingStatus(item.id, newStatus);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(newStatus == 'draft' ? 'Listing paused.' : 'Listing submitted for review.')),
                        );
                      },
                    ),
                    _buildActionButton(
                      icon: Icons.check_circle_outline,
                      label: 'SOLD',
                      onTap: () {
                        ref.read(allListingsProvider.notifier).updateListingStatus(item.id, 'sold');
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Asset marked as SOLD.')),
                        );
                      },
                    ),
                    _buildActionButton(
                      icon: Icons.delete_outline,
                      label: 'DELETE',
                      onTap: () => _confirmDeleteListing(context, item),
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

  void _showEditListingModal(BuildContext context, LuxuryListing item) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final priceCtrl = TextEditingController(text: item.price.toStringAsFixed(0));
    final titleCtrl = TextEditingController(text: item.title);
    final descCtrl = TextEditingController(text: item.description);
    String selectedCurrency = item.currency;
    String selectedStatus = item.status;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 24,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'EDIT ASSET VALUATION & DETAILS',
                          style: LuxuryTypography.microCaps.copyWith(
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.2,
                            fontSize: 11,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, size: 20),
                          onPressed: () => Navigator.pop(ctx),
                        ),
                      ],
                    ),
                    const Divider(height: 1),
                    const SizedBox(height: 16),
                    Text(
                      'TITLE / ASSET NAME',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.champagne),
                    ),
                    const SizedBox(height: 6),
                    TextField(
                      controller: titleCtrl,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(2)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      ),
                      style: LuxuryTypography.bodyMedium,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'ASKING PRICE / VALUATION',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.champagne),
                    ),
                    const SizedBox(height: 6),
                    TextField(
                      controller: priceCtrl,
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(2)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      ),
                      style: LuxuryTypography.bodyMedium,
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'CURRENCY JURISDICTION',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.champagne),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: ['INR', 'USD', 'EUR', 'GBP', 'CHF', 'AED'].map((curr) {
                        final isSel = selectedCurrency == curr;
                        return ChoiceChip(
                          label: Text(curr),
                          selected: isSel,
                          selectedColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          labelStyle: TextStyle(
                            color: isSel ? Colors.black : (isDark ? Colors.white : Colors.black),
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                          onSelected: (sel) {
                            if (sel) setModalState(() => selectedCurrency = curr);
                          },
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'PORTFOLIO STATUS',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.champagne),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: ['verified', 'pending_review', 'draft', 'sold'].map((st) {
                        final isSel = selectedStatus == st;
                        return ChoiceChip(
                          label: Text(st.replaceAll('_', ' ').toUpperCase()),
                          selected: isSel,
                          selectedColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          labelStyle: TextStyle(
                            color: isSel ? Colors.black : (isDark ? Colors.white : Colors.black),
                            fontWeight: FontWeight.bold,
                            fontSize: 10,
                          ),
                          onSelected: (sel) {
                            if (sel) setModalState(() => selectedStatus = st);
                          },
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'CURATORIAL DESCRIPTION',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.champagne),
                    ),
                    const SizedBox(height: 6),
                    TextField(
                      controller: descCtrl,
                      maxLines: 3,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(2)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      ),
                      style: LuxuryTypography.bodyMedium,
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          foregroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                        ),
                        onPressed: () {
                          final newPrice = double.tryParse(priceCtrl.text) ?? item.price;
                          final updated = item.copyWith(
                            title: titleCtrl.text.isNotEmpty ? titleCtrl.text : item.title,
                            price: newPrice,
                            currency: selectedCurrency,
                            description: descCtrl.text.isNotEmpty ? descCtrl.text : item.description,
                            status: selectedStatus,
                          );
                          ref.read(allListingsProvider.notifier).updateListing(updated);
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Valuation and asset specifications updated.'),
                              backgroundColor: LuxuryColors.deepForestGreen,
                            ),
                          );
                        },
                        child: Text(
                          'SAVE CURATED VALUATION',
                          style: LuxuryTypography.microCaps.copyWith(
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.2,
                            color: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void _confirmDeleteListing(BuildContext context, LuxuryListing item) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: BorderSide(color: LuxuryColors.rejectionRed.withOpacity(0.5)),
        ),
        title: Text(
          'REMOVE FROM PRIVATE SALON?',
          style: LuxuryTypography.microCaps.copyWith(
            fontWeight: FontWeight.w700,
            letterSpacing: 1.2,
            fontSize: 12,
            color: LuxuryColors.rejectionRed,
          ),
        ),
        content: Text(
          'Are you sure you wish to permanently delete "${item.title}" from your salon portfolio? This action cannot be undone.',
          style: LuxuryTypography.bodySmall,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(
              'KEEP ASSET',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.mutedGrey,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: LuxuryColors.rejectionRed,
              foregroundColor: LuxuryColors.pureWhite,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
            ),
            onPressed: () {
              ref.read(allListingsProvider.notifier).removeListing(item.id);
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Asset permanently deleted from salon.')),
              );
            },
            child: Text(
              'DELETE ASSET',
              style: LuxuryTypography.microCaps.copyWith(
                fontWeight: FontWeight.w700,
                letterSpacing: 1.0,
                color: LuxuryColors.pureWhite,
              ),
            ),
          ),
        ],
      ),
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
