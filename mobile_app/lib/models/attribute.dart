enum AttributeDataType {
  text('TEXT', 'Text String'),
  longText('LONG_TEXT', 'Paragraph / Narrative'),
  number('NUMBER', 'Integer Number'),
  decimal('DECIMAL', 'Decimal Value'),
  boolean('BOOLEAN', 'Yes / No Toggle'),
  date('DATE', 'Calendar Date'),
  select('SELECT', 'Single Selection List'),
  multiSelect('MULTI_SELECT', 'Multiple Selection Tags'),
  currency('CURRENCY', 'Monetary Valuation'),
  url('URL', 'Web Link / Report URL');

  final String code;
  final String label;
  const AttributeDataType(this.code, this.label);

  static AttributeDataType fromCode(String code) {
    return AttributeDataType.values.firstWhere(
      (e) => e.code == code || e.name.toLowerCase() == code.toLowerCase(),
      orElse: () => AttributeDataType.text,
    );
  }
}

class AttributeDefinition {
  final String id;
  final String categoryId;
  final String name;
  final String slug;
  final String label;
  final String? description;
  final AttributeDataType dataType;
  final String? unit; // 'carats', 'mm', 'meters', 'hp', 'hrs', 'km'
  final bool required;
  final bool sellerEditable;
  final bool adminOnly;
  final int displayOrder;
  final bool filterable;
  final bool searchable;
  final bool active;
  final List<String> options;

  const AttributeDefinition({
    required this.id,
    required this.categoryId,
    required this.name,
    required this.slug,
    required this.label,
    this.description,
    required this.dataType,
    this.unit,
    this.required = false,
    this.sellerEditable = true,
    this.adminOnly = false,
    this.displayOrder = 0,
    this.filterable = false,
    this.searchable = false,
    this.active = true,
    this.options = const [],
  });

  AttributeDefinition copyWith({
    String? name,
    String? slug,
    String? label,
    String? description,
    AttributeDataType? dataType,
    String? unit,
    bool? required,
    bool? filterable,
    bool? searchable,
    bool? active,
    List<String>? options,
    int? displayOrder,
  }) {
    return AttributeDefinition(
      id: id,
      categoryId: categoryId,
      name: name ?? this.name,
      slug: slug ?? this.slug,
      label: label ?? this.label,
      description: description ?? this.description,
      dataType: dataType ?? this.dataType,
      unit: unit ?? this.unit,
      required: required ?? this.required,
      sellerEditable: sellerEditable,
      adminOnly: adminOnly,
      displayOrder: displayOrder ?? this.displayOrder,
      filterable: filterable ?? this.filterable,
      searchable: searchable ?? this.searchable,
      active: active ?? this.active,
      options: options ?? this.options,
    );
  }
}

class ListingAttribute {
  final String id;
  final String listingId;
  final String attributeDefinitionId;
  final String? valueText;
  final double? valueNumber;
  final bool? valueBoolean;
  final DateTime? valueDate;
  final dynamic valueJson;

  const ListingAttribute({
    required this.id,
    required this.listingId,
    required this.attributeDefinitionId,
    this.valueText,
    this.valueNumber,
    this.valueBoolean,
    this.valueDate,
    this.valueJson,
  });

  String get formattedValue {
    if (valueBoolean != null) {
      return valueBoolean! ? 'Yes' : 'No';
    }
    if (valueNumber != null) {
      return valueNumber.toString();
    }
    if (valueText != null && valueText!.isNotEmpty) {
      return valueText!;
    }
    if (valueJson != null) {
      if (valueJson is List) {
        return (valueJson as List).join(', ');
      }
      return valueJson.toString();
    }
    return '—';
  }
}
