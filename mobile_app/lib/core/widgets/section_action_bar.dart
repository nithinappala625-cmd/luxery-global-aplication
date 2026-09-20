import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

/// A global persistent 3-option mode selector used at the top of ALL section
/// screens (Aviation, Marine, Real Estate, Cars, Watches, Jewelry, Lockers,
/// Auctions).
///
/// Displays three animated pill tabs — BUY, BOOK, and SELL — with a gold fill
/// for the selected state and a gold hairline border around the outer container.
class SectionActionBar extends StatelessWidget {
  /// The currently active mode. Must be one of: 'BUY', 'BOOK', or 'SELL'.
  final String selectedMode;

  /// Callback invoked when the user taps a tab, passing the new mode string.
  final ValueChanged<String> onModeChanged;

  /// Whether the parent screen is using the dark theme.
  final bool isDark;

  /// Label text for the BUY tab.
  final String buyLabel;

  /// Label text for the BOOK tab.
  final String bookLabel;

  /// Label text for the SELL tab.
  final String sellLabel;

  const SectionActionBar({
    super.key,
    required this.selectedMode,
    required this.onModeChanged,
    required this.isDark,
    this.buyLabel = '✦ BUY',
    this.bookLabel = '✈ BOOK',
    this.sellLabel = '👑 SELL',
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF101010) : Colors.white,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(
          color: LuxuryColors.gold,
          width: 1,
        ),
        boxShadow: isDark
            ? null
            : [
                BoxShadow(
                  color: LuxuryColors.gold.withOpacity(0.12),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
                BoxShadow(
                  color: Colors.black.withOpacity(0.06),
                  blurRadius: 4,
                  offset: const Offset(0, 1),
                ),
              ],
      ),
      child: Row(
        children: [
          Expanded(
            child: _ModeTab(
              label: buyLabel,
              isSelected: selectedMode == 'BUY',
              isDark: isDark,
              onTap: () => onModeChanged('BUY'),
            ),
          ),
          Expanded(
            child: _ModeTab(
              label: bookLabel,
              isSelected: selectedMode == 'BOOK',
              isDark: isDark,
              onTap: () => onModeChanged('BOOK'),
            ),
          ),
          Expanded(
            child: _ModeTab(
              label: sellLabel,
              isSelected: selectedMode == 'SELL',
              isDark: isDark,
              onTap: () => onModeChanged('SELL'),
            ),
          ),
        ],
      ),
    );
  }
}

/// Internal tab widget used by [SectionActionBar].
///
/// Animates between a gold-filled selected state and a transparent unselected
/// state over 200 ms.
class _ModeTab extends StatelessWidget {
  final String label;
  final bool isSelected;
  final bool isDark;
  final VoidCallback onTap;

  const _ModeTab({
    required this.label,
    required this.isSelected,
    required this.isDark,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final Color fillColor =
        isDark ? LuxuryColors.gold : LuxuryColors.goldDark;

    final Color textColor = isSelected
        ? Colors.white
        : (isDark ? LuxuryColors.platinum : LuxuryColors.darkCard);

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.symmetric(vertical: 11),
        decoration: BoxDecoration(
          color: isSelected ? fillColor : Colors.transparent,
          borderRadius: BorderRadius.circular(2),
        ),
        child: AnimatedDefaultTextStyle(
          duration: const Duration(milliseconds: 200),
          style: LuxuryTypography.microCaps.copyWith(
            fontSize: 11,
            letterSpacing: 1.0,
            color: textColor,
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }
}
