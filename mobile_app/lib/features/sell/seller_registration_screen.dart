import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_text_field.dart';
import '../../models/seller.dart';
import '../../providers/seller_provider.dart';

class SellerRegistrationScreen extends ConsumerStatefulWidget {
  const SellerRegistrationScreen({super.key});

  @override
  ConsumerState<SellerRegistrationScreen> createState() => _SellerRegistrationScreenState();
}

class _SellerRegistrationScreenState extends ConsumerState<SellerRegistrationScreen> {
  int _currentStep = 0; // 0 to 5 (6 steps)

  // Step 0: Type
  SellerType _selectedType = SellerType.dealer;

  // Step 1: Public Identity
  final _displayNameController = TextEditingController(text: 'Mayfair Rare Jewels');
  final _bioController = TextEditingController(
    text: 'Independent purveyor of GIA-certified colored diamonds, vintage high jewellery, and signed archival pieces.',
  );
  final _countryController = TextEditingController(text: 'United Kingdom');
  final _cityController = TextEditingController(text: 'London');
  final _websiteController = TextEditingController(text: 'https://mayfairrarejewels.co.uk');
  final _yearsExpController = TextEditingController(text: '18');

  // Step 2: Contact
  final _emailController = TextEditingController(text: 'concierge@mayfairrarejewels.co.uk');
  final _phoneController = TextEditingController(text: '+44 20 7946 0192');
  final _whatsappController = TextEditingController(text: '+44 77 0090 0812');
  String _preferredContact = 'whatsapp';

  // Step 3: Type-specific credentials
  final _legalNameController = TextEditingController(text: 'Mayfair Rare Jewels Ltd');
  final _regNumberController = TextEditingController(text: 'UK-COMP-08492019');
  final _taxNumberController = TextEditingController(text: 'GB-VAT-98234120');
  final _agencyNameController = TextEditingController(text: 'Mayfair Global Brokerage');
  final _brokerLicenseController = TextEditingController(text: 'FCA-UK-91823');
  final _auctionLicenseController = TextEditingController(text: 'AUC-LON-2024-01');
  final _buyerPremiumController = TextEditingController(text: '18.0');
  bool _hasOwnerRepresentationAuth = true;

  // Step 4: Verification Documents (Simulated Cloudflare R2 Direct Upload)
  final List<String> _uploadedDocs = [
    'Incorporation_Certificate_UK.pdf',
    'GIA_Alumni_Member_ID.pdf',
  ];
  bool _isUploadingDoc = false;

  bool _isSubmitting = false;

  final List<String> _stepTitles = [
    'Account Classification',
    'Salon Identity',
    'Concierge Channels',
    'Accreditation Credentials',
    'Due Diligence Verification',
    'Curatorial Submission',
  ];

  @override
  void dispose() {
    _displayNameController.dispose();
    _bioController.dispose();
    _countryController.dispose();
    _cityController.dispose();
    _websiteController.dispose();
    _yearsExpController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _whatsappController.dispose();
    _legalNameController.dispose();
    _regNumberController.dispose();
    _taxNumberController.dispose();
    _agencyNameController.dispose();
    _brokerLicenseController.dispose();
    _auctionLicenseController.dispose();
    _buyerPremiumController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < 5) {
      setState(() => _currentStep++);
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  Future<void> _submitRegistration() async {
    setState(() => _isSubmitting = true);

    BusinessProfile? bizProfile;
    BrokerProfile? brkProfile;
    AuctionHouseProfile? aucProfile;

    if (_selectedType == SellerType.dealer ||
        _selectedType == SellerType.jewelleryDealer ||
        _selectedType == SellerType.watchDealer ||
        _selectedType == SellerType.carDealer) {
      bizProfile = BusinessProfile(
        id: 'biz-${DateTime.now().millisecondsSinceEpoch}',
        sellerId: 'temp',
        legalName: _legalNameController.text,
        tradingName: _displayNameController.text,
        businessType: _selectedType.label,
        registrationCountry: _countryController.text,
        registrationNumber: _regNumberController.text,
        taxNumber: _taxNumberController.text,
        website: _websiteController.text,
        businessEmail: _emailController.text,
        businessPhone: _phoneController.text,
        businessAddress: '${_cityController.text}, ${_countryController.text}',
        yearEstablished: DateTime.now().year - (int.tryParse(_yearsExpController.text) ?? 10),
      );
    } else if (_selectedType == SellerType.broker || _selectedType == SellerType.yachtBroker) {
      brkProfile = BrokerProfile(
        id: 'brk-${DateTime.now().millisecondsSinceEpoch}',
        sellerId: 'temp',
        agencyName: _agencyNameController.text,
        specialization: _selectedType.label,
        yearsExperience: int.tryParse(_yearsExpController.text) ?? 10,
        hasOwnerRepresentationAuthorization: _hasOwnerRepresentationAuth,
        authorizationRef: _brokerLicenseController.text,
      );
    } else if (_selectedType == SellerType.auctionHouse) {
      aucProfile = AuctionHouseProfile(
        id: 'auc-${DateTime.now().millisecondsSinceEpoch}',
        sellerId: 'temp',
        legalName: _legalNameController.text,
        displayName: _displayNameController.text,
        licenseNumber: _auctionLicenseController.text,
        buyerPremiumPercentage: double.tryParse(_buyerPremiumController.text) ?? 15.0,
      );
    }

    await ref.read(sellerProvider.notifier).registerSeller(
      sellerType: _selectedType,
      displayName: _displayNameController.text,
      legalName: _legalNameController.text,
      bio: _bioController.text,
      country: _countryController.text,
      city: _cityController.text,
      email: _emailController.text,
      phone: _phoneController.text,
      whatsapp: _whatsappController.text,
      website: _websiteController.text,
      yearsExperience: int.tryParse(_yearsExpController.text) ?? 5,
      categoriesSold: [_selectedType.label],
      businessProfile: bizProfile,
      brokerProfile: brkProfile,
      auctionHouseProfile: aucProfile,
    );

    setState(() => _isSubmitting = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Seller Profile submitted for Curatorial Verification.'),
          backgroundColor: LuxuryColors.deepForestGreen,
        ),
      );
      context.go('/sell');
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'ACCREDIT SALON',
        showBack: true,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Bar & Step Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                border: Border(
                  bottom: BorderSide(
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  ),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'STEP ${_currentStep + 1} OF 6',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        _stepTitles[_currentStep].toUpperCase(),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.mutedGrey,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(2),
                    child: LinearProgressIndicator(
                      value: (_currentStep + 1) / 6,
                      backgroundColor: isDark ? LuxuryColors.charcoal : LuxuryColors.borderLight,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                      ),
                      minHeight: 3,
                    ),
                  ),
                ],
              ),
            ),

            // Step Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: _buildStepContent(),
              ),
            ),

            // Navigation Bar
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
                border: Border(
                  top: BorderSide(
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  ),
                ),
              ),
              child: Row(
                children: [
                  if (_currentStep > 0) ...[
                    Expanded(
                      flex: 1,
                      child: LuxuryButton(
                        text: 'BACK',
                        variant: LuxuryButtonVariant.outline,
                        onPressed: _prevStep,
                      ),
                    ),
                    const SizedBox(width: 12),
                  ],
                  Expanded(
                    flex: 2,
                    child: LuxuryButton(
                      text: _currentStep == 5
                          ? (_isSubmitting ? 'ACCREDITING...' : 'SUBMIT APPLICATION')
                          : 'PROCEED',
                      variant: _currentStep == 5 ? LuxuryButtonVariant.gold : LuxuryButtonVariant.primary,
                      isLoading: _isSubmitting,
                      onPressed: () {
                        if (_currentStep == 5) {
                          _submitRegistration();
                        } else {
                          _nextStep();
                        }
                      },
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

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildStep0TypeSelection();
      case 1:
        return _buildStep1Identity();
      case 2:
        return _buildStep2Contact();
      case 3:
        return _buildStep3Credentials();
      case 4:
        return _buildStep4Documents();
      case 5:
        return _buildStep5Review();
      default:
        return const SizedBox.shrink();
    }
  }

  // Step 0: Account Type
  Widget _buildStep0TypeSelection() {
    final types = [
      (
        SellerType.dealer,
        'BOUTIQUE DEALER / RETAILER',
        'Official showroom, established boutique, or curated gallery with private inventory.',
        Icons.store_mall_directory_outlined,
      ),
      (
        SellerType.broker,
        'LUXURY BROKER / AGENT',
        'Licensed intermediary acting with verified owner representation authorization agreements.',
        Icons.handshake_outlined,
      ),
      (
        SellerType.auctionHouse,
        'ACCREDITED AUCTION HOUSE',
        'Regulated auctioneer conducting catalogued sales, public previews, and private treaties.',
        Icons.gavel_outlined,
      ),
      (
        SellerType.jewelleryDealer,
        'HIGH JOAILLERIE VAULT',
        'Specialist in exceptional natural colored diamonds, rare gems, and signed historical jewellery.',
        Icons.diamond_outlined,
      ),
      (
        SellerType.yachtBroker,
        'YACHT & MARINE BROKERAGE',
        'MYBA/IYBA certified maritime broker with charter and superyacht sale authorization.',
        Icons.directions_boat_outlined,
      ),
      (
        SellerType.carDealer,
        'EXOTIC & HYPERCAR GALLERY',
        'Licensed dealer in homologation specials, historic motorsport, and bespoke coachbuilt icons.',
        Icons.directions_car_outlined,
      ),
      (
        SellerType.individual,
        'PRIVATE COLLECTOR',
        'Private individual offering personal vault holdings with proven chain of title.',
        Icons.person_pin_outlined,
      ),
    ];

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'SELECT YOUR CURATORIAL ROLE',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'Maison Du Luxe maintains stringent accreditation tiers to protect global clients and protect the provenance of all consigned assets.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        ...types.map((item) {
          final isSelected = _selectedType == item.$1;
          return GestureDetector(
            onTap: () => setState(() => _selectedType = item.$1),
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isSelected
                    ? (isDark ? LuxuryColors.champagne.withOpacity(0.12) : LuxuryColors.champagneLight)
                    : (isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite),
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: isSelected
                      ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                      : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                  width: isSelected ? 1.6 : 1.0,
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    item.$4,
                    color: isSelected
                        ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                        : LuxuryColors.mutedGrey,
                    size: 28,
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item.$2,
                          style: LuxuryTypography.editorialHeading3.copyWith(
                            fontSize: 14,
                            color: isSelected
                                ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                                : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          item.$3,
                          style: LuxuryTypography.bodySmall.copyWith(
                            color: LuxuryColors.mutedGrey,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (isSelected)
                    Icon(
                      Icons.check_circle,
                      color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                      size: 20,
                    ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  // Step 1: Public Identity
  Widget _buildStep1Identity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'SALON IDENTITY & STORY',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'This public identity will be presented to VIP collectors and buyers on asset detail dossiers.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        LuxuryTextField(
          label: 'DISPLAY NAME / SALON TITLE',
          controller: _displayNameController,
          hintText: 'e.g. Geneva Horology Vaults',
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          label: 'EDITORIAL BIOGRAPHY / HERITAGE',
          controller: _bioController,
          hintText: 'Describe your provenance, specialty, and heritage...',
          maxLines: 4,
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: LuxuryTextField(
                label: 'COUNTRY',
                controller: _countryController,
                hintText: 'e.g. Monaco',
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: LuxuryTextField(
                label: 'CITY',
                controller: _cityController,
                hintText: 'e.g. Monte-Carlo',
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: LuxuryTextField(
                label: 'YEARS OF HERITAGE / EXP',
                controller: _yearsExpController,
                hintText: 'e.g. 25',
                keyboardType: TextInputType.number,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: LuxuryTextField(
                label: 'OFFICIAL DOMAIN / WEB',
                controller: _websiteController,
                hintText: 'https://...',
                keyboardType: TextInputType.url,
              ),
            ),
          ],
        ),
      ],
    );
  }

  // Step 2: Contact Channels
  Widget _buildStep2Contact() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'VIP CONCIERGE CHANNELS',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'Client communications are routed through direct unlock fees (€150+). Provide your verified direct channels.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        LuxuryTextField(
          label: 'DIRECT CURATORIAL EMAIL',
          controller: _emailController,
          hintText: 'curator@domain.com',
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          label: 'DIRECT TELEPHONE (WITH COUNTRY CODE)',
          controller: _phoneController,
          hintText: '+44 ...',
          keyboardType: TextInputType.phone,
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          label: 'VIP WHATSAPP CONCIERGE',
          controller: _whatsappController,
          hintText: '+44 ...',
          keyboardType: TextInputType.phone,
        ),
        const SizedBox(height: 20),
        Text(
          'PREFERRED CLIENT CHANNEL',
          style: LuxuryTypography.microCaps.copyWith(
            fontWeight: FontWeight.w700,
            fontSize: 10,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            _buildChannelRadio('whatsapp', 'VIP WhatsApp', Icons.chat),
            const SizedBox(width: 12),
            _buildChannelRadio('phone', 'Direct Call', Icons.phone),
            const SizedBox(width: 12),
            _buildChannelRadio('email', 'Email Dossier', Icons.email_outlined),
          ],
        ),
      ],
    );
  }

  Widget _buildChannelRadio(String value, String label, IconData icon) {
    final isSelected = _preferredContact == value;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Expanded(
      child: InkWell(
        onTap: () => setState(() => _preferredContact = value),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? (isDark ? LuxuryColors.champagne.withOpacity(0.15) : LuxuryColors.champagneLight)
                : (isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite),
            borderRadius: BorderRadius.circular(4),
            border: Border.all(
              color: isSelected
                  ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                  : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            ),
          ),
          child: Column(
            children: [
              Icon(
                icon,
                size: 20,
                color: isSelected
                    ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                    : LuxuryColors.mutedGrey,
              ),
              const SizedBox(height: 6),
              Text(
                label,
                style: LuxuryTypography.bodySmall.copyWith(
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.normal,
                  color: isSelected
                      ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                      : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
                  fontSize: 10.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Step 3: Type-specific credentials
  Widget _buildStep3Credentials() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'ACCREDITATION CREDENTIALS',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'Private legal entities and brokers must establish valid regulatory registration.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        if (_selectedType == SellerType.dealer ||
            _selectedType == SellerType.jewelleryDealer ||
            _selectedType == SellerType.watchDealer ||
            _selectedType == SellerType.carDealer) ...[
          LuxuryTextField(
            label: 'LEGAL REGISTERED COMPANY NAME',
            controller: _legalNameController,
            hintText: 'e.g. Mayfair Gemological Partners Ltd',
          ),
          const SizedBox(height: 16),
          LuxuryTextField(
            label: 'COMMERCIAL REGISTRY NUMBER / CIF',
            controller: _regNumberController,
            hintText: 'Official registration number',
          ),
          const SizedBox(height: 16),
          LuxuryTextField(
            label: 'TAX IDENTIFICATION / VAT NUMBER',
            controller: _taxNumberController,
            hintText: 'EU / UK / US Tax ID',
          ),
        ] else if (_selectedType == SellerType.broker || _selectedType == SellerType.yachtBroker) ...[
          LuxuryTextField(
            label: 'BROKERAGE AGENCY / HOUSE',
            controller: _agencyNameController,
            hintText: 'e.g. Monaco Marine Agency',
          ),
          const SizedBox(height: 16),
          LuxuryTextField(
            label: 'BROKER LICENSE / PROFESSIONAL REGISTRATION',
            controller: _brokerLicenseController,
            hintText: 'e.g. MYBA-2026-MC-04',
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              ),
            ),
            child: Row(
              children: [
                Checkbox(
                  value: _hasOwnerRepresentationAuth,
                  activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                  onChanged: (v) => setState(() => _hasOwnerRepresentationAuth = v ?? false),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'I hold active, legally binding Owner Representation Authorization agreements for all assets consigned.',
                    style: LuxuryTypography.bodySmall.copyWith(fontSize: 11.5),
                  ),
                ),
              ],
            ),
          ),
        ] else if (_selectedType == SellerType.auctionHouse) ...[
          LuxuryTextField(
            label: 'AUCTIONEER ENTITY NAME',
            controller: _legalNameController,
            hintText: 'e.g. Phillips & Sons Curators S.A.',
          ),
          const SizedBox(height: 16),
          LuxuryTextField(
            label: 'AUCTION HOUSE LICENSE',
            controller: _auctionLicenseController,
            hintText: 'Accreditation reference',
          ),
          const SizedBox(height: 16),
          LuxuryTextField(
            label: 'STANDARD BUYER PREMIUM (%)',
            controller: _buyerPremiumController,
            hintText: '15.0',
            keyboardType: TextInputType.number,
          ),
        ] else ...[
          LuxuryTextField(
            label: 'GOVERNMENT ID / PASSPORT REFERENCE',
            controller: _regNumberController,
            hintText: 'Passport or National Identity ID',
          ),
        ],
      ],
    );
  }

  // Step 4: Due Diligence Documents
  Widget _buildStep4Documents() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'DUE DILIGENCE VERIFICATION',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'Documents are encrypted and stored in private Cloudflare R2 vaults. They are strictly reviewed by curators and never exposed publicly.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        ..._uploadedDocs.map((doc) {
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              ),
            ),
            child: Row(
              children: [
                Icon(
                  Icons.verified_user_outlined,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                  size: 24,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        doc,
                        style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Cloudflare R2 Signed • Encrypted AES-256',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.mutedGrey,
                          fontSize: 8.5,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, size: 18, color: LuxuryColors.mutedGrey),
                  onPressed: () {
                    setState(() => _uploadedDocs.remove(doc));
                  },
                ),
              ],
            ),
          );
        }),
        const SizedBox(height: 12),
        InkWell(
          onTap: () async {
            setState(() => _isUploadingDoc = true);
            await Future.delayed(const Duration(milliseconds: 700));
            setState(() {
              _uploadedDocs.add('Proof_Of_Representation_${DateTime.now().millisecondsSinceEpoch % 1000}.pdf');
              _isUploadingDoc = false;
            });
          },
          child: Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard.withOpacity(0.5) : const Color(0xFFFAF9F6),
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: isDark ? LuxuryColors.champagne.withOpacity(0.4) : LuxuryColors.deepForestGreen.withOpacity(0.4),
                style: BorderStyle.solid,
              ),
            ),
            child: Center(
              child: _isUploadingDoc
                  ? const CircularProgressIndicator(color: LuxuryColors.champagne)
                  : Column(
                      children: [
                        Icon(
                          Icons.cloud_upload_outlined,
                          size: 36,
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'UPLOAD ENCRYPTED DOSSIER (PDF / TIFF)',
                          style: LuxuryTypography.microCaps.copyWith(
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.1,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Upload Chamber of Commerce extract, passport, or broker representation mandate',
                          textAlign: TextAlign.center,
                          style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey, fontSize: 10.5),
                        ),
                      ],
                    ),
            ),
          ),
        ),
      ],
    );
  }

  // Step 5: Curatorial Submission Review
  Widget _buildStep5Review() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'CURATORIAL PREVIEW',
          style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 22),
        ),
        const SizedBox(height: 8),
        Text(
          'Please verify your salon accreditation credentials before dispatching to the curatorial board.',
          style: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    _selectedType.label.toUpperCase(),
                    style: LuxuryTypography.microCaps.copyWith(
                      color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const LuxuryBadge(
                    label: 'INITIAL TIER 1',
                    textColor: LuxuryColors.champagne,
                    borderColor: LuxuryColors.champagne,
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                _displayNameController.text,
                style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 20),
              ),
              const SizedBox(height: 4),
              Text(
                '${_cityController.text}, ${_countryController.text}',
                style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
              ),
              const SizedBox(height: 12),
              Text(
                _bioController.text,
                style: LuxuryTypography.bodySmall.copyWith(height: 1.5),
              ),
              const Divider(height: 28),
              _buildReviewRow('Concierge Email', _emailController.text),
              _buildReviewRow('Telephone', _phoneController.text),
              _buildReviewRow('WhatsApp Channel', _whatsappController.text),
              _buildReviewRow('Years Heritage', '${_yearsExpController.text} Years'),
              _buildReviewRow('Documents Submitted', '${_uploadedDocs.length} Encrypted Dossiers'),
            ],
          ),
        ),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.pureBlack : LuxuryColors.champagneLight.withOpacity(0.5),
            border: Border.all(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
            ),
            borderRadius: BorderRadius.circular(4),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                Icons.shield_outlined,
                size: 20,
                color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Once submitted, your salon will receive Tier 1 status instantly, enabling asset drafting. Full public publishing of ultra-high value listings (€100k+) activates upon Tier 2 curator review within 24 hours.',
                  style: LuxuryTypography.bodySmall.copyWith(fontSize: 11, height: 1.4),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildReviewRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
          Text(value, style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}
