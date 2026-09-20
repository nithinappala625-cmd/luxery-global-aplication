import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_image.dart';
import '../../models/luxury_locker.dart';
import '../../providers/lockers_provider.dart';

class LockersScreen extends ConsumerStatefulWidget {
  const LockersScreen({super.key});

  @override
  ConsumerState<LockersScreen> createState() => _LockersScreenState();
}

class _LockersScreenState extends ConsumerState<LockersScreen> {
  void _openConsultationSheet(LuxuryLocker locker) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF0D0D0D),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(color: LuxuryColors.goldBorder, width: 1.0),
      ),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 24,
            bottom: MediaQuery.of(context).viewInsets.bottom + 28,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'SECURITY VAULT COMMISSION',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: LuxuryColors.mutedGrey, size: 20),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                locker.title,
                style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite),
              ),
              const SizedBox(height: 6),
              Text(
                'Turnkey Commission: ${locker.priceDisplay} • ${locker.manufacturer}',
                style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF141414),
                  border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Column(
                  children: [
                    _buildRow('Security Standard', locker.securityRating),
                    const SizedBox(height: 6),
                    _buildRow('Locking System', locker.lockingMechanism),
                    const SizedBox(height: 6),
                    _buildRow('Watch Winders', '${locker.watchWindersCount} Programmable Rotors'),
                    const SizedBox(height: 6),
                    _buildRow('Armored Weight', '${locker.weightKg.toInt()} kg Solid Steel / Composite'),
                    const SizedBox(height: 6),
                    _buildRow('Fire Rating', '${locker.fireRatingHours} Hours Continuous Thermal Barrier'),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'COMMISSION ARCHITECTURAL SURVEY',
                backgroundColor: LuxuryColors.gold,
                textColor: LuxuryColors.pureBlack,
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      backgroundColor: const Color(0xFF161616),
                      content: Row(
                        children: [
                          const Icon(Icons.shield_outlined, color: LuxuryColors.gold, size: 18),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'White-glove vault engineering team assigned. Confidential site survey scheduled.',
                              style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.pureWhite),
                            ),
                          ),
                        ],
                      ),
                      duration: const Duration(seconds: 4),
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

  Widget _buildRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            value,
            textAlign: TextAlign.end,
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.pureWhite, fontWeight: FontWeight.w500),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(lockersProvider);

    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: const LuxuryAppBar(
        title: 'HIGH-SECURITY VAULTS',
        showBack: true,
        showSearch: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Editorial Header
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: LuxuryColors.borderDark, width: 0.8)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'NP GROUPS SOVEREIGN SANCTUARIES',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Bespoke Armored Safes & Walk-In Panic Vaults',
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: LuxuryColors.pureWhite,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'German & Austrian ballistic engineering: Döttling, Stockinger, Buben & Zörweg. Certified VdS ratings, watch winders, and biometric encryption.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: LuxuryColors.mutedGrey,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Locker List
          SliverPadding(
            padding: const EdgeInsets.all(20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final locker = state.filteredLockers[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    decoration: BoxDecoration(
                      color: LuxuryColors.darkCard,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Image Stack
                        Stack(
                          children: [
                            SizedBox(
                              height: 220,
                              width: double.infinity,
                              child: ClipRRect(
                                borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                                child: LuxuryImage(
                                  imageUrl: locker.mediaUrls.isNotEmpty ? locker.mediaUrls.first : '',
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            Positioned(
                              top: 12,
                              left: 12,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.pureBlack.withOpacity(0.85),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                                ),
                                child: Text(
                                  locker.manufacturer.toUpperCase(),
                                  style: LuxuryTypography.microCaps.copyWith(
                                    color: LuxuryColors.gold,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 12,
                              right: 12,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.pureBlack.withOpacity(0.9),
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: LuxuryColors.gold, width: 0.8),
                                ),
                                child: Text(
                                  locker.priceDisplay,
                                  style: LuxuryTypography.priceMedium.copyWith(
                                    color: LuxuryColors.pureWhite,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),

                        // Info
                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                locker.vaultType.toUpperCase(),
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: LuxuryColors.champagne,
                                  letterSpacing: 1.8,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                locker.title,
                                style: LuxuryTypography.editorialHeading2.copyWith(
                                  color: LuxuryColors.pureWhite,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                locker.description,
                                style: LuxuryTypography.bodyMedium.copyWith(
                                  color: LuxuryColors.mutedGrey,
                                  height: 1.45,
                                ),
                              ),
                              const SizedBox(height: 14),

                              // Key badges
                              Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                children: [
                                  _specBadge(Icons.verified, locker.securityRating, isGold: true),
                                  _specBadge(Icons.fingerprint, locker.lockingMechanism),
                                  _specBadge(Icons.watch, '${locker.watchWindersCount} Winders'),
                                  _specBadge(Icons.fitness_center, '${locker.weightKg.toInt()} kg'),
                                  _specBadge(Icons.local_fire_department, '${locker.fireRatingHours}h Fire Shield'),
                                ],
                              ),
                              const SizedBox(height: 18),

                              LuxuryButton(
                                text: 'COMMISSION BESPOKE SAFE',
                                backgroundColor: LuxuryColors.gold,
                                textColor: LuxuryColors.pureBlack,
                                onPressed: () => _openConsultationSheet(locker),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: state.filteredLockers.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _specBadge(IconData icon, String text, {bool isGold = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFF181818),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isGold ? LuxuryColors.gold : LuxuryColors.borderDark,
          width: 0.8,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: isGold ? LuxuryColors.gold : LuxuryColors.mutedGrey),
          const SizedBox(width: 5),
          Text(
            text,
            style: LuxuryTypography.microCaps.copyWith(
              color: isGold ? LuxuryColors.goldLight : LuxuryColors.platinum,
              fontWeight: isGold ? FontWeight.bold : FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
