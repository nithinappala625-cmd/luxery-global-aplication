import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:luxury_marketplace/main.dart';

void main() {
  setUpAll(() {
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  testWidgets('Luxury Marketplace App Shell smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: GlobalLuxuryMarketplaceApp(),
      ),
    );

    // Initial pump and settling
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Verify luxury navigation tabs exist
    expect(find.text('HOME'), findsWidgets);
    expect(find.text('DISCOVER'), findsWidgets);
    expect(find.text('AUCTIONS'), findsWidgets);
    expect(find.text('SELL'), findsWidgets);
    expect(find.text('PROFILE'), findsWidgets);
  });
}
