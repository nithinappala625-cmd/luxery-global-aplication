import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';

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
    final inactiveColor = isDark ? const Color(0xFF7E7E7E) : LuxuryColors.slate;

    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF0C0C0C) : LuxuryColors.lightCard,
          border: Border(
            top: BorderSide(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
          boxShadow: isDark
              ? []
              : [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                    offset: const Offset(0, -2),
                  ),
                ],
        ),
        child: SafeArea(
          child: NavigationBar(
            selectedIndex: navigationShell.currentIndex,
            onDestinationSelected: (index) {
              navigationShell.goBranch(
                index,
                initialLocation: index == navigationShell.currentIndex,
              );
            },
            backgroundColor: Colors.transparent,
            elevation: 0,
            indicatorColor: activeGold.withValues(alpha: 0.16),
            height: 64,
            labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
            destinations: [
              NavigationDestination(
                icon: Icon(Icons.home_outlined, size: 22, color: inactiveColor),
                selectedIcon: Icon(Icons.home, size: 22, color: activeGold),
                label: 'HOME',
              ),
              NavigationDestination(
                icon: Icon(Icons.explore_outlined, size: 22, color: inactiveColor),
                selectedIcon: Icon(Icons.explore, size: 22, color: activeGold),
                label: 'DISCOVER',
              ),
              NavigationDestination(
                icon: Icon(Icons.gavel_outlined, size: 22, color: inactiveColor),
                selectedIcon: Icon(Icons.gavel, size: 22, color: activeGold),
                label: 'AUCTIONS',
              ),
              NavigationDestination(
                icon: Icon(Icons.add_circle_outline, size: 22, color: inactiveColor),
                selectedIcon: Icon(Icons.add_circle, size: 22, color: activeGold),
                label: 'SELL',
              ),
              NavigationDestination(
                icon: Icon(Icons.person_outline, size: 22, color: inactiveColor),
                selectedIcon: Icon(Icons.person, size: 22, color: activeGold),
                label: 'PROFILE',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
