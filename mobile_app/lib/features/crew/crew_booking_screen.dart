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
    'Private Jet Captain',
    'Superyacht Master 3000 GT',
    'VIP Helicopter Pilot',
    'Armed Close Protection',
  ];

  int _selectedDurationDays = 7;

  void _openBookingSheet(EliteCrewProfile crew, bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final cardBg = isDark ? const Color(0xFF141414) : LuxuryColors.lightCardElevated;
    final sheetBg = isDark ? const Color(0xFF0D0D0D) : Colors.white;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: sheetBg,
      shape: RoundedRectangleBorder(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight, width: 1.0),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            final estimatedCost = _selectedDurationDays * crew.dayRate;

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
                        'CONFIDENTIAL CREW CHARTER',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: goldColor,
                          letterSpacing: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.close, color: textSecondary, size: 20),
                        onPressed: () => Navigator.pop(ctx),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    crew.name,
                    style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${crew.role} • ${crew.dayRateDisplay} / Day',
                    style: LuxuryTypography.bodyMedium.copyWith(color: goldColor, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 16),

                  Text('DEPLOYMENT DURATION', style: LuxuryTypography.microCaps.copyWith(color: textSecondary)),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      for (final days in [3, 7, 14, 30])
                        Expanded(
                          child: GestureDetector(
                            onTap: () {
                              setSheetState(() => _selectedDurationDays = days);
                            },
                            child: Container(
                              margin: const EdgeInsets.symmetric(horizontal: 4),
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: _selectedDurationDays == days
                                    ? goldColor
                                    : (isDark ? const Color(0xFF181818) : LuxuryColors.lightCardElevated),
                                borderRadius: BorderRadius.circular(2),
                                border: Border.all(
                                  color: _selectedDurationDays == days
                                      ? goldColor
                                      : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                                ),
                              ),
                              alignment: Alignment.center,
                              child: Text(
                                '$days Days',
                                style: LuxuryTypography.microCaps.copyWith(
                                  color: _selectedDurationDays == days
                                      ? LuxuryColors.pureWhite
                                      : textPrimary,
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
                      color: cardBg,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight, width: 0.8),
                    ),
                    child: Column(
                      children: [
                        _buildRow('Vetted Experience', '${crew.experienceYears} Years Head of Mission', textSecondary, textPrimary),
                        const SizedBox(height: 6),
                        _buildRow('Security Clearance', crew.securityClearance, textSecondary, textPrimary),
                        const SizedBox(height: 6),
                        _buildRow('Languages', crew.languages.join(', '), textSecondary, textPrimary),
                        const SizedBox(height: 6),
                        _buildRow('Estimated Investment', '₹${(estimatedCost / 100000).toStringAsFixed(2)} Lakhs', textSecondary, textPrimary),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  LuxuryButton(
                    text: 'INITIATE CONFIDENTIAL CONTRACT',
                    variant: LuxuryButtonVariant.gold,
                    onPressed: () {
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          backgroundColor: isDark ? const Color(0xFF161616) : Colors.white,
                          content: Row(
                            children: [
                              Icon(Icons.verified, color: goldColor, size: 18),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  'Crew dispatch officer notified. Bilateral engagement contract initiated.',
                                  style: LuxuryTypography.bodySmall.copyWith(color: textPrimary),
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

  Widget _buildRow(String label, String value, Color labelColor, Color valColor) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: LuxuryTypography.bodySmall.copyWith(color: labelColor)),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            value,
            textAlign: TextAlign.end,
            style: LuxuryTypography.bodySmall.copyWith(color: valColor, fontWeight: FontWeight.w500),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(crewProvider);
    final notifier = ref.read(crewProvider.notifier);

    final bgColor = LuxuryColors.scaffoldBg(isDark);
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final cardBg = LuxuryColors.cardBg(isDark);
    final borderColor = isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight;

    return Scaffold(
      backgroundColor: bgColor,
      appBar: const LuxuryAppBar(
        title: 'ELITE CREW & PILOTS',
        showBack: true,
        showSearch: true,
        showThemeToggle: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Header
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: borderColor, width: 0.8)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'NP GROUPS HUMAN CAPITAL',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: goldColor,
                      letterSpacing: 2.2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Jet Captains, Yacht Masters & Armed Escorts',
                    style: LuxuryTypography.editorialHeading1.copyWith(
                      color: textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Type-rated command captains, ex-special forces close protection details, and high-altitude aviators available for confidential global deployment.',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: textSecondary,
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
                        color: isSelected
                            ? LuxuryColors.pureWhite
                            : (isDark ? LuxuryColors.platinum : LuxuryColors.darkOnyx),
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: goldColor,
                    backgroundColor: isDark ? const Color(0xFF141414) : LuxuryColors.lightCard,
                    side: BorderSide(
                      color: isSelected ? goldColor : borderColor,
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
                      color: cardBg,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(
                        color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
                        width: 0.8,
                      ),
                      boxShadow: isDark
                          ? []
                          : [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.04),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
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
                                  border: Border.all(color: goldColor, width: 1.2),
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
                                        Flexible(
                                          child: Text(
                                            crew.name,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: LuxuryTypography.editorialHeading3.copyWith(
                                              color: textPrimary,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ),
                                        const SizedBox(width: 6),
                                        Icon(Icons.verified, color: goldColor, size: 16),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      crew.role.toUpperCase(),
                                      style: LuxuryTypography.microCaps.copyWith(
                                        color: goldColor,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      crew.credentials,
                                      style: LuxuryTypography.bodySmall.copyWith(
                                        color: textSecondary,
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
                              color: textSecondary,
                              height: 1.45,
                            ),
                          ),
                          const SizedBox(height: 12),

                          // Rates Row
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: isDark ? const Color(0xFF161616) : LuxuryColors.lightCardElevated,
                              borderRadius: BorderRadius.circular(2),
                              border: Border.all(color: borderColor),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text('DAILY DEPLOYMENT', style: LuxuryTypography.microCaps.copyWith(color: textSecondary, fontSize: 9)),
                                      const SizedBox(height: 2),
                                      Text(crew.dayRateDisplay, style: LuxuryTypography.priceSmall.copyWith(color: goldColor, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                ),
                                Container(width: 1, height: 28, color: borderColor, margin: const EdgeInsets.symmetric(horizontal: 10)),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text('MONTHLY RETAINER', style: LuxuryTypography.microCaps.copyWith(color: textSecondary, fontSize: 9)),
                                      const SizedBox(height: 2),
                                      Text(crew.monthlyRetainerDisplay, style: LuxuryTypography.priceSmall.copyWith(color: textPrimary, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
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
                              _badge(Icons.badge, '${crew.experienceYears} Yrs Exp', isDark),
                              _badge(Icons.security, crew.securityClearance, isDark, isGold: true),
                              _badge(Icons.translate, crew.languages.first, isDark),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // Button
                          LuxuryButton(
                            text: 'RESERVE SPECIALIST',
                            variant: LuxuryButtonVariant.gold,
                            height: 44,
                            onPressed: () => _openBookingSheet(crew, isDark),
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

  Widget _badge(IconData icon, String text, bool isDark, {bool isGold = false}) {
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    return Container(
      constraints: const BoxConstraints(maxWidth: 280),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF181818) : LuxuryColors.lightCardElevated,
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isGold ? goldColor : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          width: 0.8,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: isGold ? goldColor : LuxuryColors.textSecondary(isDark)),
          const SizedBox(width: 4),
          Flexible(
            child: Text(
              text,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: LuxuryTypography.microCaps.copyWith(
                color: isGold ? goldColor : LuxuryColors.textPrimary(isDark),
                fontWeight: isGold ? FontWeight.bold : FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
