import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../providers/founding_sellers_provider.dart';

class FoundingSellersScreen extends ConsumerStatefulWidget {
  const FoundingSellersScreen({super.key});

  @override
  ConsumerState<FoundingSellersScreen> createState() => _FoundingSellersScreenState();
}

class _FoundingSellersScreenState extends ConsumerState<FoundingSellersScreen> {
  final _businessController = TextEditingController();
  final _volumeController = TextEditingController();
  final _nameController = TextEditingController();
  final _contactController = TextEditingController();
  String _selectedVertical = 'Haute Horlogerie & Watches';

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(foundingSellersProvider);
    final campaign = state.campaign;

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'FOUNDING SELLERS',
        showBack: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Spotlight
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: isDark
                      ? [const Color(0xFF221A08), const Color(0xFF141005)]
                      : [const Color(0xFFFBF4E4), const Color(0xFFF5E8C8)],
                ),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.champagne, width: 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'FOUNDING ACCREDITATION',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.2,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: LuxuryColors.champagne,
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          '${campaign.remainingSlots} SLOTS LEFT',
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    campaign.campaignName,
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'NP GROUPS invites the world’s foremost luxury dealers, private salon curators, and aircraft brokerages to join our inaugural cohort with lifetime institutional privileges.',
                    style: TextStyle(
                      fontSize: 13,
                      height: 1.45,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 18),
                  // Progress indicator
                  LinearProgressIndicator(
                    value: campaign.claimedSlots / campaign.totalSlots,
                    backgroundColor: Colors.grey.withOpacity(0.3),
                    valueColor: const AlwaysStoppedAnimation<Color>(LuxuryColors.champagne),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    '${campaign.claimedSlots} of ${campaign.totalSlots} founding salons accredited globally.',
                    style: const TextStyle(fontSize: 11, color: LuxuryColors.champagne),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 28),

            Text(
              'EXCLUSIVE COHORT PRIVILEGES',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 14),

            ...campaign.exclusivePrivileges.map((p) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.star, size: 16, color: LuxuryColors.champagne),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        p,
                        style: TextStyle(fontSize: 13, color: isDark ? Colors.white70 : Colors.black87),
                      ),
                    ),
                  ],
                ),
              );
            }),

            const SizedBox(height: 32),

            // Application Form
            Container(
              padding: const EdgeInsets.all(20),
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
                  Text(
                    'FOUNDING APPLICATION',
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Undergoes 24-hour review by the NP GROUPS Curatorial Committee.',
                    style: TextStyle(fontSize: 11.5, color: Colors.grey),
                  ),
                  const Divider(height: 24),
                  TextField(
                    controller: _businessController,
                    decoration: const InputDecoration(
                      labelText: 'Entity / Salon / Dealer Name',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    value: _selectedVertical,
                    decoration: const InputDecoration(
                      labelText: 'Primary Specialization',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: 'Haute Horlogerie & Watches', child: Text('Haute Horlogerie & Watches')),
                      DropdownMenuItem(value: 'Diamonds & High Joaillerie', child: Text('Diamonds & High Joaillerie')),
                      DropdownMenuItem(value: 'Exotic & Classic Supercars', child: Text('Exotic & Classic Supercars')),
                      DropdownMenuItem(value: 'Private Aviation & Aircraft', child: Text('Private Aviation & Aircraft')),
                      DropdownMenuItem(value: 'Superyachts & Marine', child: Text('Superyachts & Marine')),
                      DropdownMenuItem(value: 'Strategic Minerals & Materials', child: Text('Strategic Minerals & Materials')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedVertical = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _volumeController,
                    decoration: const InputDecoration(
                      labelText: 'Estimated Annual Consignment Volume (INR ₹ / USD \$)',
                      hintText: 'e.g. ₹20 Crore / \$2.5M+',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: 'Managing Director / Authorized Representative',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _contactController,
                    decoration: const InputDecoration(
                      labelText: 'Direct Phone & Corporate Email',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 20),
                  LuxuryButton(
                    text: state.hasApplied ? 'APPLICATION UNDER 24-HOUR AUDIT' : 'SUBMIT FOUNDING DOSSIER',
                    variant: state.hasApplied ? LuxuryButtonVariant.secondary : LuxuryButtonVariant.gold,
                    onPressed: state.hasApplied
                        ? null
                        : () async {
                            await ref.read(foundingSellersProvider.notifier).submitApplication(
                                  businessName: _businessController.text,
                                  vertical: _selectedVertical,
                                  estimatedAnnualVolume: _volumeController.text,
                                  representativeName: _nameController.text,
                                  email: _contactController.text,
                                  phone: _contactController.text,
                                );
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Founding dossier submitted! Curatorial Committee will respond within 24 hours.'),
                                backgroundColor: LuxuryColors.deepForestGreen,
                              ),
                            );
                          },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
