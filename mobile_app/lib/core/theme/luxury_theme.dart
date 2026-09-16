import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class LuxuryTheme {
  LuxuryTheme._();

  // ==========================================
  // LIGHT LUXURY THEME
  // ==========================================
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: LuxuryColors.deepForestGreen,
      scaffoldBackgroundColor: LuxuryColors.softIvory,
      canvasColor: LuxuryColors.softIvory,
      cardColor: LuxuryColors.pureWhite,
      dividerColor: LuxuryColors.borderLight,

      colorScheme: const ColorScheme.light(
        primary: LuxuryColors.deepForestGreen,
        onPrimary: LuxuryColors.pureWhite,
        secondary: LuxuryColors.veryDarkGreen,
        onSecondary: LuxuryColors.pureWhite,
        tertiary: LuxuryColors.champagne,
        onTertiary: LuxuryColors.pureBlack,
        surface: LuxuryColors.pureWhite,
        onSurface: LuxuryColors.pureBlack,
        surfaceContainerHighest: Color(0xFFF0ECE1),
        outline: LuxuryColors.borderLight,
        outlineVariant: Color(0xFFE5E2D9),
        error: LuxuryColors.rejectionRed,
      ),

      appBarTheme: AppBarTheme(
        backgroundColor: LuxuryColors.softIvory,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: LuxuryColors.pureBlack),
        actionsIconTheme: const IconThemeData(color: LuxuryColors.pureBlack),
        titleTextStyle: LuxuryTypography.editorialHeading2.copyWith(
          color: LuxuryColors.pureBlack,
          letterSpacing: 1.5,
        ),
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          statusBarBrightness: Brightness.light,
        ),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: LuxuryColors.pureWhite,
        selectedItemColor: LuxuryColors.deepForestGreen,
        unselectedItemColor: LuxuryColors.mutedGrey,
        type: BottomNavigationBarType.fixed,
        elevation: 12,
      ),

      cardTheme: CardThemeData(
        color: LuxuryColors.pureWhite,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(2),
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
          backgroundColor: LuxuryColors.deepForestGreen,
          foregroundColor: LuxuryColors.pureWhite,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel,
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: LuxuryColors.deepForestGreen,
          side: const BorderSide(color: LuxuryColors.deepForestGreen, width: 1.0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel,
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: LuxuryColors.pureWhite,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.mutedGrey),
        labelStyle: LuxuryTypography.bodyMedium.copyWith(color: LuxuryColors.charcoal),
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
          borderSide: const BorderSide(color: LuxuryColors.deepForestGreen, width: 1.2),
        ),
      ),
    );
  }

  // ==========================================
  // DARK LUXURY THEME
  // ==========================================
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: LuxuryColors.champagne,
      scaffoldBackgroundColor: LuxuryColors.pureBlack,
      canvasColor: LuxuryColors.pureBlack,
      cardColor: LuxuryColors.darkCard,
      dividerColor: LuxuryColors.borderDark,

      colorScheme: const ColorScheme.dark(
        primary: LuxuryColors.champagne,
        onPrimary: LuxuryColors.pureBlack,
        secondary: LuxuryColors.deepForestGreen,
        onSecondary: LuxuryColors.pureWhite,
        tertiary: LuxuryColors.champagneLight,
        onTertiary: LuxuryColors.pureBlack,
        surface: LuxuryColors.darkCard,
        onSurface: LuxuryColors.pureWhite,
        surfaceContainerHighest: Color(0xFF1F1F1F),
        outline: LuxuryColors.borderDark,
        outlineVariant: Color(0xFF383838),
        error: LuxuryColors.rejectionRed,
      ),

      appBarTheme: AppBarTheme(
        backgroundColor: LuxuryColors.pureBlack,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: LuxuryColors.pureWhite),
        actionsIconTheme: const IconThemeData(color: LuxuryColors.pureWhite),
        titleTextStyle: LuxuryTypography.editorialHeading2.copyWith(
          color: LuxuryColors.pureWhite,
          letterSpacing: 1.5,
        ),
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFF111111),
        selectedItemColor: LuxuryColors.champagne,
        unselectedItemColor: LuxuryColors.mutedGrey,
        type: BottomNavigationBarType.fixed,
        elevation: 12,
      ),

      cardTheme: CardThemeData(
        color: LuxuryColors.darkCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(2),
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
          backgroundColor: LuxuryColors.champagne,
          foregroundColor: LuxuryColors.pureBlack,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(color: LuxuryColors.pureBlack),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: LuxuryColors.champagne,
          side: const BorderSide(color: LuxuryColors.champagne, width: 1.0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
          textStyle: LuxuryTypography.buttonLabel.copyWith(color: LuxuryColors.champagne),
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: LuxuryColors.darkCard,
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
          borderSide: const BorderSide(color: LuxuryColors.champagne, width: 1.2),
        ),
      ),
    );
  }
}
