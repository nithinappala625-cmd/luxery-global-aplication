import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_button.dart';
import '../../models/rental.dart';
import '../../providers/rentals_provider.dart';

class LuxeDriveScreen extends ConsumerStatefulWidget {
  const LuxeDriveScreen({super.key});

  @override
  ConsumerState<LuxeDriveScreen> createState() => _LuxeDriveScreenState();
}

class _LuxeDriveScreenState extends ConsumerState<LuxeDriveScreen> {
  final List<String> _cities = ['All', 'Mumbai', 'New Delhi', 'Bangalore', 'Hyderabad', 'Goa', 'Dubai Marina'];

  void _openBookingSheet(RentalVehicle car) {
    DateTime startDate = DateTime.now().add(const Duration(days: 1));
    DateTime endDate = DateTime.now().add(const Duration(days: 3));
    bool withChauffeur = car.chauffeurOption != ChauffeurOption.selfDriveOnly;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? const Color(0xFF141414) : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            final days = endDate.difference(startDate).inDays;
            final rentalCost = days * car.dailyRate;
            final chauffeurFee = withChauffeur ? days * 5000.0 : 0.0;
            final totalPayable = rentalCost + chauffeurFee + car.securityDeposit;

            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'RESERVE LUXE DRIVE',
                        style: LuxuryTypography.microCaps.copyWith(
                          color: LuxuryColors.champagne,
                          letterSpacing: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, size: 20),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    car.title,
                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 18),
                  ),
                  Text(
                    '${car.locationCity}, ${car.locationCountry}',
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                  const Divider(height: 24),

                  // Dates selector
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          icon: const Icon(Icons.calendar_today, size: 16, color: LuxuryColors.champagne),
                          label: Text('From: ${startDate.day}/${startDate.month}', style: const TextStyle(fontSize: 12)),
                          onPressed: () async {
                            final picked = await showDatePicker(
                              context: context,
                              initialDate: startDate,
                              firstDate: DateTime.now(),
                              lastDate: DateTime.now().add(const Duration(days: 90)),
                            );
                            if (picked != null) {
                              setSheetState(() => startDate = picked);
                            }
                          },
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton.icon(
                          icon: const Icon(Icons.event, size: 16, color: LuxuryColors.champagne),
                          label: Text('To: ${endDate.day}/${endDate.month}', style: const TextStyle(fontSize: 12)),
                          onPressed: () async {
                            final picked = await showDatePicker(
                              context: context,
                              initialDate: endDate,
                              firstDate: startDate.add(const Duration(days: 1)),
                              lastDate: DateTime.now().add(const Duration(days: 90)),
                            );
                            if (picked != null) {
                              setSheetState(() => endDate = picked);
                            }
                          },
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Chauffeur option
                  if (car.chauffeurOption == ChauffeurOption.bothAvailable)
                    SwitchListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Include Private Chauffeur', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      subtitle: const Text('Professional uniformed VIP security chauffeur (+₹5,000/day)', style: TextStyle(fontSize: 11, color: Colors.grey)),
                      value: withChauffeur,
                      activeColor: LuxuryColors.champagne,
                      onChanged: (val) => setSheetState(() => withChauffeur = val),
                    ),

                  const SizedBox(height: 12),

                  // Cost Breakdown
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF0C0C0C) : const Color(0xFFF7F7F7),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Column(
                      children: [
                        _buildRow('Rental Rate ($days Days)', '₹ ${(rentalCost / 1000).toStringAsFixed(0)}K'),
                        if (withChauffeur)
                          _buildRow('VIP Chauffeur Suite', '₹ ${(chauffeurFee / 1000).toStringAsFixed(0)}K'),
                        _buildRow('Refundable Security Deposit', '₹ ${(car.securityDeposit / 1000).toStringAsFixed(0)}K'),
                        const Divider(height: 16),
                        _buildRow('Total Due', '₹ ${(totalPayable / 1000).toStringAsFixed(0)}K', isBold: true),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  LuxuryButton(
                    text: 'CONFIRM RESERVATION & DEPOSIT',
                    variant: LuxuryButtonVariant.gold,
                    onPressed: () async {
                      final success = await ref.read(rentalsProvider.notifier).createBooking(
                            vehicleId: car.id,
                            start: startDate,
                            end: endDate,
                            pickupLocation: '${car.locationCity} Airport / Private Villa',
                            returnLocation: '${car.locationCity} Airport / Private Villa',
                            withChauffeur: withChauffeur,
                            totalAmount: totalPayable,
                            deposit: car.securityDeposit,
                            currency: 'INR',
                          );
                      if (context.mounted) {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Reservation submitted! NP Luxe Concierge will reach out within 15 minutes.'),
                            backgroundColor: LuxuryColors.deepForestGreen,
                          ),
                        );
                      }
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildRow(String label, String value, {bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 12, fontWeight: isBold ? FontWeight.bold : FontWeight.normal)),
          Text(value, style: TextStyle(fontSize: 12, fontWeight: isBold ? FontWeight.bold : FontWeight.normal, color: isBold ? LuxuryColors.champagne : null)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final state = ref.watch(rentalsProvider);

    return Scaffold(
      appBar: const LuxuryAppBar(
        title: 'NP LUXE DRIVE',
        showBack: true,
      ),
      body: Column(
        children: [
          // City filter chips
          Container(
            height: 48,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _cities.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final city = _cities[index];
                final isSelected = state.selectedCity == city;
                return ChoiceChip(
                  label: Text(city, style: TextStyle(fontSize: 12, color: isSelected ? Colors.black : (isDark ? Colors.white : Colors.black))),
                  selected: isSelected,
                  selectedColor: LuxuryColors.champagne,
                  backgroundColor: isDark ? const Color(0xFF1C1C1E) : const Color(0xFFEEEEEE),
                  onSelected: (_) => ref.read(rentalsProvider.notifier).setCityFilter(city),
                );
              },
            ),
          ),

          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: state.filteredFleet.length,
              separatorBuilder: (_, __) => const SizedBox(height: 20),
              itemBuilder: (context, index) {
                final car = state.filteredFleet[index];
                return Container(
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF141414) : Colors.white,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(
                      color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Stack(
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                            child: Image.network(
                              car.coverImageUrl,
                              height: 180,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Positioned(
                            top: 12,
                            right: 12,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.75),
                                borderRadius: BorderRadius.circular(2),
                                border: Border.all(color: LuxuryColors.champagne, width: 0.8),
                              ),
                              child: Text(
                                '${car.powerHp}  •  ${car.seats} Seats',
                                style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    car.title,
                                    style: LuxuryTypography.editorialHeading2.copyWith(fontSize: 16),
                                  ),
                                ),
                                Text(
                                  '₹ ${(car.dailyRate / 1000).toStringAsFixed(0)}K / Day',
                                  style: TextStyle(
                                    color: LuxuryColors.champagne,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Hourly: ₹ ${(car.hourlyRate / 1000).toStringAsFixed(0)}K/hr  •  Weekly: ₹ ${(car.weeklyRate / 100000).toStringAsFixed(1)}L',
                              style: TextStyle(fontSize: 11, color: isDark ? Colors.white60 : Colors.black54),
                            ),
                            const SizedBox(height: 6),
                            Row(
                              children: [
                                const Icon(Icons.location_on, size: 14, color: LuxuryColors.champagne),
                                const SizedBox(width: 4),
                                Text(
                                  car.formattedLocation,
                                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white70 : Colors.black87),
                                ),
                                const Spacer(),
                                Text(
                                  car.chauffeurOption.label,
                                  style: const TextStyle(fontSize: 10, color: LuxuryColors.champagne),
                                ),
                              ],
                            ),
                            const SizedBox(height: 14),
                            LuxuryButton(
                              text: 'RESERVE VEHICLE & CALENDAR',
                              variant: LuxuryButtonVariant.gold,
                              height: 40,
                              onPressed: () => _openBookingSheet(car),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
