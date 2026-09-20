import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../models/attribute.dart';

class AttributesNotifier extends StateNotifier<List<AttributeDefinition>> {
  AttributesNotifier() : super(_initialDefinitions);

  static const _uuid = Uuid();

  List<AttributeDefinition> getFieldsForCategory(String categoryId) {
    return state
        .where((def) => def.categoryId == categoryId && def.active)
        .toList()
      ..sort((a, b) => a.displayOrder.compareTo(b.displayOrder));
  }

  void addAttributeDefinition({
    required String categoryId,
    required String name,
    required String slug,
    required String label,
    String? description,
    required AttributeDataType dataType,
    String? unit,
    bool required = false,
    bool filterable = false,
    List<String> options = const [],
  }) {
    final newDef = AttributeDefinition(
      id: _uuid.v4(),
      categoryId: categoryId,
      name: name,
      slug: slug,
      label: label,
      description: description,
      dataType: dataType,
      unit: unit,
      required: required,
      filterable: filterable,
      searchable: true,
      displayOrder: state.where((d) => d.categoryId == categoryId).length + 1,
      options: options,
    );
    state = [...state, newDef];
  }

  void updateAttributeDefinition(AttributeDefinition updated) {
    state = [
      for (final def in state)
        if (def.id == updated.id) updated else def,
    ];
  }

  void toggleFieldRequired(String id) {
    state = [
      for (final def in state)
        if (def.id == id) def.copyWith(required: !def.required) else def,
    ];
  }

  void toggleFieldActive(String id) {
    state = [
      for (final def in state)
        if (def.id == id) def.copyWith(active: !def.active) else def,
    ];
  }

  void addOptionToField(String id, String option) {
    state = [
      for (final def in state)
        if (def.id == id)
          def.copyWith(options: [...def.options, option])
        else
          def,
    ];
  }

  void removeOptionFromField(String id, String option) {
    state = [
      for (final def in state)
        if (def.id == id)
          def.copyWith(options: def.options.where((o) => o != option).toList())
        else
          def,
    ];
  }

  void deleteAttributeDefinition(String id) {
    state = state.where((def) => def.id != id).toList();
  }

  static final List<AttributeDefinition> _initialDefinitions = [
    // ----------------------------------------------------
    // 1. LUXURY WATCHES (c1000000-0000-0000-0000-000000000001)
    // ----------------------------------------------------
    const AttributeDefinition(
      id: 'def-w-1',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Reference Number',
      slug: 'reference_number',
      label: 'Reference Number',
      description: 'Manufacturer reference code (e.g. 5270P-001, 116500LN)',
      dataType: AttributeDataType.text,
      required: true,
      filterable: true,
      searchable: true,
      displayOrder: 1,
    ),
    const AttributeDefinition(
      id: 'def-w-2',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Movement',
      slug: 'movement',
      label: 'Movement Type',
      description: 'Mechanical caliber mechanism',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      searchable: true,
      displayOrder: 2,
      options: ['Automatic', 'Manual-Wind', 'Quartz', 'Tourbillon', 'Spring Drive', 'Other'],
    ),
    const AttributeDefinition(
      id: 'def-w-3',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Case Material',
      slug: 'case_material',
      label: 'Case Material',
      description: 'Primary metal or composite',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 3,
      options: ['950 Platinum', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Stainless Steel', 'Titanium', 'Ceramic', 'Carbon Composite', 'Other'],
    ),
    const AttributeDefinition(
      id: 'def-w-4',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Case Diameter',
      slug: 'case_diameter',
      label: 'Case Diameter',
      unit: 'mm',
      dataType: AttributeDataType.number,
      required: true,
      filterable: true,
      displayOrder: 4,
    ),
    const AttributeDefinition(
      id: 'def-w-5',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Dial Color',
      slug: 'dial_color',
      label: 'Dial Color & Finish',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 5,
      options: ['Golden Opaline Salmon', 'Black Lacquer', 'Deep Blue Sunburst', 'Silver / White', 'Olive Green', 'Skeleton / Openworked', 'Champagne', 'Meteorite'],
    ),
    const AttributeDefinition(
      id: 'def-w-6',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Complications',
      slug: 'complications',
      label: 'Complications',
      dataType: AttributeDataType.multiSelect,
      required: false,
      filterable: true,
      displayOrder: 6,
      options: ['Perpetual Calendar', 'Chronograph', 'Tourbillon', 'Moonphase', 'Minute Repeater', 'GMT / Dual Time', 'Annual Calendar', 'World Time', 'Power Reserve Indicator'],
    ),
    const AttributeDefinition(
      id: 'def-w-7',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Water Resistance',
      slug: 'water_resistance',
      label: 'Water Resistance',
      unit: 'meters',
      dataType: AttributeDataType.number,
      required: false,
      displayOrder: 7,
    ),
    const AttributeDefinition(
      id: 'def-w-8',
      categoryId: 'c1000000-0000-0000-0000-000000000001',
      name: 'Box & Papers',
      slug: 'box_and_papers',
      label: 'Box & Papers Provenance',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 8,
      options: ['Full Collector Set (Box & Papers)', 'Papers Only', 'Box Only', 'Watch Only (Archive Extract Available)'],
    ),

    // ----------------------------------------------------
    // 2. FINE JEWELLERY & DIAMONDS (c1000000-0000-0000-0000-000000000002)
    // ----------------------------------------------------
    const AttributeDefinition(
      id: 'def-j-1',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Jewellery Type',
      slug: 'jewellery_type',
      label: 'Jewellery Classification',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 1,
      options: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Bangle', 'Pendant', 'Brooch', 'Tiara', 'High Joaillerie Set', 'Other'],
    ),
    const AttributeDefinition(
      id: 'def-j-2',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Precious Metal',
      slug: 'precious_metal',
      label: 'Mounting / Precious Metal',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 2,
      options: ['Platinum 950', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Platinum & 18k Gold Duo', 'Fine Silver', 'Other'],
    ),
    const AttributeDefinition(
      id: 'def-j-3',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Primary Gemstone',
      slug: 'primary_gemstone',
      label: 'Primary Gemstone',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 3,
      options: ['Natural Diamond', 'Fancy Colored Diamond', 'Zambian Emerald', 'Burmese Ruby', 'Ceylon Sapphire', 'Paraiba Tourmaline', 'Natural Pearl', 'Metal Only (No Stone)'],
    ),
    const AttributeDefinition(
      id: 'def-j-4',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Diamond Origin',
      slug: 'diamond_origin',
      label: 'Diamond Origin',
      dataType: AttributeDataType.select,
      required: true,
      displayOrder: 4,
      options: ['Natural Earth-Mined (Ethically Sourced)', 'Laboratory Grown', 'Not Applicable'],
    ),
    const AttributeDefinition(
      id: 'def-j-5',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Carat Weight',
      slug: 'carat_weight',
      label: 'Center Stone Carat Weight',
      unit: 'carats',
      dataType: AttributeDataType.decimal,
      required: true,
      filterable: true,
      displayOrder: 5,
    ),
    const AttributeDefinition(
      id: 'def-j-6',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Cut & Shape',
      slug: 'cut_shape',
      label: 'Cut & Geometric Shape',
      dataType: AttributeDataType.select,
      required: false,
      displayOrder: 6,
      options: ['Round Brilliant', 'Radiant Cut', 'Emerald Cut', 'Cushion Cut', 'Pear Shape', 'Oval', 'Heart Shape', 'Marquise', 'Asscher'],
    ),
    const AttributeDefinition(
      id: 'def-j-7',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Color Grade',
      slug: 'color_grade',
      label: 'Color Grade',
      dataType: AttributeDataType.select,
      required: false,
      displayOrder: 7,
      options: ['D (Colorless)', 'E (Colorless)', 'F (Colorless)', 'G (Near Colorless)', 'Fancy Vivid Yellow', 'Fancy Intense Yellow', 'Fancy Pink', 'Fancy Blue'],
    ),
    const AttributeDefinition(
      id: 'def-j-8',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Clarity Grade',
      slug: 'clarity_grade',
      label: 'Clarity Grade',
      dataType: AttributeDataType.select,
      required: false,
      displayOrder: 8,
      options: ['FL (Flawless)', 'IF (Internally Flawless)', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1'],
    ),
    const AttributeDefinition(
      id: 'def-j-9',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Certification Laboratory',
      slug: 'cert_lab',
      label: 'Grading Laboratory Certificate',
      dataType: AttributeDataType.select,
      required: true,
      displayOrder: 9,
      options: ['GIA (Gemological Institute of America)', 'SSEF Swiss Gemmological Institute', 'Gübelin Gem Lab', 'IGI', 'HRD Antwerp', 'None / In-House Appraisal'],
    ),
    const AttributeDefinition(
      id: 'def-j-10',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'Certificate Number',
      slug: 'cert_number',
      label: 'Certificate / Dossier Number',
      dataType: AttributeDataType.text,
      required: false,
      searchable: true,
      displayOrder: 10,
    ),
    const AttributeDefinition(
      id: 'def-j-11',
      categoryId: 'c1000000-0000-0000-0000-000000000002',
      name: 'GIA / IGI Certification File',
      slug: 'cert_document',
      label: 'Attach GIA / IGI Certificate Dossier (PDF / Scan)',
      dataType: AttributeDataType.file,
      required: false,
      displayOrder: 11,
    ),

    // ----------------------------------------------------
    // 3. LUXURY & EXOTIC CARS (c1000000-0000-0000-0000-000000000003)
    // ----------------------------------------------------
    const AttributeDefinition(
      id: 'def-c-1',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Make',
      slug: 'make',
      label: 'Manufacturer / Make',
      dataType: AttributeDataType.text,
      required: true,
      filterable: true,
      searchable: true,
      displayOrder: 1,
    ),
    const AttributeDefinition(
      id: 'def-c-2',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Model & Spec',
      slug: 'model_spec',
      label: 'Model Designation & Package',
      description: 'e.g. SF90 Stradale Assetto Fiorano, GT3 RS Weissach',
      dataType: AttributeDataType.text,
      required: true,
      filterable: true,
      searchable: true,
      displayOrder: 2,
    ),
    const AttributeDefinition(
      id: 'def-c-3',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Odometer Mileage',
      slug: 'mileage',
      label: 'Verified Mileage',
      unit: 'km',
      dataType: AttributeDataType.number,
      required: true,
      filterable: true,
      displayOrder: 3,
    ),
    const AttributeDefinition(
      id: 'def-c-4',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Engine Configuration',
      slug: 'engine_config',
      label: 'Powertrain / Engine Layout',
      dataType: AttributeDataType.select,
      required: true,
      displayOrder: 4,
      options: ['Naturally Aspirated V12', 'Twin-Turbo V8 + Hybrid', 'Naturally Aspirated Flat-6', 'Twin-Turbo V12', 'Quad-Turbo W16', 'All-Electric (BEV)', 'Other'],
    ),
    const AttributeDefinition(
      id: 'def-c-5',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Total Output',
      slug: 'power_output',
      label: 'Power Output',
      unit: 'bhp',
      dataType: AttributeDataType.number,
      required: true,
      displayOrder: 5,
    ),
    const AttributeDefinition(
      id: 'def-c-6',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Transmission',
      slug: 'transmission',
      label: 'Gearbox / Transmission',
      dataType: AttributeDataType.select,
      required: true,
      displayOrder: 6,
      options: ['Dual-Clutch PDK/DCT', 'Manual Gated 6-Speed', 'Sequential Racing', 'Automatic Torque-Converter', 'Direct EV Drive'],
    ),
    const AttributeDefinition(
      id: 'def-c-7',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'VIN / Chassis Number',
      slug: 'vin_number',
      label: 'VIN / Chassis (Confidential)',
      description: 'Stored privately for provenance vetting',
      dataType: AttributeDataType.text,
      required: false,
      displayOrder: 7,
    ),
    const AttributeDefinition(
      id: 'def-c-8',
      categoryId: 'c1000000-0000-0000-0000-000000000003',
      name: 'Title & Service Dossier',
      slug: 'car_title_dossier',
      label: 'Attach Title & Service Dossier (PDF / Scan)',
      dataType: AttributeDataType.file,
      required: false,
      displayOrder: 8,
    ),

    // ----------------------------------------------------
    // 4. YACHTS & MARINE (c1000000-0000-0000-0000-000000000004)
    // ----------------------------------------------------
    const AttributeDefinition(
      id: 'def-y-1',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Vessel Name',
      slug: 'vessel_name',
      label: 'Vessel Name',
      dataType: AttributeDataType.text,
      required: true,
      searchable: true,
      displayOrder: 1,
    ),
    const AttributeDefinition(
      id: 'def-y-2',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Shipyard / Builder',
      slug: 'builder',
      label: 'Naval Builder / Shipyard',
      dataType: AttributeDataType.text,
      required: true,
      filterable: true,
      searchable: true,
      displayOrder: 2,
    ),
    const AttributeDefinition(
      id: 'def-y-3',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Vessel Classification',
      slug: 'vessel_type',
      label: 'Vessel Classification',
      dataType: AttributeDataType.select,
      required: true,
      filterable: true,
      displayOrder: 3,
      options: ['Motor Yacht', 'Catamaran (Sail)', 'Sportfly / Open Cruiser', 'Superyacht (40m+)', 'Power Catamaran', 'Sailing Yacht', 'Explorer Yacht'],
    ),
    const AttributeDefinition(
      id: 'def-y-4',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Length Overall (LOA)',
      slug: 'length_overall',
      label: 'Length Overall (LOA)',
      unit: 'meters',
      dataType: AttributeDataType.decimal,
      required: true,
      filterable: true,
      displayOrder: 4,
    ),
    const AttributeDefinition(
      id: 'def-y-5',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Beam Width',
      slug: 'beam',
      label: 'Beam Width',
      unit: 'meters',
      dataType: AttributeDataType.decimal,
      required: true,
      displayOrder: 5,
    ),
    const AttributeDefinition(
      id: 'def-y-6',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Draft Depth',
      slug: 'draft',
      label: 'Draft Depth',
      unit: 'meters',
      dataType: AttributeDataType.decimal,
      required: false,
      displayOrder: 6,
    ),
    const AttributeDefinition(
      id: 'def-y-7',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Guest Staterooms',
      slug: 'guest_cabins',
      label: 'Guest Staterooms / Cabins',
      dataType: AttributeDataType.number,
      required: true,
      displayOrder: 7,
    ),
    const AttributeDefinition(
      id: 'def-y-8',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Engine Operating Hours',
      slug: 'engine_hours',
      label: 'Engine Running Hours',
      unit: 'hours',
      dataType: AttributeDataType.number,
      required: true,
      displayOrder: 8,
    ),
    const AttributeDefinition(
      id: 'def-y-9',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'VAT Compliance',
      slug: 'vat_status',
      label: 'VAT Status',
      dataType: AttributeDataType.select,
      required: true,
      displayOrder: 9,
      options: ['VAT Paid', 'VAT Not Paid', 'Commercial Exemption', 'Export Scheme Eligible'],
    ),
    const AttributeDefinition(
      id: 'def-y-10',
      categoryId: 'c1000000-0000-0000-0000-000000000004',
      name: 'Survey & Registry Dossier',
      slug: 'yacht_registry_dossier',
      label: 'Attach Lloyd\'s / RINA / Registry Dossier (PDF / Scan)',
      dataType: AttributeDataType.file,
      required: false,
      displayOrder: 10,
    ),
  ];
}

final attributesProvider = StateNotifierProvider<AttributesNotifier, List<AttributeDefinition>>((ref) {
  return AttributesNotifier();
});

final categoryAttributesProvider = Provider.family<List<AttributeDefinition>, String>((ref, categoryId) {
  final all = ref.watch(attributesProvider);
  return all
      .where((def) => def.categoryId == categoryId && def.active)
      .toList()
    ..sort((a, b) => a.displayOrder.compareTo(b.displayOrder));
});
