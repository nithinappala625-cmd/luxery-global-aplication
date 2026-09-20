import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_bottom_sheet.dart';
import '../../../core/widgets/luxury_button.dart';
import '../../../models/listing.dart';

class MakeOfferDialog extends StatefulWidget {
  final LuxuryListing listing;

  const MakeOfferDialog({super.key, required this.listing});

  static Future<void> show(BuildContext context, LuxuryListing listing) {
    return LuxuryBottomSheet.show(
      context: context,
      title: 'SUBMIT FORMAL OFFER',
      child: MakeOfferDialog(listing: listing),
    );
  }

  @override
  State<MakeOfferDialog> createState() => _MakeOfferDialogState();
}

class _MakeOfferDialogState extends State<MakeOfferDialog> {
  late final TextEditingController _amountController;
  final TextEditingController _messageController = TextEditingController();
  int _validityDays = 3;
  bool _isSubmitting = false;
  bool _isSubmitted = false;

  @override
  void initState() {
    super.initState();
    final defaultOffer = widget.listing.price * 0.92;
    _amountController = TextEditingController(text: defaultOffer.toStringAsFixed(0));
  }

  @override
  void dispose() {
    _amountController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _submitOffer() async {
    setState(() => _isSubmitting = true);
    await Future.delayed(const Duration(milliseconds: 700));
    if (mounted) {
      setState(() {
        _isSubmitting = false;
        _isSubmitted = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (_isSubmitted) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const Icon(Icons.check_circle_outline, size: 22, color: LuxuryColors.champagne),
                const SizedBox(width: 8),
                Text(
                  'OFFER TRANSMITTED TO CONSIGNOR',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: LuxuryColors.champagne,
                    letterSpacing: 2.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Text(
              'Your binding offer of ${widget.listing.currency} ${_amountController.text} has been securely transmitted to the accredited seller.',
              style: LuxuryTypography.bodyMedium.copyWith(height: 1.45),
            ),
            const SizedBox(height: 8),
            Text(
              'Offer validity: $_validityDays days. The consignor may Accept, Counter, or Decline through your Private Deal Room.',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
            const SizedBox(height: 24),
            LuxuryButton(
              text: 'RETURN TO SALON',
              variant: LuxuryButtonVariant.gold,
              onPressed: () => Navigator.pop(context),
            ),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'ASKING PRICE',
                style: LuxuryTypography.microCaps.copyWith(color: Colors.grey),
              ),
              Text(
                '${widget.listing.currency} ${(widget.listing.price / (widget.listing.currency == "INR" ? 10000000 : 1000000)).toStringAsFixed(2)} ${widget.listing.currency == "INR" ? "Cr" : "M"}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
              ),
            ],
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _amountController,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              labelText: 'Your Offer Amount (${widget.listing.currency})',
              border: const OutlineInputBorder(),
              prefixText: '${widget.listing.currency} ',
            ),
          ),
          const SizedBox(height: 14),
          DropdownButtonFormField<int>(
            value: _validityDays,
            decoration: const InputDecoration(
              labelText: 'Offer Expiration Window',
              border: OutlineInputBorder(),
            ),
            items: const [
              DropdownMenuItem(value: 1, child: Text('24 Hours')),
              DropdownMenuItem(value: 3, child: Text('3 Business Days')),
              DropdownMenuItem(value: 7, child: Text('7 Calendar Days')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _validityDays = val);
            },
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _messageController,
            maxLines: 3,
            decoration: const InputDecoration(
              labelText: 'Confidential Note to Consignor (Optional)',
              hintText: 'e.g. Terms of inspection, escrow preference, proof of funds reference...',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF0D140F) : const Color(0xFFEBF3ED),
              borderRadius: BorderRadius.circular(4),
            ),
            child: const Text(
              'Offers made on NP GROUPS are binding upon seller acceptance. Multi-crore transactions are mediated through our accredited Escrow Desk.',
              style: TextStyle(fontSize: 10.5, height: 1.35),
            ),
          ),
          const SizedBox(height: 20),
          LuxuryButton(
            text: _isSubmitting ? 'TRANSMITTING OFFER...' : 'SUBMIT CONFIDENTIAL OFFER',
            variant: LuxuryButtonVariant.gold,
            onPressed: _isSubmitting ? null : _submitOffer,
          ),
        ],
      ),
    );
  }
}
