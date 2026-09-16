import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

class LuxuryBottomSheet extends StatelessWidget {
  final String title;
  final Widget child;
  final Widget? trailing;

  const LuxuryBottomSheet({
    super.key,
    required this.title,
    required this.child,
    this.trailing,
  });

  static Future<T?> show<T>({
    required BuildContext context,
    required String title,
    required Widget child,
    Widget? trailing,
  }) {
    return showModalBottomSheet<T>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => LuxuryBottomSheet(
        title: title,
        trailing: trailing,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? LuxuryColors.darkCard : LuxuryColors.softIvory;
    final fg = isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack;

    return Container(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
        border: Border(
          top: BorderSide(
            color: isDark ? LuxuryColors.champagne.withOpacity(0.3) : LuxuryColors.deepForestGreen.withOpacity(0.3),
            width: 1.5,
          ),
        ),
      ),
      padding: EdgeInsets.only(
        top: 16,
        left: 20,
        right: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Drag handle
          Center(
            child: Container(
              width: 36,
              height: 3,
              decoration: BoxDecoration(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          // Title Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title.toUpperCase(),
                style: LuxuryTypography.editorialHeading3.copyWith(
                  color: fg,
                  letterSpacing: 2.0,
                ),
              ),
              if (trailing != null)
                trailing!
              else
                IconButton(
                  icon: Icon(Icons.close, size: 20, color: fg),
                  onPressed: () => Navigator.of(context).pop(),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
            ],
          ),
          const SizedBox(height: 12),
          Divider(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          const SizedBox(height: 16),
          child,
        ],
      ),
    );
  }
}
