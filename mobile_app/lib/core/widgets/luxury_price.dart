import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

enum LuxuryPriceSize { small, medium, large }

class LuxuryPrice extends StatelessWidget {
  final double amount;
  final String currency;
  final LuxuryPriceSize size;
  final Color? color;
  final bool showCurrencyCode;

  const LuxuryPrice({
    super.key,
    required this.amount,
    required this.currency,
    this.size = LuxuryPriceSize.medium,
    this.color,
    this.showCurrencyCode = false,
  });

  String _formatAmount(double val, String curr) {
    String symbol;
    switch (curr.toUpperCase()) {
      case 'USD':
        symbol = '\$';
        break;
      case 'EUR':
        symbol = '€';
        break;
      case 'GBP':
        symbol = '£';
        break;
      case 'CHF':
        symbol = 'CHF ';
        break;
      case 'AED':
        symbol = 'AED ';
        break;
      case 'AUD':
        symbol = 'A\$';
        break;
      case 'SGD':
        symbol = 'S\$';
        break;
      case 'INR':
        if (val >= 10000000) {
          final cr = val / 10000000;
          final crFormatted = cr.toStringAsFixed(cr.truncateToDouble() == cr ? 0 : 2);
          return '₹$crFormatted Cr';
        } else if (val >= 100000) {
          final lakh = val / 100000;
          final lFormatted = lakh.toStringAsFixed(lakh.truncateToDouble() == lakh ? 0 : 2);
          return '₹$lFormatted L';
        }
        final inFormatter = NumberFormat('#,##,##0', 'en_IN');
        return '₹${inFormatter.format(val)}';
      default:
        symbol = '$curr ';
    }

    final formatter = NumberFormat('#,##0', 'en_US');
    return '$symbol${formatter.format(val)}';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final defaultColor = isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack;
    final activeColor = color ?? defaultColor;

    TextStyle textStyle;
    switch (size) {
      case LuxuryPriceSize.large:
        textStyle = LuxuryTypography.priceLarge.copyWith(color: activeColor);
        break;
      case LuxuryPriceSize.medium:
        textStyle = LuxuryTypography.priceMedium.copyWith(color: activeColor);
        break;
      case LuxuryPriceSize.small:
        textStyle = LuxuryTypography.priceSmall.copyWith(color: activeColor);
        break;
    }

    final formatted = _formatAmount(amount, currency);

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.baseline,
      textBaseline: TextBaseline.alphabetic,
      children: [
        Text(formatted, style: textStyle),
        if (showCurrencyCode) ...[
          const SizedBox(width: 4),
          Text(
            currency.toUpperCase(),
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.mutedGrey,
              fontSize: 10,
            ),
          ),
        ],
      ],
    );
  }
}
