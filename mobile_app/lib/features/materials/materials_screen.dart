import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/listing.dart';
import '../../providers/listings_provider.dart';

class MaterialsScreen extends ConsumerWidget {
  const MaterialsScreen({super.key});

  void _openInquiryModal(BuildContext context, LuxuryListing item) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final entityController = TextEditingController();
    final quantityController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
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
                    'B2B STRATEGIC ASSET INQUIRY',
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
                item.title,
                style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
              ),
              Text(
                'Depository: ${item.location.city}, ${item.location.country}',
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
              const Divider(height: 24),
              TextField(
                controller: entityController,
                decoration: const InputDecoration(
                  labelText: 'Corporate Entity Name & Country of Registration',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: quantityController,
                decoration: const InputDecoration(
                  labelText: 'Required Lot Quantity (MT / KG)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0D140F) : const Color(0xFFEBF3ED),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'COMPLIANCE NOTICE: Strategic materials transactions require formal Know-Your-Customer (KYC), End-User Undertaking (EUU), and relevant export authority clearance prior to release from bonded custody.',
                  style: TextStyle(fontSize: 10.5, height: 1.35),
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'SUBMIT B2B TRANSACTION MANDATE',
                variant: LuxuryButtonVariant.gold,
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('B2B Mandate logged. The depository custodian and curatorial compliance committee will initiate escrow diligence.'),
                      backgroundColor: LuxuryColors.deepForestGreen,
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final allListings = ref.watch(listingsProvider);
    final materialsList = allListings
        .where((l) => l.categoryId == 'cat-materials')
        .toList();

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'STRATEGIC MATERIALS',
        showBack: true,
      ),
      body: Column(
        children: [
          // Compliance Badge
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: isDark ? const Color(0xFF141E16) : const Color(0xFFEBF3ED),
            child: Row(
              children: [
                const Icon(Icons.shield_outlined, size: 16, color: LuxuryColors.champagne),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Independent SGS / ICP-MS laboratory certified. Bonded Freeport custody verification.',
                    style: TextStyle(
                      fontSize: 10.5,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                ),
              ],
            ),
          ),

          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: materialsList.length,
              separatorBuilder: (_, __) => const SizedBox(height: 20),
              itemBuilder: (context, index) {
                final item = materialsList[index];
                return Container(
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
                          item.coverImageUrl,
                          height: 160,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    item.title,
                                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                                  ),
                                ),
                                Text(
                                  '₹ ${(item.price / 10000000).toStringAsFixed(1)} Cr',
                                  style: TextStyle(
                                    color: LuxuryColors.champagne,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              item.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 12,
                                height: 1.35,
                                color: isDark ? Colors.white70 : Colors.black87,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Wrap(
                              spacing: 8,
                              runSpacing: 6,
                              children: item.specifications.take(3).map((s) {
                                return Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF1C1C1E) : const Color(0xFFEEEEEE),
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                  child: Text(
                                    '${s.key}: ${s.value}',
                                    style: const TextStyle(fontSize: 10.5, fontWeight: FontWeight.w500),
                                  ),
                                );
                              }).toList(),
                            ),
                            const SizedBox(height: 14),
                            LuxuryButton(
                              text: 'INQUIRE B2B TRANSACTION & ASSAY DOSSIER',
                              variant: LuxuryButtonVariant.gold,
                              height: 40,
                              onPressed: () => _openInquiryModal(context, item),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
