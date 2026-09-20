import 'package:flutter/material.dart';

/// Sovereign Luxury House Color System - NP GROUPS
/// Pure Obsidian Black, 24K Brushed Gold, Radiant Metallic Accents
/// Formulated specifically for ultra-high-net-worth mobile aesthetic
class LuxuryColors {
  LuxuryColors._();

  // Sovereign Obsidian & Carbon Core
  static const Color pureBlack = Color(0xFF050505);       // Deepest Obsidian Black
  static const Color richBlack = Color(0xFF0A0A0A);       // Elevated Background
  static const Color darkCard = Color(0xFF121212);        // Luxury Card Surface
  static const Color darkCardElevated = Color(0xFF181818);// Secondary Card Elevation
  static const Color darkSurface = Color(0xFF1F1F1F);     // Interactive Surface
  static const Color charcoal = Color(0xFF262626);

  // 24K Royal Gold & Brushed Metallics
  static const Color gold = Color(0xFFD4AF37);             // 24K Royal Gold Primary
  static const Color goldLight = Color(0xFFF3E5AB);        // Pale Radiant Gold
  static const Color goldDark = Color(0xFFAA820A);         // Deep Burnished Gold
  static const Color champagne = Color(0xFFDFB76C);        // Sovereign Champagne Gold
  static const Color champagneLight = Color(0xFFF7E7CE);   // Shimmer Accent
  static const Color subtleGold = Color(0xFFC5A059);

  // Platinum & Diamonds
  static const Color platinum = Color(0xFFE5E5E5);
  static const Color pureWhite = Color(0xFFFFFFFF);
  static const Color offWhite = Color(0xFFF5F5F7);
  static const Color softIvory = Color(0xFF080808);        // Replaced with Dark Obsidian
  static const Color mutedGrey = Color(0xFF8E8E93);
  static const Color silver = Color(0xFFA1A1A6);

  // Luxury Hairline Borders
  static const Color goldBorder = Color(0x59D4AF37);       // Hairline 24K Gold
  static const Color borderDark = Color(0xFF282828);
  static const Color borderLight = Color(0x33D4AF37);      // Subtle 24K Gold Hairline
  static const Color cardLight = Color(0xFF121212);        // Replaced with Dark Card
  static const Color darkText = Color(0xFFFFFFFF);         // High Contrast White Text

  // Transformed brand colors: No green, pure 24K Gold and Obsidian
  static const Color deepForestGreen = Color(0xFFD4AF37);  // Pure 24K Gold replacement
  static const Color veryDarkGreen = Color(0xFF121212);    // Obsidian Card replacement

  // Status & Verification Indicators
  static const Color verifiedGreen = Color(0xFF10B981);    // Emerald verification
  static const Color pendingAmber = Color(0xFFF59E0B);
  static const Color rejectionRed = Color(0xFFEF4444);
  static const Color auctionLiveRed = Color(0xFFFF2A2A);

  // Surface Overlays
  static const Color blackOverlay50 = Color(0x80050505);
  static const Color blackOverlay80 = Color(0xCC050505);
  static const Color whiteOverlay15 = Color(0x26FFFFFF);

  // Sovereign Gradients
  static const LinearGradient goldGradient = LinearGradient(
    colors: [Color(0xFFF3E5AB), Color(0xFFD4AF37), Color(0xFFAA820A)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkCardGradient = LinearGradient(
    colors: [Color(0xFF181818), Color(0xFF0C0C0C)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient imperialGradient = LinearGradient(
    colors: [Color(0xFF1A1508), Color(0xFF050505)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );
}
