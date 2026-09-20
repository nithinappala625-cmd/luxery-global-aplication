import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_text_field.dart';
import '../../providers/auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController(text: 'collector@privateclient.com');
  final _passwordController = TextEditingController(text: '••••••••••••');
  bool _isLoading = false;
  bool _isGoogleLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _signInWithGoogle() async {
    setState(() => _isGoogleLoading = true);
    await Future.delayed(const Duration(milliseconds: 900));
    ref.read(authProvider.notifier).signInWithGoogle();
    if (mounted) {
      setState(() => _isGoogleLoading = false);
      context.go('/');
    }
  }

  void _signInWithEmail() async {
    final email = _emailController.text.trim();
    if (email.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter your VIP email address.')),
      );
      return;
    }

    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 700));
    ref.read(authProvider.notifier).signInWithEmail(email, _passwordController.text);
    if (mounted) {
      setState(() => _isLoading = false);
      context.go('/');
    }
  }

  void _continueAsGuest() {
    context.go('/');
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? LuxuryColors.pureBlack : const Color(0xFFF9F8F5),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Bar: Guest Access
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: LuxuryColors.champagne.withOpacity(0.5)),
                    ),
                    child: const Center(
                      child: Text(
                        '⚜',
                        style: TextStyle(color: LuxuryColors.champagne, fontSize: 18),
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: _continueAsGuest,
                    child: Text(
                      'EXPLORE AS VIP GUEST →',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.champagne,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.5,
                        fontSize: 9.5,
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 36),

              // Title Section
              Text(
                'ENTER THE SANCTUARY',
                style: LuxuryTypography.editorialHeading1.copyWith(
                  fontSize: 26,
                  letterSpacing: 2.0,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Access your curated portfolio, private high-value consignments, and discreet salon acquisitions.',
                style: LuxuryTypography.bodySmall.copyWith(
                  color: LuxuryColors.mutedGrey,
                  height: 1.5,
                ),
              ),

              const SizedBox(height: 32),

              // Google OAuth Button (Elite Style)
              Container(
                width: double.infinity,
                height: 52,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(2),
                  border: Border.all(
                    color: isDark ? LuxuryColors.champagne.withOpacity(0.6) : LuxuryColors.deepForestGreen,
                    width: 1.2,
                  ),
                  color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                ),
                child: InkWell(
                  onTap: _isGoogleLoading ? null : _signInWithGoogle,
                  child: Center(
                    child: _isGoogleLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: LuxuryColors.champagne,
                            ),
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                width: 22,
                                height: 22,
                                decoration: const BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Colors.white,
                                ),
                                child: Center(
                                  child: Image.network(
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/240px-Google_%22G%22_logo.svg.png',
                                    width: 15,
                                    height: 15,
                                    errorBuilder: (_, __, ___) => const Icon(Icons.g_mobiledata, color: Colors.blue, size: 20),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Text(
                                'CONTINUE WITH GOOGLE',
                                style: LuxuryTypography.microCaps.copyWith(
                                  fontWeight: FontWeight.w700,
                                  letterSpacing: 1.6,
                                  fontSize: 10,
                                  color: isDark ? LuxuryColors.pureWhite : LuxuryColors.deepForestGreen,
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ),

              const SizedBox(height: 28),

              // Subtle Divider
              Row(
                children: [
                  Expanded(
                    child: Divider(
                      color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: Text(
                      'OR PRIVATE CONNOISSEUR LOGIN',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                        fontSize: 8.0,
                        letterSpacing: 1.5,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Divider(
                      color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 24),

              // Email Field
              LuxuryTextField(
                controller: _emailController,
                label: 'VIP EMAIL ADDRESS',
                hintText: 'connoisseur@privateclient.com',
                keyboardType: TextInputType.emailAddress,
              ),

              const SizedBox(height: 16),

              // Password Field
              LuxuryTextField(
                controller: _passwordController,
                label: 'PASSPHRASE',
                hintText: 'Enter secret passphrase',
                obscureText: true,
              ),

              const SizedBox(height: 10),

              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Contact your private client concierge to reset your passphrase.')),
                    );
                  },
                  child: Text(
                    'FORGOT PASSPHRASE?',
                    style: LuxuryTypography.microCaps.copyWith(
                      color: LuxuryColors.mutedGrey,
                      fontSize: 8.5,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Sign In Button
              LuxuryButton(
                text: 'ENTER SALON',
                isLoading: _isLoading,
                variant: LuxuryButtonVariant.primary,
                onPressed: _signInWithEmail,
              ),

              const SizedBox(height: 32),

              // Apply for Membership Link
              Center(
                child: Column(
                  children: [
                    Text(
                      'NOT YET AN ACCREDITED CLIENT?',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: LuxuryColors.mutedGrey,
                        fontSize: 9,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 6),
                    GestureDetector(
                      onTap: () => context.push('/register'),
                      child: Text(
                        'REQUEST PRIVATE SALON INVITATION',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          fontWeight: FontWeight.w700,
                          fontSize: 10.5,
                          letterSpacing: 1.5,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
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
