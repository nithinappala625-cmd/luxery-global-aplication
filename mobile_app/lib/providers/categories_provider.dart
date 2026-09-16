import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/category.dart';
import '../services/mock_data.dart';

final categoriesProvider = Provider<List<LuxuryCategory>>((ref) {
  return MockLuxuryData.categories;
});

final selectedCategoryFilterProvider = StateProvider<String?>((ref) => null);
