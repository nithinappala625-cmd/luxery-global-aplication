import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../constants/colors.dart';
import '../constants/typography.dart';
import '../../providers/theme_provider.dart';

class LuxuryAppBar extends ConsumerWidget implements PreferredSizeWidget {
  final String? title;
  final bool showBack;
  final bool showWishlist;
  final bool showSearch;
  final bool showThemeToggle;
  final List<Widget>? actions;
  final PreferredSizeWidget? bottom;
  final VoidCallback? onBack;

  const LuxuryAppBar({
    super.key,
    this.title,
    this.showBack = false,
    this.showWishlist = true,
    this.showSearch = false,
    this.showThemeToggle = true,
    this.actions,
    this.bottom,
    this.onBack,
  });

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight + (bottom?.preferredSize.height ?? 0.0));

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final fgColor = isDark ? LuxuryColors.pureWhite : LuxuryColors.darkOnyx;
    final goldColor = isDark ? LuxuryColors.gold : LuxuryColors.goldDark;
    final bgColor = isDark ? LuxuryColors.pureBlack : LuxuryColors.lightScaffold;

    return AppBar(
      elevation: 0,
      scrolledUnderElevation: 0,
      backgroundColor: bgColor,
      bottom: bottom,
      centerTitle: true,
      leading: showBack
          ? IconButton(
              icon: Icon(Icons.arrow_back_ios_new, size: 18, color: fgColor),
              onPressed: onBack ?? () {
                if (Navigator.of(context).canPop()) {
                  context.pop();
                } else {
                  context.go('/');
                }
              },
            )
          : null,
      title: title != null
          ? Text(
              title!,
              style: LuxuryTypography.editorialHeading2.copyWith(
                color: fgColor,
                letterSpacing: 1.8,
              ),
            )
          : Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'NP GROUPS',
                  style: LuxuryTypography.editorialHeading3.copyWith(
                    color: fgColor,
                    letterSpacing: 4.0,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  'GLOBAL LUXURY SYNDICATE',
                  style: LuxuryTypography.microCaps.copyWith(
                    color: goldColor,
                    fontSize: 8,
                    letterSpacing: 2.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
      actions: [
        if (showThemeToggle)
          IconButton(
            tooltip: isDark ? 'Switch to Carrara White Theme' : 'Switch to Obsidian Black Theme',
            icon: Icon(
              isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              size: 20,
              color: goldColor,
            ),
            onPressed: () {
              ref.read(themeModeProvider.notifier).toggleTheme();
            },
          ),
        if (showSearch)
          IconButton(
            icon: Icon(Icons.search, size: 22, color: fgColor),
            onPressed: () => context.go('/discover'),
          ),
        if (showWishlist)
          IconButton(
            icon: Icon(Icons.bookmark_border, size: 22, color: fgColor),
            onPressed: () => context.push('/wishlist'),
          ),
        if (actions != null) ...actions!,
        const SizedBox(width: 8),
      ],
    );
  }
}
