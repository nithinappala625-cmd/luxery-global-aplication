import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';

class AviationScreen extends ConsumerStatefulWidget {
  const AviationScreen({super.key});

  @override
  ConsumerState<AviationScreen> createState() => _AviationScreenState();
}

class _AviationScreenState extends ConsumerState<AviationScreen> {
  String _mode = 'BUY';
  String _subTab = 'JETS';

  static const _subTabs = ['JETS', 'HELICOPTERS', 'AIR BOATS'];

  static final List<_AviationItem> _jets = const [
    _AviationItem(
      id: 'g700',
      title: 'Gulfstream G700',
      category: 'PRIVATE JET',
      imageUrl:
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg',
      price: '₹578 Cr',
      chartPrice: '₹28L/hr',
      spec: '7,750 nm • 19 VIP Seats',
      subType: 'JETS',
    ),
    _AviationItem(
      id: 'gl7500',
      title: 'Bombardier Global 7500',
      category: 'PRIVATE JET',
      imageUrl:
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/N182QS-Global7500-120823.png/1280px-N182QS-Global7500-120823.png',
      price: '₹512 Cr',
      chartPrice: '₹25L/hr',
      spec: '7,700 nm • 17 VIP Seats',
      subType: 'JETS',
    ),
    _AviationItem(
      id: 'f10x',
      title: 'Dassault Falcon 10X',
      category: 'PRIVATE JET',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
      price: '₹555 Cr',
      chartPrice: '₹26L/hr',
      spec: '7,500 nm • 18 VIP Seats',
      subType: 'JETS',
    ),
    _AviationItem(
      id: 'acj220',
      title: 'Airbus ACJ TwoTwenty',
      category: 'PRIVATE JET',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      price: '₹370 Cr',
      chartPrice: '₹18L/hr',
      spec: '5,650 nm • 25 VIP Seats',
      subType: 'JETS',
    ),
    _AviationItem(
      id: 'cit',
      title: 'Cessna Citation Longitude',
      category: 'PRIVATE JET',
      imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800',
      price: '₹85 Cr',
      chartPrice: '₹8L/hr',
      spec: '3,500 nm • 12 Seats',
      subType: 'JETS',
    ),
    _AviationItem(
      id: 'pc24',
      title: 'Pilatus PC-24',
      category: 'PRIVATE JET',
      imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800',
      price: '₹70 Cr',
      chartPrice: '₹6L/hr',
      spec: '2,000 nm • 10 Seats',
      subType: 'JETS',
    ),
  ];

  static final List<_AviationItem> _helicopters = const [
    _AviationItem(
      id: 's76d',
      title: 'Sikorsky S-76D',
      category: 'VIP HELICOPTER',
      imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Sikorsky_S-76D%2C_Heli_Air_Monaco_JP7367553.jpg/1280px-Sikorsky_S-76D%2C_Heli_Air_Monaco_JP7367553.jpg',
      price: '₹39 Cr',
      chartPrice: '₹4L/hr',
      spec: '450 nm • 8 VIP Seats',
      subType: 'HELICOPTERS',
    ),
    _AviationItem(
      id: 'h145',
      title: 'Airbus H145',
      category: 'VIP HELICOPTER',
      imageUrl:
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Airbus_Helicopter_H145_%28D-HDSQ%29-20240621-RM-101724.jpg/1280px-Airbus_Helicopter_H145_%28D-HDSQ%29-20240621-RM-101724.jpg',
      price: '₹28 Cr',
      chartPrice: '₹3L/hr',
      spec: '600 nm • 9 Seats',
      subType: 'HELICOPTERS',
    ),
    _AviationItem(
      id: 'b525',
      title: 'Bell 525 Relentless',
      category: 'VIP HELICOPTER',
      imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
      price: '₹65 Cr',
      chartPrice: '₹6L/hr',
      spec: '500 nm • 20 Seats',
      subType: 'HELICOPTERS',
    ),
    _AviationItem(
      id: 'aw139',
      title: 'Leonardo AW139',
      category: 'VIP HELICOPTER',
      imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
      price: '₹31 Cr',
      chartPrice: '₹3.5L/hr',
      spec: '573 nm • 15 Seats',
      subType: 'HELICOPTERS',
    ),
  ];

  static final List<_AviationItem> _airBoats = const [
    _AviationItem(
      id: 'tbm960',
      title: 'Daher TBM 960',
      category: 'TURBOPROP',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
      price: '₹60 Cr',
      chartPrice: '₹5L/hr',
      spec: '1,730 nm • 5 Seats',
      subType: 'AIR BOATS',
    ),
    _AviationItem(
      id: 'da62',
      title: 'Diamond DA62',
      category: 'TURBOPROP',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      price: '₹18 Cr',
      chartPrice: '₹2L/hr',
      spec: '1,000 nm • 7 Seats',
      subType: 'AIR BOATS',
    ),
  ];

  List<_AviationItem> get _currentItems {
    switch (_subTab) {
      case 'JETS':
        return _jets;
      case 'HELICOPTERS':
        return _helicopters;
      case 'AIR BOATS':
        return _airBoats;
      default:
        return _jets;
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
                title: 'PRIVATE AVIATION',
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
                  bookLabel: '✈ CHARTER',
                  sellLabel: '♛ CONSIGN',
                ),
                _buildSubTabStrip(isDark),
                const SizedBox(height: 8),
                if (_mode == 'SELL')
                  _buildConsignmentPanel(isDark)
                else
                  _buildGrid(isDark),
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
                  color: selected
                      ? Colors.black
                      : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
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
            price: _mode == 'BOOK' ? item.chartPrice : item.price,
            subtitle: item.spec,
            isDark: isDark,
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
            const Icon(Icons.flight_takeoff, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text(
              'AIRCRAFT CONSIGNMENT DESK',
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 11,
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Submit your aircraft to our\nPrivate Aviation Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white,
                fontSize: 18,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'GIA-equivalent airworthiness certification required. Access to 1,200+ verified UHNWI buyers across 48 countries.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            ..._consignStep('1', 'Submit aircraft details & documents'),
            ..._consignStep('2', 'Airworthiness certification review'),
            ..._consignStep('3', 'Syndicate listing & price discovery'),
            ..._consignStep('4', 'Matched with vetted buyer'),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'SUBMIT AIRCRAFT FOR EVALUATION',
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

  List<Widget> _consignStep(String num, String label) {
    return [
      Row(
        children: [
          Container(
            width: 22,
            height: 22,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: LuxuryColors.gold.withValues(alpha: 0.15),
              border: Border.all(color: LuxuryColors.goldBorder, width: 0.8),
              shape: BoxShape.circle,
            ),
            child: Text(
              num,
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.gold,
                fontSize: 9,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Text(
            label,
            style: LuxuryTypography.bodyMedium.copyWith(
              color: LuxuryColors.platinum,
              fontSize: 12,
            ),
          ),
        ],
      ),
      const SizedBox(height: 8),
    ];
  }
}

// ─── Data Model ───────────────────────────────────────────────────────────────

class _AviationItem {
  final String id, title, category, imageUrl, price, chartPrice, spec, subType;
  const _AviationItem({
    required this.id,
    required this.title,
    required this.category,
    required this.imageUrl,
    required this.price,
    required this.chartPrice,
    required this.spec,
    required this.subType,
  });
}
