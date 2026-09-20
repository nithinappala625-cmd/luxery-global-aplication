import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/membership.dart';
import '../services/mock_data.dart';

class MembershipState {
  final MembershipTier currentTier;
  final int remainingContactCredits;
  final List<MembershipPlan> availablePlans;
  final bool isSubscribing;

  const MembershipState({
    this.currentTier = MembershipTier.prive,
    this.remainingContactCredits = 9,
    required this.availablePlans,
    this.isSubscribing = false,
  });

  bool get hasUnlimitedCredits =>
      currentTier == MembershipTier.black || currentTier == MembershipTier.dynasty;

  MembershipState copyWith({
    MembershipTier? currentTier,
    int? remainingContactCredits,
    List<MembershipPlan>? availablePlans,
    bool? isSubscribing,
  }) {
    return MembershipState(
      currentTier: currentTier ?? this.currentTier,
      remainingContactCredits:
          remainingContactCredits ?? this.remainingContactCredits,
      availablePlans: availablePlans ?? this.availablePlans,
      isSubscribing: isSubscribing ?? this.isSubscribing,
    );
  }
}

class MembershipNotifier extends StateNotifier<MembershipState> {
  MembershipNotifier()
      : super(MembershipState(
          availablePlans: MockLuxuryData.membershipPlans,
        ));

  Future<bool> upgradePlan(MembershipTier newTier) async {
    state = state.copyWith(isSubscribing: true);
    await Future.delayed(const Duration(milliseconds: 700));

    final credits = (newTier == MembershipTier.black || newTier == MembershipTier.dynasty)
        ? 9999
        : (newTier == MembershipTier.prive ? 25 : 5);

    state = state.copyWith(
      currentTier: newTier,
      remainingContactCredits: credits,
      isSubscribing: false,
    );
    return true;
  }

  bool useContactCredit() {
    if (state.hasUnlimitedCredits) return true;
    if (state.remainingContactCredits > 0) {
      state = state.copyWith(
        remainingContactCredits: state.remainingContactCredits - 1,
      );
      return true;
    }
    return false;
  }
}

final membershipProvider =
    StateNotifierProvider<MembershipNotifier, MembershipState>((ref) {
  return MembershipNotifier();
});
