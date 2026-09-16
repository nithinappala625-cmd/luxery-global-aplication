import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'config/routes.dart';
import 'core/theme/luxury_theme.dart';
import 'providers/theme_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Enforce elegant status bar styling
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(
    const ProviderScope(
      child: GlobalLuxuryMarketplaceApp(),
    ),
  );
}

class GlobalLuxuryMarketplaceApp extends ConsumerWidget {
  const GlobalLuxuryMarketplaceApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeProvider);

    return MaterialApp.router(
      title: 'Maison Du Luxe',
      debugShowCheckedModeBanner: false,
      theme: LuxuryTheme.lightTheme,
      darkTheme: LuxuryTheme.darkTheme,
      themeMode: themeMode,
      routerConfig: appRouter,
    );
  }
}
