import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../models/category.dart';
import '../../../providers/listings_provider.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_image.dart';

class LuxuryCategoryCard extends ConsumerWidget {
  final LuxuryCategory category;
  final double height;
  final double? width;

  const LuxuryCategoryCard({
    super.key,
    required this.category,
    this.height = 140,
    this.width,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(2),
        border: Border.all(color: LuxuryColors.borderDark, width: 0.8),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(2),
        child: Stack(
          children: [
            // Background Image
            LuxuryImage(
              imageUrl: category.bannerUrl,
              width: double.infinity,
              height: double.infinity,
              fit: BoxFit.cover,
            ),
            // Editorial Dark Gradient Overlay
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.black.withOpacity(0.35),
                      Colors.black.withOpacity(0.85),
                    ],
                  ),
                ),
              ),
            ),
            // Content
            Positioned(
              bottom: 14,
              left: 14,
              right: 14,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    category.name.toUpperCase(),
                    style: LuxuryTypography.editorialHeading3.copyWith(
                      color: LuxuryColors.pureWhite,
                      letterSpacing: 2.0,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (category.tagline != null) ...[
                    const SizedBox(height: 3),
                    Text(
                      category.tagline!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: LuxuryTypography.bodySmall.copyWith(
                        color: LuxuryColors.champagneLight.withOpacity(0.9),
                        fontSize: 11,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            // Tap area
            Positioned.fill(
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    ref.read(listingFilterProvider.notifier).setCategory(category.id);
                    context.go('/discover');
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
