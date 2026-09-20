import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/deal_room.dart';
import '../../providers/deals_provider.dart';

class DealRoomScreen extends ConsumerStatefulWidget {
  final String dealId;

  const DealRoomScreen({
    super.key,
    required this.dealId,
  });

  @override
  ConsumerState<DealRoomScreen> createState() => _DealRoomScreenState();
}

class _DealRoomScreenState extends ConsumerState<DealRoomScreen> {
  final _messageController = TextEditingController();

  void _openCounterOfferSheet(PrivateDeal deal) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final amountController = TextEditingController(
      text: ((deal.activeAgreedAmount ?? deal.listedPrice) * 0.95).toStringAsFixed(0),
    );
    final termsController = TextEditingController(
      text: 'Subject to physical inspection at bonded vault and escrow verification.',
    );

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(context).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'SUBMIT COUNTER-OFFER',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                deal.assetTitle,
                style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
              ),
              const Divider(height: 24),
              TextField(
                controller: amountController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  labelText: 'Counter-Offer Amount (${deal.currency})',
                  border: const OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: termsController,
                maxLines: 2,
                decoration: const InputDecoration(
                  labelText: 'Transaction & Escrow Conditions',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              LuxuryButton(
                text: 'TRANSMIT BINDING COUNTER-OFFER',
                variant: LuxuryButtonVariant.gold,
                onPressed: () {
                  final amt = double.tryParse(amountController.text) ?? deal.listedPrice;
                  ref.read(dealsProvider.notifier).submitCounterOffer(
                        deal.id,
                        amt,
                        deal.currency,
                        termsController.text,
                      );
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final dealsState = ref.watch(dealsProvider);
    final deal = dealsState.activeDeal;

    if (deal == null) {
      return Scaffold(
        appBar: const LuxuryAppBar(title: 'DEAL ROOM', showBack: true),
        body: const Center(child: Text('No active deal found.')),
      );
    }

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'PRIVATE DEAL ROOM',
        showBack: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.shield_outlined, color: LuxuryColors.champagne),
            tooltip: 'Curatorial Mediation Active',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('NP GROUPS Curatorial Escrow Desk is monitoring this private negotiation for legal compliance.'),
                  backgroundColor: LuxuryColors.deepForestGreen,
                ),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Asset Header & Negotiation Stepper
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF161616) : const Color(0xFFF7F7F7),
              border: Border(
                bottom: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                ),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(2),
                      child: Image.network(
                        deal.assetImageUrl,
                        width: 50,
                        height: 50,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            deal.assetTitle,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          Text(
                            'Listed: ${deal.currency} ${(deal.listedPrice / 10000000).toStringAsFixed(1)} Cr  •  Seller: ${deal.sellerName}',
                            style: TextStyle(fontSize: 11, color: isDark ? Colors.white60 : Colors.black54),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: LuxuryColors.champagne.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(2),
                        border: Border.all(color: LuxuryColors.champagne, width: 0.8),
                      ),
                      child: Text(
                        deal.status.label.toUpperCase(),
                        style: const TextStyle(
                          color: LuxuryColors.champagne,
                          fontSize: 9.5,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                // Action Buttons for Offers
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        icon: const Icon(Icons.swap_horiz, size: 16, color: LuxuryColors.champagne),
                        label: const Text('COUNTER-OFFER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: LuxuryColors.champagne)),
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: LuxuryColors.champagne),
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                        ),
                        onPressed: () => _openCounterOfferSheet(deal),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: ElevatedButton.icon(
                        icon: const Icon(Icons.check_circle_outline, size: 16, color: Colors.black),
                        label: const Text('ACCEPT TERMS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.black)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: LuxuryColors.champagne,
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                        ),
                        onPressed: () {
                          ref.read(dealsProvider.notifier).acceptOffer(deal.id);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Transaction terms accepted. Curatorial Escrow Desk initiated.'),
                              backgroundColor: LuxuryColors.deepForestGreen,
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Chat Messages
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: deal.messages.length,
              separatorBuilder: (_, __) => const SizedBox(height: 14),
              itemBuilder: (context, index) {
                final msg = deal.messages[index];
                final isMe = msg.isFromCurrentUser;
                return Align(
                  alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    constraints: BoxConstraints(
                      maxWidth: MediaQuery.of(context).size.width * 0.78,
                    ),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isMe
                          ? (isDark ? const Color(0xFF1E2820) : const Color(0xFFE2EFE5))
                          : (isDark ? const Color(0xFF1C1C1E) : const Color(0xFFEEEEEE)),
                      borderRadius: BorderRadius.circular(6),
                      border: isMe
                          ? Border.all(color: LuxuryColors.champagne.withOpacity(0.4))
                          : null,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          msg.senderName,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: isMe ? LuxuryColors.champagne : (isDark ? Colors.white54 : Colors.black54),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          msg.text,
                          style: TextStyle(
                            fontSize: 12.5,
                            color: isDark ? Colors.white : Colors.black,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${msg.timestamp.hour}:${msg.timestamp.minute.toString().padLeft(2, '0')}',
                          style: const TextStyle(fontSize: 9, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Message input bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF121212) : Colors.white,
              border: Border(
                top: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                ),
              ),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.attach_file, color: LuxuryColors.champagne),
                    tooltip: 'Attach Verified Dossier',
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Document vault opened for encrypted PDF / Proof of Funds attachment.')),
                      );
                    },
                  ),
                  Expanded(
                    child: TextField(
                      controller: _messageController,
                      decoration: const InputDecoration(
                        hintText: 'Type confidential message...',
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send, color: LuxuryColors.champagne),
                    onPressed: () {
                      if (_messageController.text.trim().isNotEmpty) {
                        ref.read(dealsProvider.notifier).sendMessage(
                              deal.id,
                              _messageController.text.trim(),
                            );
                        _messageController.clear();
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
