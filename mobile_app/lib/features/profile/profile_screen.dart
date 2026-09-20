import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_image.dart';
import '../../providers/auth_provider.dart';
import '../../providers/theme_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = ref.watch(authProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'PRIVATE CLIENT SALON',
        showBack: false,
        showWishlist: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Header Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                borderRadius: BorderRadius.circular(2),
                border: Border.all(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
                ),
              ),
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(2),
                    child: LuxuryImage(
                      imageUrl: user?.avatarUrl ??
                          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
                      width: 64,
                      height: 64,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              user?.fullName ?? 'Distinguished Collector',
                              style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
                            ),
                            const SizedBox(width: 6),
                            const Icon(Icons.verified, size: 15, color: LuxuryColors.champagne),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          user?.email ?? 'concierge@luxurymarketplace.global',
                          style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                        ),
                        const SizedBox(height: 8),
                        LuxuryBadge(
                          label: (user?.role.name ?? 'buyer').toUpperCase(),
                          textColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          borderColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Theme Mode Toggle (Quiet Luxury Light / Dark)
            Text(
              'AESTHETIC PRESENTATION',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                borderRadius: BorderRadius.circular(2),
                border: Border.all(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
                ),
              ),
              child: SwitchListTile(
                title: Text(
                  'DARK PREMIUM SALON MODE',
                  style: LuxuryTypography.microCaps.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1.2,
                  ),
                ),
                subtitle: Text(
                  isDark ? 'Pure Black & Brushed Champagne' : 'Soft Ivory & Deep Forest Green',
                  style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                ),
                value: isDark,
                activeColor: LuxuryColors.champagne,
                onChanged: (val) {
                  ref.read(themeModeProvider.notifier).toggleTheme();
                },
              ),
            ),

            const SizedBox(height: 24),

            // Role Switcher for Pair-Programming & Verification
            Text(
              'ROLE SIMULATION (DEV / AUDIT)',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                borderRadius: BorderRadius.circular(2),
                border: Border.all(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
                ),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<UserRole>(
                  value: user?.role ?? UserRole.buyer,
                  isExpanded: true,
                  items: const [
                    DropdownMenuItem(value: UserRole.buyer, child: Text('BUYER (Standard Collector)')),
                    DropdownMenuItem(value: UserRole.seller, child: Text('SELLER (Asset Consignor)')),
                    DropdownMenuItem(value: UserRole.dealer, child: Text('DEALER (Boutique Salons)')),
                    DropdownMenuItem(value: UserRole.admin, child: Text('ADMIN (Curatorial Review Board)')),
                  ],
                  onChanged: (newRole) {
                    if (newRole != null) {
                      ref.read(authProvider.notifier).switchRole(newRole);
                    }
                  },
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Admin Curatorial Review Panel button (Visible if Admin)
            if (user?.role == UserRole.admin) ...[
              LuxuryButton(
                text: 'OPEN CURATORIAL ADMIN PANEL',
                variant: LuxuryButtonVariant.gold,
                icon: const Icon(Icons.admin_panel_settings_outlined, size: 18),
                onPressed: () => context.push('/admin'),
              ),
              const SizedBox(height: 24),
            ],

            // Portfolio & Private Operations
            Text(
              'PRIVATE CLIENT PRIVILEGES & SERVICES',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.champagne,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 10),
            _buildProfileMenuItem(
              context,
              icon: Icons.workspace_premium_outlined,
              title: 'NP Memberships (Access, Privé, Black)',
              onTap: () => context.push('/membership'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.handshake_outlined,
              title: 'Private Deal Room (Active Negotiations)',
              onTap: () => context.push('/deals/deal-101'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.find_in_page_outlined,
              title: 'Buyer Requests ("I am looking for...")',
              onTap: () => context.push('/buyer-requests'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.star_border_purple500_outlined,
              title: 'First 50 Founding Sellers Program',
              onTap: () => context.push('/founding-sellers'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.directions_car_filled_outlined,
              title: 'NP LUXE DRIVE (Supercar Fleet Rentals)',
              onTap: () => context.push('/rentals'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.flight_takeoff_outlined,
              title: 'Aviation Salons (Sales & Jet Charters)',
              onTap: () => context.push('/aviation'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.diamond_outlined,
              title: 'Strategic Materials & Rare Earths',
              onTap: () => context.push('/materials'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.bookmark_outline,
              title: 'Saved Possessions (Vault)',
              onTap: () => context.push('/wishlist'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.policy_outlined,
              title: 'Legal, PPI Compliance & Curatorial Terms',
              onTap: () => context.push('/legal'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.support_agent_outlined,
              title: 'Global Concierge Direct Line',
              onTap: () {
                showDialog(
                  context: context,
                  builder: (ctx) => AlertDialog(
                    title: const Text('NP GROUPS CONCIERGE'),
                    content: const Text(
                      'Dedicated 24/7 private acquisition concierge:\n\nTelephone: +377 98 06 20 00 (Monaco)\nTelephone: +91 80 4000 5000 (India Desk)\nEmail: concierge@npgroups.global',
                    ),
                    actions: [
                      TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text('CLOSE')),
                    ],
                  ),
                );
              },
            ),

            _buildProfileMenuItem(
              context,
              icon: Icons.vpn_key_outlined,
              title: 'VIP Sign In / Google Login',
              onTap: () => context.push('/login'),
            ),
            _buildProfileMenuItem(
              context,
              icon: Icons.auto_awesome_outlined,
              title: 'Experience Splash Brandmark',
              onTap: () => context.push('/splash'),
            ),

            const SizedBox(height: 32),

            // Sign Out
            LuxuryButton(
              text: 'SIGN OUT FROM PRIVATE SESSION',
              variant: LuxuryButtonVariant.secondary,
              onPressed: () {
                ref.read(authProvider.notifier).signOut();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Private session ended.')),
                );
                context.go('/login');
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
        borderRadius: BorderRadius.circular(2),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
      ),
      child: ListTile(
        leading: Icon(icon, color: LuxuryColors.champagne, size: 20),
        title: Text(title, style: LuxuryTypography.bodyMedium.copyWith(fontSize: 13)),
        trailing: Icon(Icons.arrow_forward_ios, size: 13, color: LuxuryColors.mutedGrey),
        onTap: onTap,
      ),
    );
  }
}
