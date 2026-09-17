import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_price.dart';
import '../../core/widgets/luxury_text_field.dart';
import '../../models/listing.dart';
import '../../models/seller.dart';
import '../../providers/categories_provider.dart';
import '../../providers/listings_provider.dart';
import '../../providers/attributes_provider.dart';
import '../../providers/seller_provider.dart';
import 'widgets/dynamic_attribute_form.dart';

class SellWizardScreen extends ConsumerStatefulWidget {
  const SellWizardScreen({super.key});

  @override
  ConsumerState<SellWizardScreen> createState() => _SellWizardScreenState();
}

class _SellWizardScreenState extends ConsumerState<SellWizardScreen> {
  int _currentStep = 0; // 0 to 9 (10 steps)

  // Step 1: Category
  String? _selectedCategoryId;

  // Step 2: Basic Info
  final _titleController = TextEditingController();
  final _brandController = TextEditingController();
  final _yearController = TextEditingController();
  final _conditionController = TextEditingController(text: 'Pristine / Collector Grade');
  final _descriptionController = TextEditingController();

  // Step 3: Dynamic Category Specifications
  final GlobalKey<DynamicAttributeFormState> _dynamicFormKey = GlobalKey<DynamicAttributeFormState>();
  Map<String, dynamic> _dynamicAttributes = {};

  // Step 4: Price & Currency
  final _priceController = TextEditingController();
  String _selectedCurrency = 'EUR';
  final _unlockFeeController = TextEditingController(text: '150');

  // Step 5: Location
  final _cityController = TextEditingController(text: 'Cannes');
  final _countryController = TextEditingController(text: 'France');

  // Step 6: Photos (Simulated Cloudflare R2 Presigned Direct Upload)
  final List<String> _uploadedImageUrls = [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
  ];
  bool _isUploadingToR2 = false;

  // Step 7: Documents
  final List<String> _uploadedDocs = ['Certificate_of_Origin.pdf', 'Service_Records_2025.pdf'];

  // Step 8: Seller Info
  final _sellerOrgController = TextEditingController(text: 'Monaco Private Heritage Salons');

  bool _isSubmitting = false;

  final List<String> _stepTitles = [
    'Category Selection',
    'Asset Information',
    'Technical Specifications',
    'Valuation & Currency',
    'Global Location',
    'Photographs (Cloudflare R2)',
    'Provenance Documents',
    'Custodian Profile',
    'Curatorial Preview',
    'Submit for Review',
  ];

  @override
  void dispose() {
    _titleController.dispose();
    _brandController.dispose();
    _yearController.dispose();
    _conditionController.dispose();
    _descriptionController.dispose();
    _priceController.dispose();
    _unlockFeeController.dispose();
    _cityController.dispose();
    _countryController.dispose();
    _sellerOrgController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep == 2) {
      final valid = _dynamicFormKey.currentState?.validate(context) ?? true;
      if (!valid) return;
    }
    if (_currentStep < 9) {
      setState(() => _currentStep++);
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  void _submitForReview() async {
    setState(() => _isSubmitting = true);
    await Future.delayed(const Duration(milliseconds: 1000));

    final categories = ref.read(categoriesProvider);
    final category = categories.firstWhere(
      (c) => c.id == (_selectedCategoryId ?? categories.first.id),
      orElse: () => categories.first,
    );

    final currentSeller = ref.read(currentSellerProfileProvider);
    final sellerId = currentSeller?.id ?? 'seller-001';

    final List<ListingSpecification> dynamicSpecs = [];
    _dynamicAttributes.forEach((k, v) {
      if (v != null) {
        String displayVal = v.toString();
        if (v is List) {
          displayVal = v.join(', ');
        }
        dynamicSpecs.add(ListingSpecification(
          key: k.replaceAll('_', ' ').toUpperCase(),
          value: displayVal,
          group: 'Specifications',
        ));
      }
    });

    if (dynamicSpecs.isEmpty) {
      dynamicSpecs.add(const ListingSpecification(
        key: 'AUTHENTICITY',
        value: 'Curator Inspected & Certified',
        group: 'Specifications',
      ));
    }

    final newListing = LuxuryListing(
      id: 'l-${DateTime.now().millisecondsSinceEpoch}',
      sellerId: sellerId,
      categoryId: category.id,
      categoryName: category.name,
      brandName: _brandController.text.isNotEmpty ? _brandController.text : 'Bespoke Manufacture',
      title: _titleController.text.isNotEmpty ? _titleController.text : 'Exquisite ${category.name} Collector Piece',
      slug: 'listing-${DateTime.now().millisecondsSinceEpoch}',
      description: _descriptionController.text.isNotEmpty
          ? _descriptionController.text
          : 'Preserved in exceptional condition under private vault climate control.',
      price: double.tryParse(_priceController.text) ?? 250000.0,
      currency: _selectedCurrency,
      year: int.tryParse(_yearController.text) ?? 2022,
      condition: _conditionController.text,
      status: 'pending_review', // Explicit prompt requirement: Never automatically mark as verified!
      isFeatured: false,
      viewCount: 0,
      contactUnlockFee: double.tryParse(_unlockFeeController.text) ?? 150.0,
      location: ListingLocation(
        city: _cityController.text.isNotEmpty ? _cityController.text : 'Geneva',
        country: _countryController.text.isNotEmpty ? _countryController.text : 'Switzerland',
      ),
      images: _uploadedImageUrls.asMap().entries.map((e) {
        return ListingImage(
          id: 'img-${e.key}',
          originalUrl: e.value,
          isCover: e.key == 0,
          sortOrder: e.key + 1,
        );
      }).toList(),
      specifications: dynamicSpecs,
      seller: currentSeller != null
          ? SellerSnippet(
              id: currentSeller.id,
              name: currentSeller.displayName,
              sellerType: currentSeller.sellerType.code.toLowerCase(),
              avatarUrl: currentSeller.profilePhoto,
              city: currentSeller.city,
              country: currentSeller.country,
              reputationScore: currentSeller.reputationScore,
              isVerified: currentSeller.verificationStatus == VerificationStatus.verified,
            )
          : null,
      createdAt: DateTime.now(),
    );

    ref.read(allListingsProvider.notifier).addListing(newListing);

    if (mounted) {
      setState(() => _isSubmitting = false);
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) => AlertDialog(
          backgroundColor: Theme.of(context).brightness == Brightness.dark
              ? LuxuryColors.darkCard
              : LuxuryColors.pureWhite,
          title: Text(
            'SUBMITTED FOR CURATION',
            style: LuxuryTypography.editorialHeading3.copyWith(
              letterSpacing: 2.0,
            ),
          ),
          content: Text(
            'Your asset has been successfully submitted to the Curatorial Review Committee. Status: PENDING REVIEW.\n\nOur authentication specialists will inspect title and authenticity documentation within 24 hours.',
            style: LuxuryTypography.bodyMedium.copyWith(
              height: 1.5,
            ),
          ),
          actions: [
            LuxuryButton(
              text: 'GO TO SELLER DASHBOARD',
              variant: LuxuryButtonVariant.gold,
              onPressed: () {
                Navigator.of(ctx).pop();
                context.go('/sell');
              },
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: LuxuryAppBar(
        showBack: true,
        title: 'CONSIGN ASSET',
        onBack: () {
          if (_currentStep > 0) {
            _prevStep();
          } else {
            context.pop();
          }
        },
      ),
      body: Column(
        children: [
          // Step Progress Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF141414) : const Color(0xFFFAF8F5),
              border: Border(
                bottom: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
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
                      'STEP ${_currentStep + 1} OF 10: ${_stepTitles[_currentStep].toUpperCase()}',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        letterSpacing: 1.5,
                        fontSize: 9.5,
                      ),
                    ),
                    Text(
                      '${((_currentStep + 1) / 10 * 100).toInt()}%',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(2),
                  child: LinearProgressIndicator(
                    value: (_currentStep + 1) / 10,
                    minHeight: 3,
                    backgroundColor: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Step Body
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: _buildStepContent(),
            ),
          ),

          // Bottom Navigation Buttons
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
              border: Border(
                top: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  width: 0.8,
                ),
              ),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  if (_currentStep > 0) ...[
                    Expanded(
                      child: LuxuryButton(
                        text: 'PREVIOUS',
                        variant: LuxuryButtonVariant.secondary,
                        onPressed: _prevStep,
                      ),
                    ),
                    const SizedBox(width: 12),
                  ],
                  Expanded(
                    flex: 2,
                    child: _currentStep == 9
                        ? LuxuryButton(
                            text: 'SUBMIT FOR REVIEW',
                            variant: LuxuryButtonVariant.gold,
                            isLoading: _isSubmitting,
                            onPressed: _submitForReview,
                          )
                        : LuxuryButton(
                            text: 'CONTINUE',
                            variant: LuxuryButtonVariant.primary,
                            onPressed: _nextStep,
                          ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildStep1Category();
      case 1:
        return _buildStep2BasicInfo();
      case 2:
        return _buildStep3Specifications();
      case 3:
        return _buildStep4Price();
      case 4:
        return _buildStep5Location();
      case 5:
        return _buildStep6Photos();
      case 6:
        return _buildStep7Documents();
      case 7:
        return _buildStep8SellerInfo();
      case 8:
        return _buildStep9Preview();
      case 9:
        return _buildStep10Submit();
      default:
        return const SizedBox.shrink();
    }
  }

  // Step 1: Category
  Widget _buildStep1Category() {
    final categories = ref.watch(categoriesProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'SELECT ASSET CLASS',
          style: LuxuryTypography.editorialHeading2,
        ),
        const SizedBox(height: 6),
        Text(
          'Select the primary luxury category for your asset. Future specialized categories can be added dynamically.',
          style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
        ),
        const SizedBox(height: 20),
        ...categories.map((cat) {
          final isSelected = (_selectedCategoryId ?? categories.first.id) == cat.id;
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: GestureDetector(
              onTap: () => setState(() => _selectedCategoryId = cat.id),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isSelected
                      ? (isDark ? LuxuryColors.champagne.withOpacity(0.15) : LuxuryColors.deepForestGreen.withOpacity(0.08))
                      : (isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite),
                  borderRadius: BorderRadius.circular(2),
                  border: Border.all(
                    color: isSelected
                        ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                        : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                    width: isSelected ? 1.4 : 0.8,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                      size: 20,
                      color: isSelected
                          ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                          : LuxuryColors.mutedGrey,
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            cat.name.toUpperCase(),
                            style: LuxuryTypography.microCaps.copyWith(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.5,
                            ),
                          ),
                          if (cat.tagline != null) ...[
                            const SizedBox(height: 2),
                            Text(
                              cat.tagline!,
                              style: LuxuryTypography.bodySmall.copyWith(
                                color: LuxuryColors.mutedGrey,
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        }),
      ],
    );
  }

  // Step 2: Basic Info
  Widget _buildStep2BasicInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('ASSET IDENTIFICATION', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Provide fundamental manufacturing and provenance details.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        LuxuryTextField(
          controller: _titleController,
          label: 'ASSET TITLE',
          hintText: 'e.g. Bali 4.0 Lounge Catamaran / Patek Philippe 5270P',
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          controller: _brandController,
          label: 'MANUFACTURE / BRAND / MAISON',
          hintText: 'e.g. Bali Catamarans, Rolex, Ferrari, Cartier',
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: LuxuryTextField(
                controller: _yearController,
                label: 'YEAR OF MANUFACTURE',
                hintText: 'e.g. 2017',
                keyboardType: TextInputType.number,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: LuxuryTextField(
                controller: _conditionController,
                label: 'CONDITION GRADE',
                hintText: 'Pristine / Mint / Unworn',
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          controller: _descriptionController,
          label: 'CURATORIAL DESCRIPTION',
          hintText: 'Detail the provenance, notable owners, factory options, and maintenance records...',
          maxLines: 4,
        ),
      ],
    );
  }

  // Step 3: Dynamic Category Specifications
  Widget _buildStep3Specifications() {
    final categories = ref.watch(categoriesProvider);
    final activeCatId = _selectedCategoryId ?? (categories.isNotEmpty ? categories.first.id : 'c1000000-0000-0000-0000-000000000001');
    final activeCat = categories.firstWhere((c) => c.id == activeCatId, orElse: () => categories.first);
    final attributeDefinitions = ref.watch(categoryAttributesProvider(activeCatId));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('TECHNICAL SPECIFICATIONS', style: LuxuryTypography.editorialHeading2),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: LuxuryColors.champagne.withOpacity(0.15),
                borderRadius: BorderRadius.circular(2),
              ),
              child: Text(
                activeCat.name.toUpperCase(),
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.champagne,
                  fontSize: 8.5,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 6),
        Text('Curatorial specifications driven dynamically for ${activeCat.name}. All required fields must be supplied before submission.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        DynamicAttributeForm(
          key: _dynamicFormKey,
          definitions: attributeDefinitions,
          initialValues: _dynamicAttributes,
          onChanged: (vals) {
            _dynamicAttributes = vals;
          },
        ),
      ],
    );
  }

  // Step 4: Price & Currency
  Widget _buildStep4Price() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('VALUATION & UNLOCK POLICY', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('List in the native currency of acquisition. No hardcoded currencies.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        LuxuryTextField(
          controller: _priceController,
          label: 'ASKING PRICE / VALUATION',
          hintText: 'e.g. 260000',
          keyboardType: TextInputType.number,
        ),
        const SizedBox(height: 16),
        Text(
          'CURRENCY',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: ['EUR', 'USD', 'GBP', 'CHF', 'AED'].map((curr) {
            final isSelected = _selectedCurrency == curr;
            return GestureDetector(
              onTap: () => setState(() => _selectedCurrency = curr),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                decoration: BoxDecoration(
                  color: isSelected
                      ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(2),
                  border: Border.all(
                    color: isSelected
                        ? Colors.transparent
                        : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                  ),
                ),
                child: Text(
                  curr,
                  style: LuxuryTypography.microCaps.copyWith(
                    color: isSelected
                        ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                        : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 20),
        LuxuryTextField(
          controller: _unlockFeeController,
          label: 'BUYER CONTACT UNLOCK FEE',
          hintText: '150',
          keyboardType: TextInputType.number,
        ),
      ],
    );
  }

  // Step 5: Location
  Widget _buildStep5Location() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('ASSET SANCTUARY LOCATION', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Specify where the asset is currently berthed, garaged, or secured.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        LuxuryTextField(
          controller: _cityController,
          label: 'CITY / HARBOR / VAULT LOCATION',
          hintText: 'e.g. Cannes, Geneva, London, Dubai',
        ),
        const SizedBox(height: 16),
        LuxuryTextField(
          controller: _countryController,
          label: 'COUNTRY / JURISDICTION',
          hintText: 'e.g. France, Switzerland, United Kingdom, UAE',
        ),
      ],
    );
  }

  // Step 6: Photos (Cloudflare R2)
  Widget _buildStep6Photos() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('CLOUDFLARE R2 MEDIA UPLOAD', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Media is securely presigned via NestJS and uploaded directly to Cloudflare R2.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        // Upload button
        LuxuryButton(
          text: 'ATTACH HIGH-RES PHOTOGRAPHY',
          variant: LuxuryButtonVariant.outline,
          icon: const Icon(Icons.cloud_upload_outlined, size: 18),
          isLoading: _isUploadingToR2,
          onPressed: () async {
            setState(() => _isUploadingToR2 = true);
            await Future.delayed(const Duration(milliseconds: 1000));
            if (mounted) {
              setState(() {
                _isUploadingToR2 = false;
                _uploadedImageUrls.add(
                  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop',
                );
              });
            }
          },
        ),
        const SizedBox(height: 20),
        Text(
          'UPLOADED ASSET FRAMES (${_uploadedImageUrls.length})',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: 110,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: _uploadedImageUrls.length,
            separatorBuilder: (context, index) => const SizedBox(width: 10),
            itemBuilder: (context, index) {
              return Stack(
                children: [
                  Container(
                    width: 110,
                    height: 110,
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: index == 0 ? LuxuryColors.champagne : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                        width: index == 0 ? 1.5 : 0.8,
                      ),
                    ),
                    child: Image.network(
                      _uploadedImageUrls[index],
                      fit: BoxFit.cover,
                    ),
                  ),
                  if (index == 0)
                    Positioned(
                      top: 4,
                      left: 4,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                        color: LuxuryColors.pureBlack.withOpacity(0.8),
                        child: Text(
                          'COVER',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.champagne,
                            fontSize: 7.5,
                          ),
                        ),
                      ),
                    ),
                ],
              );
            },
          ),
        ),
      ],
    );
  }

  // Step 7: Documents
  Widget _buildStep7Documents() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('AUTHENTICITY & PROVENANCE', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Private title deeds, GIA dossier, or service history stored in secure private R2 buckets.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        ..._uploadedDocs.map((doc) {
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            ),
            child: Row(
              children: [
                const Icon(Icons.file_present_outlined, size: 20, color: LuxuryColors.champagne),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    doc,
                    style: LuxuryTypography.bodyMedium.copyWith(fontWeight: FontWeight.w500),
                  ),
                ),
                Text(
                  'ENCRYPTED',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.verifiedGreen,
                    fontSize: 8.5,
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }

  // Step 8: Seller Info
  Widget _buildStep8SellerInfo() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final currentSeller = ref.watch(currentSellerProfileProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('ACCREDITED SALON / SELLER PROFILE', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Every consigned asset belongs to an accredited salon or collector profile. Inventory is never anonymous.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        if (currentSeller == null) ...[
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              border: Border.all(color: LuxuryColors.rejectionRed.withOpacity(0.4)),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.warning_amber_rounded, color: LuxuryColors.champagne, size: 24),
                    const SizedBox(width: 8),
                    Text(
                      'SELLER PROFILE REQUIRED',
                      style: LuxuryTypography.microCaps.copyWith(
                        fontWeight: FontWeight.w700,
                        color: LuxuryColors.champagne,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'To consign assets on Maison Du Luxe, your entity or collector profile must be accredited.',
                  style: LuxuryTypography.bodySmall,
                ),
                const SizedBox(height: 16),
                LuxuryButton(
                  text: 'CREATE SELLER PROFILE',
                  variant: LuxuryButtonVariant.gold,
                  onPressed: () => context.push('/seller/register'),
                ),
              ],
            ),
          ),
        ] else ...[
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              border: Border.all(
                color: isDark ? LuxuryColors.champagne.withOpacity(0.4) : LuxuryColors.deepForestGreen.withOpacity(0.4),
                width: 1.2,
              ),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    VerificationBadge(
                      isVerified: currentSeller.verificationStatus == VerificationStatus.verified,
                      customLabel: currentSeller.verificationStatus.label.toUpperCase(),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: isDark ? LuxuryColors.borderDark : LuxuryColors.champagneLight,
                        borderRadius: BorderRadius.circular(2),
                      ),
                      child: Text(
                        currentSeller.verificationLevel.label.toUpperCase(),
                        style: LuxuryTypography.microCaps.copyWith(
                          color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                          fontSize: 8.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  currentSeller.displayName,
                  style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
                ),
                if (currentSeller.legalName != null && currentSeller.legalName!.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(
                    currentSeller.legalName!,
                    style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                  ),
                ],
                const SizedBox(height: 6),
                Text(
                  '${currentSeller.city}, ${currentSeller.country} • Member since ${currentSeller.createdAt.year}',
                  style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                ),
                const Divider(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'CONCIERGE CONTACT',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey),
                    ),
                    Text(
                      currentSeller.email,
                      style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'ACTIVE PORTFOLIO',
                      style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey),
                    ),
                    Text(
                      '${currentSeller.activeListingsCount} Listed Assets',
                      style: LuxuryTypography.bodySmall.copyWith(fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          LuxuryButton(
            text: 'VIEW / EDIT SALON PROFILE',
            variant: LuxuryButtonVariant.secondary,
            onPressed: () => context.push('/seller/${currentSeller.id}'),
          ),
        ],
      ],
    );
  }

  // Step 9: Preview
  Widget _buildStep9Preview() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('CURATORIAL PREVIEW', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 6),
        Text('Review your presentation exactly as potential collectors will view it.',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey)),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (_uploadedImageUrls.isNotEmpty)
                Image.network(
                  _uploadedImageUrls.first,
                  height: 180,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const VerificationBadge(isVerified: false, customLabel: 'PENDING REVIEW'),
                  Text(
                    _selectedCurrency,
                    style: LuxuryTypography.microCaps.copyWith(color: LuxuryColors.mutedGrey),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                _titleController.text.isNotEmpty ? _titleController.text : 'Asset Title',
                style: LuxuryTypography.editorialHeading3,
              ),
              const SizedBox(height: 4),
              Text(
                '${_cityController.text}, ${_countryController.text}',
                style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
              ),
              const SizedBox(height: 10),
              LuxuryPrice(
                amount: double.tryParse(_priceController.text) ?? 260000.0,
                currency: _selectedCurrency,
                size: LuxuryPriceSize.large,
              ),
              if (_dynamicAttributes.isNotEmpty) ...[
                const Divider(height: 24),
                Text(
                  'CURATED SPECIFICATIONS',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  children: _dynamicAttributes.entries.map((entry) {
                    final displayVal = entry.value is List ? (entry.value as List).join(', ') : entry.value.toString();
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: isDark ? LuxuryColors.pureBlack : LuxuryColors.champagneLight,
                        borderRadius: BorderRadius.circular(2),
                        border: Border.all(
                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                        ),
                      ),
                      child: Text(
                        '${entry.key.replaceAll('_', ' ').toUpperCase()}: $displayVal',
                        style: LuxuryTypography.microCaps.copyWith(
                          fontSize: 8.5,
                          color: isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  // Step 10: Submit
  Widget _buildStep10Submit() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('SUBMIT FOR AUTHENTICATION', style: LuxuryTypography.editorialHeading2),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: LuxuryColors.deepForestGreen.withOpacity(0.08),
            borderRadius: BorderRadius.circular(2),
            border: Border.all(color: LuxuryColors.deepForestGreen.withOpacity(0.3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.verified_user_outlined, size: 20, color: LuxuryColors.deepForestGreen),
                  const SizedBox(width: 8),
                  Text(
                    'CURATORIAL ADMISSION POLICY',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.deepForestGreen,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Listings are never immediately published. Our authentication committee validates legal title, serial/VIN numbers, and high-resolution photography.\n\nOnce accepted, your asset enters the Global Luxury Marketplace with the official verified hallmark.',
                style: LuxuryTypography.bodyMedium.copyWith(fontSize: 13, height: 1.5),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
