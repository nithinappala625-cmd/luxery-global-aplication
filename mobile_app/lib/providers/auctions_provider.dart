import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/auction.dart';
import '../services/mock_data.dart';

enum AuctionTab { live, upcoming, endingSoon, allLots }

class AuctionsState {
  final List<LuxuryAuction> auctions;
  final AuctionTab activeTab;
  final String? lastPlacedBidAuctionId;
  final String? outbidAlertMessage;

  const AuctionsState({
    required this.auctions,
    this.activeTab = AuctionTab.live,
    this.lastPlacedBidAuctionId,
    this.outbidAlertMessage,
  });

  List<LuxuryAuction> get filteredAuctions {
    switch (activeTab) {
      case AuctionTab.live:
        return auctions.where((a) => a.isLive).toList();
      case AuctionTab.upcoming:
        return auctions.where((a) => a.status == AuctionStatus.scheduled).toList();
      case AuctionTab.endingSoon:
        return auctions
            .where((a) => a.isLive && a.timeRemaining.inHours < 48)
            .toList();
      case AuctionTab.allLots:
        return auctions;
    }
  }

  AuctionsState copyWith({
    List<LuxuryAuction>? auctions,
    AuctionTab? activeTab,
    String? lastPlacedBidAuctionId,
    String? outbidAlertMessage,
  }) {
    return AuctionsState(
      auctions: auctions ?? this.auctions,
      activeTab: activeTab ?? this.activeTab,
      lastPlacedBidAuctionId: lastPlacedBidAuctionId ?? this.lastPlacedBidAuctionId,
      outbidAlertMessage: outbidAlertMessage,
    );
  }
}

class AuctionsNotifier extends StateNotifier<AuctionsState> {
  AuctionsNotifier()
      : super(AuctionsState(auctions: MockLuxuryData.auctions));

  void setTab(AuctionTab tab) {
    state = state.copyWith(activeTab: tab);
  }

  Future<bool> placeBid({
    required String auctionId,
    required double bidAmount,
    required String bidderMaskedName,
  }) async {
    final index = state.auctions.indexWhere((a) => a.id == auctionId);
    if (index == -1) return false;

    final lot = state.auctions[index];
    if (bidAmount < lot.nextMinimumBid) {
      return false; // Violates minimum increment
    }

    final newBid = AuctionBid(
      id: 'bid-${DateTime.now().millisecondsSinceEpoch}',
      auctionId: auctionId,
      bidderId: 'current-user-patron',
      bidderMaskedName: bidderMaskedName,
      amount: bidAmount,
      timestamp: DateTime.now(),
      isWinningBid: true,
    );

    // Update history
    final updatedHistory = [
      newBid,
      ...lot.bidHistory.map((b) => AuctionBid(
            id: b.id,
            auctionId: b.auctionId,
            bidderId: b.bidderId,
            bidderMaskedName: b.bidderMaskedName,
            amount: b.amount,
            timestamp: b.timestamp,
            isWinningBid: false,
          )),
    ];

    final updatedLot = lot.copyWith(
      currentBid: bidAmount,
      totalBidsCount: lot.totalBidsCount + 1,
      bidHistory: updatedHistory,
      isReserveMet: lot.reservePrice != null ? bidAmount >= lot.reservePrice! : true,
    );

    final updatedList = List<LuxuryAuction>.from(state.auctions);
    updatedList[index] = updatedLot;

    state = state.copyWith(
      auctions: updatedList,
      lastPlacedBidAuctionId: auctionId,
    );

    return true;
  }
}

final auctionsProvider =
    StateNotifierProvider<AuctionsNotifier, AuctionsState>((ref) {
  return AuctionsNotifier();
});

final selectedAuctionTabProvider = Provider<AuctionTab>((ref) {
  return ref.watch(auctionsProvider).activeTab;
});
