import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

enum LuxuryButtonVariant {
  primary,
  secondary,
  outline,
  ghost,
  gold,
}

class LuxuryButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final LuxuryButtonVariant variant;
  final bool isLoading;
  final Widget? icon;
  final double? width;
  final double height;
  final Color? backgroundColor;
  final Color? textColor;

  const LuxuryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.variant = LuxuryButtonVariant.primary,
    this.isLoading = false,
    this.icon,
    this.width,
    this.height = 52,
    this.backgroundColor,
    this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    Color bg;
    Color fg;
    BorderSide border = BorderSide.none;

    switch (variant) {
      case LuxuryButtonVariant.primary:
        bg = isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen;
        fg = isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite;
        break;
      case LuxuryButtonVariant.secondary:
        bg = isDark ? const Color(0xFF1E1E1E) : LuxuryColors.softIvory;
        fg = isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack;
        border = BorderSide(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight, width: 0.8);
        break;
      case LuxuryButtonVariant.outline:
        bg = Colors.transparent;
        fg = isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen;
        border = BorderSide(color: fg, width: 1.0);
        break;
      case LuxuryButtonVariant.ghost:
        bg = Colors.transparent;
        fg = isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack;
        break;
      case LuxuryButtonVariant.gold:
        bg = LuxuryColors.gold;
        fg = LuxuryColors.pureBlack;
        break;
    }

    if (backgroundColor != null) bg = backgroundColor!;
    if (textColor != null) fg = textColor!;

    Widget content = Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (isLoading)
          SizedBox(
            width: 18,
            height: 18,
            child: CircularProgressIndicator(
              strokeWidth: 1.8,
              valueColor: AlwaysStoppedAnimation<Color>(fg),
            ),
          )
        else ...[
          if (icon != null) ...[
            icon!,
            const SizedBox(width: 8),
          ],
          Text(
            text.toUpperCase(),
            style: LuxuryTypography.buttonLabel.copyWith(
              color: fg,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ],
    );

    return SizedBox(
      width: width,
      height: height,
      child: Material(
        color: bg,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(2),
          side: border,
        ),
        child: InkWell(
          onTap: isLoading ? null : onPressed,
          borderRadius: BorderRadius.circular(2),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Center(child: content),
          ),
        ),
      ),
    );
  }
}
