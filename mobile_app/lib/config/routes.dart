import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/admin/admin_dashboard_screen.dart';
import '../features/admin/admin_field_builder_screen.dart';
import '../features/auctions/auctions_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/register_screen.dart';
import '../features/auth/splash_screen.dart';
import '../features/aviation/aviation_screen.dart';
import '../features/buyer_requests/buyer_requests_screen.dart';
import '../features/deal_room/deal_room_screen.dart';
import '../features/discover/discover_screen.dart';
import '../features/founding_sellers/founding_sellers_screen.dart';
import '../features/home/home_screen.dart';
import '../features/legal/legal_screen.dart';
import '../features/listings/listing_detail_screen.dart';
import '../features/materials/materials_screen.dart';
import '../features/membership/membership_screen.dart';
import '../features/navigation/main_scaffold.dart';
import '../features/profile/profile_screen.dart';
import '../features/rentals/luxe_drive_screen.dart';
import '../features/real_estate/real_estate_screen.dart';
import '../features/lockers/lockers_screen.dart';
import '../features/crew/crew_booking_screen.dart';
import '../features/sell/sell_wizard_screen.dart';
import '../features/sell/seller_dashboard_screen.dart';
import '../features/sell/seller_registration_screen.dart';
import '../features/seller_profile/seller_profile_screen.dart';
import '../features/wishlist/wishlist_screen.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
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
      path: '/listings/:id',
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
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/admin/fields',
      builder: (context, state) => const AdminFieldBuilderScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/rentals',
      builder: (context, state) => const LuxeDriveScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/aviation',
      builder: (context, state) => const AviationScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/materials',
      builder: (context, state) => const MaterialsScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/deals/:id',
      builder: (context, state) {
        final id = state.pathParameters['id'] ?? '';
        return DealRoomScreen(dealId: id);
      },
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/deal-room/:id',
      builder: (context, state) {
        final id = state.pathParameters['id'] ?? '';
        return DealRoomScreen(dealId: id);
      },
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/buyer-requests',
      builder: (context, state) => const BuyerRequestsScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/requests',
      builder: (context, state) => const BuyerRequestsScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/membership',
      builder: (context, state) => const MembershipScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/real-estate',
      builder: (context, state) => const RealEstateScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/lockers',
      builder: (context, state) => const LockersScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/crew',
      builder: (context, state) => const CrewBookingScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/founding-sellers',
      builder: (context, state) => const FoundingSellersScreen(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: '/legal',
      builder: (context, state) => const LegalScreen(),
    ),
  ],
);
