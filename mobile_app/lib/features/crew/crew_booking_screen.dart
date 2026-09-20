import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_image.dart';
import '../../models/crew_booking.dart';
import '../../providers/crew_provider.dart';

class CrewBookingScreen extends ConsumerStatefulWidget {
  const CrewBookingScreen({super.key});

  @override
  ConsumerState<CrewBookingScreen> createState() => _CrewBookingScreenState();
}

class _CrewBookingScreenState extends ConsumerState<CrewBookingScreen> {
  final List<String> _roles = [
    'All',
    'Private Jet',
    'Superyacht',
    'Helicopter',
    'Close Protection',
  ];

  void _openBookingSheet(EliteCrewProfile crew) {
    DateTime startDate = DateTime.now().add(const Duration(days: 2));
    DateTime endDate = DateTime.now().add(const Duration(days: 7));
    String bookingMode = 'Daily Deployment'; // or 'Monthly Retainer'

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF0D0D0D),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(color: LuxuryColors.goldBorder, width: 1.0),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            final days = endDate.difference(startDate).inDays;
            final estimatedCost = bookingMode == 'Daily Deployment'
                ? days * crew.dayRateInr
                : crew.monthlyRetainerInr;

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
                        'RESERVE SOVEREIGN SPECIALIST',
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
                    crew.name,
                    style: LuxuryTypography.editorialHeading2.copyWith(color: LuxuryColors.pureWhite),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${crew.role} • ${crew.credentials}',
                    style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.gold),
                  ),
                  const SizedBox(height: 16),

                  // Mode Selector: Day vs Month
                  Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setSheetState(() => bookingMode = 'Daily Deployment'),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            decoration: BoxDecoration(
                              color: bookingMode == 'Daily Deployment' ? LuxuryColors.gold : const Color(0xFF141414),
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: LuxuryColors.goldBorder),
                            ),
                            alignment: Alignment.center,
                            child: Text(
                              'DAILY DEPLOYMENT\n${crew.dayRateDisplay}',
                              textAlign: TextAlign.center,
                              style: LuxuryTypography.microCaps.copyWith(
                                color: bookingMode == 'Daily Deployment' ? LuxuryColors.pureBlack : LuxuryColors.platinum,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setSheetState(() => bookingMode = 'Monthly Retainer'),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            decoration: BoxDecoration(
                              color: bookingMode == 'Monthly Retainer' ? LuxuryColors.gold : const Color(0xFF141414),
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: LuxuryColors.goldBorder),
                            ),
                            alignment: Alignment.center,
                            child: Text(
                              'ANNUAL / MONTHLY\n${crew.monthlyRetainerDisplay}',
                              textAlign: TextAlign.center,
                              style: LuxuryTypography.microCaps.copyWith(
                                color: bookingMode == 'Monthly Retainer' ? LuxuryColors.pureBlack : LuxuryColors.platinum,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFF141414),
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                    ),
                    child: Column(
                      children: [
                        _buildRow('Vetted Experience', '${crew.experienceYears} Years Head of Mission'),
                        const SizedBox(height: 6),
                        _buildRow('Security Clearance', crew.securityClearance),
                        const SizedBox(height: 6),
                        _buildRow('Languages', crew.languages.join(', ')),
                        const SizedBox(height: 6),
                        _buildRow('Estimated Investment', '₹${(estimatedCost / 100000).toStringAsFixed(2)} Lakhs'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  LuxuryButton(
                    text: 'INITIATE CONFIDENTIAL CONTRACT',
                    backgroundColor: LuxuryColors.gold,
                    textColor: LuxuryColors.pureBlack,
                    onPressed: () {
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          backgroundColor: const Color(0xFF161616),
                          content: Row(
                            children: [
                              const Icon(Icons.verified, color: LuxuryColors.gold, size: 18),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  'Crew dispatch officer notified. Bilateral engagement contract initiated.',
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
    final state = ref.watch(crewProvider);
    final notifier = ref.read(crewProvider.notifier);

    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: const LuxuryAppBar(
        title: 'ELITE CREW & PILOTS',
        showBack: true,
        showSearch: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Header
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
                    'NP GROUPS HUMAN CAPITAL',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Jet Captains, Yacht Masters & Armed Escorts',
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: LuxuryColors.pureWhite,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Type-rated command captains, ex-special forces close protection details, and high-altitude aviators available for confidential global deployment.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: LuxuryColors.mutedGrey,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Role Filter Chips
          SliverToBoxAdapter(
            child: Container(
              height: 48,
              margin: const EdgeInsets.only(top: 12, bottom: 8),
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: _roles.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final role = _roles[i];
                  final isSelected = state.selectedRole == role;
                  return ChoiceChip(
                    label: Text(
                      role.toUpperCase(),
                      style: LuxuryTypography.microCaps.copyWith(
                        color: isSelected ? LuxuryColors.pureBlack : LuxuryColors.platinum,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: LuxuryColors.gold,
                    backgroundColor: const Color(0xFF141414),
                    side: BorderSide(
                      color: isSelected ? LuxuryColors.gold : LuxuryColors.borderDark,
                      width: 0.8,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                    onSelected: (_) => notifier.setRoleFilter(role),
                  );
                },
              ),
            ),
          ),

          // Crew List
          SliverPadding(
            padding: const EdgeInsets.all(20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final crew = state.filteredProfiles[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    decoration: BoxDecoration(
                      color: LuxuryColors.darkCard,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Avatar
                              Container(
                                width: 72,
                                height: 72,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(4),
                                  border: Border.all(color: LuxuryColors.gold, width: 1.2),
                                ),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(3),
                                  child: LuxuryImage(
                                    imageUrl: crew.avatarUrl,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 14),
                              // Name & Title
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text(
                                          crew.name,
                                          style: LuxuryTypography.editorialHeading3.copyWith(
                                            color: LuxuryColors.pureWhite,
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                        const SizedBox(width: 6),
                                        const Icon(Icons.verified, color: LuxuryColors.gold, size: 16),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      crew.role.toUpperCase(),
                                      style: LuxuryTypography.microCaps.copyWith(
                                        color: LuxuryColors.gold,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      crew.credentials,
                                      style: LuxuryTypography.bodySmall.copyWith(
                                        color: LuxuryColors.silver,
                                        fontSize: 11,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 14),

                          // Bio
                          Text(
                            crew.bio,
                            style: LuxuryTypography.bodyMedium.copyWith(
                              color: LuxuryColors.mutedGrey,
                              height: 1.45,
                            ),
                          ),
                          const SizedBox(height: 12),

                          // Rates Row
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: const Color(0xFF161616),
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: LuxuryColors.borderDark),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('DAILY DEPLOYMENT', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey, fontSize: 9)),
                                    const SizedBox(height: 2),
                                    Text(crew.dayRateDisplay, style: LuxuryTypography.priceSmall.copyWith(color: LuxuryColors.gold, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                                Container(width: 1, height: 28, color: LuxuryColors.borderDark),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text('MONTHLY RETAINER', style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey, fontSize: 9)),
                                    const SizedBox(height: 2),
                                    Text(crew.monthlyRetainerDisplay, style: LuxuryTypography.priceSmall.copyWith(color: LuxuryColors.pureWhite, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 14),

                          // Badges
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: [
                              _badge(Icons.badge, '${crew.experienceYears} Yrs Exp'),
                              _badge(Icons.security, crew.securityClearance, isGold: true),
                              _badge(Icons.translate, crew.languages.first),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // Button
                          LuxuryButton(
                            text: 'RESERVE SPECIALIST',
                            backgroundColor: LuxuryColors.gold,
                            textColor: LuxuryColors.pureBlack,
                            onPressed: () => _openBookingSheet(crew),
                          ),
                        ],
                      ),
                    ),
                  );
                },
                childCount: state.filteredProfiles.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _badge(IconData icon, String text, {bool isGold = false}) {
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
          Icon(icon, size: 12, color: isGold ? LuxuryColors.gold : LuxuryColors.mutedGrey),
          const SizedBox(width: 4),
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
