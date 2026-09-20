import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/membership.dart';
import '../../providers/membership_provider.dart';

class MembershipScreen extends ConsumerWidget {
  const MembershipScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(membershipProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'NP MEMBERSHIP',
        showBack: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Current Status Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: isDark
                      ? [const Color(0xFF1E2820), const Color(0xFF0F1410)]
                      : [const Color(0xFFE2EFE5), const Color(0xFFD4E5D8)],
                ),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.champagne),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'CURRENT PATRON TIER',
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
                          state.currentTier.title.toUpperCase(),
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
                    state.hasUnlimitedCredits
                        ? 'Unlimited Contact Unlocks & VIP Deal Desk'
                        : '${state.remainingContactCredits} Contact Unlocks Available',
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    state.currentTier.subtitle,
                    style: TextStyle(
                      fontSize: 12,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            Text(
              'SELECT YOUR PATRONAGE TIER',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'THE PRIVILEGES',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
              ),
            ),

            const SizedBox(height: 20),

            // The 3 Plans
            ...state.availablePlans.map((plan) {
              final isCurrent = state.currentTier == plan.tier;
              final isBlack = plan.tier == MembershipTier.black;

              return Container(
                margin: const EdgeInsets.only(bottom: 20),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: isBlack
                      ? (isDark ? const Color(0xFF0F0F0F) : const Color(0xFF161616))
                      : (isDark ? const Color(0xFF141414) : Colors.white),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(
                    color: isBlack
                        ? LuxuryColors.champagne
                        : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                    width: isBlack ? 1.5 : 0.8,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          plan.tier.title,
                          style: LuxuryTypography.editorialHeading2.copyWith(
                            fontSize: 20,
                            color: isBlack ? LuxuryColors.champagne : (isDark ? Colors.white : Colors.black),
                          ),
                        ),
                        if (isCurrent)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: LuxuryColors.champagne.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(2),
                            ),
                            child: const Text('ACTIVE', style: TextStyle(color: LuxuryColors.champagne, fontSize: 10, fontWeight: FontWeight.bold)),
                          ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '₹ ${(plan.monthlyPriceInr / 1000).toStringAsFixed(0)}K / Month  (₹ ${(plan.annualPriceInr / 100000).toStringAsFixed(1)}L Annual)',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: LuxuryColors.champagne,
                      ),
                    ),
                    const SizedBox(height: 12),
                    ...plan.perks.map((perk) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.check, size: 16, color: LuxuryColors.champagne),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                perk,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: isBlack ? Colors.white70 : (isDark ? Colors.white70 : Colors.black87),
                                  height: 1.3,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                    const SizedBox(height: 18),
                    LuxuryButton(
                      text: isCurrent ? 'CURRENT PATRON TIER' : 'UPGRADE TO ${plan.tier.title.toUpperCase()}',
                      variant: isBlack ? LuxuryButtonVariant.gold : LuxuryButtonVariant.secondary,
                      height: 42,
                      onPressed: isCurrent
                          ? null
                          : () async {
                              await ref.read(membershipProvider.notifier).upgradePlan(plan.tier);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Upgraded to ${plan.tier.title}! All privileges unlocked instantly.'),
                                  backgroundColor: LuxuryColors.deepForestGreen,
                                ),
                              );
                            },
                    ),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
