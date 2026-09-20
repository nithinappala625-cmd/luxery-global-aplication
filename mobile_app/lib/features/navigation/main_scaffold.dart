import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';

class MainScaffold extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const MainScaffold({
    super.key,
    required this.navigationShell,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final activeGold = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final inactiveColor = isDark ? const Color(0xFF6E6E6E) : LuxuryColors.slate;

    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF080808) : LuxuryColors.lightCard,
          border: Border(
            top: BorderSide(
              color: isDark ? LuxuryColors.goldBorder : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
          boxShadow: isDark
              ? []
              : [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.06),
                    blurRadius: 12,
                    offset: const Offset(0, -3),
                  ),
                ],
        ),
        child: SafeArea(
          top: false,
          child: SizedBox(
            height: 68,
            child: Row(
              children: [
                _NavItem(index: 0, icon: Icons.home_outlined, activeIcon: Icons.home_filled,
                  label: 'HOME', currentIndex: navigationShell.currentIndex,
                  activeColor: activeGold, inactiveColor: inactiveColor,
                  onTap: () => navigationShell.goBranch(0,
                    initialLocation: 0 == navigationShell.currentIndex)),
                _NavItem(index: 1, icon: Icons.explore_outlined, activeIcon: Icons.explore,
                  label: 'EXPLORE', currentIndex: navigationShell.currentIndex,
                  activeColor: activeGold, inactiveColor: inactiveColor,
                  onTap: () => navigationShell.goBranch(1,
                    initialLocation: 1 == navigationShell.currentIndex)),
                _NavItem(index: 2, icon: Icons.gavel_outlined, activeIcon: Icons.gavel,
                  label: 'AUCTIONS', currentIndex: navigationShell.currentIndex,
                  activeColor: activeGold, inactiveColor: inactiveColor,
                  onTap: () => navigationShell.goBranch(2,
                    initialLocation: 2 == navigationShell.currentIndex)),
                _NavItem(index: 3, icon: Icons.diamond_outlined, activeIcon: Icons.diamond,
                  label: 'SELL', currentIndex: navigationShell.currentIndex,
                  activeColor: activeGold, inactiveColor: inactiveColor,
                  onTap: () => navigationShell.goBranch(3,
                    initialLocation: 3 == navigationShell.currentIndex)),
                _NavItem(index: 4, icon: Icons.person_outline, activeIcon: Icons.person,
                  label: 'PROFILE', currentIndex: navigationShell.currentIndex,
                  activeColor: activeGold, inactiveColor: inactiveColor,
                  onTap: () => navigationShell.goBranch(4,
                    initialLocation: 4 == navigationShell.currentIndex)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final int index;
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final int currentIndex;
  final Color activeColor;
  final Color inactiveColor;
  final VoidCallback onTap;

  const _NavItem({
    required this.index,
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.currentIndex,
    required this.activeColor,
    required this.inactiveColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isSelected = index == currentIndex;
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: isSelected ? activeColor.withValues(alpha: 0.14) : Colors.transparent,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                isSelected ? activeIcon : icon,
                size: 22,
                color: isSelected ? activeColor : inactiveColor,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: LuxuryTypography.microCaps.copyWith(
                color: isSelected ? activeColor : inactiveColor,
                fontSize: 9,
                letterSpacing: 1.0,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
