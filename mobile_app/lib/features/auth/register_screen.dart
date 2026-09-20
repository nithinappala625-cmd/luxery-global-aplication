import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_text_field.dart';
import '../../providers/auth_provider.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  String _selectedCategory = 'Multi-Asset Connoisseur';
  bool _isLoading = false;

  final List<String> _interestCategories = [
    'Multi-Asset Connoisseur',
    'Fine Jewellery & Diamonds',
    'Luxury Watches & Horology',
    'Luxury & Exotic Cars',
    'Yachts & Marine Vessels',
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submitApplication() async {
    final name = _nameController.text.trim();
    final email = _emailController.text.trim();

    if (name.isEmpty || email.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please provide your name and private email address.')),
      );
      return;
    }

    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 900));

    ref.read(authProvider.notifier).register(
      email: email,
      fullName: name,
      password: _passwordController.text,
    );

    if (mounted) {
      setState(() => _isLoading = false);
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) {
          final isDark = Theme.of(context).brightness == Brightness.dark;
          return AlertDialog(
            backgroundColor: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(4),
              side: const BorderSide(color: LuxuryColors.champagne, width: 1.2),
            ),
            title: Row(
              children: [
                const Icon(Icons.hourglass_top_rounded, color: LuxuryColors.champagne, size: 22),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'UNDER 24-HOUR CURATORIAL AUDIT',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.champagne,
                      fontWeight: FontWeight.w700,
                      fontSize: 11,
                      letterSpacing: 1.2,
                    ),
                  ),
                ),
              ],
            ),
            content: Text(
              'Your patron invitation request has been logged in our private registry. The Maison Du Luxe Curatorial Board verifies all memberships within 24 hours to preserve market integrity. You may explore our global salon inventory in the meantime.',
              style: LuxuryTypography.bodySmall.copyWith(height: 1.5),
            ),
            actions: [
              LuxuryButton(
                text: 'ENTER AS PROVISIONAL PATRON',
                variant: LuxuryButtonVariant.gold,
                onPressed: () {
                  Navigator.pop(ctx);
                  context.go('/');
                },
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? LuxuryColors.pureBlack : const Color(0xFFF9F8F5),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Crest
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: LuxuryColors.champagne.withOpacity(0.5)),
                ),
                child: const Center(
                  child: Text('⚜', style: TextStyle(color: LuxuryColors.champagne, fontSize: 16)),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'REQUEST SALON MEMBERSHIP',
                style: LuxuryTypography.editorialHeading1.copyWith(
                  fontSize: 24,
                  letterSpacing: 2.0,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Maison Du Luxe membership is extended to accredited private collectors, family offices, and certified salon curators.',
                style: LuxuryTypography.bodySmall.copyWith(
                  color: LuxuryColors.mutedGrey,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 28),

              // Fields
              LuxuryTextField(
                controller: _nameController,
                label: 'PRINCIPAL / LEGAL ENTITY NAME',
                hintText: 'e.g. Maharaja Vikramaditya / Baroness C. Rothschild',
              ),
              const SizedBox(height: 16),

              LuxuryTextField(
                controller: _emailController,
                label: 'PRIVATE VIP EMAIL',
                hintText: 'client@heritagefamilyoffice.com',
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),

              LuxuryTextField(
                controller: _phoneController,
                label: 'MOBILE CONCIERGE NUMBER',
                hintText: '+91 98200 12345 / +44 20 7946 0991',
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: 16),

              LuxuryTextField(
                controller: _passwordController,
                label: 'SECRET PASSPHRASE',
                hintText: 'Create secure passphrase',
                obscureText: true,
              ),
              const SizedBox(height: 20),

              Text(
                'PRIMARY CONNOISSEUR FOCUS',
                style: LuxuryTypography.microCaps.copyWith(
                  color: LuxuryColors.champagne,
                  letterSpacing: 1.5,
                ),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _interestCategories.map((cat) {
                  final isSelected = _selectedCategory == cat;
                  return ChoiceChip(
                    label: Text(cat),
                    selected: isSelected,
                    selectedColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.black : (isDark ? Colors.white : Colors.black),
                      fontWeight: FontWeight.w600,
                      fontSize: 10.5,
                    ),
                    onSelected: (sel) {
                      if (sel) setState(() => _selectedCategory = cat);
                    },
                  );
                }).toList(),
              ),

              const SizedBox(height: 32),

              LuxuryButton(
                text: 'SUBMIT INVITATION APPLICATION',
                isLoading: _isLoading,
                variant: LuxuryButtonVariant.primary,
                onPressed: _submitApplication,
              ),

              const SizedBox(height: 24),

              Center(
                child: GestureDetector(
                  onTap: () => context.pop(),
                  child: RichText(
                    text: TextSpan(
                      text: 'ALREADY AN ACCREDITED PATRON? ',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                        fontSize: 9,
                        letterSpacing: 1.2,
                      ),
                      children: [
                        TextSpan(
                          text: 'SIGN IN',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.champagne,
                            fontWeight: FontWeight.w700,
                            fontSize: 10,
                            letterSpacing: 1.4,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
