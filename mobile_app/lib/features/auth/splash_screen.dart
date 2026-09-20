import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  Timer? _navigationTimer;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.7, curve: Curves.easeIn),
    );

    _scaleAnimation = Tween<double>(begin: 0.92, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.85, curve: Curves.easeOutCubic),
      ),
    );

    _controller.forward();

    // Auto navigate after 2.8 seconds
    _navigationTimer = Timer(const Duration(milliseconds: 2800), () {
      if (mounted) {
        context.go('/login');
      }
    });
  }

  @override
  void dispose() {
    _navigationTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _skip() {
    _navigationTimer?.cancel();
    if (mounted) {
      context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: LuxuryColors.pureBlack,
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _skip,
        child: Stack(
          children: [
            // Subtle Radial Gradient Background
            Positioned.fill(
              child: Container(
                decoration: const BoxDecoration(
                  gradient: RadialGradient(
                    center: Alignment.center,
                    radius: 0.9,
                    colors: [
                      Color(0xFF16251C), // Deep forest hue
                      LuxuryColors.pureBlack,
                    ],
                  ),
                ),
              ),
            ),

            // Main Brandmark & Typography
            Center(
              child: AnimatedBuilder(
                animation: _controller,
                builder: (context, child) {
                  return FadeTransition(
                    opacity: _fadeAnimation,
                    child: ScaleTransition(
                      scale: _scaleAnimation,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Luxury Monogram Crest
                          Container(
                            width: 88,
                            height: 88,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: LuxuryColors.champagne.withOpacity(0.7),
                                width: 1.5,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: LuxuryColors.champagne.withOpacity(0.2),
                                  blurRadius: 28,
                                  spreadRadius: 2,
                                ),
                              ],
                            ),
                            child: const Center(
                              child: Text(
                                '⚜',
                                style: TextStyle(
                                  color: LuxuryColors.champagne,
                                  fontSize: 42,
                                  height: 1.0,
                                ),
                              ),
                            ),
                          ),

                          const SizedBox(height: 32),

                          // Brand Title
                          Text(
                            'MAISON DU LUXE',
                            style: LuxuryTypography.editorialHeading1.copyWith(
                              color: LuxuryColors.pureWhite,
                              fontSize: 26,
                              letterSpacing: 4.5,
                              fontWeight: FontWeight.w400,
                            ),
                          ),

                          const SizedBox(height: 10),

                          // Subtitle / Tagline
                          Text(
                            'GLOBAL LUXURY SANCTUARY',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: LuxuryColors.champagne,
                              fontSize: 10,
                              letterSpacing: 3.2,
                              fontWeight: FontWeight.w600,
                            ),
                          ),

                          const SizedBox(height: 6),

                          Text(
                            'PARIS • MONACO • DUBAI • MUMBAI • GENEVA',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: LuxuryColors.mutedGrey,
                              fontSize: 8.0,
                              letterSpacing: 2.0,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),

            // Bottom Shimmer / Loading Indicator
            Positioned(
              bottom: 48,
              left: 0,
              right: 0,
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: Column(
                  children: [
                    SizedBox(
                      width: 140,
                      child: LinearProgressIndicator(
                        backgroundColor: LuxuryColors.charcoal,
                        valueColor: const AlwaysStoppedAnimation<Color>(LuxuryColors.champagne),
                        minHeight: 1.5,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'CONNECTING TO ENCRYPTED VAULT',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                        fontSize: 8.0,
                        letterSpacing: 1.8,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Top Skip Button
            Positioned(
              top: 50,
              right: 20,
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: TextButton(
                  onPressed: _skip,
                  child: Text(
                    'ENTER',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      letterSpacing: 2.0,
                      fontSize: 10,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
