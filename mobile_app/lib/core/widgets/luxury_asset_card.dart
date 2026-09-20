import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';

/// Shared luxury asset card used across ALL sections of the NP GROUPS
/// Global Luxury Marketplace (jets, yachts, cars, real estate, etc.).
///
/// Designed for a 2-column [GridView] with [childAspectRatio] of 0.62.
/// The card is a [StatelessWidget] — all interactivity is surfaced via
/// callbacks so each section screen can wire up its own navigation / logic.
class LuxuryAssetCard extends StatelessWidget {
  /// Remote image URL shown as the full-bleed hero.
  final String imageUrl;

  /// Primary asset name, e.g. "Gulfstream G650ER".
  final String title;

  /// Formatted price string, e.g. "₹45.2 Cr" or "$28M".
  final String price;

  /// Category label shown in the top-left badge, e.g. "PRIVATE JET".
  final String category;

  /// Optional one-liner spec summary shown below the title.
  final String? subtitle;

  /// Optional top-right badge label, e.g. "MEMBERS ONLY", "LIVE AUCTION".
  final String? badgeText;

  /// When true the BUY button shows a 🔒 prefix to indicate members-only access.
  final bool isMembersOnly;

  /// Callback fired when the user taps the [BUY] action button.
  final VoidCallback? onBuy;

  /// Callback fired when the user taps the [BOOK] action button.
  final VoidCallback? onBook;

  /// Callback fired when the user taps the [SELL] action button.
  final VoidCallback? onSell;

  /// Callback fired when the user taps anywhere on the card body.
  final VoidCallback? onTap;

  /// Controls whether dark-mode palette is applied.
  final bool isDark;

  const LuxuryAssetCard({
    super.key,
    required this.imageUrl,
    required this.title,
    required this.price,
    required this.category,
    this.subtitle,
    this.badgeText,
    this.isMembersOnly = false,
    this.onBuy,
    this.onBook,
    this.onSell,
    this.onTap,
    required this.isDark,
  });

  // ─── Palette shortcuts ────────────────────────────────────────────────────

  Color get _cardBg => isDark ? LuxuryColors.darkCard : Colors.white;
  Color get _titleColor => isDark ? Colors.white : LuxuryColors.pureBlack;
  Color get _subtitleColor =>
      isDark ? LuxuryColors.platinum.withOpacity(0.60) : Colors.black54;
  Color get _borderColor => LuxuryColors.gold.withOpacity(0.45);

  // ─── Build ────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: _cardBg,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: _borderColor, width: 0.7),
          boxShadow: isDark
              ? const []
              : [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.10),
                    blurRadius: 8,
                    offset: const Offset(0, 3),
                  ),
                ],
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ── TOP 58% — Full-bleed image with overlays ──────────────────
            Expanded(
              flex: 58,
              child: _ImageSection(
                imageUrl: imageUrl,
                category: category,
                badgeText: badgeText,
                price: price,
              ),
            ),

            // ── BOTTOM 42% — Info + action row ───────────────────────────
            Expanded(
              flex: 42,
              child: _InfoSection(
                title: title,
                subtitle: subtitle,
                titleColor: _titleColor,
                subtitleColor: _subtitleColor,
                cardBg: _cardBg,
                isMembersOnly: isMembersOnly,
                onBuy: onBuy,
                onBook: onBook,
                onSell: onSell,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// Private sub-widgets
// ═════════════════════════════════════════════════════════════════════════════

/// Full-bleed image area with gradient overlay and floating badges.
class _ImageSection extends StatelessWidget {
  final String imageUrl;
  final String category;
  final String? badgeText;
  final String price;

  const _ImageSection({
    required this.imageUrl,
    required this.category,
    required this.badgeText,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        // ── Hero image ───────────────────────────────────────────────────
        Image.network(
          imageUrl,
          fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => Container(
            color: LuxuryColors.darkCard,
            child: const Icon(
              Icons.image_not_supported_outlined,
              color: LuxuryColors.platinum,
              size: 32,
            ),
          ),
          loadingBuilder: (context, child, progress) {
            if (progress == null) return child;
            return Container(
              color: LuxuryColors.pureBlack,
              child: Center(
                child: CircularProgressIndicator(
                  value: progress.expectedTotalBytes != null
                      ? progress.cumulativeBytesLoaded /
                          progress.expectedTotalBytes!
                      : null,
                  color: LuxuryColors.gold,
                  strokeWidth: 1.5,
                ),
              ),
            );
          },
        ),

        // ── Bottom gradient fade to black ─────────────────────────────────
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            height: 60,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Colors.black.withOpacity(0.85),
                ],
              ),
            ),
          ),
        ),

        // ── Category badge — top-left ─────────────────────────────────────
        Positioned(
          top: 8,
          left: 8,
          child: _CategoryBadge(label: category),
        ),

        // ── Optional alert badge — top-right ──────────────────────────────
        if (badgeText != null)
          Positioned(
            top: 8,
            right: 8,
            child: _AlertBadge(label: badgeText!),
          ),

        // ── Price — bottom of image ───────────────────────────────────────
        Positioned(
          left: 8,
          right: 8,
          bottom: 6,
          child: Text(
            price,
            style: LuxuryTypography.priceMedium.copyWith(
              color: LuxuryColors.gold,
              shadows: [
                const Shadow(
                  color: Colors.black,
                  blurRadius: 6,
                  offset: Offset(0, 1),
                ),
              ],
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

/// Small semi-transparent category label badge (top-left).
class _CategoryBadge extends StatelessWidget {
  final String label;
  const _CategoryBadge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.68),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(
          color: LuxuryColors.gold.withOpacity(0.40),
          width: 0.5,
        ),
      ),
      child: Text(
        label,
        style: LuxuryTypography.microCaps.copyWith(
          color: LuxuryColors.gold,
          fontSize: 8,
          letterSpacing: 0.9,
        ),
      ),
    );
  }
}

/// Gold alert badge for "MEMBERS ONLY", "LIVE AUCTION", etc. (top-right).
class _AlertBadge extends StatelessWidget {
  final String label;
  const _AlertBadge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: LuxuryColors.gold,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        label,
        style: LuxuryTypography.microCaps.copyWith(
          color: LuxuryColors.pureBlack,
          fontSize: 7.5,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.8,
        ),
      ),
    );
  }
}

/// Bottom info area: title, subtitle, and the SELL | BOOK | BUY row.
class _InfoSection extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Color titleColor;
  final Color subtitleColor;
  final Color cardBg;
  final bool isMembersOnly;
  final VoidCallback? onBuy;
  final VoidCallback? onBook;
  final VoidCallback? onSell;

  const _InfoSection({
    required this.title,
    required this.subtitle,
    required this.titleColor,
    required this.subtitleColor,
    required this.cardBg,
    required this.isMembersOnly,
    required this.onBuy,
    required this.onBook,
    required this.onSell,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: cardBg,
      padding: const EdgeInsets.fromLTRB(8, 8, 8, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Title ─────────────────────────────────────────────────────
          Text(
            title,
            style: LuxuryTypography.editorialHeading3.copyWith(
              color: titleColor,
              fontSize: 12.5,
              height: 1.25,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),

          // ── Subtitle ──────────────────────────────────────────────────
          if (subtitle != null) ...[
            const SizedBox(height: 3),
            Text(
              subtitle!,
              style: LuxuryTypography.bodyMedium.copyWith(
                color: subtitleColor,
                fontSize: 9.5,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],

          const Spacer(),

          // ── Gold hairline divider ─────────────────────────────────────
          Container(
            height: 0.5,
            color: LuxuryColors.gold.withOpacity(0.22),
            margin: const EdgeInsets.only(bottom: 7),
          ),

          // ── SELL | BOOK | BUY action row ─────────────────────────────
          Row(
            children: [
              // SELL
              Expanded(
                child: _ActionButton(
                  label: 'SELL',
                  filled: false,
                  onTap: onSell,
                ),
              ),
              const SizedBox(width: 4),
              // BOOK
              Expanded(
                child: _ActionButton(
                  label: 'BOOK',
                  filled: false,
                  onTap: onBook,
                ),
              ),
              const SizedBox(width: 4),
              // BUY
              Expanded(
                child: _ActionButton(
                  label: isMembersOnly ? '🔒 BUY' : 'BUY',
                  filled: true,
                  onTap: onBuy,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// Compact 28-px action button used in the SELL | BOOK | BUY row.
///
/// [filled] = true → solid gold background with black text (BUY).
/// [filled] = false → transparent with thin gold border and gold text (SELL/BOOK).
class _ActionButton extends StatelessWidget {
  final String label;
  final bool filled;
  final VoidCallback? onTap;

  const _ActionButton({
    required this.label,
    required this.filled,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        height: 28,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: filled ? LuxuryColors.gold : Colors.transparent,
          borderRadius: BorderRadius.circular(4),
          border: filled
              ? null
              : Border.all(
                  color: LuxuryColors.gold.withOpacity(0.75),
                  width: 0.8,
                ),
        ),
        child: Text(
          label,
          style: LuxuryTypography.microCaps.copyWith(
            color: filled ? LuxuryColors.pureBlack : LuxuryColors.gold,
            fontSize: 8.5,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.7,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ),
    );
  }
}
