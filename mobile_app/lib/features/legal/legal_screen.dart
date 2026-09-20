import 'package:flutter/material.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';

class LegalScreen extends StatefulWidget {
  const LegalScreen({super.key});

  @override
  State<LegalScreen> createState() => _LegalScreenState();
}

class _LegalScreenState extends State<LegalScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'GOVERNANCE & LEGAL',
        showBack: true,
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: LuxuryColors.champagne,
          labelColor: LuxuryColors.champagne,
          unselectedLabelColor: isDark ? Colors.white54 : Colors.black54,
          labelStyle: LuxuryTypography.microCaps.copyWith(fontWeight: FontWeight.bold),
          tabs: const [
            Tab(text: 'TERMS OF SERVICE'),
            Tab(text: 'AUCTION RULES'),
            Tab(text: 'RENTAL CHARTER'),
            Tab(text: 'AVIATION & MARINE'),
            Tab(text: '24-HOUR AUDIT POLICY'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildLegalDoc(
            title: 'NP GROUPS GENERAL TERMS OF SERVICE',
            updated: 'March 2026',
            body: '''1. PLATFORM NATURE: NP GROUPS operates as a curated private transaction marketplace connecting accredited buyers, sellers, authorized dealers, rental operators, and auction houses. NP GROUPS does not own consignment assets directly unless explicitly designated.

2. ASSET AUTHENTICITY: All high-value items (including Haute Horlogerie, High Joaillerie, Exotic Automobilia, Superyachts, and Aircraft) undergo multi-tiered curatorial inspection. Physical inspections, title deed verification, and laboratory assays are managed through independent accredited parties (GIA, IGI, Ferrari Classiche, SGS).

3. FINANCIAL INTEGRITY & ESCROW: High-value settlements exceeding standard digital thresholds are processed via licensed custodial escrow institutions in Mumbai, Geneva, Zurich, and Singapore. Direct client transactions are subject to Anti-Money Laundering (AML) and Know-Your-Customer (KYC) statutes.''',
            isDark: isDark,
          ),
          _buildLegalDoc(
            title: 'NP AUCTIONS GOVERNING BYLAWS',
            updated: 'March 2026',
            body: '''1. BINDING BIDS: Every bid placed on NP AUCTIONS constitutes an irrevocable, legally binding offer to purchase the designated lot at the bid price plus applicable Buyer's Premium (12.5% standard, 0% for NP BLACK members).

2. RESERVE PRICES: Lots may be subject to a confidential reserve price agreed between the seller and the Curatorial Auction Committee. If bidding fails to reach the reserve, the lot is closed as unsold.

3. SETTLEMENT & TITLE TRANSFER: Successful bidders must remit the balance within 7 business days into the designated Curatorial Escrow account. Title deeds and physical asset custody are transferred upon confirmed settlement.''',
            isDark: isDark,
          ),
          _buildLegalDoc(
            title: 'NP LUXE DRIVE MASTER RENTAL AGREEMENT',
            updated: 'March 2026',
            body: '''1. ELIGIBILITY: Hirers must be at least 25 years of age with a valid domestic or international driving permit and clean driving history.

2. SECURITY DEPOSIT & PRE-AUTHORIZATION: A mandatory security deposit hold is placed on the hirer's payment card prior to vehicle dispatch. Deposits are released in full within 48 hours of inspection upon return.

3. INSURANCE & CHAUFFEUR PROTOCOL: All fleet vehicles are protected under Super Comprehensive Luxury Insurance. For chauffeur-driven reservations, the designated operative assumes full navigational responsibility under VIP security standards.''',
            isDark: isDark,
          ),
          _buildLegalDoc(
            title: 'AVIATION, MARINE & STRATEGIC DISCLOSURES',
            updated: 'March 2026',
            body: '''1. AIRCRAFT OPERATION & COMPLIANCE: Aircraft listings are presented for transaction facilitation. Operational flights are conducted exclusively by licensed Air Operator Certificate (AOC) holders conforming to DGCA, FAA, or EASA standards. NP GROUPS does not operate flights directly.

2. YACHT CHARTER: All marine charter contracts are governed by standard Mediterranean Yacht Brokers Association (MYBA) or American Yacht Charter Association (AYCA) terms with APA (Advance Provisioning Allowance) accounting.

3. STRATEGIC MINERALS & METALS: Trade in critical minerals (rare earths, battery-grade materials) complies strictly with international trade protocols, Conflict-Free Mineral sourcing, and relevant customs export documentation.''',
            isDark: isDark,
          ),
          _buildLegalDoc(
            title: '24-HOUR CURATORIAL AUDIT POLICY',
            updated: 'March 2026',
            body: '''1. INTEGRITY GUARANTEE: To prevent fraudulent consignments and maintain the prestige of NP GROUPS, every new seller registration and high-value asset listing is placed into a mandatory 24-Hour Curatorial Audit queue.

2. VETTING SCOPE: The Curatorial Committee reviews government identification, company incorporation documents, asset title deeds, serial number registry, GIA/IGI diamond certificates, and high-resolution media.

3. PROVISIONAL ACCESS: Users may explore the public collection and initiate inquiries while their accreditation dossier is under active review.''',
            isDark: isDark,
          ),
        ],
      ),
    );
  }

  Widget _buildLegalDoc({
    required String title,
    required String updated,
    required String body,
    required bool isDark,
  }) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(22),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
          ),
          const SizedBox(height: 4),
          Text(
            'Governing Edition: $updated  •  NP GROUPS S.A. Curatorial Council',
            style: const TextStyle(fontSize: 11, color: LuxuryColors.champagne),
          ),
          const Divider(height: 24),
          Text(
            body,
            style: TextStyle(
              fontSize: 13,
              height: 1.6,
              color: isDark ? Colors.white70 : Colors.black87,
            ),
          ),
        ],
      ),
    );
  }
}
