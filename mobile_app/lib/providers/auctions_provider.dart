import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/auction.dart';
import '../services/mock_data.dart';

final auctionsProvider = Provider<List<LuxuryAuction>>((ref) {
  return MockLuxuryData.auctions;
});

final auctionHousesProvider = Provider<List<AuctionHouse>>((ref) {
  return MockLuxuryData.auctionHouses;
});

enum AuctionTab { live, upcoming, endingSoon, auctionHouses }

final selectedAuctionTabProvider = StateProvider<AuctionTab>((ref) => AuctionTab.live);
