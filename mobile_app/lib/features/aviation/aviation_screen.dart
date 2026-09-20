import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/aviation.dart';
import '../../providers/aviation_provider.dart';

class AviationScreen extends ConsumerStatefulWidget {
  const AviationScreen({super.key});

  @override
  ConsumerState<AviationScreen> createState() => _AviationScreenState();
}

class _AviationScreenState extends ConsumerState<AviationScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _openInquirySheet(AircraftListing jet) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final nameController = TextEditingController();
    final contactController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(context).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    jet.isSale ? 'AIRCRAFT ACQUISITION' : 'CHARTER FLIGHT DESK',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                jet.title,
                style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
              ),
              Text(
                'Broker / Operator: ${jet.brokerName}',
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
              const Divider(height: 24),
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Patron / Principal Name',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: contactController,
                decoration: const InputDecoration(
                  labelText: 'Confidential Phone / WhatsApp',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0D140F) : const Color(0xFFEBF3ED),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  jet.complianceDisclaimer,
                  style: TextStyle(
                    fontSize: 10.5,
                    color: isDark ? Colors.white70 : Colors.black87,
                    height: 1.35,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'TRANSMIT MANDATE TO BROKER',
                variant: LuxuryButtonVariant.gold,
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Acquisition inquiry dispatched. The accredited broker will verify credentials via private phone.'),
                      backgroundColor: LuxuryColors.deepForestGreen,
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(aviationProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'PRIVATE AVIATION',
        showBack: true,
      ),
      body: Column(
        children: [
          // Compliance Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: isDark ? const Color(0xFF141E16) : const Color(0xFFEBF3ED),
            child: Row(
              children: [
                const Icon(Icons.verified_user_outlined, size: 16, color: LuxuryColors.champagne),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'All aircraft subject to Pre-Purchase Inspection (PPI) & Civil Aviation Authority audit.',
                    style: TextStyle(
                      fontSize: 10.5,
                      color: isDark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Tabs
          TabBar(
            controller: _tabController,
            indicatorColor: LuxuryColors.champagne,
            labelColor: LuxuryColors.champagne,
            unselectedLabelColor: isDark ? Colors.white54 : Colors.black54,
            labelStyle: LuxuryTypography.microCaps.copyWith(letterSpacing: 2.0, fontWeight: FontWeight.bold),
            tabs: const [
              Tab(text: 'BUY AIRCRAFT'),
              Tab(text: 'CHARTER AIRCRAFT'),
            ],
          ),

          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                // Tab 1: BUY AIRCRAFT
                ListView.separated(
                  padding: const EdgeInsets.all(20),
                  itemCount: state.salesListings.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 20),
                  itemBuilder: (context, index) {
                    final jet = state.salesListings[index];
                    return _buildJetCard(jet, isDark);
                  },
                ),

                // Tab 2: CHARTER AIRCRAFT
                ListView.separated(
                  padding: const EdgeInsets.all(20),
                  itemCount: state.charterRoutes.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 20),
                  itemBuilder: (context, index) {
                    final jet = state.charterRoutes[index];
                    return _buildCharterCard(jet, isDark);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildJetCard(AircraftListing jet, bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF141414) : Colors.white,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                child: Image.network(
                  jet.coverImageUrl,
                  height: 180,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.8),
                    borderRadius: BorderRadius.circular(2),
                    border: Border.all(color: LuxuryColors.champagne, width: 0.8),
                  ),
                  child: Text(
                    'TAIL: ${jet.tailNumber}',
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        jet.title,
                        style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                      ),
                    ),
                    Text(
                      '\$ ${(jet.priceOrHourlyRate / 1000000).toStringAsFixed(1)}M',
                      style: TextStyle(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  '${jet.passengerCapacity} Pax  •  Range: ${jet.maxRangeNm} NM  •  TTAF: ${jet.totalAirframeHours} Hrs (${jet.flightCycles} Cycles)',
                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white70 : Colors.black87),
                ),
                const SizedBox(height: 4),
                Text(
                  'Avionics: ${jet.avionicsSuite}',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(fontSize: 10.5, color: isDark ? Colors.white60 : Colors.black54),
                ),
                const SizedBox(height: 4),
                Text(
                  'Hangar: ${jet.hangarLocation}  •  Broker: ${jet.brokerName}',
                  style: const TextStyle(fontSize: 10.5, color: LuxuryColors.champagne),
                ),
                const SizedBox(height: 14),
                LuxuryButton(
                  text: 'REQUEST AIRCRAFT DOSSIER & SPEC SHEET',
                  variant: LuxuryButtonVariant.gold,
                  height: 40,
                  onPressed: () => _openInquirySheet(jet),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCharterCard(AircraftListing jet, bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF141414) : Colors.white,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(
          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
            child: Image.network(
              jet.coverImageUrl,
              height: 160,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        jet.title,
                        style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                      ),
                    ),
                    Text(
                      '${jet.currency} ${(jet.priceOrHourlyRate / (jet.currency == "INR" ? 100000 : 1000)).toStringAsFixed(1)}${jet.currency == "INR" ? " Lakh" : "K"}',
                      style: TextStyle(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.flight_takeoff, size: 16, color: LuxuryColors.champagne),
                    const SizedBox(width: 6),
                    Text('${jet.departureCity}  ➔  ${jet.destinationCity ?? "On Demand Route"}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'Capacity: ${jet.passengerCapacity} VIP Passengers  •  Operator: ${jet.brokerName}',
                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white60 : Colors.black54),
                ),
                const SizedBox(height: 14),
                LuxuryButton(
                  text: 'BOOK PRIVATE CHARTER',
                  variant: LuxuryButtonVariant.gold,
                  height: 40,
                  onPressed: () => _openInquirySheet(jet),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
