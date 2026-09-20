import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';

class JewelryScreen extends ConsumerStatefulWidget {
  const JewelryScreen({super.key});

  @override
  ConsumerState<JewelryScreen> createState() => _JewelryScreenState();
}

class _JewelryScreenState extends ConsumerState<JewelryScreen> {
  String _mode = 'BUY';
  String _subTab = 'NATURAL DIAMONDS';

  static const _subTabs = ['NATURAL DIAMONDS', 'LAB-GROWN', 'RARE GEMS', '24K GOLD'];

  static final List<_JewelItem> _natural = const [
    _JewelItem(id: 'd_if_10', title: 'D-IF 10.05ct Round Brilliant',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹38.5 Cr', spec: 'GIA • D/IF/Excellent/None', certBody: 'GIA',
      badgeText: 'GIA CERTIFIED'),
    _JewelItem(id: 'pink_panther', title: 'Vivid Pink 15ct Oval',
      imageUrl: 'https://images.unsplash.com/photo-1568944729458-ce2bf7768e44?w=800',
      price: '₹285 Cr', spec: 'GIA • Vivid Pink/IF/Excellent', certBody: 'GIA',
      badgeText: 'ULTRA RARE'),
    _JewelItem(id: 'kashmir_blue', title: 'Fancy Intense Blue 8.72ct',
      imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
      price: '₹65 Cr', spec: 'GIA • Fancy Intense Blue/VS1', certBody: 'GIA'),
    _JewelItem(id: 'canary', title: 'Vivid Yellow 22ct Cushion',
      imageUrl: 'https://images.unsplash.com/photo-1612891936954-09a2c7dd53d2?w=800',
      price: '₹42 Cr', spec: 'GIA • Fancy Vivid Yellow/VVS1', certBody: 'GIA'),
  ];

  static final List<_JewelItem> _labGrown = const [
    _JewelItem(id: 'igi_5ct', title: 'IGI 5ct D-VVS1 Round',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹18.5L', spec: 'IGI • D/VVS1/Ideal/None', certBody: 'IGI',
      badgeText: 'IGI CERTIFIED'),
    _JewelItem(id: 'igi_3ct', title: 'IGI 3ct E-VS1 Oval',
      imageUrl: 'https://images.unsplash.com/photo-1568944729458-ce2bf7768e44?w=800',
      price: '₹9.8L', spec: 'IGI • E/VS1/Excellent/None', certBody: 'IGI'),
    _JewelItem(id: 'igi_7ct', title: 'IGI 7ct D-IF Princess',
      imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
      price: '₹28.5L', spec: 'IGI • D/IF/Ideal/None', certBody: 'IGI'),
    _JewelItem(id: 'igi_pink', title: 'IGI 2ct Fancy Intense Pink',
      imageUrl: 'https://images.unsplash.com/photo-1612891936954-09a2c7dd53d2?w=800',
      price: '₹16.2L', spec: 'IGI • Fancy Intense Pink/VVS1', certBody: 'IGI'),
  ];

  static final List<_JewelItem> _rareGems = const [
    _JewelItem(id: 'alexandrite', title: 'Alexandrite 4.5ct Chrysoberyl',
      imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
      price: '₹22.8 Cr', spec: 'AGL • 100% Colour Change', certBody: 'AGL',
      badgeText: 'COLLECTORS PIECE'),
    _JewelItem(id: 'paraiba', title: 'Paraíba Tourmaline 3.2ct',
      imageUrl: 'https://images.unsplash.com/photo-1612891936954-09a2c7dd53d2?w=800',
      price: '₹8.5 Cr', spec: 'GRS • Neon Blue / Brazilian Origin', certBody: 'GRS',
      badgeText: 'BRAZIL ORIGIN'),
    _JewelItem(id: 'kashmir_saph', title: 'Kashmir Sapphire 6.8ct',
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      price: '₹45 Cr', spec: 'Gub • Kashmir Origin / No Heat', certBody: 'Gub',
      badgeText: 'KASHMIR ORIGIN'),
    _JewelItem(id: 'ruby', title: 'Burmese Ruby 5.2ct Pigeon Blood',
      imageUrl: 'https://images.unsplash.com/photo-1568944729458-ce2bf7768e44?w=800',
      price: '₹32 Cr', spec: 'GRS • Pigeon Blood / Mogok / No Heat', certBody: 'GRS',
      badgeText: 'PIGEON BLOOD'),
  ];

  static final List<_JewelItem> _gold = const [
    _JewelItem(id: 'pamp_1kg', title: 'PAMP Suisse 1kg Fortuna Bar',
      imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      price: '₹75.5L', spec: '999.9 Fine • LBMA Certified', certBody: 'LBMA'),
    _JewelItem(id: 'rbi_100g', title: 'RBI 100g Bar Portfolio (×10)',
      imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      price: '₹75.5L', spec: '999.9 Fine • BIS Hallmarked', certBody: 'BIS'),
    _JewelItem(id: 'perth_500', title: 'Perth Mint 500g Cast Bar',
      imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      price: '₹38.2L', spec: '999.9 Fine • Assayed', certBody: 'Perth Mint'),
    _JewelItem(id: 'sovereign', title: 'British Gold Sovereign (50 pc)',
      imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      price: '₹38.8L', spec: '916.7 Fine • Royal Mint', certBody: 'Royal Mint'),
  ];

  List<_JewelItem> get _currentItems {
    switch (_subTab) {
      case 'NATURAL DIAMONDS': return _natural;
      case 'LAB-GROWN': return _labGrown;
      case 'RARE GEMS': return _rareGems;
      case '24K GOLD': return _gold;
      default: return _natural;
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
                showBack: true, title: 'JEWELS & GEMSTONES',
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
                  bookLabel: '🔍 CERTIFY',
                  sellLabel: '♛ CONSIGN',
                ),
                _buildSubTabStrip(isDark),
                const SizedBox(height: 8),
                if (_mode == 'BOOK') _buildCertifyPanel(isDark)
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
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, childAspectRatio: 0.62, crossAxisSpacing: 10, mainAxisSpacing: 10,
        ),
        itemCount: _currentItems.length,
        itemBuilder: (context, i) {
          final item = _currentItems[i];
          return LuxuryAssetCard(
            imageUrl: item.imageUrl, title: item.title,
            category: item.certBody, price: item.price, subtitle: item.spec,
            badgeText: item.badgeText, isDark: isDark,
            onBuy: () {}, onBook: () {},
            onSell: () => setState(() => _mode = 'SELL'),
            onTap: () {},
          );
        },
      ),
    );
  }

  Widget _buildCertifyPanel(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF0A0714), Color(0xFF050505)],
            begin: Alignment.topLeft, end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.diamond, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text('GEMOLOGICAL CERTIFICATION', style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
            )),
            const SizedBox(height: 8),
            Text('Independent Expert\nGemological Lab Services.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              )),
            const SizedBox(height: 12),
            Text('Partners: GIA, IGI, AGL, GRS, Gub. Full grading report issued within 10 working days. Available for diamonds, coloured stones, and precious metals.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              )),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'REQUEST CERTIFICATION SERVICE', variant: LuxuryButtonVariant.gold,
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
            const Icon(Icons.diamond_outlined, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text('JEWEL CONSIGNMENT DESK', style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
            )),
            const SizedBox(height: 8),
            Text('Consign Your Jewel\nto the Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              )),
            const SizedBox(height: 12),
            Text('Full GIA/IGI certification report required. We connect your stone with 300+ verified collectors and investors globally.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              )),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'CONSIGN MY JEWEL', variant: LuxuryButtonVariant.gold,
              height: 50, width: double.infinity, onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _JewelItem {
  final String id, title, imageUrl, price, spec, certBody;
  final String? badgeText;
  const _JewelItem({
    required this.id, required this.title, required this.imageUrl,
    required this.price, required this.spec, required this.certBody, this.badgeText,
  });
}
