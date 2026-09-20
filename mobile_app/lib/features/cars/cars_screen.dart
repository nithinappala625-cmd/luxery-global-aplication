import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_asset_card.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/section_action_bar.dart';

class CarsScreen extends ConsumerStatefulWidget {
  const CarsScreen({super.key});

  @override
  ConsumerState<CarsScreen> createState() => _CarsScreenState();
}

class _CarsScreenState extends ConsumerState<CarsScreen> {
  String _mode = 'BUY';
  String _subTab = 'RACING EXOTICS';

  static const _subTabs = ['RACING EXOTICS', 'LUXURY LIMOS', 'VINTAGE CLASSICS', 'BESPOKE'];

  static final List<_CarItem> _racingExotics = const [
    _CarItem(id: 'bugatti', title: 'Bugatti Chiron Super Sport 300+', brand: 'BUGATTI',
      imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg',
      price: '₹32 Cr', rentalPrice: '₹18L/day', spec: '1,600 HP • 300+ mph Top Speed'),
    _CarItem(id: 'koenigsegg', title: 'Koenigsegg Jesko Absolut', brand: 'KOENIGSEGG',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      price: '₹45 Cr', rentalPrice: '₹25L/day', spec: '1,600 HP • 330 mph Theoretical',
      badgeText: 'INVITATION ONLY'),
    _CarItem(id: 'pagani', title: 'Pagani Huayra Roadster BC', brand: 'PAGANI',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      price: '₹28 Cr', rentalPrice: '₹16L/day', spec: '791 HP • AMG V12 Bi-Turbo'),
    _CarItem(id: 'mclaren', title: 'McLaren P1 GTR', brand: 'MCLAREN',
      imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      price: '₹22 Cr', rentalPrice: '₹14L/day', spec: '1,000 HP • Track-Only',
      badgeText: 'TRACK ONLY'),
    _CarItem(id: 'ferrari_lf', title: 'Ferrari LaFerrari Aperta', brand: 'FERRARI',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      price: '₹55 Cr', rentalPrice: '₹30L/day', spec: '950 HP • 210 Examples',
      badgeText: 'MEMBERS ONLY'),
    _CarItem(id: 'sian', title: 'Lamborghini Sian FKP 37', brand: 'LAMBORGHINI',
      imageUrl: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800',
      price: '₹38 Cr', rentalPrice: '₹20L/day', spec: '819 HP • Hybrid V12'),
  ];

  static final List<_CarItem> _luxuryLimos = const [
    _CarItem(id: 'rr_phantom', title: 'Rolls-Royce Phantom VIII Extended', brand: 'ROLLS-ROYCE',
      imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg/1280px-2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg',
      price: '₹4.8 Cr', rentalPrice: '₹3.5L/day', spec: '6.75L V12 • Starlight Headliner'),
    _CarItem(id: 'bentley', title: 'Bentley Flying Spur Mulliner', brand: 'BENTLEY',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
      price: '₹3.2 Cr', rentalPrice: '₹2.4L/day', spec: 'W12 Biturbo • Naim Audio'),
    _CarItem(id: 'maybach', title: 'Mercedes-Maybach S 680', brand: 'MERCEDES-MAYBACH',
      imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
      price: '₹2.4 Cr', rentalPrice: '₹1.8L/day', spec: 'V12 612 HP • Executive Lounge'),
    _CarItem(id: 'bmw_760', title: 'BMW M760i xDrive', brand: 'BMW',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      price: '₹1.9 Cr', rentalPrice: '₹1.2L/day', spec: 'V8 544 HP • Bowers & Wilkins'),
  ];

  static final List<_CarItem> _vintageClassics = const [
    _CarItem(id: 'ferrari_250', title: 'Ferrari 250 GTO (1962)', brand: 'FERRARI',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      price: '₹340 Cr', rentalPrice: 'N/A', spec: '3.0L V12 • Le Mans Heritage',
      badgeText: 'AUCTION'),
    _CarItem(id: 'jaguar_xkss', title: 'Jaguar XKSS (1957)', brand: 'JAGUAR',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      price: '₹85 Cr', rentalPrice: 'N/A', spec: 'D-Type Derived • 16 Built'),
    _CarItem(id: 'merc_300sl', title: 'Mercedes 300 SL Gullwing (1955)', brand: 'MERCEDES-BENZ',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      price: '₹28 Cr', rentalPrice: 'N/A', spec: 'Fuel-Injected • Concours Condition'),
    _CarItem(id: 'bugatti_57', title: 'Bugatti Type 57SC Atlantic (1937)', brand: 'BUGATTI',
      imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg',
      price: '₹950 Cr', rentalPrice: 'N/A', spec: 'Supercharged • 4 Surviving',
      badgeText: 'ULTRA RARE'),
  ];

  static final List<_CarItem> _bespoke = const [
    _CarItem(id: 'rr_boattail', title: 'Rolls-Royce Boat Tail', brand: 'ROLLS-ROYCE',
      imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg/1280px-2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg',
      price: '₹240 Cr', rentalPrice: 'N/A', spec: '3 of 3 • Commission Only',
      badgeText: 'INVITATION ONLY'),
    _CarItem(id: 'pagani_rev', title: 'Pagani Zonda Revolucion', brand: 'PAGANI',
      imageUrl: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800',
      price: '₹95 Cr', rentalPrice: 'N/A', spec: 'Track-Only • Last Zonda'),
    _CarItem(id: 'aston_victor', title: 'Aston Martin Victor', brand: 'ASTON MARTIN',
      imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      price: '₹32 Cr', rentalPrice: 'N/A', spec: 'One-Off • AM V12 Vantage Based'),
  ];

  List<_CarItem> get _currentItems {
    switch (_subTab) {
      case 'RACING EXOTICS': return _racingExotics;
      case 'LUXURY LIMOS': return _luxuryLimos;
      case 'VINTAGE CLASSICS': return _vintageClassics;
      case 'BESPOKE': return _bespoke;
      default: return _racingExotics;
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
                showBack: true, title: 'LUXURY AUTOMOBILES',
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
                  bookLabel: '🚗 RENT',
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
                  color: selected ? LuxuryColors.gold : LuxuryColors.goldBorder, width: 0.8,
                ),
                borderRadius: BorderRadius.circular(3),
              ),
              child: Text(
                tab,
                style: LuxuryTypography.microCaps.copyWith(
                  color: selected ? Colors.black : (isDark ? LuxuryColors.platinum : LuxuryColors.slate),
                  fontSize: 10, letterSpacing: 1.2,
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
          crossAxisCount: 2, childAspectRatio: 0.62, crossAxisSpacing: 10, mainAxisSpacing: 10,
        ),
        itemCount: items.length,
        itemBuilder: (context, i) {
          final item = items[i];
          return LuxuryAssetCard(
            imageUrl: item.imageUrl,
            title: item.title,
            category: item.brand,
            price: _mode == 'BOOK' ? item.rentalPrice : item.price,
            subtitle: item.spec,
            badgeText: item.badgeText,
            isDark: isDark,
            isMembersOnly: item.badgeText == 'MEMBERS ONLY',
            onBuy: () {}, onBook: () {},
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
            colors: [Color(0xFF150A0A), Color(0xFF050505)],
            begin: Alignment.topLeft, end: Alignment.bottomRight,
          ),
          border: Border.all(color: LuxuryColors.gold, width: 1.0),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.directions_car, color: LuxuryColors.gold, size: 32),
            const SizedBox(height: 14),
            Text('MOTORCAR CONSIGNMENT', style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.gold, fontSize: 11, letterSpacing: 2.0,
            )),
            const SizedBox(height: 8),
            Text('Consign Your Motorcar\nto the Syndicate.',
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: Colors.white, fontSize: 18, height: 1.3,
              )),
            const SizedBox(height: 12),
            Text('From one-off hypercars to golden-era classics — access our network of 600+ vetted collectors globally.',
              style: LuxuryTypography.bodyMedium.copyWith(
                color: LuxuryColors.platinum, fontSize: 13, height: 1.5,
              )),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'CONSIGN MY MOTORCAR',
              variant: LuxuryButtonVariant.gold, height: 50, width: double.infinity,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _CarItem {
  final String id, title, brand, imageUrl, price, rentalPrice, spec;
  final String? badgeText;
  const _CarItem({
    required this.id, required this.title, required this.brand,
    required this.imageUrl, required this.price, required this.rentalPrice,
    required this.spec, this.badgeText,
  });
}
