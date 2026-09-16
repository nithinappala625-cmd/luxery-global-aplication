import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class LuxuryBadge extends StatelessWidget {
  final String label;
  final Color? backgroundColor;
  final Color? textColor;
  final Color? borderColor;
  final IconData? icon;

  const LuxuryBadge({
    super.key,
    required this.label,
    this.backgroundColor,
    this.textColor,
    this.borderColor,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = backgroundColor ?? (isDark ? const Color(0xFF1E1E1E) : const Color(0xFFEFECE5));
    final fg = textColor ?? (isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal);
    final border = borderColor ?? (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(2),
        border: Border.all(color: border, width: 0.6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 11, color: fg),
            const SizedBox(width: 4),
          ],
          Text(
            label.toUpperCase(),
            style: LuxuryTypography.microCaps.copyWith(
              color: fg,
              fontSize: 9,
              letterSpacing: 1.2,
            ),
          ),
        ],
      ),
    );
  }
}

class VerificationBadge extends StatelessWidget {
  final bool isVerified;
  final String? customLabel;

  const VerificationBadge({
    super.key,
    this.isVerified = true,
    this.customLabel,
  });

  @override
  Widget build(BuildContext context) {
    if (!isVerified) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
        decoration: BoxDecoration(
          color: LuxuryColors.pendingAmber.withOpacity(0.12),
          borderRadius: BorderRadius.circular(2),
          border: Border.all(color: LuxuryColors.pendingAmber.withOpacity(0.4), width: 0.8),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.schedule, size: 10, color: LuxuryColors.pendingAmber),
            const SizedBox(width: 4),
            Text(
              (customLabel ?? 'PENDING AUTHENTICATION').toUpperCase(),
              style: LuxuryTypography.microCaps.copyWith(
                color: LuxuryColors.pendingAmber,
                fontSize: 8.5,
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
      decoration: BoxDecoration(
        color: LuxuryColors.deepForestGreen.withOpacity(0.12),
        borderRadius: BorderRadius.circular(2),
        border: Border.all(color: LuxuryColors.deepForestGreen.withOpacity(0.5), width: 0.8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.verified, size: 11, color: LuxuryColors.deepForestGreen),
          const SizedBox(width: 4),
          Text(
            (customLabel ?? 'CURATOR VERIFIED').toUpperCase(),
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.deepForestGreen,
              fontSize: 8.5,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
