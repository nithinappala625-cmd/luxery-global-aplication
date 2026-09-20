import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/real_estate.dart';
import '../services/mock_data.dart';

class RealEstateState {
  final List<LuxuryRealEstate> listings;
  final String selectedType;
  final String selectedCountry;
  final bool isLoading;

  const RealEstateState({
    required this.listings,
    this.selectedType = 'All',
    this.selectedCountry = 'All',
    this.isLoading = false,
  });

  List<LuxuryRealEstate> get filteredListings {
    return listings.where((re) {
      final matchesType = selectedType == 'All' || re.estateType == selectedType;
      final matchesCountry = selectedCountry == 'All' || re.country.contains(selectedCountry);
      return matchesType && matchesCountry;
    }).toList();
  }

  RealEstateState copyWith({
    List<LuxuryRealEstate>? listings,
    String? selectedType,
    String? selectedCountry,
    bool? isLoading,
  }) {
    return RealEstateState(
      listings: listings ?? this.listings,
      selectedType: selectedType ?? this.selectedType,
      selectedCountry: selectedCountry ?? this.selectedCountry,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class RealEstateNotifier extends StateNotifier<RealEstateState> {
  RealEstateNotifier()
      : super(RealEstateState(listings: MockLuxuryData.realEstateListings));

  void setTypeFilter(String type) {
    state = state.copyWith(selectedType: type);
  }

  void setCountryFilter(String country) {
    state = state.copyWith(selectedCountry: country);
  }
}

final realEstateProvider =
    StateNotifierProvider<RealEstateNotifier, RealEstateState>((ref) {
  return RealEstateNotifier();
});
