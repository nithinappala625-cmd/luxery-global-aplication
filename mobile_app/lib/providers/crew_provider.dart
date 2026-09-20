import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/crew_booking.dart';
import '../services/mock_data.dart';

class CrewState {
  final List<EliteCrewProfile> profiles;
  final String selectedRole;
  final List<CrewBookingRequest> userBookings;
  final bool isSubmittingBooking;

  const CrewState({
    required this.profiles,
    this.selectedRole = 'All',
    this.userBookings = const [],
    this.isSubmittingBooking = false,
  });

  List<EliteCrewProfile> get filteredProfiles {
    if (selectedRole == 'All') return profiles;
    return profiles.where((p) => p.role.toLowerCase().contains(selectedRole.toLowerCase())).toList();
  }

  CrewState copyWith({
    List<EliteCrewProfile>? profiles,
    String? selectedRole,
    List<CrewBookingRequest>? userBookings,
    bool? isSubmittingBooking,
  }) {
    return CrewState(
      profiles: profiles ?? this.profiles,
      selectedRole: selectedRole ?? this.selectedRole,
      userBookings: userBookings ?? this.userBookings,
      isSubmittingBooking: isSubmittingBooking ?? this.isSubmittingBooking,
    );
  }
}

class CrewNotifier extends StateNotifier<CrewState> {
  CrewNotifier()
      : super(CrewState(profiles: MockLuxuryData.eliteCrewProfiles));

  void setRoleFilter(String role) {
    state = state.copyWith(selectedRole: role);
  }

  Future<bool> submitBookingRequest(CrewBookingRequest request) async {
    state = state.copyWith(isSubmittingBooking: true);
    await Future.delayed(const Duration(milliseconds: 800));
    final updated = List<CrewBookingRequest>.from(state.userBookings)..add(request);
    state = state.copyWith(
      userBookings: updated,
      isSubmittingBooking: false,
    );
    return true;
  }
}

final crewProvider =
    StateNotifierProvider<CrewNotifier, CrewState>((ref) {
  return CrewNotifier();
});
