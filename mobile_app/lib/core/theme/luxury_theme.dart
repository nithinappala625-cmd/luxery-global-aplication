import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class LuxuryTheme {
  LuxuryTheme._();

  // ==========================================
  // LIGHT LUXURY THEME (Opulent Carrara & Champagne Gold)
  // ==========================================
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: LuxuryColors.goldDark,
      scaffoldBackgroundColor: LuxuryColors.lightScaffold,
      canvasColor: LuxuryColors.lightScaffold,
      cardColor: LuxuryColors.lightCard,
      dividerColor: LuxuryColors.borderLight,

      colorScheme: const ColorScheme.light(
        primary: LuxuryColors.goldDark,
        onPrimary: LuxuryColors.pureWhite,
        secondary: LuxuryColors.champagne,
        onSecondary: LuxuryColors.darkOnyx,
        tertiary: LuxuryColors.gold,
        onTertiary: LuxuryColors.darkOnyx,
        surface: LuxuryColors.lightCard,
        onSurface: LuxuryColors.darkOnyx,
        surfaceContainerHighest: LuxuryColors.lightCardElevated,
        outline: LuxuryColors.borderLight,
        outlineVariant: LuxuryColors.borderLightSubtle,
        error: LuxuryColors.rejectionRed,
      ),

      appBarTheme: AppBarTheme(
        backgroundColor: LuxuryColors.lightScaffold,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: LuxuryColors.goldDark),
        actionsIconTheme: const IconThemeData(color: LuxuryColors.goldDark),
        titleTextStyle: LuxuryTypography.editorialHeading2.copyWith(
          color: LuxuryColors.darkOnyx,
          letterSpacing: 2.0,
          fontWeight: FontWeight.w600,
        ),
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          statusBarBrightness: Brightness.light,
        ),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: LuxuryColors.lightCard,
        selectedItemColor: LuxuryColors.goldDark,
        unselectedItemColor: LuxuryColors.slate,
        type: BottomNavigationBarType.fixed,
        elevation: 12,
      ),

      cardTheme: CardThemeData(
        color: LuxuryColors.lightCard,
        elevation: 1,
        shadowColor: Colors.black.withValues(alpha: 0.04),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: LuxuryColors.borderLight, width: 0.8),
        ),
        margin: EdgeInsets.zero,
      ),

      dividerTheme: const DividerThemeData(
        color: LuxuryColors.borderLight,
        thickness: 0.8,
        space: 1,
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: LuxuryColors.goldDark,
          foregroundColor: LuxuryColors.pureWhite,
          elevation: 2,
          shadowColor: LuxuryColors.goldDark.withValues(alpha: 0.25),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(
            color: LuxuryColors.pureWhite,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: LuxuryColors.goldDark,
          side: const BorderSide(color: LuxuryColors.goldDark, width: 1.0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(
            color: LuxuryColors.goldDark,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: LuxuryColors.lightCardElevated,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.slate),
        labelStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.darkOnyx),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.borderLight, width: 0.8),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.borderLight, width: 0.8),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.goldDark, width: 1.2),
        ),
      ),
    );
  }

  // ==========================================
  // DARK LUXURY THEME (Pure Obsidian & 24K Gold)
  // ==========================================
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: LuxuryColors.gold,
      scaffoldBackgroundColor: LuxuryColors.pureBlack,
      canvasColor: LuxuryColors.pureBlack,
      cardColor: LuxuryColors.darkCard,
      dividerColor: LuxuryColors.borderDark,

      colorScheme: const ColorScheme.dark(
        primary: LuxuryColors.gold,
        onPrimary: LuxuryColors.pureBlack,
        secondary: LuxuryColors.champagne,
        onSecondary: LuxuryColors.pureBlack,
        tertiary: LuxuryColors.goldLight,
        onTertiary: LuxuryColors.pureBlack,
        surface: LuxuryColors.darkCard,
        onSurface: LuxuryColors.pureWhite,
        surfaceContainerHighest: Color(0xFF1C1C1E),
        outline: LuxuryColors.borderDark,
        outlineVariant: Color(0xFF333333),
        error: LuxuryColors.rejectionRed,
      ),

      appBarTheme: AppBarTheme(
        backgroundColor: LuxuryColors.pureBlack,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: LuxuryColors.gold),
        actionsIconTheme: const IconThemeData(color: LuxuryColors.gold),
        titleTextStyle: LuxuryTypography.editorialHeading2.copyWith(
          color: LuxuryColors.pureWhite,
          letterSpacing: 2.0,
          fontWeight: FontWeight.w600,
        ),
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFF0C0C0C),
        selectedItemColor: LuxuryColors.gold,
        unselectedItemColor: Color(0xFF707070),
        type: BottomNavigationBarType.fixed,
        elevation: 16,
      ),

      cardTheme: CardThemeData(
        color: LuxuryColors.darkCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: LuxuryColors.borderDark, width: 0.8),
        ),
        margin: EdgeInsets.zero,
      ),

      dividerTheme: const DividerThemeData(
        color: LuxuryColors.borderDark,
        thickness: 0.8,
        space: 1,
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: LuxuryColors.gold,
          foregroundColor: LuxuryColors.pureBlack,
          elevation: 2,
          shadowColor: LuxuryColors.gold.withValues(alpha: 0.3),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(
            color: LuxuryColors.pureBlack,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: LuxuryColors.gold,
          side: const BorderSide(color: LuxuryColors.gold, width: 1.0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(
            color: LuxuryColors.gold,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: LuxuryColors.darkCardElevated,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        labelStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.pureWhite),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.borderDark, width: 0.8),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.borderDark, width: 0.8),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(2),
          borderSide: const BorderSide(color: LuxuryColors.gold, width: 1.2),
        ),
      ),
    );
  }
}
