import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class LuxuryTextField extends StatelessWidget {
  final TextEditingController? controller;
  final String label;
  final String? hintText;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final TextInputType? keyboardType;
  final bool obscureText;
  final int maxLines;
  final ValueChanged<String>? onChanged;
  final String? Function(String?)? validator;

  const LuxuryTextField({
    super.key,
    this.controller,
    required this.label,
    this.hintText,
    this.prefixIcon,
    this.suffixIcon,
    this.keyboardType,
    this.obscureText = false,
    this.maxLines = 1,
    this.onChanged,
    this.validator,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label.toUpperCase(),
          style: LuxuryTypography.microCaps.copyWith(
            color: isDark ? LuxuryColors.champagneLight : LuxuryColors.charcoal,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 6),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          obscureText: obscureText,
          maxLines: maxLines,
          onChanged: onChanged,
          validator: validator,
          style: LuxuryTypography.bodyMedium.copyWith(
            color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
          ),
          cursorColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
          decoration: InputDecoration(
            hintText: hintText,
            prefixIcon: prefixIcon,
            suffixIcon: suffixIcon,
            fillColor: isDark ? const Color(0xFF141414) : LuxuryColors.pureWhite,
            filled: true,
          ),
        ),
      ],
    );
  }
}
