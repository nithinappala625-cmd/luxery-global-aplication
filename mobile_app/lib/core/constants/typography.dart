import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Global Luxury Typography System
/// Editorial Serifs for major headings, crisp geometric sans-serif for UI
class LuxuryTypography {
  LuxuryTypography._();

  // Serif Families (Cormorant Garamond & Playfair Display style)
  static TextStyle get editorialHero => GoogleFonts.playfairDisplay(
        fontSize: 34,
        fontWeight: FontWeight.w600,
        letterSpacing: 1.2,
        height: 1.15,
      );

  static TextStyle get editorialHeading1 => GoogleFonts.playfairDisplay(
        fontSize: 26,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.8,
        height: 1.25,
      );

  static TextStyle get editorialHeading2 => GoogleFonts.playfairDisplay(
        fontSize: 21,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.6,
        height: 1.3,
      );

  static TextStyle get editorialHeading3 => GoogleFonts.playfairDisplay(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.4,
        height: 1.35,
      );

  // UI Sans-serif (Manrope / Inter style)
  static TextStyle get bodyLarge => GoogleFonts.manrope(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.2,
        height: 1.5,
      );

  static TextStyle get bodyMedium => GoogleFonts.manrope(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.1,
        height: 1.45,
      );

  static TextStyle get bodySmall => GoogleFonts.manrope(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.1,
        height: 1.4,
      );

  // Micro-caps & Restrained Badges
  static TextStyle get microCaps => GoogleFonts.manrope(
        fontSize: 10,
        fontWeight: FontWeight.w700,
        letterSpacing: 2.0,
        height: 1.2,
      );

  static TextStyle get buttonLabel => GoogleFonts.manrope(
        fontSize: 13,
        fontWeight: FontWeight.w600,
        letterSpacing: 1.8,
        height: 1.0,
      );

  // Price & Tabular Figures
  static TextStyle get priceLarge => GoogleFonts.manrope(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
        fontFeatures: const [FontFeature.tabularFigures()],
      );

  static TextStyle get priceMedium => GoogleFonts.manrope(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.3,
        fontFeatures: const [FontFeature.tabularFigures()],
      );

  static TextStyle get priceSmall => GoogleFonts.manrope(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.2,
        fontFeatures: const [FontFeature.tabularFigures()],
      );
}
