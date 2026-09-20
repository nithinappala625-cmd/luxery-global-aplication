class FoundingSellerCampaign {
  final int totalSlots;
  final int claimedSlots;
  final String campaignName;
  final double commissionWaiverMonths;
  final List<String> exclusivePrivileges;

  const FoundingSellerCampaign({
    this.totalSlots = 50,
    this.claimedSlots = 38,
    this.campaignName = 'FIRST 50 FOUNDING SELLERS',
    this.commissionWaiverMonths = 12.0,
    this.exclusivePrivileges = const [
      '0% Commission on first ₹50 Crore in transactions',
      'Permanent Gold "Founding Seller" Verified Crest',
      'Priority Homepage Hero & Featured Discovery placement',
      'Direct WhatsApp Line to NP GROUPS Curatorial Committee',
      'Complimentary NP BLACK Executive Membership for 2 Years',
    ],
  });

  int get remainingSlots => totalSlots - claimedSlots;
}
