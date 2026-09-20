import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/buyer_request.dart';
import '../services/mock_data.dart';

class BuyerRequestsState {
  final List<BuyerRequest> requests;
  final bool isSubmitting;

  const BuyerRequestsState({
    required this.requests,
    this.isSubmitting = false,
  });

  BuyerRequestsState copyWith({
    List<BuyerRequest>? requests,
    bool? isSubmitting,
  }) {
    return BuyerRequestsState(
      requests: requests ?? this.requests,
      isSubmitting: isSubmitting ?? this.isSubmitting,
    );
  }
}

class BuyerRequestsNotifier extends StateNotifier<BuyerRequestsState> {
  BuyerRequestsNotifier()
      : super(BuyerRequestsState(requests: MockLuxuryData.buyerRequests));

  Future<bool> submitRequest({
    required String categorySlug,
    required String categoryName,
    required String assetDesired,
    String? preferredBrand,
    required double budgetMax,
    required String currency,
    required String targetLocation,
    required String timeline,
    required String specificRequirements,
  }) async {
    state = state.copyWith(isSubmitting: true);
    await Future.delayed(const Duration(milliseconds: 600));

    final newReq = BuyerRequest(
      id: 'req-${DateTime.now().millisecondsSinceEpoch}',
      userId: 'current-user-patron',
      clientMaskedName: 'Private Patron #${DateTime.now().millisecondsSinceEpoch % 900 + 100}',
      categorySlug: categorySlug,
      categoryName: categoryName,
      assetDesired: assetDesired,
      preferredBrand: preferredBrand,
      budgetMax: budgetMax,
      currency: currency,
      targetLocation: targetLocation,
      timeline: timeline,
      specificRequirements: specificRequirements,
      createdAt: DateTime.now(),
      matchedPropositionsCount: 0,
    );

    state = state.copyWith(
      requests: [newReq, ...state.requests],
      isSubmitting: false,
    );
    return true;
  }
}

final buyerRequestsProvider =
    StateNotifierProvider<BuyerRequestsNotifier, BuyerRequestsState>((ref) {
  return BuyerRequestsNotifier();
});
