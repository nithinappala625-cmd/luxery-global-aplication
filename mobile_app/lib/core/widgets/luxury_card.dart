import 'package:flutter/material.dart';
import '../constants/colors.dart';

class LuxuryCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  final Color? borderColor;
  final double borderWidth;
  final BorderRadius? borderRadius;

  const LuxuryCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16),
    this.onTap,
    this.backgroundColor,
    this.borderColor,
    this.borderWidth = 0.8,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = backgroundColor ?? (isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite);
    final border = borderColor ?? (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight);
    final radius = borderRadius ?? BorderRadius.circular(2);

    final card = Container(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: radius,
        border: Border.all(color: border, width: borderWidth),
      ),
      child: Padding(
        padding: padding,
        child: child,
      ),
    );

    if (onTap != null) {
      return Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: radius,
          child: card,
        ),
      );
    }

    return card;
  }
}
