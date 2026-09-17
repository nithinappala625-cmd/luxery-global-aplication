import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/admin/admin_dashboard_screen.dart';
import '../features/admin/admin_field_builder_screen.dart';
import '../features/auctions/auctions_screen.dart';
import '../features/discover/discover_screen.dart';
import '../features/home/home_screen.dart';
import '../features/listings/listing_detail_screen.dart';
import '../features/navigation/main_scaffold.dart';
import '../features/profile/profile_screen.dart';
import '../features/sell/sell_wizard_screen.dart';
import '../features/sell/seller_dashboard_screen.dart';
import '../features/sell/seller_registration_screen.dart';
import '../features/seller_profile/seller_profile_screen.dart';
import '../features/wishlist/wishlist_screen.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/',
  routes: [
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return MainScaffold(navigationShell: navigationShell);
      },
      branches: [
        // 1. HOME
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/',
              builder: (context, state) => const HomeScreen(),
            ),
          ],
        ),
        // 2. DISCOVER
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/discover',
              builder: (context, state) => const DiscoverScreen(),
            ),
          ],
        ),
        // 3. AUCTIONS
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/auctions',
              builder: (context, state) => const AuctionsScreen(),
            ),
          ],
        ),
        // 4. SELL
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/sell',
              builder: (context, state) => const SellerDashboardScreen(),
            ),
          ],
        ),
        // 5. PROFILE
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/profile',
              builder: (context, state) => const ProfileScreen(),
            ),
          ],
        ),
      ],
    ),

    // Sub-screens
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/listing/:id',
      builder: (context, state) {
        final id = state.pathParameters['id'] ?? '';
        return ListingDetailScreen(listingId: id);
      },
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/sell/new',
      builder: (context, state) => const SellWizardScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/seller/register',
      builder: (context, state) => const SellerRegistrationScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/seller/:id',
      builder: (context, state) {
        final id = state.pathParameters['id'] ?? '';
        return SellerProfileScreen(sellerId: id);
      },
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/wishlist',
      builder: (context, state) => const WishlistScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/admin',
      builder: (context, state) => const AdminDashboardScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/admin/fields',
      builder: (context, state) => const AdminFieldBuilderScreen(),
    ),
  ],
);
