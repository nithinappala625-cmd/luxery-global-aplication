import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/buyer_request.dart';
import '../../providers/buyer_requests_provider.dart';

class BuyerRequestsScreen extends ConsumerStatefulWidget {
  const BuyerRequestsScreen({super.key});

  @override
  ConsumerState<BuyerRequestsScreen> createState() => _BuyerRequestsScreenState();
}

class _BuyerRequestsScreenState extends ConsumerState<BuyerRequestsScreen> {
  void _openCreateRequestSheet() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    String selectedCat = 'watches';
    String selectedCatName = 'Luxury Watches';
    final assetController = TextEditingController();
    final brandController = TextEditingController();
    final budgetController = TextEditingController();
    final locationController = TextEditingController();
    final timelineController = TextEditingController(text: 'Within 30 Days');
    final specsController = TextEditingController();

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
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'PRIVATE REQUEST MANDATE',
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
                    const Text(
                      'I Am Looking For...',
                      style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 14),

                    DropdownButtonFormField<String>(
                      value: selectedCat,
                      decoration: const InputDecoration(
                        labelText: 'Marketplace Vertical',
                        border: OutlineInputBorder(),
                      ),
                      items: const [
                        DropdownMenuItem(value: 'watches', child: Text('Luxury Watches')),
                        DropdownMenuItem(value: 'jewellery', child: Text('Diamonds & Fine Jewellery')),
                        DropdownMenuItem(value: 'cars', child: Text('Luxury & Exotic Cars')),
                        DropdownMenuItem(value: 'aviation', child: Text('Private Aviation / Aircraft')),
                        DropdownMenuItem(value: 'yachts', child: Text('Yachts & Superyachts')),
                        DropdownMenuItem(value: 'materials', child: Text('Strategic Materials')),
                        DropdownMenuItem(value: 'collectibles', child: Text('Luxury Collectibles & Art')),
                      ],
                      onChanged: (val) {
                        if (val != null) {
                          setSheetState(() {
                            selectedCat = val;
                            if (val == 'watches') selectedCatName = 'Luxury Watches';
                            if (val == 'jewellery') selectedCatName = 'Diamonds & Fine Jewellery';
                            if (val == 'cars') selectedCatName = 'Luxury & Exotic Cars';
                            if (val == 'aviation') selectedCatName = 'Private Aviation';
                            if (val == 'yachts') selectedCatName = 'Yachts & Marine';
                            if (val == 'materials') selectedCatName = 'Strategic Materials';
                            if (val == 'collectibles') selectedCatName = 'Luxury Collectibles';
                          });
                        }
                      },
                    ),

                    const SizedBox(height: 12),
                    TextField(
                      controller: assetController,
                      decoration: const InputDecoration(
                        labelText: 'Asset Title / Model Desired',
                        hintText: 'e.g. Patek Philippe Nautilus 5711 or Global 7500',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 12),
                    TextField(
                      controller: brandController,
                      decoration: const InputDecoration(
                        labelText: 'Preferred House / Brand',
                        hintText: 'e.g. Rolex, Cartier, Gulfstream',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 12),
                    TextField(
                      controller: budgetController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Maximum Acquisition Budget (INR ₹)',
                        hintText: 'e.g. 80000000',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 12),
                    TextField(
                      controller: locationController,
                      decoration: const InputDecoration(
                        labelText: 'Target Delivery Hub',
                        hintText: 'e.g. Mumbai, New Delhi, Dubai, Geneva',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 12),
                    TextField(
                      controller: specsController,
                      maxLines: 3,
                      decoration: const InputDecoration(
                        labelText: 'Detailed Technical / Provenance Requirements',
                        hintText: 'Condition, box/papers, color, certification, flight hours...',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 18),
                    LuxuryButton(
                      text: 'BROADCAST CONFIDENTIAL REQUEST',
                      variant: LuxuryButtonVariant.gold,
                      onPressed: () async {
                        final bgt = double.tryParse(budgetController.text) ?? 5000000.0;
                        await ref.read(buyerRequestsProvider.notifier).submitRequest(
                              categorySlug: selectedCat,
                              categoryName: selectedCatName,
                              assetDesired: assetController.text.isNotEmpty ? assetController.text : 'Bespoke Asset',
                              preferredBrand: brandController.text,
                              budgetMax: bgt,
                              currency: 'INR',
                              targetLocation: locationController.text.isNotEmpty ? locationController.text : 'Mumbai / Global',
                              timeline: timelineController.text,
                              specificRequirements: specsController.text,
                            );
                        if (context.mounted) {
                          Navigator.pop(context);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Private request registered! Matching accredited salons will propose dossiers.'),
                              backgroundColor: LuxuryColors.deepForestGreen,
                            ),
                          );
                        }
                      },
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

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(buyerRequestsProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'PRIVATE REQUESTS',
        showBack: true,
      ),
      body: Column(
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(16),
            color: isDark ? const Color(0xFF141E16) : const Color(0xFFEBF3ED),
            child: Row(
              children: [
                const Icon(Icons.shield_outlined, color: LuxuryColors.champagne, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Confidential matching engine. Only verified dealers, aircraft brokers, and certified curators can submit proposals.',
                    style: TextStyle(fontSize: 11, color: isDark ? Colors.white70 : Colors.black87),
                  ),
                ),
              ],
            ),
          ),

          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: state.requests.length,
              separatorBuilder: (_, __) => const SizedBox(height: 16),
              itemBuilder: (context, index) {
                final req = state.requests[index];
                return Container(
                  padding: const EdgeInsets.all(16),
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: LuxuryColors.champagne.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(2),
                            ),
                            child: Text(
                              req.categoryName.toUpperCase(),
                              style: const TextStyle(
                                color: LuxuryColors.champagne,
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Text(
                            req.clientMaskedName,
                            style: TextStyle(
                              fontSize: 10.5,
                              color: isDark ? Colors.white54 : Colors.black54,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        req.assetDesired,
                        style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Budget Ceiling: ₹ ${(req.budgetMax / 10000000).toStringAsFixed(1)} Cr  •  Hub: ${req.targetLocation}',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: LuxuryColors.champagne,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        req.specificRequirements,
                        style: TextStyle(
                          fontSize: 11.5,
                          height: 1.35,
                          color: isDark ? Colors.white70 : Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Timeline: ${req.timeline}',
                            style: const TextStyle(fontSize: 10.5, color: Colors.grey),
                          ),
                          Text(
                            '${req.matchedPropositionsCount} Curated Matches',
                            style: const TextStyle(
                              fontSize: 10.5,
                              fontWeight: FontWeight.bold,
                              color: LuxuryColors.champagne,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(20),
            child: LuxuryButton(
              text: 'CREATE NEW PRIVATE REQUEST',
              variant: LuxuryButtonVariant.gold,
              onPressed: _openCreateRequestSheet,
            ),
          ),
        ],
      ),
    );
  }
}
