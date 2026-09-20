import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/luxury_locker.dart';
import '../services/mock_data.dart';

class LockersState {
  final List<LuxuryLocker> lockers;
  final String selectedVaultType;
  final bool isLoading;

  const LockersState({
    required this.lockers,
    this.selectedVaultType = 'All',
    this.isLoading = false,
  });

  List<LuxuryLocker> get filteredLockers {
    if (selectedVaultType == 'All') return lockers;
    return lockers.where((l) => l.vaultType.contains(selectedVaultType)).toList();
  }

  LockersState copyWith({
    List<LuxuryLocker>? lockers,
    String? selectedVaultType,
    bool? isLoading,
  }) {
    return LockersState(
      lockers: lockers ?? this.lockers,
      selectedVaultType: selectedVaultType ?? this.selectedVaultType,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class LockersNotifier extends StateNotifier<LockersState> {
  LockersNotifier()
      : super(LockersState(lockers: MockLuxuryData.luxuryLockers));

  void setVaultTypeFilter(String type) {
    state = state.copyWith(selectedVaultType: type);
  }
}

final lockersProvider =
    StateNotifierProvider<LockersNotifier, LockersState>((ref) {
  return LockersNotifier();
});
