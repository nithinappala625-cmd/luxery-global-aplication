import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:luxury_marketplace/core/theme/luxury_theme.dart';
import 'package:luxury_marketplace/features/home/home_screen.dart';
import 'package:luxury_marketplace/features/discover/discover_screen.dart';
import 'package:luxury_marketplace/features/real_estate/real_estate_screen.dart';
import 'package:luxury_marketplace/features/lockers/lockers_screen.dart';
import 'package:luxury_marketplace/features/crew/crew_booking_screen.dart';

void main() {
  setUpAll(() {
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  testWidgets('NP GROUPS HomeScreen renders in Dark Mode with BUY/BOOK/SELL tabs and collections', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.dark,
          home: const HomeScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Verify NP GROUPS header and brand
    expect(find.text('NP GROUPS'), findsWidgets);
    expect(find.text('GLOBAL LUXURY SYNDICATE'), findsWidgets);

    // Verify top mode tabs: BUY • BOOK • SELL
    expect(find.text('✦ BUY'), findsOneWidget);
    expect(find.text('✈ BOOK'), findsOneWidget);
    expect(find.text('♛ SELL'), findsOneWidget);

    // Verify collections heading & categories
    expect(find.text('CURATED COLLECTIONS'), findsOneWidget);
    expect(find.text('PATRON ACQUISITION AUTHORITY'), findsOneWidget);
    expect(find.text("TODAY'S FEATURED DROPS"), findsOneWidget);
  });

  testWidgets('NP GROUPS HomeScreen renders in Opulent White Light Mode cleanly', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.light,
          home: const HomeScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Verify Light mode renders without throwing layout errors
    expect(find.text('NP GROUPS'), findsWidgets);
    expect(find.text('✦ BUY'), findsOneWidget);
    expect(find.text('✈ BOOK'), findsOneWidget);
    expect(find.text('♛ SELL'), findsOneWidget);

    // Tap on BOOK tab
    await tester.tap(find.text('✈ BOOK'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap on SELL tab
    await tester.tap(find.text('♛ SELL'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    expect(find.text('PATRON ACQUISITION AUTHORITY'), findsOneWidget);
  });

  testWidgets('NP GROUPS DiscoverScreen renders with 2-col side-by-side grid', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.dark,
          home: const DiscoverScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    expect(find.text('NP GROUPS DISCOVERY'), findsOneWidget);
    expect(find.text('ALL ASSETS'), findsWidgets);
  });

  testWidgets('NP GROUPS RealEstateScreen renders sovereign domains with side-by-side cards', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.light,
          home: const RealEstateScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    expect(find.text('SOVEREIGN DOMAINS'), findsOneWidget);
    expect(find.text('✦ ACQUIRE'), findsOneWidget);
    expect(find.text('📍 SITE VISIT'), findsOneWidget);
    expect(find.text('♛ CONSIGN'), findsOneWidget);
  });

  testWidgets('NP GROUPS LockersScreen renders armored safes and vaults', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.dark,
          home: const LockersScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    expect(find.text('HIGH-SECURITY VAULTS'), findsOneWidget);
    expect(find.text('✦ ACQUIRE'), findsOneWidget);
    expect(find.text('🔒 COMMISSION'), findsOneWidget);
    expect(find.text('♛ CONSIGN'), findsOneWidget);
  });

  testWidgets('NP GROUPS CrewBookingScreen renders elite pilots and security roster', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1220, 2712);
    tester.view.devicePixelRatio = 2.5;

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          theme: LuxuryTheme.lightTheme,
          darkTheme: LuxuryTheme.darkTheme,
          themeMode: ThemeMode.light,
          home: const CrewBookingScreen(),
        ),
      ),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    expect(find.text('ELITE CREW & PILOTS'), findsOneWidget);
  });
}
