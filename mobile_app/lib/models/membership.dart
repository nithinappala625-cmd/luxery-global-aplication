enum MembershipTier {
  access('NP_SELECT', 'Sovereign Select', 'Buying Power: Up to ₹1 Crore', 10000, 100000),
  prive('NP_PRIVE', 'Privé Gold', 'Buying Power: ₹1 Cr – ₹50 Crore', 100000, 1000000),
  black('NP_OBSIDIAN', 'Obsidian Royal Patron', 'Buying Power: ₹50 Cr – ₹500 Crore', 1500000, 15000000),
  dynasty('NP_DYNASTY', 'The Dynasty Syndicate', 'Buying Power: Above ₹500 Crore', 10000000, 100000000);

  final String code;
  final String title;
  final String buyingPower;
  final double feeInr;
  final double annualFeeInr;
  const MembershipTier(this.code, this.title, this.buyingPower, this.feeInr, this.annualFeeInr);

  String get subtitle => buyingPower;
}

class MembershipPlan {
  final MembershipTier tier;
  final double monthlyPriceInr;
  final double annualPriceInr;
  final String buyingPowerLimit;
  final int monthlyContactCredits;
  final bool priorityRequests;
  final bool vipAuctionAccess;
  final bool privateDealRoomAccess;
  final bool zeroBuyerPremium;
  final List<String> perks;

  const MembershipPlan({
    required this.tier,
    required this.monthlyPriceInr,
    required this.annualPriceInr,
    required this.buyingPowerLimit,
    required this.monthlyContactCredits,
    this.priorityRequests = false,
    this.vipAuctionAccess = false,
    this.privateDealRoomAccess = false,
    this.zeroBuyerPremium = false,
    required this.perks,
  });
}
