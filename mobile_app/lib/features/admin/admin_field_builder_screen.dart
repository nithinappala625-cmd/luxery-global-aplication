import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/colors.dart';
import '../../core/constants/typography.dart';
import '../../core/widgets/luxury_app_bar.dart';
import '../../core/widgets/luxury_badge.dart';
import '../../core/widgets/luxury_button.dart';
import '../../core/widgets/luxury_text_field.dart';
import '../../models/attribute.dart';
import '../../providers/attributes_provider.dart';
import '../../providers/categories_provider.dart';

class AdminFieldBuilderScreen extends ConsumerStatefulWidget {
  const AdminFieldBuilderScreen({super.key});

  @override
  ConsumerState<AdminFieldBuilderScreen> createState() => _AdminFieldBuilderScreenState();
}

class _AdminFieldBuilderScreenState extends ConsumerState<AdminFieldBuilderScreen> {
  String? _selectedCategoryId;

  // New Field Controllers
  final _fieldNameController = TextEditingController();
  final _fieldSlugController = TextEditingController();
  final _fieldLabelController = TextEditingController();
  final _fieldUnitController = TextEditingController();
  AttributeDataType _selectedDataType = AttributeDataType.text;
  bool _newFieldRequired = false;
  bool _newFieldFilterable = true;
  final List<String> _newFieldOptions = [];
  final _newOptionController = TextEditingController();

  @override
  void dispose() {
    _fieldNameController.dispose();
    _fieldSlugController.dispose();
    _fieldLabelController.dispose();
    _fieldUnitController.dispose();
    _newOptionController.dispose();
    super.dispose();
  }

  void _openAddFieldSheet(String categoryId) {
    _fieldNameController.clear();
    _fieldSlugController.clear();
    _fieldLabelController.clear();
    _fieldUnitController.clear();
    _newOptionController.clear();
    _newFieldOptions.clear();
    _selectedDataType = AttributeDataType.text;
    _newFieldRequired = false;
    _newFieldFilterable = true;

    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (modalContext, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(modalContext).viewInsets.bottom + 20,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'DEFINE NEW SPECIFICATION FIELD',
                          style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, size: 20),
                          onPressed: () => Navigator.pop(modalContext),
                        ),
                      ],
                    ),
                    const Divider(height: 16),
                    LuxuryTextField(
                      label: 'FIELD LABEL (DISPLAYED TO SELLER)',
                      controller: _fieldLabelController,
                      hintText: 'e.g. Water Resistance / Fluorescence',
                      onChanged: (val) {
                        setModalState(() {
                          _fieldNameController.text = val;
                          _fieldSlugController.text = val
                              .toLowerCase()
                              .replaceAll(RegExp(r'[^a-z0-9]+'), '_')
                              .replaceAll(RegExp(r'^_+|_+$'), '');
                        });
                      },
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: LuxuryTextField(
                            label: 'TECHNICAL SLUG',
                            controller: _fieldSlugController,
                            hintText: 'water_resistance',
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: LuxuryTextField(
                            label: 'UNIT (OPTIONAL)',
                            controller: _fieldUnitController,
                            hintText: 'e.g. mm, carats, m, hp',
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'DATA TYPE',
                      style: LuxuryTypography.microCaps.copyWith(
                        fontWeight: FontWeight.w700,
                        fontSize: 9.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<AttributeDataType>(
                      value: _selectedDataType,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                        border: OutlineInputBorder(
                          borderSide: BorderSide(
                            color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                          ),
                        ),
                      ),
                      items: AttributeDataType.values.map((type) {
                        return DropdownMenuItem(
                          value: type,
                          child: Text('${type.code} (${type.label})', style: LuxuryTypography.bodySmall),
                        );
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) {
                          setModalState(() => _selectedDataType = val);
                        }
                      },
                    ),

                    // Options builder if select or multiSelect
                    if (_selectedDataType == AttributeDataType.select ||
                        _selectedDataType == AttributeDataType.multiSelect) ...[
                      const SizedBox(height: 16),
                      Text(
                        'SELECTION OPTIONS',
                        style: LuxuryTypography.microCaps.copyWith(
                          fontWeight: FontWeight.w700,
                          fontSize: 9.5,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          Expanded(
                            child: LuxuryTextField(
                              controller: _newOptionController,
                              hintText: 'Add option (e.g. Platinum 950)...',
                            ),
                          ),
                          const SizedBox(width: 8),
                          IconButton(
                            icon: const Icon(Icons.add_circle, color: LuxuryColors.champagne),
                            onPressed: () {
                              if (_newOptionController.text.trim().isNotEmpty) {
                                setModalState(() {
                                  _newFieldOptions.add(_newOptionController.text.trim());
                                  _newOptionController.clear();
                                });
                              }
                            },
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 6,
                        runSpacing: 6,
                        children: _newFieldOptions.map((opt) {
                          return Chip(
                            label: Text(opt, style: LuxuryTypography.bodySmall.copyWith(fontSize: 11)),
                            deleteIcon: const Icon(Icons.close, size: 14),
                            onDeleted: () {
                              setModalState(() => _newFieldOptions.remove(opt));
                            },
                          );
                        }).toList(),
                      ),
                    ],

                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Checkbox(
                          value: _newFieldRequired,
                          activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          onChanged: (v) => setModalState(() => _newFieldRequired = v ?? false),
                        ),
                        const SizedBox(width: 4),
                        Text('Required for Seller', style: LuxuryTypography.bodySmall),
                        const SizedBox(width: 16),
                        Checkbox(
                          value: _newFieldFilterable,
                          activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                          onChanged: (v) => setModalState(() => _newFieldFilterable = v ?? false),
                        ),
                        const SizedBox(width: 4),
                        Text('Include in Filters', style: LuxuryTypography.bodySmall),
                      ],
                    ),

                    const SizedBox(height: 20),
                    LuxuryButton(
                      text: 'PUBLISH DYNAMIC ATTRIBUTE',
                      variant: LuxuryButtonVariant.gold,
                      onPressed: () {
                        if (_fieldLabelController.text.trim().isEmpty) return;

                        ref.read(attributesProvider.notifier).addAttributeDefinition(
                              categoryId: categoryId,
                              name: _fieldNameController.text.isNotEmpty
                                  ? _fieldNameController.text
                                  : _fieldLabelController.text,
                              slug: _fieldSlugController.text.isNotEmpty
                                  ? _fieldSlugController.text
                                  : _fieldLabelController.text.toLowerCase().replaceAll(' ', '_'),
                              label: _fieldLabelController.text,
                              dataType: _selectedDataType,
                              unit: _fieldUnitController.text.isNotEmpty ? _fieldUnitController.text : null,
                              required: _newFieldRequired,
                              filterable: _newFieldFilterable,
                              options: List.from(_newFieldOptions),
                            );

                        Navigator.pop(modalContext);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Field "${_fieldLabelController.text}" added dynamically.'),
                            backgroundColor: LuxuryColors.deepForestGreen,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final categories = ref.watch(categoriesProvider);
    final activeCatId = _selectedCategoryId ?? (categories.isNotEmpty ? categories.first.id : 'c1000000-0000-0000-0000-000000000001');
    final activeCategory = categories.firstWhere(
      (c) => c.id == activeCatId,
      orElse: () => categories.first,
    );

    final fields = ref.watch(categoryAttributesProvider(activeCatId));
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: LuxuryAppBar(
        title: 'DYNAMIC FIELD BUILDER',
        showBackButton: true,
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
        foregroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
        icon: const Icon(Icons.add),
        label: Text('ADD FIELD', style: LuxuryTypography.buttonLabel),
        onPressed: () => _openAddFieldSheet(activeCatId),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Category Selector Chips
          Container(
            padding: const EdgeInsets.symmetric(vertical: 12),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              border: Border(
                bottom: BorderSide(
                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                ),
              ),
            ),
            child: SizedBox(
              height: 40,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                scrollDirection: Axis.horizontal,
                itemCount: categories.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (ctx, i) {
                  final cat = categories[i];
                  final isSelected = cat.id == activeCatId;
                  return ChoiceChip(
                    label: Text(cat.name.toUpperCase()),
                    selected: isSelected,
                    selectedColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    backgroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.champagneLight,
                    labelStyle: LuxuryTypography.microCaps.copyWith(
                      color: isSelected
                          ? (isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite)
                          : (isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal),
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
                      fontSize: 9.5,
                    ),
                    onSelected: (_) {
                      setState(() => _selectedCategoryId = cat.id);
                    },
                  );
                },
              ),
            ),
          ),

          // Header summary info
          Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${activeCategory.name.toUpperCase()} ATTRIBUTES',
                      style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 16),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${fields.length} dynamic attributes configured in registry',
                      style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
                    ),
                  ],
                ),
                LuxuryBadge(
                  label: '${fields.where((f) => f.required).length} REQUIRED',
                  textColor: LuxuryColors.champagne,
                  borderColor: LuxuryColors.champagne,
                ),
              ],
            ),
          ),

          // Fields list
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              itemCount: fields.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (ctx, index) {
                final field = fields[index];
                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(
                      color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(
                                      field.label,
                                      style: LuxuryTypography.editorialHeading3.copyWith(fontSize: 15),
                                    ),
                                    if (field.unit != null) ...[
                                      const SizedBox(width: 6),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: isDark ? LuxuryColors.borderDark : LuxuryColors.champagneLight,
                                          borderRadius: BorderRadius.circular(2),
                                        ),
                                        child: Text(
                                          field.unit!,
                                          style: LuxuryTypography.microCaps.copyWith(
                                            color: LuxuryColors.champagne,
                                            fontSize: 8.5,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ],
                                ),
                                const SizedBox(height: 3),
                                Text(
                                  'slug: ${field.slug} • type: ${field.dataType.code}',
                                  style: LuxuryTypography.microCaps.copyWith(
                                    color: LuxuryColors.mutedGrey,
                                    fontSize: 8.5,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Switch(
                            value: field.required,
                            activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                            onChanged: (_) {
                              ref.read(attributesProvider.notifier).toggleFieldRequired(field.id);
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, size: 20, color: LuxuryColors.mutedGrey),
                            onPressed: () {
                              ref.read(attributesProvider.notifier).deleteAttributeDefinition(field.id);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Field "${field.label}" deleted.')),
                              );
                            },
                          ),
                        ],
                      ),
                      if (field.options.isNotEmpty) ...[
                        const Divider(height: 16),
                        Text(
                          'OPTIONS (${field.options.length}):',
                          style: LuxuryTypography.microCaps.copyWith(
                            color: LuxuryColors.mutedGrey,
                            fontSize: 8.0,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: field.options.map((opt) {
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: isDark ? LuxuryColors.pureBlack : const Color(0xFFF0EFEA),
                                borderRadius: BorderRadius.circular(2),
                                border: Border.all(
                                  color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                                ),
                              ),
                              child: Text(
                                opt,
                                style: LuxuryTypography.bodySmall.copyWith(fontSize: 10),
                              ),
                            );
                          }).toList(),
                        ),
                      ],
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
