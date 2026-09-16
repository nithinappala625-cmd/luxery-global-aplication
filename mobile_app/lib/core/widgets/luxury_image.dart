import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shimmer/shimmer.dart';
import '../constants/colors.dart';

class LuxuryImage extends StatelessWidget {
  final String imageUrl;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  const LuxuryImage({
    super.key,
    required this.imageUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    Widget imageWidget = CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: fit,
      placeholder: (context, url) => Shimmer.fromColors(
        baseColor: isDark ? const Color(0xFF181818) : const Color(0xFFEBE8E0),
        highlightColor: isDark ? const Color(0xFF282828) : const Color(0xFFF7F5EF),
        child: Container(
          width: width,
          height: height,
          color: isDark ? const Color(0xFF181818) : const Color(0xFFEBE8E0),
        ),
      ),
      errorWidget: (context, url, error) => Container(
        width: width,
        height: height,
        color: isDark ? const Color(0xFF181818) : const Color(0xFFEBE8E0),
        child: Center(
          child: Icon(
            Icons.broken_image_outlined,
            size: 28,
            color: LuxuryColors.mutedGrey.withOpacity(0.5),
          ),
        ),
      ),
    );

    if (borderRadius != null) {
      return ClipRRect(
        borderRadius: borderRadius!,
        child: imageWidget,
      );
    }

    return imageWidget;
  }
}
