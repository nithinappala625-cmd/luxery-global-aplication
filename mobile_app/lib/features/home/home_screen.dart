import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import 'widgets/curation_statement.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  String _mode = 'BUY';

  static const String _gulfstreamUrl =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg';
  static const String _yachtUrl =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg/1280px-Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg';
  static const String _bugattiUrl =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg';
  static const String _rollsUrl =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg/1280px-2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg';

  // Category data
  final List<_Category> _categories = const [
    _Category('PRIVATE AVIATION', _gulfstreamUrl2, '/aviation', Icons.flight),
    _Category('MARINE & YACHTS', _yachtUrl2, '/marine', Icons.directions_boat),
    _Category('LUXURY AUTOMOBILES', _bugattiUrl2, '/cars', Icons.directions_car),
    _Category('REAL ESTATE', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', '/real-estate', Icons.villa),
    _Category('LUXURY WATCHES', 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800', '/watches', Icons.watch),
    _Category('JEWELS & GEMS', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', '/jewelry', Icons.diamond),
    _Category('LOCKERS & VAULTS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', '/lockers', Icons.lock),
    _Category('LIVE AUCTIONS', 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800', '/auctions', Icons.gavel),
    _Category('FINE ART', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', '/auctions', Icons.palette),
    _Category('PRIVATE ISLANDS', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', '/real-estate', Icons.beach_access),
  ];

  static const String _gulfstreamUrl2 =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg';
  static const String _yachtUrl2 =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg/1280px-Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg';
  static const String _bugattiUrl2 =
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg';

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    return Scaffold(
      backgroundColor: bg,
      appBar: const LuxuryAppBar(showBack: false, showSearch: true, showWishlist: true, showThemeToggle: true),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHero(isDark),
            _buildModeSelector(isDark),
            _buildSectionHeading('CURATED COLLECTIONS', '10 Elite Verticals', isDark),
            _buildCategoryGrid(isDark),
            _buildMembershipCard(isDark),
            _buildSectionHeading("TODAY'S FEATURED DROPS", '4 Hand-Selected Assets', isDark),
            _buildFeaturedGrid(isDark),
            _buildLiveAuctionBanner(isDark),
            _buildPrivateRequestBanner(isDark),
            const SizedBox(height: 16),
            const CurationStatement(),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildHero(bool isDark) {
    return SizedBox(
      height: 300,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.network(
            _gulfstreamUrl,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(color: const Color(0xFF0A0A0A)),
          ),
          // gradient overlay
          const DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0x33000000), Color(0xF0000000)],
                stops: [0.0, 1.0],
              ),
            ),
          ),
          // NP GROUPS badge top right
          Positioned(
            top: 12,
            right: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: Colors.black.withValues(alpha: 0.7),
                border: Border.all(color: LuxuryColors.gold, width: 0.8),
              ),
              child: Text(
                'NP GROUPS',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.gold,
                  fontSize: 9,
                  letterSpacing: 2.5,
                ),
              ),
            ),
          ),
          // content bottom
          Positioned(
            left: 20,
            right: 20,
            bottom: 20,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'GLOBAL LUXURY SYNDICATE',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.champagne,
                    fontSize: 10,
                    letterSpacing: 3.0,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Acquire.\nCharter. Consign.',
                  style: LuxuryTypography.editorialHero.copyWith(
                    color: Colors.white,
                    fontSize: 30,
                    height: 1.1,
                  ),
                ),
                const SizedBox(height: 12),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _statChip('48 Countries'),
                      const SizedBox(width: 8),
                      _statChip('1,200+ Sellers'),
                      const SizedBox(width: 8),
                      _statChip('4 Wealth Tiers'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _statChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.6),
        border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
        borderRadius: BorderRadius.circular(2),
      ),
      child: Text(
        label,
        style: LuxuryTypography.microCaps.copyWith(
          color: LuxuryColors.champagneLight,
          fontSize: 9,
          letterSpacing: 1.0,
        ),
      ),
    );
  }

  Widget _buildModeSelector(bool isDark) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF101010) : Colors.white,
        border: Border.all(color: LuxuryColors.gold, width: 1.0),
        borderRadius: BorderRadius.circular(4),
        boxShadow: isDark
            ? []
            : [BoxShadow(color: LuxuryColors.gold.withValues(alpha: 0.12), blurRadius: 8)],
      ),
      child: Row(
        children: [
          _modeTab('✦ BUY', 'BUY', isDark),
          _modeTab('✈ BOOK', 'BOOK', isDark),
          _modeTab('♛ SELL', 'SELL', isDark),
        ],
      ),
    );
  }

  Widget _modeTab(String label, String mode, bool isDark) {
    final isSelected = _mode == mode;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _mode = mode),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 11),
          decoration: BoxDecoration(
            color: isSelected
                ? (isDark ? LuxuryColors.gold : LuxuryColors.goldDark)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(2),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: LuxuryTypography.microCaps.copyWith(
              color: isSelected
                  ? Colors.black
                  : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
              fontSize: 11,
              letterSpacing: 1.0,
              fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeading(String title, String subtitle, bool isDark) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 28, 16, 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: LuxuryTypography.editorialHeading2.copyWith(
                    color: isDark ? LuxuryColors.pureWhite : LuxuryColors.darkOnyx,
                    letterSpacing: 1.5,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 2),
                Container(
                  width: 32,
                  height: 1,
                  color: LuxuryColors.gold,
                ),
              ],
            ),
          ),
          Text(
            subtitle,
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold,
              fontSize: 9,
              letterSpacing: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryGrid(bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.85,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: _categories.length,
        itemBuilder: (context, i) => _buildCategoryCard(_categories[i], isDark),
      ),
    );
  }

  Widget _buildCategoryCard(_Category cat, bool isDark) {
    return GestureDetector(
      onTap: () => context.push(cat.route),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(6),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.network(
              cat.imageUrl,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                color: const Color(0xFF1A1A1A),
                child: Icon(cat.icon, color: LuxuryColors.gold, size: 36),
              ),
            ),
            // gradient overlay
            const DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0x22000000), Color(0xDD000000)],
                  stops: [0.3, 1.0],
                ),
              ),
            ),
            Positioned(
              left: 10,
              right: 10,
              bottom: 10,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Expanded(
                    child: Text(
                      cat.name,
                      style: LuxuryTypography.microCaps.copyWith(
                        color: Colors.white,
                        fontSize: 10,
                        letterSpacing: 1.2,
                        fontWeight: FontWeight.w700,
                      ),
                      maxLines: 2,
                    ),
                  ),
                  Text(
                    'EXPLORE →',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.gold,
                      fontSize: 8,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMembershipCard(bool isDark) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 24, 16, 0),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1A1508), Color(0xFF0A0A0A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        border: Border.all(color: LuxuryColors.gold, width: 1.0),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.diamond, color: LuxuryColors.gold, size: 16),
              const SizedBox(width: 8),
              Text(
                'PATRON ACQUISITION AUTHORITY',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.gold,
                  fontSize: 10,
                  letterSpacing: 2.0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Exclusive access unlocked\nby your wealth tier.',
            style: LuxuryTypography.editorialHeading3.copyWith(
              color: Colors.white,
              fontSize: 16,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 16),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _tierPill('₹10K', '< ₹1 Cr'),
                const SizedBox(width: 8),
                _tierPill('₹1L', '₹1–50 Cr'),
                const SizedBox(width: 8),
                _tierPill('₹15L', '₹50–500 Cr'),
                const SizedBox(width: 8),
                _tierPill('₹1 Cr', '> ₹500 Cr'),
              ],
            ),
          ),
          const SizedBox(height: 16),
          LuxuryButton(
            text: 'VIEW WEALTH TIERS & PRIVILEGES',
            variant: LuxuryButtonVariant.gold,
            height: 46,
            width: double.infinity,
            onPressed: () => context.push('/membership'),
          ),
        ],
      ),
    );
  }

  Widget _tierPill(String fee, String range) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: LuxuryColors.gold.withValues(alpha: 0.12),
        border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
        borderRadius: BorderRadius.circular(3),
      ),
      child: Column(
        children: [
          Text(
            fee,
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold,
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.5,
            ),
          ),
          Text(
            range,
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.platinum,
              fontSize: 9,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedGrid(bool isDark) {
    final items = [
      _FeaturedItem(
        imageUrl: _gulfstreamUrl,
        title: 'Gulfstream G700',
        category: 'PRIVATE JET',
        price: '₹578 Cr',
        subtitle: '7,750 nm • 19 VIP Seats',
        route: '/aviation',
      ),
      _FeaturedItem(
        imageUrl: _yachtUrl,
        title: 'Oceanco 73m Superyacht',
        category: 'MEGA YACHT',
        price: '₹850 Cr',
        subtitle: '73m LOA • 12 Guests',
        route: '/marine',
      ),
      _FeaturedItem(
        imageUrl: _bugattiUrl,
        title: 'Bugatti Chiron SS',
        category: 'EXOTIC CAR',
        price: '₹32 Cr',
        subtitle: '1,600 HP • Track Spec',
        route: '/cars',
      ),
      _FeaturedItem(
        imageUrl: _rollsUrl,
        title: 'Rolls-Royce Phantom VIII',
        category: 'LUXURY LIMOUSINE',
        price: '₹4.8 Cr',
        subtitle: '6.75L V12 • Starlight Roof',
        route: '/cars',
        badgeText: 'MEMBERS ONLY',
      ),
    ];

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
        itemCount: items.length,
        itemBuilder: (context, i) {
          final item = items[i];
          return LuxuryAssetCard(
            imageUrl: item.imageUrl,
            title: item.title,
            category: item.category,
            price: item.price,
            subtitle: item.subtitle,
            badgeText: item.badgeText,
            isDark: isDark,
            isMembersOnly: item.badgeText == 'MEMBERS ONLY',
            onBuy: () => context.push(item.route),
            onBook: () => context.push(item.route),
            onSell: () => context.push('/sell'),
            onTap: () => context.push(item.route),
          );
        },
      ),
    );
  }

  Widget _buildLiveAuctionBanner(bool isDark) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 24, 16, 0),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0C0C0C) : Colors.white,
        border: Border.all(color: LuxuryColors.gold, width: 1.0),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Column(
        children: [
          // Red live header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
            decoration: const BoxDecoration(
              color: Color(0xFFFF2A2A),
              borderRadius: BorderRadius.vertical(top: Radius.circular(5)),
            ),
            child: Row(
              children: [
                const _PulsingDot(),
                const SizedBox(width: 8),
                Text(
                  'NP LIVE AUCTIONS FLOOR',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: Colors.white,
                    fontSize: 10,
                    letterSpacing: 2.0,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const Spacer(),
                Text(
                  '12 LIVE LOTS',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: Colors.white,
                    fontSize: 9,
                    letterSpacing: 1.0,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Ferrari 250 GTO (1962) — Le Mans Provenance',
                  style: LuxuryTypography.editorialHeading3.copyWith(
                    color: isDark ? Colors.white : LuxuryColors.darkOnyx,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      'CURRENT BID: ',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                        fontSize: 9,
                      ),
                    ),
                    Text(
                      '₹340 Cr',
                      style: LuxuryTypography.priceMedium.copyWith(
                        color: LuxuryColors.gold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                LuxuryButton(
                  text: 'ENTER LIVE BIDDING FLOOR',
                  variant: LuxuryButtonVariant.gold,
                  height: 46,
                  width: double.infinity,
                  onPressed: () => context.push('/auctions'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPrivateRequestBanner(bool isDark) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0A0A0A) : LuxuryColors.softIvory,
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
          width: 0.8,
        ),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        children: [
          const Icon(Icons.private_connectivity, color: LuxuryColors.gold, size: 28),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'PRIVATE ACQUISITION REQUEST',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.gold,
                    fontSize: 9,
                    letterSpacing: 1.5,
                  ),
                ),
                Text(
                  'Can\'t find what you seek? Our brokers will source it.',
                  style: LuxuryTypography.bodyMedium.copyWith(
                    color: isDark ? LuxuryColors.platinum : LuxuryColors.slate,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: () => context.push('/requests'),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                border: Border.all(color: LuxuryColors.gold, width: 0.8),
                borderRadius: BorderRadius.circular(2),
              ),
              child: Text(
                'REQUEST',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.gold,
                  fontSize: 9,
                  letterSpacing: 1.5,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Data Models ─────────────────────────────────────────────────────────────

class _Category {
  final String name;
  final String imageUrl;
  final String route;
  final IconData icon;
  const _Category(this.name, this.imageUrl, this.route, this.icon);
}

class _FeaturedItem {
  final String imageUrl;
  final String title;
  final String category;
  final String price;
  final String subtitle;
  final String route;
  final String? badgeText;
  const _FeaturedItem({
    required this.imageUrl,
    required this.title,
    required this.category,
    required this.price,
    required this.subtitle,
    required this.route,
    this.badgeText,
  });
}

// ─── Pulsing dot widget ────────────────────────────────────────────────────

class _PulsingDot extends StatefulWidget {
  const _PulsingDot();

  @override
  State<_PulsingDot> createState() => _PulsingDotState();
}

class _PulsingDotState extends State<_PulsingDot>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
    _anim = Tween<double>(begin: 0.4, end: 1.0).animate(_ctrl);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _anim,
      child: Container(
        width: 8,
        height: 8,
        decoration: const BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
