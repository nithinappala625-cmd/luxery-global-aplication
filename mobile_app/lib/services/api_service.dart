import 'package:dio/dio.dart';
import '../config/environment.dart';
import '../models/category.dart';
import '../models/listing.dart';
import 'mock_data.dart';

class LuxuryApiService {
  final Dio _dio;

  LuxuryApiService({Dio? dio})
      : _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: Environment.apiBaseUrl,
                connectTimeout: const Duration(seconds: 10),
                receiveTimeout: const Duration(seconds: 10),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
              ),
            );

  // 1. Fetch Categories
  Future<List<LuxuryCategory>> getCategories() async {
    try {
      final response = await _dio.get('/categories');
      if (response.statusCode == 200 && response.data['data'] != null) {
        final list = response.data['data'] as List;
        return list.map((item) => LuxuryCategory.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (_) {
      // Fallback
    }
    return MockLuxuryData.categories;
  }

  // 2. Fetch Listings
  Future<List<LuxuryListing>> getListings({
    String? categoryId,
    String? query,
    String? currency,
    double? minPrice,
    double? maxPrice,
  }) async {
    try {
      final Map<String, dynamic> queryParams = {};
      if (categoryId != null) queryParams['categoryId'] = categoryId;
      if (query != null) queryParams['q'] = query;
      if (currency != null) queryParams['currency'] = currency;
      if (minPrice != null) queryParams['minPrice'] = minPrice;
      if (maxPrice != null) queryParams['maxPrice'] = maxPrice;

      final response = await _dio.get(
        '/listings',
        queryParameters: queryParams,
      );
      if (response.statusCode == 200 && response.data['data'] != null) {
        final list = response.data['data'] as List;
        return list.map((item) => LuxuryListing.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (_) {
      // Fallback
    }
    return MockLuxuryData.listings;
  }

  // 3. Request Cloudflare R2 Presigned Upload URL
  Future<Map<String, dynamic>> requestR2PresignedUpload({
    required String scope,
    required String entityId,
    required String fileName,
    required String contentType,
    required int fileSizeBytes,
  }) async {
    try {
      final response = await _dio.post(
        '/media/presigned-upload-url',
        data: {
          'scope': scope,
          'entityId': entityId,
          'fileName': fileName,
          'contentType': contentType,
          'fileSizeBytes': fileSizeBytes,
        },
      );
      return response.data['data'] as Map<String, dynamic>;
    } catch (_) {
      return {
        'uploadUrl': 'https://mock-r2-upload.cloudflarestorage.com/presigned-put',
        'r2Key': 'listings/$entityId/original/$fileName',
        'publicUrl': 'https://assets.luxurymarketplace.global/listings/$entityId/original/$fileName',
      };
    }
  }

  // 4. Request Contact Unlock (initiates Payment order)
  Future<Map<String, dynamic>> requestContactUnlock({
    required String listingId,
    required String provider,
  }) async {
    try {
      final response = await _dio.post(
        '/contact-unlocks/request',
        data: {
          'listingId': listingId,
          'provider': provider,
        },
      );
      return response.data['data'] as Map<String, dynamic>;
    } catch (_) {
      return {
        'status': 'pending',
        'order': {
          'orderId': 'mock_order_123',
          'amount': 150.0,
          'currency': 'EUR',
          'provider': provider,
        },
      };
    }
  }

  // 5. Confirm Contact Unlock
  Future<Map<String, dynamic>> confirmContactUnlock({
    required String listingId,
    required String paymentId,
  }) async {
    try {
      final response = await _dio.post(
        '/contact-unlocks/confirm',
        data: {
          'listingId': listingId,
          'paymentId': paymentId,
        },
      );
      return response.data['data'] as Map<String, dynamic>;
    } catch (_) {
      return {
        'status': 'paid',
        'unlocked_contact_info': {
          'custodian_name': 'Monaco Private Heritage Salons',
          'direct_telephone': '+377 98 06 20 00',
          'confidential_email': 'vance.private.office@monacosalons.mc',
        },
      };
    }
  }
}
