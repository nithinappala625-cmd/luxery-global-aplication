import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/listing.dart';
import 'listings_provider.dart';

class WishlistNotifier extends StateNotifier<Set<String>> {
  WishlistNotifier() : super({'l1000000-0000-0000-0000-000000000001'}); // Pre-saved sample

  bool isSaved(String listingId) => state.contains(listingId);

  void toggleSave(String listingId) {
    if (state.contains(listingId)) {
      state = {...state}..remove(listingId);
    } else {
      state = {...state, listingId};
    }
  }
}

final wishlistProvider =
    StateNotifierProvider<WishlistNotifier, Set<String>>((ref) {
  return WishlistNotifier();
});

final savedListingsProvider = Provider<List<LuxuryListing>>((ref) {
  final all = ref.watch(allListingsProvider);
  final savedIds = ref.watch(wishlistProvider);
  return all.where((item) => savedIds.contains(item.id)).toList();
});
