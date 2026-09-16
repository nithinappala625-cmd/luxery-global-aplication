import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_bottom_sheet.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../core/widgets/luxury_text_field.dart';
import '../../../models/listing.dart';

class EnquiryDialog extends StatefulWidget {
  final LuxuryListing listing;

  const EnquiryDialog({super.key, required this.listing});

  static Future<void> show(BuildContext context, LuxuryListing listing) {
    return LuxuryBottomSheet.show(
      context: context,
      title: 'PRIVATE ENQUIRY',
      child: EnquiryDialog(listing: listing),
    );
  }

  @override
  State<EnquiryDialog> createState() => _EnquiryDialogState();
}

class _EnquiryDialogState extends State<EnquiryDialog> {
  final _messageController = TextEditingController();
  final _offerController = TextEditingController();
  bool _sharePhone = true;
  bool _isSubmitting = false;
  bool _submitted = false;

  @override
  void dispose() {
    _messageController.dispose();
    _offerController.dispose();
    super.dispose();
  }

  void _submit() async {
    setState(() => _isSubmitting = true);
    await Future.delayed(const Duration(milliseconds: 900));
    if (mounted) {
      setState(() {
        _isSubmitting = false;
        _submitted = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (_submitted) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.check_circle_outline, size: 48, color: LuxuryColors.verifiedGreen),
            const SizedBox(height: 16),
            Text(
              'ENQUIRY TRANSMITTED',
              style: LuxuryTypography.editorialHeading3.copyWith(
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Your confidential message has been securely forwarded to the asset custodian. You will receive an alert when they respond.',
              textAlign: TextAlign.center,
              style: LuxuryTypography.bodySmall.copyWith(
                color: LuxuryColors.mutedGrey,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 24),
            LuxuryButton(
              text: 'CLOSE',
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
          'ASSET: ${widget.listing.title}',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 1.2,
          ),
        ),
        const SizedBox(height: 14),
        LuxuryTextField(
          controller: _offerController,
          label: 'OFFER AMOUNT (${widget.listing.currency}) (OPTIONAL)',
          hintText: 'e.g. ${widget.listing.price.toInt()}',
          keyboardType: TextInputType.number,
        ),
        const SizedBox(height: 14),
        LuxuryTextField(
          controller: _messageController,
          label: 'CONFIDENTIAL MESSAGE TO SELLER',
          hintText: 'Introduce yourself and state your inspection or acquisition timeframe...',
          maxLines: 4,
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Checkbox(
              value: _sharePhone,
              activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
              onChanged: (val) => setState(() => _sharePhone = val ?? true),
            ),
            Expanded(
              child: Text(
                'Include verified concierge contact profile',
                style: LuxuryTypography.bodySmall.copyWith(
                  color: isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        LuxuryButton(
          text: 'SUBMIT CONFIDENTIAL ENQUIRY',
          variant: LuxuryButtonVariant.primary,
          isLoading: _isSubmitting,
          onPressed: _submit,
        ),
      ],
    );
  }
}
