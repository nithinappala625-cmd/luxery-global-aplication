import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/aviation.dart';
import '../services/mock_data.dart';

class AviationState {
  final List<AircraftListing> aircraft;
  final AviationType selectedTab;
  final String searchQuery;

  const AviationState({
    required this.aircraft,
    this.selectedTab = AviationType.sale,
    this.searchQuery = '',
  });

  List<AircraftListing> get salesListings =>
      aircraft.where((a) => a.aviationType == AviationType.sale).toList();

  List<AircraftListing> get charterRoutes =>
      aircraft.where((a) => a.aviationType == AviationType.charter).toList();

  List<AircraftListing> get jets => aircraft;

  AviationState copyWith({
    List<AircraftListing>? aircraft,
    AviationType? selectedTab,
    String? searchQuery,
  }) {
    return AviationState(
      aircraft: aircraft ?? this.aircraft,
      selectedTab: selectedTab ?? this.selectedTab,
      searchQuery: searchQuery ?? this.searchQuery,
    );
  }
}

class AviationNotifier extends StateNotifier<AviationState> {
  AviationNotifier()
      : super(AviationState(aircraft: MockLuxuryData.aircraftListings));

  void setTab(AviationType type) {
    state = state.copyWith(selectedTab: type);
  }

  void setSearchQuery(String query) {
    state = state.copyWith(searchQuery: query);
  }
}

final aviationProvider =
    StateNotifierProvider<AviationNotifier, AviationState>((ref) {
  return AviationNotifier();
});
