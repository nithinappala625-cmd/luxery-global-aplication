import 'package:flutter_riverpod/flutter_riverpod.dart';

enum UserRole { buyer, seller, dealer, auctionHouse, admin }

class UserProfile {
  final String id;
  final String email;
  final String fullName;
  final UserRole role;
  final String? avatarUrl;
  final String preferredCurrency;
  final bool isVerified;

  const UserProfile({
    required this.id,
    required this.email,
    required this.fullName,
    this.role = UserRole.buyer,
    this.avatarUrl,
    this.preferredCurrency = 'USD',
    this.isVerified = true,
  });

  bool get isAdmin => role == UserRole.admin;
  bool get isSeller => role == UserRole.seller || role == UserRole.dealer || role == UserRole.admin;

  UserProfile copyWith({
    String? fullName,
    UserRole? role,
    String? preferredCurrency,
    String? avatarUrl,
  }) {
    return UserProfile(
      id: id,
      email: email,
      fullName: fullName ?? this.fullName,
      role: role ?? this.role,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      preferredCurrency: preferredCurrency ?? this.preferredCurrency,
      isVerified: isVerified,
    );
  }
}

class AuthNotifier extends StateNotifier<UserProfile?> {
  AuthNotifier()
      : super(const UserProfile(
          id: 'usr-0000-0001',
          email: 'collector@privateclient.com',
          fullName: 'Lord Alexander Vance',
          role: UserRole.admin, // Default to admin for full review and seller access
          avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
          preferredCurrency: 'EUR',
          isVerified: true,
        ));

  void signInWithGoogle() {
    state = const UserProfile(
      id: 'usr-google-99',
      email: 'alexander.vance@gmail.com',
      fullName: 'Alexander Vance',
      role: UserRole.buyer,
      preferredCurrency: 'USD',
      avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
      isVerified: true,
    );
  }

  void signInWithEmail(String email, String password) {
    state = UserProfile(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      fullName: email.split('@').first.toUpperCase(),
      role: UserRole.seller,
      preferredCurrency: 'EUR',
      isVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
    );
  }

  void register({required String email, required String fullName, required String password}) {
    state = UserProfile(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      fullName: fullName,
      role: UserRole.buyer,
      preferredCurrency: 'USD',
      isVerified: false, // Under 24h audit
      avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
    );
  }

  void switchRole(UserRole newRole) {
    if (state != null) {
      state = state!.copyWith(role: newRole);
    }
  }

  void signOut() {
    state = null;
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, UserProfile?>((ref) {
  return AuthNotifier();
});
