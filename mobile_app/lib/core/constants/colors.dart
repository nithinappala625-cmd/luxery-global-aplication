import 'package:flutter/material.dart';

/// Sovereign Luxury House Color System - NP GROUPS
/// Dual-Theme Architecture:
/// - Sovereign Obsidian & 24K Gold (Dark Mode)
/// - Opulent Carrara Marble & Champagne Gold (Light Mode)
class LuxuryColors {
  LuxuryColors._();

  // ==========================================
  // Sovereign Obsidian (Dark Mode Foundation)
  // ==========================================
  static const Color pureBlack = Color(0xFF050505);       // Deepest Obsidian Black
  static const Color richBlack = Color(0xFF0A0A0A);       // Elevated Background
  static const Color darkCard = Color(0xFF121212);        // Luxury Card Surface
  static const Color darkCardElevated = Color(0xFF181818);// Secondary Card Elevation
  static const Color darkSurface = Color(0xFF1F1F1F);     // Interactive Surface
  static const Color charcoal = Color(0xFF262626);

  // ==========================================
  // Opulent Carrara (Light Mode Foundation)
  // ==========================================
  static const Color lightScaffold = Color(0xFFFBF9F5);   // Warm Carrara Alabaster
  static const Color lightCard = Color(0xFFFFFFFF);       // Crisp Pure White Card
  static const Color lightCardElevated = Color(0xFFF4EFE6);// Soft Ivory Elevation
  static const Color lightSurface = Color(0xFFEFE9DC);    // Interactive Light Surface
  static const Color softIvory = Color(0xFFFAF7F0);       // Rich Alabaster Cream
  static const Color cardLight = Color(0xFFFFFFFF);       // Light Card Surface

  // ==========================================
  // 24K Royal Gold & Brushed Metallics
  // ==========================================
  static const Color gold = Color(0xFFD4AF37);             // 24K Royal Gold Primary
  static const Color goldLight = Color(0xFFF3E5AB);        // Pale Radiant Gold
  static const Color goldDark = Color(0xFFAA820A);         // Deep Burnished Gold (for Light Theme)
  static const Color champagne = Color(0xFFDFB76C);        // Sovereign Champagne Gold
  static const Color champagneLight = Color(0xFFF7E7CE);   // Shimmer Accent
  static const Color subtleGold = Color(0xFFC5A059);

  // Legacy aliases mapped to pure 24K Royal Gold & Obsidian
  static const Color deepForestGreen = Color(0xFFD4AF37);  // Pure 24K Gold replacement
  static const Color veryDarkGreen = Color(0xFF121212);    // Obsidian Card replacement

  // ==========================================
  // Platinum, Diamonds & High-Contrast Typography
  // ==========================================
  static const Color platinum = Color(0xFFE5E5E5);
  static const Color pureWhite = Color(0xFFFFFFFF);
  static const Color offWhite = Color(0xFFF5F5F7);
  static const Color darkOnyx = Color(0xFF0D0D0D);         // High Contrast Black for Light Mode
  static const Color darkText = Color(0xFF141414);         // Primary text in Light Mode
  static const Color mutedGrey = Color(0xFF8E8E93);
  static const Color silver = Color(0xFFA1A1A6);
  static const Color slate = Color(0xFF5C5C60);            // Secondary text in Light Mode

  // ==========================================
  // Luxury Hairline Borders
  // ==========================================
  static const Color goldBorder = Color(0x59D4AF37);       // Hairline 24K Gold
  static const Color borderDark = Color(0xFF282828);       // Dark Mode Border
  static const Color borderLight = Color(0xFFE5D8C0);      // Champagne Border for Light Mode
  static const Color borderLightSubtle = Color(0xFFEFE7D6);

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

  static const LinearGradient lightCardGradient = LinearGradient(
    colors: [Color(0xFFFFFFFF), Color(0xFFFAF7F0)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient imperialGradient = LinearGradient(
    colors: [Color(0xFF1A1508), Color(0xFF050505)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  // ==========================================
  // Dynamic Theme Helpers
  // ==========================================
  static Color scaffoldBg(bool isDark) => isDark ? pureBlack : lightScaffold;
  static Color cardBg(bool isDark) => isDark ? darkCard : lightCard;
  static Color cardElevatedBg(bool isDark) => isDark ? darkCardElevated : lightCardElevated;
  static Color surfaceBg(bool isDark) => isDark ? darkSurface : lightSurface;
  static Color textPrimary(bool isDark) => isDark ? pureWhite : darkOnyx;
  static Color textSecondary(bool isDark) => isDark ? mutedGrey : slate;
  static Color border(bool isDark) => isDark ? borderDark : borderLight;
  static Color goldAccent(bool isDark) => isDark ? gold : goldDark;
  static Color hairlineGold(bool isDark) => isDark ? goldBorder : borderLight;
}
