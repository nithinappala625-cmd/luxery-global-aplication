import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';

class WatchesScreen extends ConsumerStatefulWidget {
  const WatchesScreen({super.key});

  @override
  ConsumerState<WatchesScreen> createState() => _WatchesScreenState();
}

class _WatchesScreenState extends ConsumerState<WatchesScreen> {
  String _mode = 'BUY';
  String _subTab = 'HIGH COMPLICATIONS';

  static const _subTabs = ['HIGH COMPLICATIONS', 'VINTAGE MOVEMENTS', 'RARE BEJEWELLED', 'INVESTMENT'];

  static final List<_WatchItem> _highComp = const [
    _WatchItem(id: 'pp_gmc', title: 'Patek Philippe Grandmaster Chime 6300',
      imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800',
      price: '₹24.5 Cr', spec: 'Platinum • 20 Complications', ref: 'Ref. 6300A-010',
      badgeText: 'ONLY 6 PIECES'),
    _WatchItem(id: 'ap_concept', title: 'Audemars Piguet Royal Oak Concept',
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      price: '₹8.2 Cr', spec: 'Titanium • Flying Tourbillon', ref: 'Ref. 26587TI'),
    _WatchItem(id: 'jlc_hybris', title: 'Jaeger-LeCoultre Hybris Mechanica',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹12.8 Cr', spec: 'White Gold • Celestial Tourbillon', ref: 'Ref. 6033420'),
    _WatchItem(id: 'mb_bulldog', title: 'MB&F HM10 Bulldog',
      imageUrl: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800',
      price: '₹6.4 Cr', spec: 'Titanium • Flying Hours Display', ref: 'Ref. 10.TL.B'),
  ];

  static final List<_WatchItem> _vintage = const [
    _WatchItem(id: 'daytona_6263', title: 'Rolex Daytona Ref. 6263 (1969)',
      imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800',
      price: '₹3.8 Cr', spec: 'Steel • Paul Newman Dial', ref: 'Ref. 6263',
      badgeText: 'PAUL NEWMAN'),
    _WatchItem(id: 'pp_1518', title: 'Patek Philippe Ref. 1518 (1944)',
      imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800',
      price: '₹18.5 Cr', spec: 'Yellow Gold • Perpetual Calendar', ref: 'Ref. 1518'),
    _WatchItem(id: 'ap_roa', title: 'AP Royal Oak Jumbo A-Series (1972)',
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      price: '₹4.2 Cr', spec: 'Stainless Steel • Genta Design', ref: 'Ref. 5402ST'),
    _WatchItem(id: 'vc_hist', title: 'Vacheron Constantin Historiques Ultra-Fine',
      imageUrl: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800',
      price: '₹6.1 Cr', spec: '18K Gold • Museum Condition', ref: 'Ref. 82035'),
  ];

  static final List<_WatchItem> _bejewelled = const [
    _WatchItem(id: 'graff', title: 'Graff Diamonds Hallucination',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹375 Cr', spec: '110ct Rare Coloured Diamonds', ref: 'One-Off Creation',
      badgeText: 'ULTRA RARE'),
    _WatchItem(id: 'pp_3974', title: 'Patek Philippe 3974 Skeleton',
      imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800',
      price: '₹45 Cr', spec: 'Diamond-Set Platinum • Skeleton', ref: 'Ref. 3974P'),
    _WatchItem(id: 'jacob', title: 'Jacob & Co Astronomia Art',
      imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800',
      price: '₹28 Cr', spec: 'Baguette Diamond Tourbillon', ref: 'AT100.30'),
    _WatchItem(id: 'rd_excal', title: 'Roger Dubuis Excalibur Openwork',
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      price: '₹12 Cr', spec: 'Openwork • Diamond Pavé', ref: 'RDDBEX0829'),
  ];

  static final List<_WatchItem> _investment = const [
    _WatchItem(id: 'sub', title: 'Rolex Submariner Black Dial',
      imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800',
      price: '₹12.5L', spec: 'Steel • Unworn 2024 Full Set', ref: 'Ref. 126610LN',
      badgeText: 'UNWORN'),
    _WatchItem(id: 'roa_blue', title: 'AP Royal Oak Blue Dial',
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      price: '₹18.8L', spec: 'Steel • Full Set Complete', ref: 'Ref. 15500ST',
      badgeText: 'FULL SET'),
    _WatchItem(id: 'naut', title: 'Patek Nautilus 5711 Steel',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹62.5L', spec: 'Steel • Discontinued Reference', ref: 'Ref. 5711/1A',
      badgeText: 'DISCONTINUED'),
    _WatchItem(id: 'daytona_ice', title: 'Rolex Daytona Ice Blue',
      imageUrl: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800',
      price: '₹45L', spec: 'Platinum • Exclusive Dealers Only', ref: 'Ref. 116506'),
  ];

  List<_WatchItem> get _currentItems {
    switch (_subTab) {
      case 'HIGH COMPLICATIONS': return _highComp;
      case 'VINTAGE MOVEMENTS': return _vintage;
      case 'RARE BEJEWELLED': return _bejewelled;
      case 'INVESTMENT': return _investment;
      default: return _highComp;
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
            pinned: true, backgroundColor: bg, elevation: 0,
            scrolledUnderElevation: 0, expandedHeight: 0,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: EdgeInsets.zero,
              title: const LuxuryAppBar(
                showBack: true, title: 'LUXURY TIMEPIECES',
                showSearch: true, showWishlist: false, showThemeToggle: false,
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
                  buyLabel: '✦ BUY',
                  bookLabel: '🔍 AUTHENTICATE',
                  sellLabel: '♛ CONSIGN',
                ),
                _buildSubTabStrip(isDark),
                const SizedBox(height: 8),
                if (_mode == 'BOOK') _buildAuthPanel(isDark)
                else if (_mode == 'SELL') _buildConsignPanel(isDark)
                else _buildGrid(isDark),
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
                  color: selected ? LuxuryColors.gold : LuxuryColors.goldBorder, width: 0.8,
                ),
                borderRadius: BorderRadius.circular(3),
              ),
              child: Text(tab, style: LuxuryTypography.microCaps.copyWith(
                color: selected ? Colors.black : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
                fontSize: 10, letterSpacing: 1.2,
                fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
              )),
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
          crossAxisCount: 2, childAspectRatio: 0.62, crossAxisSpacing: 10, mainAxisSpacing: 10,
        ),
        itemCount: items.length,
        itemBuilder: (context, i) {
          final item = items[i];
          return LuxuryAssetCard(
            imageUrl: item.imageUrl, title: item.title,
            category: item.ref, price: item.price, subtitle: item.spec,
            badgeText: item.badgeText, isDark: isDark,
            isMembersOnly: item.badgeText == 'MEMBERS ONLY',
            onBuy: () {}, onBook: () {},
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () {},
          );
        },
      ),
    );
  }

  Widget _buildAuthPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF0A0A14), Color(0xFF050505)],
            begin: Alignment.topLeft, end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.verified_outlined, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text('TIMEPIECE AUTHENTICATION', style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
            )),
            const SizedBox(height: 8),
            Text('Independent Expert\nVerification Service.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              )),
            const SizedBox(height: 12),
            Text('Partners: Christie\'s Specialist Dept., independent horologists certified by NAWCC. Full movement inspection included.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              )),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'REQUEST AUTHENTICATION', variant: LuxuryButtonVariant.gold,
              height: 50, width: double.infinity, onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConsignPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF1A1508), Color(0xFF050505)],
            begin: Alignment.topLeft, end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.watch, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text('AUTHENTICATE & CONSIGN', style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
            )),
            const SizedBox(height: 8),
            Text('Consign Your Timepiece\nto the Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              )),
            const SizedBox(height: 12),
            Text('Authentication, movement service and valuation included with every consignment. Access 400+ verified collectors.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              )),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'CONSIGN MY TIMEPIECE', variant: LuxuryButtonVariant.gold,
              height: 50, width: double.infinity, onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _WatchItem {
  final String id, title, imageUrl, price, spec, ref;
  final String? badgeText;
  const _WatchItem({
    required this.id, required this.title, required this.imageUrl,
    required this.price, required this.spec, required this.ref, this.badgeText,
  });
}
