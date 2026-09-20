import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/category.dart';
import '../services/mock_data.dart';

final categoriesProvider = Provider<List<LuxuryCategory>>((ref) {
  return MockLuxuryData.categories;
});

final subcategoriesProvider = Provider<List<LuxurySubcategory>>((ref) {
  return MockLuxuryData.subcategories;
});

final subcategoriesByCategoryProvider = Provider.family<List<LuxurySubcategory>, String>((ref, categoryId) {
  final all = ref.watch(subcategoriesProvider);
  return all.where((s) => s.categoryId == categoryId).toList();
});

final selectedCategoryFilterProvider = StateProvider<String?>((ref) => null);
final selectedSubcategoryFilterProvider = StateProvider<String?>((ref) => null);
