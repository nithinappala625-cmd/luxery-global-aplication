import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../models/listing.dart';

class FullscreenGalleryViewer extends StatefulWidget {
  final List<ListingImage> images;
  final int initialIndex;

  const FullscreenGalleryViewer({
    super.key,
    required this.images,
    this.initialIndex = 0,
  });

  static void open(BuildContext context, List<ListingImage> images, int initialIndex) {
    Navigator.of(context).push(
      MaterialPageRoute(
        fullscreenDialog: true,
        builder: (context) => FullscreenGalleryViewer(
          images: images,
          initialIndex: initialIndex,
        ),
      ),
    );
  }

  @override
  State<FullscreenGalleryViewer> createState() => _FullscreenGalleryViewerState();
}

class _FullscreenGalleryViewerState extends State<FullscreenGalleryViewer> {
  late PageController _pageController;
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _pageController = PageController(initialPage: widget.initialIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: LuxuryColors.pureWhite),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          '${_currentIndex + 1} / ${widget.images.length}',
          style: LuxuryTypography.microCaps.copyWith(
            color: LuxuryColors.champagne,
            letterSpacing: 2.0,
            fontSize: 12,
          ),
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          PageView.builder(
            controller: _pageController,
            itemCount: widget.images.length,
            onPageChanged: (index) => setState(() => _currentIndex = index),
            itemBuilder: (context, index) {
              final img = widget.images[index];
              return InteractiveViewer(
                minScale: 0.8,
                maxScale: 4.0,
                child: Center(
                  child: CachedNetworkImage(
                    imageUrl: img.originalUrl,
                    fit: BoxFit.contain,
                    placeholder: (context, url) => const Center(
                      child: CircularProgressIndicator(
                        strokeWidth: 1.5,
                        color: LuxuryColors.champagne,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
          // Thumbnails strip at bottom
          if (widget.images.length > 1)
            Positioned(
              bottom: 24,
              left: 0,
              right: 0,
              child: SizedBox(
                height: 54,
                child: Center(
                  child: ListView.separated(
                    shrinkWrap: true,
                    scrollDirection: Axis.horizontal,
                    itemCount: widget.images.length,
                    separatorBuilder: (context, index) => const SizedBox(width: 8),
                    itemBuilder: (context, index) {
                      final isSelected = index == _currentIndex;
                      return GestureDetector(
                        onTap: () {
                          _pageController.animateToPage(
                            index,
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                          );
                        },
                        child: Container(
                          width: 54,
                          height: 54,
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: isSelected ? LuxuryColors.champagne : Colors.transparent,
                              width: 1.5,
                            ),
                          ),
                          child: CachedNetworkImage(
                            imageUrl: widget.images[index].originalUrl,
                            fit: BoxFit.cover,
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
