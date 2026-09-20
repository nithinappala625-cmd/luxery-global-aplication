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

  String _formatFee(double fee) {
    if (fee >= 10000000) {
      final cr = fee / 10000000;
      return '₹${cr.toStringAsFixed(cr.truncateToDouble() == cr ? 0 : 1)} Crore';
    } else if (fee >= 100000) {
      final lk = fee / 100000;
      return '₹${lk.toStringAsFixed(lk.truncateToDouble() == lk ? 0 : 1)} Lakh';
    } else {
      return '₹${fee.toInt()}';
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(membershipProvider);

    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: const LuxuryAppBar(
        title: 'PATRON MEMBERSHIP',
        showBack: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Current Patron Status Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E180A), Color(0xFF0C0A04)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: LuxuryColors.gold, width: 1.2),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'CURRENT SOVEREIGN TIER',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.gold,
                          letterSpacing: 2.2,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: LuxuryColors.gold,
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          state.currentTier.title.toUpperCase(),
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.pureBlack,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    state.hasUnlimitedCredits
                        ? 'Unlimited Sovereign Contact Unlocks & Deal Room'
                        : '${state.remainingContactCredits} Sovereign Contact Unlocks Available',
                    style: LuxuryTypography.editorialHeading2.copyWith(
                      color: LuxuryColors.pureWhite,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    state.currentTier.buyingPower,
                    style: LuxuryTypography.bodySmall.copyWith(
                      color: LuxuryColors.goldLight,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            Text(
              'ACQUISITION AUTHORITY & PRIVILEGES',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                letterSpacing: 2.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'THE FOUR WEALTH TIERS',
              style: LuxuryTypography.editorialHeading1.copyWith(
                color: LuxuryColors.pureWhite,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Membership fee scales strictly according to verified portfolio acquisition capacity.',
              style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
            ),

            const SizedBox(height: 24),

            // The 4 Plans
            ...state.availablePlans.map((plan) {
              final isCurrent = state.currentTier == plan.tier;
              final isDynasty = plan.tier == MembershipTier.dynasty;
              final isBlack = plan.tier == MembershipTier.black;

              return Container(
                margin: const EdgeInsets.only(bottom: 24),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: isDynasty
                      ? const Color(0xFF141005)
                      : (isBlack ? const Color(0xFF0F0F0F) : LuxuryColors.darkCard),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(
                    color: (isDynasty || isBlack) ? LuxuryColors.gold : LuxuryColors.borderDark,
                    width: isDynasty ? 1.8 : (isBlack ? 1.2 : 0.8),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            plan.tier.title,
                            style: LuxuryTypography.editorialHeading2.copyWith(
                              fontSize: 20,
                              color: (isDynasty || isBlack) ? LuxuryColors.gold : LuxuryColors.pureWhite,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        if (isCurrent)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: LuxuryColors.gold.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: LuxuryColors.gold, width: 0.8),
                            ),
                            child: const Text('ACTIVE', style: TextStyle(color: LuxuryColors.gold, fontSize: 10, fontWeight: FontWeight.bold)),
                          ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1C1C1E),
                        borderRadius: BorderRadius.circular(2),
                      ),
                      child: Text(
                        plan.buyingPowerLimit.toUpperCase(),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.goldLight,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text(
                          _formatFee(plan.monthlyPriceInr),
                          style: LuxuryTypography.priceLarge.copyWith(
                            color: LuxuryColors.pureWhite,
                            fontWeight: FontWeight.bold,
                            fontSize: 22,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          '/ Month',
                          style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                        ),
                        const Spacer(),
                        Text(
                          '${_formatFee(plan.annualPriceInr)} Annual',
                          style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.gold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Divider(color: LuxuryColors.borderDark, height: 1),
                    const SizedBox(height: 14),

                    ...plan.perks.map((perk) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.check, size: 16, color: LuxuryColors.gold),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                perk,
                                style: LuxuryTypography.bodySmall.copyWith(
                                  color: LuxuryColors.platinum,
                                  height: 1.35,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                    const SizedBox(height: 20),

                    LuxuryButton(
                      text: isCurrent ? 'CURRENT PATRON TIER' : 'ACTIVATE ${plan.tier.title.toUpperCase()}',
                      backgroundColor: isCurrent ? const Color(0xFF222222) : LuxuryColors.gold,
                      textColor: isCurrent ? LuxuryColors.mutedGrey : LuxuryColors.pureBlack,
                      onPressed: isCurrent
                          ? null
                          : () async {
                              await ref.read(membershipProvider.notifier).upgradePlan(plan.tier);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Upgraded to ${plan.tier.title}! All wealth privileges active.'),
                                  backgroundColor: const Color(0xFF161616),
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
