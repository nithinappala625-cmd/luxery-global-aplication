import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_bottom_sheet.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../core/widgets/luxury_price.dart';
import '../../../models/listing.dart';

class ContactUnlockDialog extends StatefulWidget {
  final LuxuryListing listing;

  const ContactUnlockDialog({super.key, required this.listing});

  static Future<void> show(BuildContext context, LuxuryListing listing) {
    return LuxuryBottomSheet.show(
      context: context,
      title: 'SELLER DIRECT ACCESS',
      child: ContactUnlockDialog(listing: listing),
    );
  }

  @override
  State<ContactUnlockDialog> createState() => _ContactUnlockDialogState();
}

class _ContactUnlockDialogState extends State<ContactUnlockDialog> {
  bool _isProcessing = false;
  bool _isUnlocked = false;
  String _selectedPaymentProvider = 'razorpay';

  void _processUnlock() async {
    setState(() => _isProcessing = true);
    // Simulates payment verification through PaymentService
    await Future.delayed(const Duration(milliseconds: 1200));
    if (mounted) {
      setState(() {
        _isProcessing = false;
        _isUnlocked = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final fee = widget.listing.contactUnlockFee;
    final currency = widget.listing.currency;

    if (_isUnlocked) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const Icon(Icons.lock_open, size: 22, color: LuxuryColors.verifiedGreen),
                const SizedBox(width: 8),
                Text(
                  'ACCESS AUTHORIZED',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.verifiedGreen,
                    letterSpacing: 2.0,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Verified Custodian Information',
              style: LuxuryTypography.editorialHeading3.copyWith(
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1B1B1B) : const Color(0xFFF2EFE8),
                borderRadius: BorderRadius.circular(2),
                border: Border.all(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                ),
              ),
              child: Column(
                children: [
                  _buildContactRow('PRIMARY CUSTODIAN', widget.listing.seller?.name ?? 'Lord Alexander Vance'),
                  const SizedBox(height: 10),
                  _buildContactRow('DIRECT PHONE', '+377 98 06 20 00 (Monaco Salons)'),
                  const SizedBox(height: 10),
                  _buildContactRow('CONFIDENTIAL EMAIL', 'vance.private.office@monacosalons.mc'),
                  const SizedBox(height: 10),
                  _buildContactRow('OFFICIAL LOCATION', '${widget.listing.location.city}, ${widget.listing.location.country}'),
                ],
              ),
            ),
            const SizedBox(height: 20),
            LuxuryButton(
              text: 'DISMISS',
              variant: LuxuryButtonVariant.secondary,
              onPressed: () => Navigator.of(context).pop(),
            ),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          'Direct owner communication is protected under platform curation guidelines to eliminate unqualified inquiries.',
          style: LuxuryTypography.bodyMedium.copyWith(
            color: LuxuryColors.mutedGrey,
            fontSize: 13,
            height: 1.5,
          ),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF161616) : const Color(0xFFFAF8F5),
            borderRadius: BorderRadius.circular(2),
            border: Border.all(color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'CURATION ACCESS FEE',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '100% Fully Credited on Purchase',
                    style: LuxuryTypography.bodySmall.copyWith(
                      color: LuxuryColors.mutedGrey,
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
              LuxuryPrice(
                amount: fee > 0 ? fee : 150.0,
                currency: currency,
                size: LuxuryPriceSize.large,
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'SELECT PAYMENT GATEWAY',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: _buildProviderOption(
                id: 'razorpay',
                title: 'RAZORPAY',
                subtitle: 'International Cards & NetBanking',
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _buildProviderOption(
                id: 'paypal',
                title: 'PAYPAL',
                subtitle: 'Global Wallet & Cards',
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),
        LuxuryButton(
          text: 'AUTHORIZE & REVEAL CONTACT',
          variant: LuxuryButtonVariant.gold,
          isLoading: _isProcessing,
          onPressed: _processUnlock,
        ),
      ],
    );
  }

  Widget _buildProviderOption({
    required String id,
    required String title,
    required String subtitle,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSelected = _selectedPaymentProvider == id;

    return GestureDetector(
      onTap: () => setState(() => _selectedPaymentProvider = id),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected
              ? (isDark ? LuxuryColors.champagne.withOpacity(0.15) : LuxuryColors.deepForestGreen.withOpacity(0.08))
              : Colors.transparent,
          borderRadius: BorderRadius.circular(2),
          border: Border.all(
            color: isSelected
                ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
            width: isSelected ? 1.2 : 0.8,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  isSelected ? Icons.radio_button_checked : Icons.radio_button_unchecked,
                  size: 14,
                  color: isSelected
                      ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                      : LuxuryColors.mutedGrey,
                ),
                const SizedBox(width: 6),
                Text(
                  title,
                  style: LuxuryTypography.microCaps.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: LuxuryTypography.bodySmall.copyWith(
                color: LuxuryColors.mutedGrey,
                fontSize: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContactRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 140,
          child: Text(
            label,
            style: LuxuryTypography.microCaps.copyWith(
              color: LuxuryColors.mutedGrey,
              fontSize: 9,
            ),
          ),
        ),
        Expanded(
          child: Text(
            value,
            style: LuxuryTypography.bodyMedium.copyWith(
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
        ),
      ],
    );
  }
}
