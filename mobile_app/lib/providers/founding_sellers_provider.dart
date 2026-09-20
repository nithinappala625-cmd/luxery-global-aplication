import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/founding_seller.dart';
import '../services/mock_data.dart';

class FoundingSellersState {
  final FoundingSellerCampaign campaign;
  final bool hasApplied;
  final bool isSubmitting;

  const FoundingSellersState({
    required this.campaign,
    this.hasApplied = false,
    this.isSubmitting = false,
  });

  FoundingSellersState copyWith({
    FoundingSellerCampaign? campaign,
    bool? hasApplied,
    bool? isSubmitting,
  }) {
    return FoundingSellersState(
      campaign: campaign ?? this.campaign,
      hasApplied: hasApplied ?? this.hasApplied,
      isSubmitting: isSubmitting ?? this.isSubmitting,
    );
  }
}

class FoundingSellersNotifier extends StateNotifier<FoundingSellersState> {
  FoundingSellersNotifier()
      : super(const FoundingSellersState(
          campaign: MockLuxuryData.foundingSellerCampaign,
        ));

  Future<bool> submitApplication({
    required String businessName,
    required String vertical,
    required String estimatedAnnualVolume,
    required String representativeName,
    required String email,
    required String phone,
  }) async {
    state = state.copyWith(isSubmitting: true);
    await Future.delayed(const Duration(milliseconds: 700));

    state = state.copyWith(
      hasApplied: true,
      isSubmitting: false,
    );
    return true;
  }
}

final foundingSellersProvider =
    StateNotifierProvider<FoundingSellersNotifier, FoundingSellersState>((ref) {
  return FoundingSellersNotifier();
});
