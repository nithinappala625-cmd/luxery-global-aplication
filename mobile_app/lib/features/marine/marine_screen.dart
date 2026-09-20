import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';

class MarineScreen extends ConsumerStatefulWidget {
  const MarineScreen({super.key});

  @override
  ConsumerState<MarineScreen> createState() => _MarineScreenState();
}

class _MarineScreenState extends ConsumerState<MarineScreen> {
  String _mode = 'BUY';
  String _subTab = 'MEGA YACHTS';

  static const _subTabs = ['MEGA YACHTS', 'SUPERYACHTS', 'CATAMARANS', 'EXPLORER'];

  static final List<_YachtItem> _megaYachts = const [
    _YachtItem(
      id: 'oceanco',
      title: 'Oceanco Y721 — Project Bravo',
      category: 'MEGA YACHT',
      imageUrl:
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg/1280px-Nautilus_73-meter_%28239_ft%29_long_motor_yacht._Location_Poole_Quay._Dorset.jpg',
      price: '₹850 Cr',
      charterPrice: '₹18Cr/wk',
      spec: '73m LOA • 12 Guests • 4,000 nm',
      badgeText: 'SYNDICATE',
    ),
    _YachtItem(
      id: 'benetti',
      title: 'Benetti FB277 — Violet Sky',
      category: 'MEGA YACHT',
      imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
      price: '₹1,200 Cr',
      charterPrice: '₹28Cr/wk',
      spec: '90m LOA • 18 Guests • 3,600 nm',
      badgeText: 'MEMBERS ONLY',
    ),
    _YachtItem(
      id: 'lurssen',
      title: 'Lürssen 80m Explorer',
      category: 'MEGA YACHT',
      imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800',
      price: '₹950 Cr',
      charterPrice: '₹22Cr/wk',
      spec: '80m LOA • 14 Guests • 5,000 nm',
    ),
    _YachtItem(
      id: 'feadship',
      title: 'Feadship Equity',
      category: 'MEGA YACHT',
      imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800',
      price: '₹1,450 Cr',
      charterPrice: '₹32Cr/wk',
      spec: '85m LOA • 20 Guests • 4,500 nm',
      badgeText: 'PRIVATE TREATY',
    ),
  ];

  static final List<_YachtItem> _superyachts = const [
    _YachtItem(
      id: 'sunseeker',
      title: 'Sunseeker 131 Yacht',
      category: 'SUPERYACHT',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      price: '₹185 Cr',
      charterPrice: '₹4.5Cr/wk',
      spec: '40m LOA • 10 Guests • 2,000 nm',
    ),
    _YachtItem(
      id: 'azimut',
      title: 'Azimut Grande 35 Metri',
      category: 'SUPERYACHT',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      price: '₹120 Cr',
      charterPrice: '₹3Cr/wk',
      spec: '35m LOA • 8 Guests • 1,500 nm',
    ),
    _YachtItem(
      id: 'princess',
      title: 'Princess Y85 Motor Yacht',
      category: 'SUPERYACHT',
      imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
      price: '₹95 Cr',
      charterPrice: '₹2.2Cr/wk',
      spec: '26m LOA • 6 Guests • 1,200 nm',
    ),
    _YachtItem(
      id: 'ferretti',
      title: 'Ferretti 920 Custom',
      category: 'SUPERYACHT',
      imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800',
      price: '₹75 Cr',
      charterPrice: '₹1.8Cr/wk',
      spec: '28m LOA • 6 Guests • 1,000 nm',
    ),
  ];

  static final List<_YachtItem> _catamarans = const [
    _YachtItem(
      id: 'leopard',
      title: 'Leopard 58 Power Cat',
      category: 'CATAMARAN',
      imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800',
      price: '₹35 Cr',
      charterPrice: '₹85L/wk',
      spec: '17m • 8 Guests • Dual Hull',
    ),
    _YachtItem(
      id: 'lagoon',
      title: 'Lagoon 620 Sailing Cat',
      category: 'CATAMARAN',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      price: '₹45 Cr',
      charterPrice: '₹1Cr/wk',
      spec: '19m • 10 Guests • Sailing Performance',
    ),
  ];

  static final List<_YachtItem> _explorer = const [
    _YachtItem(
      id: 'damen',
      title: 'Damen SeaXplorer 65',
      category: 'EXPLORER VESSEL',
      imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800',
      price: '₹420 Cr',
      charterPrice: '₹10Cr/wk',
      spec: '65m • 12 Guests • Ice Class A',
      badgeText: 'POLAR CAPABLE',
    ),
    _YachtItem(
      id: 'vard',
      title: 'Vard 7 Series Arctic',
      category: 'EXPLORER VESSEL',
      imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
      price: '₹380 Cr',
      charterPrice: '₹9Cr/wk',
      spec: '58m • 10 Guests • Polar Class',
      badgeText: 'POLAR CAPABLE',
    ),
  ];

  List<_YachtItem> get _currentItems {
    switch (_subTab) {
      case 'MEGA YACHTS': return _megaYachts;
      case 'SUPERYACHTS': return _superyachts;
      case 'CATAMARANS': return _catamarans;
      case 'EXPLORER': return _explorer;
      default: return _megaYachts;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            backgroundColor: bg,
            elevation: 0,
            scrolledUnderElevation: 0,
            expandedHeight: 0,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: EdgeInsets.zero,
              title: const LuxuryAppBar(
                showBack: true,
                title: 'MARINE & YACHTS',
                showSearch: true,
                showWishlist: false,
                showThemeToggle: false,
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Column(
              children: [
                SectionActionBar(
                  selectedMode: _mode,
                  onModeChanged: (m) => setState(() => _mode = m),
                  isDark: isDark,
                  buyLabel: '✦ ACQUIRE',
                  bookLabel: '⚓ CHARTER',
                  sellLabel: '♛ CONSIGN',
                ),
                _buildSubTabStrip(isDark),
                const SizedBox(height: 8),
                if (_mode == 'SELL') _buildConsignmentPanel(isDark) else _buildGrid(isDark),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubTabStrip(bool isDark) {
    return SizedBox(
      height: 44,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        itemCount: _subTabs.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final tab = _subTabs[i];
          final selected = _subTab == tab;
          return GestureDetector(
            onTap: () => setState(() => _subTab = tab),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 7),
              decoration: BoxDecoration(
                color: selected ? LuxuryColors.gold : Colors.transparent,
                border: Border.all(
                  color: selected ? LuxuryColors.gold : LuxuryColors.goldBorder,
                  width: 0.8,
                ),
                borderRadius: BorderRadius.circular(3),
              ),
              child: Text(
                tab,
                style: LuxuryTypography.microCaps.copyWith(
                  color: selected ? Colors.black : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
                  fontSize: 10,
                  letterSpacing: 1.2,
                  fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildGrid(bool isDark) {
    final items = _currentItems;
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
            price: _mode == 'BOOK' ? item.charterPrice : item.price,
            subtitle: item.spec,
            badgeText: item.badgeText,
            isDark: isDark,
            isMembersOnly: item.badgeText == 'MEMBERS ONLY',
            onBuy: () {},
            onBook: () {},
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () {},
          );
        },
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
            colors: [Color(0xFF071520), Color(0xFF050505)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.directions_boat, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'MARINE CONSIGNMENT DESK',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Consign Your Vessel\nto the Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Access our network of 800+ verified marine buyers. Flag, registration and class survey documentation required for listing.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'CONSIGN MY VESSEL',
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

class _YachtItem {
  final String id, title, category, imageUrl, price, charterPrice, spec;
  final String? badgeText;
  const _YachtItem({
    required this.id, required this.title, required this.category,
    required this.imageUrl, required this.price, required this.charterPrice,
    required this.spec, this.badgeText,
  });
}
