enum MembershipTier {
  access('NP_ACCESS', 'NP Access', 'Marketplace privileges & verified alerts'),
  prive('NP_PRIVE', 'NP Privé', 'Premium client access & 10 monthly contact unlocks'),
  black('NP_BLACK', 'NP Black', 'Sovereign unlimited access, private jet concierge & deal rooms');

  final String code;
  final String title;
  final String subtitle;
  const MembershipTier(this.code, this.title, this.subtitle);
}

class MembershipPlan {
  final MembershipTier tier;
  final double monthlyPriceInr;
  final double annualPriceInr;
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
    required this.monthlyContactCredits,
    this.priorityRequests = false,
    this.vipAuctionAccess = false,
    this.privateDealRoomAccess = false,
    this.zeroBuyerPremium = false,
    required this.perks,
  });
}
