import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/deal_room.dart';
import '../services/mock_data.dart';

class DealsState {
  final List<PrivateDeal> deals;
  final String? activeDealId;

  const DealsState({
    required this.deals,
    this.activeDealId,
  });

  PrivateDeal? get activeDeal {
    if (activeDealId == null) return deals.isNotEmpty ? deals.first : null;
    return deals.firstWhere(
      (d) => d.id == activeDealId,
      orElse: () => deals.first,
    );
  }

  DealsState copyWith({
    List<PrivateDeal>? deals,
    String? activeDealId,
  }) {
    return DealsState(
      deals: deals ?? this.deals,
      activeDealId: activeDealId ?? this.activeDealId,
    );
  }
}

class DealsNotifier extends StateNotifier<DealsState> {
  DealsNotifier()
      : super(DealsState(
          deals: MockLuxuryData.sampleDeals,
          activeDealId: MockLuxuryData.sampleDeals.isNotEmpty
              ? MockLuxuryData.sampleDeals.first.id
              : null,
        ));

  void selectDeal(String dealId) {
    state = state.copyWith(activeDealId: dealId);
  }

  void sendMessage(String dealId, String text) {
    final index = state.deals.indexWhere((d) => d.id == dealId);
    if (index == -1) return;

    final deal = state.deals[index];
    final msg = DealMessage(
      id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
      senderId: 'current-user-patron',
      senderName: 'You (Private Patron)',
      isFromCurrentUser: true,
      text: text,
      timestamp: DateTime.now(),
    );

    final updatedDeal = deal.copyWith(
      messages: [...deal.messages, msg],
    );

    final updatedList = List<PrivateDeal>.from(state.deals);
    updatedList[index] = updatedDeal;
    state = state.copyWith(deals: updatedList);
  }

  void submitCounterOffer(String dealId, double amount, String currency, String terms) {
    final index = state.deals.indexWhere((d) => d.id == dealId);
    if (index == -1) return;

    final deal = state.deals[index];
    final offer = DealOffer(
      id: 'off-${DateTime.now().millisecondsSinceEpoch}',
      dealId: dealId,
      senderId: 'current-user-patron',
      senderRole: 'buyer',
      amount: amount,
      currency: currency,
      termsNote: terms,
      expiresAt: DateTime.now().add(const Duration(hours: 48)),
      status: 'pending',
      createdAt: DateTime.now(),
    );

    final msg = DealMessage(
      id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
      senderId: 'current-user-patron',
      senderName: 'You (Private Patron)',
      isFromCurrentUser: true,
      text: 'Formal Counter-Offer Submitted: $currency ${amount.toStringAsFixed(0)} with terms: "$terms"',
      timestamp: DateTime.now(),
      attachedOffer: offer,
    );

    final updatedDeal = deal.copyWith(
      status: DealStatus.counterOffer,
      activeAgreedAmount: amount,
      messages: [...deal.messages, msg],
    );

    final updatedList = List<PrivateDeal>.from(state.deals);
    updatedList[index] = updatedDeal;
    state = state.copyWith(deals: updatedList);
  }

  void acceptOffer(String dealId) {
    final index = state.deals.indexWhere((d) => d.id == dealId);
    if (index == -1) return;

    final deal = state.deals[index];
    final msg = DealMessage(
      id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
      senderId: 'current-user-patron',
      senderName: 'You (Private Patron)',
      isFromCurrentUser: true,
      text: 'OFFER ACCEPTED. Transaction terms ratified. Entering Escrow & Title Documentation transfer.',
      timestamp: DateTime.now(),
    );

    final updatedDeal = deal.copyWith(
      status: DealStatus.accepted,
      messages: [...deal.messages, msg],
    );

    final updatedList = List<PrivateDeal>.from(state.deals);
    updatedList[index] = updatedDeal;
    state = state.copyWith(deals: updatedList);
  }
}

final dealsProvider = StateNotifierProvider<DealsNotifier, DealsState>((ref) {
  return DealsNotifier();
});
