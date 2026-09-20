enum DealStatus {
  inquiry('INQUIRY', 'Initial Inquiry'),
  negotiation('NEGOTIATION', 'Confidential Negotiation'),
  offerSent('OFFER_SENT', 'Offer Submitted'),
  counterOffer('COUNTER_OFFER', 'Counter Offer Pending'),
  accepted('ACCEPTED', 'Terms Accepted'),
  paymentPending('PAYMENT_PENDING', 'Escrow / Settlement Pending'),
  completed('COMPLETED', 'Deal Settled & Delivered'),
  cancelled('CANCELLED', 'Negotiation Closed');

  final String code;
  final String label;
  const DealStatus(this.code, this.label);
}

class DealOffer {
  final String id;
  final String dealId;
  final String senderId;
  final String senderRole; // 'buyer' or 'seller'
  final double amount;
  final String currency;
  final String termsNote;
  final DateTime expiresAt;
  final String status; // 'pending', 'accepted', 'rejected', 'countered'
  final DateTime createdAt;

  const DealOffer({
    required this.id,
    required this.dealId,
    required this.senderId,
    required this.senderRole,
    required this.amount,
    required this.currency,
    required this.termsNote,
    required this.expiresAt,
    this.status = 'pending',
    required this.createdAt,
  });
}

class DealDocument {
  final String id;
  final String name;
  final String documentType; // 'proof_of_funds', 'title_deed', 'survey_report', 'escrow_contract'
  final String url;
  final String uploadedByRole;
  final DateTime uploadedAt;

  const DealDocument({
    required this.id,
    required this.name,
    required this.documentType,
    required this.url,
    required this.uploadedByRole,
    required this.uploadedAt,
  });
}

class DealMessage {
  final String id;
  final String senderId;
  final String senderName;
  final bool isFromCurrentUser;
  final String text;
  final DateTime timestamp;
  final DealOffer? attachedOffer;
  final DealDocument? attachedDoc;

  const DealMessage({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.isFromCurrentUser,
    required this.text,
    required this.timestamp,
    this.attachedOffer,
    this.attachedDoc,
  });
}

class PrivateDeal {
  final String id;
  final String listingId;
  final String assetTitle;
  final String assetImageUrl;
  final double listedPrice;
  final String currency;
  final String buyerId;
  final String buyerName;
  final String sellerId;
  final String sellerName;
  final DealStatus status;
  final double? activeAgreedAmount;
  final List<DealMessage> messages;
  final List<DealDocument> documents;
  final DateTime updatedAt;

  const PrivateDeal({
    required this.id,
    required this.listingId,
    required this.assetTitle,
    required this.assetImageUrl,
    required this.listedPrice,
    required this.currency,
    required this.buyerId,
    required this.buyerName,
    required this.sellerId,
    required this.sellerName,
    required this.status,
    this.activeAgreedAmount,
    this.messages = const [],
    this.documents = const [],
    required this.updatedAt,
  });

  PrivateDeal copyWith({
    DealStatus? status,
    double? activeAgreedAmount,
    List<DealMessage>? messages,
    List<DealDocument>? documents,
  }) {
    return PrivateDeal(
      id: id,
      listingId: listingId,
      assetTitle: assetTitle,
      assetImageUrl: assetImageUrl,
      listedPrice: listedPrice,
      currency: currency,
      buyerId: buyerId,
      buyerName: buyerName,
      sellerId: sellerId,
      sellerName: sellerName,
      status: status ?? this.status,
      activeAgreedAmount: activeAgreedAmount ?? this.activeAgreedAmount,
      messages: messages ?? this.messages,
      documents: documents ?? this.documents,
      updatedAt: DateTime.now(),
    );
  }
}
