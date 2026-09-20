import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';
import '../../models/luxury_locker.dart';
import '../../providers/lockers_provider.dart';

class LockersScreen extends ConsumerStatefulWidget {
  const LockersScreen({super.key});

  @override
  ConsumerState<LockersScreen> createState() => _LockersScreenState();
}

class _LockersScreenState extends ConsumerState<LockersScreen> {
  String _mode = 'BUY';
  String _subTab = 'ALL';

  static const _subTabs = ['ALL', 'WALK-IN VAULTS', 'ARMORED SAFES', 'YACHT & JET SAFES'];

  void _openConsultationSheet(LuxuryLocker locker, bool isDark) {
    final textPrimary = LuxuryColors.textPrimary(isDark);
    final textSecondary = LuxuryColors.textSecondary(isDark);
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final sheetBg = isDark ? const Color(0xFF0D0D0D) : Colors.white;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: sheetBg,
      shape: RoundedRectangleBorder(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
        side: BorderSide(
          color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
          width: 1.0,
        ),
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
                locker.title,
                style: LuxuryTypography.editorialHeading2.copyWith(color: textPrimary),
              ),
              const SizedBox(height: 6),
              Text(
                'Commission: ${locker.priceDisplay} • ${locker.manufacturer}',
                style: LuxuryTypography.bodySmall.copyWith(color: goldColor, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                'Includes confidential armored installation, ballistic testing certification, biometric programming, and 10-year concierge service.',
                style: LuxuryTypography.bodySmall.copyWith(color: textSecondary),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'DISPATCH ARMAMENT SPECIALIST',
                variant: LuxuryButtonVariant.gold,
                height: 48,
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      backgroundColor: isDark ? const Color(0xFF161616) : Colors.white,
                      content: Text(
                        'White-glove vault engineering team assigned. Confidential survey scheduled.',
                        style: LuxuryTypography.bodySmall.copyWith(color: textPrimary),
                      ),
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
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(lockersProvider);
    final bg = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    final filtered = state.filteredLockers.where((locker) {
      if (_subTab == 'ALL') return true;
      if (_subTab == 'WALK-IN VAULTS') return locker.vaultType.toLowerCase().contains('walk-in') || locker.vaultType.toLowerCase().contains('room');
      if (_subTab == 'ARMORED SAFES') return locker.vaultType.toLowerCase().contains('safe') || locker.vaultType.toLowerCase().contains('free-standing');
      if (_subTab == 'YACHT & JET SAFES') return locker.vaultType.toLowerCase().contains('yacht') || locker.vaultType.toLowerCase().contains('bespoke');
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: bg,
      appBar: const LuxuryAppBar(
        title: 'HIGH-SECURITY VAULTS',
        showBack: true,
        showSearch: true,
        showThemeToggle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SectionActionBar(
              selectedMode: _mode,
              onModeChanged: (m) => setState(() => _mode = m),
              isDark: isDark,
              buyLabel: '✦ ACQUIRE',
              bookLabel: '🔒 COMMISSION',
              sellLabel: '♛ CONSIGN',
            ),

            // Subcategories Pill Strip
            SizedBox(
              height: 44,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _subTabs.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final tab = _subTabs[i];
                  final isSelected = _subTab == tab;
                  return GestureDetector(
                    onTap: () => setState(() => _subTab = tab),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                      decoration: BoxDecoration(
                        color: isSelected ? LuxuryColors.gold : Colors.transparent,
                        border: Border.all(
                          color: isSelected ? LuxuryColors.gold : LuxuryColors.goldBorder,
                          width: 0.8,
                        ),
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: Text(
                        tab,
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isSelected
                              ? Colors.black
                              : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
                          fontSize: 10,
                          letterSpacing: 1.2,
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),

            if (_mode == 'SELL')
              _buildConsignmentPanel(isDark)
            else if (_mode == 'BOOK')
              _buildCommissionPanel(isDark)
            else
              _buildGrid(isDark, filtered),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildGrid(bool isDark, List<LuxuryLocker> lockers) {
    if (lockers.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(40),
        child: Center(
          child: Text(
            'No matching vaults found in this collection.',
            style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
          ),
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.62,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: lockers.length,
        itemBuilder: (context, index) {
          final locker = lockers[index];
          final imgUrl = locker.mediaUrls.isNotEmpty ? locker.mediaUrls.first : '';
          final spec = '${locker.manufacturer} • ${locker.vaultType}';

          return LuxuryAssetCard(
            imageUrl: imgUrl,
            title: locker.title,
            category: locker.manufacturer.toUpperCase(),
            price: locker.priceDisplay,
            subtitle: spec,
            badgeText: locker.priceInr >= 50000000 ? 'ARMORED' : null,
            isDark: isDark,
            onBuy: () => _openConsultationSheet(locker, isDark),
            onBook: () => _openConsultationSheet(locker, isDark),
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () => _openConsultationSheet(locker, isDark),
          );
        },
      ),
    );
  }

  Widget _buildCommissionPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF0C141E), Color(0xFF050505)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.shield_outlined, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'BESPOKE VAULT ARCHITECTURE & ENGINEERING',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Turnkey High-Security Sanctuary\nEngineered to Order.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Custom ballistic panic rooms, multi-layered biometric access, electromagnetic pulse (EMP) shielding, and integrated Swiss watch winders. Certified VdS class VI-KB ratings.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'REQUEST ENGINEERING CONSULTATION',
              variant: LuxuryButtonVariant.gold,
              height: 50,
              width: double.infinity,
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Engineering desk scheduled confidential site assessment.'),
                    backgroundColor: Color(0xFF161616),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConsignmentPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF1A1508), Color(0xFF050505)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.lock_clock, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'HIGH-VALUE SAFE CONSIGNMENT',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Sell or Relocate Certified\nLuxury Armored Safes.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Döttling, Stockinger, and Buben & Zörweg safes hold high secondary collector value. Our bonded rigging teams handle secure confidential extraction and delivery.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'SUBMIT SAFE FOR CONSIGNMENT',
              variant: LuxuryButtonVariant.gold,
              height: 50,
              width: double.infinity,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
