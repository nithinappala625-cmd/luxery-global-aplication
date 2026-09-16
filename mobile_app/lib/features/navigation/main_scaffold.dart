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

    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF0F0F0F) : LuxuryColors.pureWhite,
          border: Border(
            top: BorderSide(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              width: 0.8,
            ),
          ),
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
            indicatorColor: isDark
                ? LuxuryColors.champagne.withOpacity(0.18)
                : LuxuryColors.deepForestGreen.withOpacity(0.12),
            height: 64,
            labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
            destinations: [
              NavigationDestination(
                icon: const Icon(Icons.home_outlined, size: 22),
                selectedIcon: Icon(
                  Icons.home,
                  size: 22,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                ),
                label: 'HOME',
              ),
              NavigationDestination(
                icon: const Icon(Icons.explore_outlined, size: 22),
                selectedIcon: Icon(
                  Icons.explore,
                  size: 22,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                ),
                label: 'DISCOVER',
              ),
              NavigationDestination(
                icon: const Icon(Icons.gavel_outlined, size: 22),
                selectedIcon: Icon(
                  Icons.gavel,
                  size: 22,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                ),
                label: 'AUCTIONS',
              ),
              NavigationDestination(
                icon: const Icon(Icons.add_circle_outline, size: 22),
                selectedIcon: Icon(
                  Icons.add_circle,
                  size: 22,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                ),
                label: 'SELL',
              ),
              NavigationDestination(
                icon: const Icon(Icons.person_outline, size: 22),
                selectedIcon: Icon(
                  Icons.person,
                  size: 22,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                ),
                label: 'PROFILE',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
