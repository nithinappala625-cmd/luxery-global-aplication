import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/rental.dart';
import '../services/mock_data.dart';

class RentalsState {
  final List<RentalVehicle> fleet;
  final List<RentalBooking> userBookings;
  final String selectedCity;
  final bool filterChauffeurOnly;
  final bool isSubmittingBooking;

  const RentalsState({
    required this.fleet,
    this.userBookings = const [],
    this.selectedCity = 'All',
    this.filterChauffeurOnly = false,
    this.isSubmittingBooking = false,
  });

  List<RentalVehicle> get filteredFleet {
    return fleet.where((v) {
      if (selectedCity != 'All' && v.locationCity != selectedCity) {
        return false;
      }
      if (filterChauffeurOnly && v.chauffeurOption == ChauffeurOption.selfDriveOnly) {
        return false;
      }
      return true;
    }).toList();
  }

  RentalsState copyWith({
    List<RentalVehicle>? fleet,
    List<RentalBooking>? userBookings,
    String? selectedCity,
    bool? filterChauffeurOnly,
    bool? isSubmittingBooking,
  }) {
    return RentalsState(
      fleet: fleet ?? this.fleet,
      userBookings: userBookings ?? this.userBookings,
      selectedCity: selectedCity ?? this.selectedCity,
      filterChauffeurOnly: filterChauffeurOnly ?? this.filterChauffeurOnly,
      isSubmittingBooking: isSubmittingBooking ?? this.isSubmittingBooking,
    );
  }
}

class RentalsNotifier extends StateNotifier<RentalsState> {
  RentalsNotifier() : super(RentalsState(fleet: MockLuxuryData.rentalVehicles));

  void setCityFilter(String city) {
    state = state.copyWith(selectedCity: city);
  }

  void toggleChauffeurOnly(bool val) {
    state = state.copyWith(filterChauffeurOnly: val);
  }

  Future<bool> createBooking({
    required String vehicleId,
    required DateTime start,
    required DateTime end,
    required String pickupLocation,
    required String returnLocation,
    required bool withChauffeur,
    required double totalAmount,
    required double deposit,
    required String currency,
  }) async {
    state = state.copyWith(isSubmittingBooking: true);
    await Future.delayed(const Duration(milliseconds: 600));

    final booking = RentalBooking(
      id: 'book-${DateTime.now().millisecondsSinceEpoch}',
      vehicleId: vehicleId,
      userId: 'user-patron-1',
      startDateTime: start,
      endDateTime: end,
      pickupLocation: pickupLocation,
      returnLocation: returnLocation,
      withChauffeur: withChauffeur,
      totalRentalAmount: totalAmount,
      securityDeposit: deposit,
      currency: currency,
      status: 'confirmed',
      createdAt: DateTime.now(),
    );

    state = state.copyWith(
      userBookings: [booking, ...state.userBookings],
      isSubmittingBooking: false,
    );
    return true;
  }
}

final rentalsProvider = StateNotifierProvider<RentalsNotifier, RentalsState>((ref) {
  return RentalsNotifier();
});
