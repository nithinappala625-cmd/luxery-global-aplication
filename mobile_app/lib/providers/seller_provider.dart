import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../models/seller.dart';

class SellerState {
  final SellerProfile? currentSeller;
  final List<SellerProfile> allSellers;
  final bool isLoading;
  final String? errorMessage;

  const SellerState({
    this.currentSeller,
    this.allSellers = const [],
    this.isLoading = false,
    this.errorMessage,
  });

  SellerState copyWith({
    SellerProfile? currentSeller,
    List<SellerProfile>? allSellers,
    bool? isLoading,
    String? errorMessage,
    bool clearCurrentSeller = false,
  }) {
    return SellerState(
      currentSeller: clearCurrentSeller ? null : (currentSeller ?? this.currentSeller),
      allSellers: allSellers ?? this.allSellers,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage,
    );
  }
}

class SellerNotifier extends StateNotifier<SellerState> {
  SellerNotifier() : super(SellerState(
    currentSeller: _mockCurrentSeller,
    allSellers: _initialSellers,
  ));

  static const _uuid = Uuid();

  // Register or update current seller
  Future<void> registerSeller({
    required SellerType sellerType,
    required String displayName,
    String? legalName,
    String? profilePhoto,
    String? bio,
    required String country,
    String? stateProvince,
    required String city,
    required String email,
    String? phone,
    String? whatsapp,
    String? website,
    int yearsExperience = 0,
    List<String> categoriesSold = const [],
    BusinessProfile? businessProfile,
    BrokerProfile? brokerProfile,
    AuctionHouseProfile? auctionHouseProfile,
  }) async {
    state = state.copyWith(isLoading: true);
    await Future.delayed(const Duration(milliseconds: 600));

    final newProfile = SellerProfile(
      id: _uuid.v4(),
      userId: 'user-auth-current',
      sellerType: sellerType,
      displayName: displayName,
      legalName: legalName,
      profilePhoto: profilePhoto ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      bio: bio,
      country: country,
      stateProvince: stateProvince,
      city: city,
      email: email,
      phone: phone,
      whatsapp: whatsapp,
      website: website,
      yearsExperience: yearsExperience,
      categoriesSold: categoriesSold,
      verificationStatus: VerificationStatus.pending,
      verificationLevel: VerificationLevel.level1,
      businessProfile: businessProfile,
      brokerProfile: brokerProfile,
      auctionHouseProfile: auctionHouseProfile,
      createdAt: DateTime.now(),
    );

    state = state.copyWith(
      currentSeller: newProfile,
      allSellers: [...state.allSellers, newProfile],
      isLoading: false,
    );
  }

  // Admin Curatorial Action
  void verifySeller(String sellerId, VerificationStatus status, VerificationLevel level) {
    state = state.copyWith(
      allSellers: [
        for (final s in state.allSellers)
          if (s.id == sellerId)
            s.copyWith(verificationStatus: status, verificationLevel: level)
          else
            s,
      ],
      currentSeller: state.currentSeller?.id == sellerId
          ? state.currentSeller!.copyWith(verificationStatus: status, verificationLevel: level)
          : state.currentSeller,
    );
  }

  SellerProfile? getSellerById(String id) {
    try {
      return state.allSellers.firstWhere((s) => s.id == id);
    } catch (_) {
      return null;
    }
  }

  static final SellerProfile _mockCurrentSeller = SellerProfile(
    id: 'seller-001',
    userId: 'user-auth-current',
    sellerType: SellerType.dealer,
    displayName: 'Monaco Private Heritage Salons',
    legalName: 'Monaco Heritage Salons S.A.M.',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    bio: 'Established in Monte-Carlo in 1984. Curating museum-grade horology and historic automotive machinery for international connoisseurs.',
    country: 'Monaco',
    city: 'Monte-Carlo',
    email: 'curator@monacoheritage.mc',
    phone: '+377 98 06 20 00',
    whatsapp: '+377 98 06 20 01',
    website: 'https://monacoheritage.mc',
    yearsExperience: 42,
    yearEstablished: 1984,
    languages: ['English', 'French', 'Italian'],
    categoriesSold: ['Luxury Watches', 'Luxury & Exotic Cars'],
    verificationStatus: VerificationStatus.verified,
    verificationLevel: VerificationLevel.level3,
    reputationScore: 4.98,
    activeListingsCount: 5,
    businessProfile: const BusinessProfile(
      id: 'biz-001',
      sellerId: 'seller-001',
      legalName: 'Monaco Heritage Salons S.A.M.',
      tradingName: 'Monaco Private Heritage Salons',
      businessType: 'Boutique Dealer',
      registrationCountry: 'Monaco',
      registrationNumber: 'RCI-84S02194',
      taxNumber: 'FR-MC-198402',
      website: 'https://monacoheritage.mc',
      businessEmail: 'concierge@monacoheritage.mc',
      businessPhone: '+377 98 06 20 00',
      businessAddress: 'Place du Casino, 98000 Monaco',
      yearEstablished: 1984,
      numberOfEmployees: '10-25',
      description: 'Exclusive gallery located on Place du Casino.',
      brandsRepresented: ['Patek Philippe', 'Rolex', 'Ferrari'],
    ),
    createdAt: DateTime(2022, 1, 1),
  );

  static final List<SellerProfile> _initialSellers = [
    _mockCurrentSeller,
    SellerProfile(
      id: '00000000-0000-0000-0000-000000000001',
      userId: 'user-00000000-0000-0000-0000-000000000001',
      sellerType: SellerType.yachtBroker,
      displayName: 'Oceanic Yachts & Marine',
      legalName: 'Oceanic International Yachting SARL',
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
      bio: 'Leading Mediterranean yacht brokerage specializing in sailing catamarans, superyachts, and turnkey marina berths from Cannes to Saint-Tropez.',
      country: 'France',
      city: 'Cannes',
      email: 'charter@oceanicyachts.fr',
      phone: '+33 4 93 39 12 34',
      whatsapp: '+33 6 12 34 56 78',
      website: 'https://oceanicyachts.fr',
      yearsExperience: 26,
      yearEstablished: 1998,
      languages: ['English', 'French'],
      categoriesSold: ['Yachts & Marine'],
      verificationStatus: VerificationStatus.verified,
      verificationLevel: VerificationLevel.level3,
      reputationScore: 4.97,
      activeListingsCount: 2,
      brokerProfile: const BrokerProfile(
        id: 'brk-001',
        sellerId: '00000000-0000-0000-0000-000000000001',
        agencyName: 'Oceanic International Yachting',
        specialization: 'Yachts & Marine Broker',
        yearsExperience: 26,
        hasOwnerRepresentationAuthorization: true,
        authorizationRef: 'MYBA-2026-FR-09',
        description: 'Certified MYBA Worldwide Yachting Broker.',
      ),
      createdAt: DateTime(2023, 5, 10),
    ),
    SellerProfile(
      id: 'seller-dubai-motors',
      userId: 'user-dubai-01',
      sellerType: SellerType.carDealer,
      displayName: 'Luxury Motors Dubai',
      legalName: 'Emirates Hypercar Vault LLC',
      profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      bio: 'Premier Middle Eastern gallery for limited-edition hypercars, homologation specials, and bespoke automotive commissions.',
      country: 'United Arab Emirates',
      city: 'Dubai',
      email: 'sales@luxurymotorsdubai.ae',
      phone: '+971 4 330 0000',
      whatsapp: '+971 50 123 4567',
      website: 'https://luxurymotorsdubai.ae',
      yearsExperience: 18,
      yearEstablished: 2006,
      languages: ['English', 'Arabic'],
      categoriesSold: ['Luxury & Exotic Cars'],
      verificationStatus: VerificationStatus.verified,
      verificationLevel: VerificationLevel.level3,
      reputationScore: 4.95,
      activeListingsCount: 3,
      createdAt: DateTime(2023, 8, 14),
    ),
    SellerProfile(
      id: 'seller-mayfair-jewels',
      userId: 'user-mayfair-01',
      sellerType: SellerType.jewelleryDealer,
      displayName: 'Mayfair High Jewellery Vaults',
      legalName: 'Mayfair Gemological Partners Ltd',
      profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      bio: 'Private salon on Old Bond Street, London. Curating investment-grade natural colored diamonds, Kashmir sapphires, and archival Cartier treasures.',
      country: 'United Kingdom',
      city: 'London',
      email: 'vault@mayfairjewels.co.uk',
      phone: '+44 20 7946 0991',
      whatsapp: '+44 77 0090 0123',
      website: 'https://mayfairjewels.co.uk',
      yearsExperience: 35,
      yearEstablished: 1989,
      languages: ['English'],
      categoriesSold: ['Fine Jewellery & Diamonds'],
      verificationStatus: VerificationStatus.verified,
      verificationLevel: VerificationLevel.level3,
      reputationScore: 4.99,
      activeListingsCount: 2,
      createdAt: DateTime(2022, 11, 20),
    ),
  ];
}

final sellerProvider = StateNotifierProvider<SellerNotifier, SellerState>((ref) {
  return SellerNotifier();
});

final currentSellerProfileProvider = Provider<SellerProfile?>((ref) {
  return ref.watch(sellerProvider).currentSeller;
});

final sellerByIdProvider = Provider.family<SellerProfile?, String>((ref, id) {
  return ref.watch(sellerProvider.notifier).getSellerById(id);
});
