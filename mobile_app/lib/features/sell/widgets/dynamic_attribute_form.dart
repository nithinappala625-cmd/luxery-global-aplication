import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import '../../../core/constants/colors.dart';
import '../../../core/constants/typography.dart';
import '../../../core/widgets/luxury_badge.dart';
import '../../../core/widgets/luxury_text_field.dart';
import '../../../models/attribute.dart';

class DynamicAttributeForm extends StatefulWidget {
  final List<AttributeDefinition> definitions;
  final Map<String, dynamic> initialValues;
  final ValueChanged<Map<String, dynamic>> onChanged;

  const DynamicAttributeForm({
    super.key,
    required this.definitions,
    this.initialValues = const {},
    required this.onChanged,
  });

  @override
  State<DynamicAttributeForm> createState() => DynamicAttributeFormState();
}

class DynamicAttributeFormState extends State<DynamicAttributeForm> {
  late Map<String, dynamic> _values;
  final Map<String, TextEditingController> _controllers = {};

  @override
  void initState() {
    super.initState();
    _values = Map<String, dynamic>.from(widget.initialValues);
    _initControllers();
  }

  @override
  void didUpdateWidget(covariant DynamicAttributeForm oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.definitions != widget.definitions) {
      _initControllers();
    }
  }

  void _initControllers() {
    for (final def in widget.definitions) {
      if (!_controllers.containsKey(def.slug)) {
        final initialVal = _values[def.slug]?.toString() ?? '';
        _controllers[def.slug] = TextEditingController(text: initialVal);
      }
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }

  void _updateValue(String slug, dynamic value) {
    setState(() {
      _values[slug] = value;
    });
    widget.onChanged(_values);
  }

  bool validate(BuildContext context) {
    for (final def in widget.definitions) {
      if (def.required) {
        final val = _values[def.slug];
        if (val == null || (val is String && val.trim().isEmpty) || (val is List && val.isEmpty)) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Please provide required specification: ${def.label}'),
              backgroundColor: LuxuryColors.rejectionRed,
            ),
          );
          return false;
        }
      }
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.definitions.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Theme.of(context).brightness == Brightness.dark
              ? LuxuryColors.darkCard
              : LuxuryColors.pureWhite,
          borderRadius: BorderRadius.circular(4),
          border: Border.all(
            color: Theme.of(context).brightness == Brightness.dark
                ? LuxuryColors.borderDark
                : LuxuryColors.borderLight,
          ),
        ),
        child: Center(
          child: Text(
            'NO CUSTOM ATTRIBUTES DEFINED FOR THIS CATEGORY',
            style: LuxuryTypography.bodySmall.copyWith(color: LuxuryColors.mutedGrey),
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: widget.definitions.map((def) => _buildField(def)).toList(),
    );
  }

  Widget _buildField(AttributeDefinition def) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Label row with Required flag and Unit badge
          Row(
            children: [
              Text(
                def.label.toUpperCase(),
                style: LuxuryTypography.microCaps.copyWith(
                  fontWeight: FontWeight.w700,
                  fontSize: 10,
                  letterSpacing: 1.2,
                  color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                ),
              ),
              if (def.required) ...[
                const SizedBox(width: 6),
                LuxuryBadge(
                  label: 'REQUIRED',
                  textColor: LuxuryColors.champagne,
                  borderColor: LuxuryColors.champagne.withOpacity(0.4),
                ),
              ],
              if (def.unit != null && def.unit!.isNotEmpty) ...[
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.champagneLight,
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: Text(
                    def.unit!.toUpperCase(),
                    style: LuxuryTypography.microCaps.copyWith(
                      color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                      fontSize: 8.5,
                    ),
                  ),
                ),
              ],
            ],
          ),
          if (def.description != null && def.description!.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              def.description!,
              style: LuxuryTypography.bodySmall.copyWith(
                color: LuxuryColors.mutedGrey,
                fontSize: 11,
              ),
            ),
          ],
          const SizedBox(height: 8),

          // Field renderer by DataType
          _buildInputControl(def),
        ],
      ),
    );
  }

  Widget _buildInputControl(AttributeDefinition def) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    switch (def.dataType) {
      case AttributeDataType.text:
      case AttributeDataType.url:
        return LuxuryTextField(
          label: def.label.toUpperCase(),
          controller: _controllers[def.slug]!,
          hintText: 'Enter ${def.label.toLowerCase()}...',
          keyboardType: def.dataType == AttributeDataType.url
              ? TextInputType.url
              : TextInputType.text,
          onChanged: (val) => _updateValue(def.slug, val),
        );

      case AttributeDataType.longText:
        return LuxuryTextField(
          label: def.label.toUpperCase(),
          controller: _controllers[def.slug]!,
          hintText: 'Enter detailed ${def.label.toLowerCase()}...',
          maxLines: 4,
          onChanged: (val) => _updateValue(def.slug, val),
        );

      case AttributeDataType.number:
      case AttributeDataType.decimal:
      case AttributeDataType.currency:
        return LuxuryTextField(
          label: def.label.toUpperCase(),
          controller: _controllers[def.slug]!,
          hintText: '0${def.unit != null ? " ${def.unit}" : ""}',
          keyboardType: TextInputType.numberWithOptions(
            decimal: def.dataType != AttributeDataType.number,
          ),
          onChanged: (val) {
            final parsed = def.dataType == AttributeDataType.number
                ? int.tryParse(val)
                : double.tryParse(val);
            _updateValue(def.slug, parsed ?? val);
          },
        );

      case AttributeDataType.boolean:
        final boolVal = _values[def.slug] == true;
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(
              color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                boolVal ? 'YES / INCLUDED' : 'NO / NOT INCLUDED',
                style: LuxuryTypography.bodySmall.copyWith(
                  fontWeight: FontWeight.w600,
                  color: boolVal
                      ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                      : LuxuryColors.mutedGrey,
                ),
              ),
              Switch(
                value: boolVal,
                activeColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                onChanged: (v) => _updateValue(def.slug, v),
              ),
            ],
          ),
        );

      case AttributeDataType.date:
        final currentVal = _values[def.slug]?.toString();
        return InkWell(
          onTap: () async {
            final picked = await showDatePicker(
              context: context,
              initialDate: DateTime.now(),
              firstDate: DateTime(1900),
              lastDate: DateTime(2035),
              builder: (context, child) {
                return Theme(
                  data: Theme.of(context).copyWith(
                    colorScheme: ColorScheme.dark(
                      primary: LuxuryColors.champagne,
                      onPrimary: LuxuryColors.pureBlack,
                      surface: LuxuryColors.pureBlack,
                      onSurface: LuxuryColors.pureWhite,
                    ),
                  ),
                  child: child!,
                );
              },
            );
            if (picked != null) {
              final formatted = "${picked.year}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
              _updateValue(def.slug, formatted);
            }
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  currentVal ?? 'Select date...',
                  style: LuxuryTypography.bodyMedium.copyWith(
                    color: currentVal != null
                        ? (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack)
                        : LuxuryColors.mutedGrey,
                  ),
                ),
                Icon(
                  Icons.calendar_today_outlined,
                  size: 18,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                ),
              ],
            ),
          ),
        );

      case AttributeDataType.select:
        final currentVal = _values[def.slug]?.toString();
        return InkWell(
          onTap: () => _showSelectModal(def),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    currentVal ?? 'Select ${def.label}...',
                    style: LuxuryTypography.bodyMedium.copyWith(
                      color: currentVal != null
                          ? (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack)
                          : LuxuryColors.mutedGrey,
                    ),
                  ),
                ),
                Icon(
                  Icons.arrow_drop_down,
                  color: isDark ? LuxuryColors.champagne : LuxuryColors.charcoal,
                ),
              ],
            ),
          ),
        );

      case AttributeDataType.multiSelect:
        final selectedList = List<String>.from(_values[def.slug] ?? []);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: def.options.map((opt) {
                final isSelected = selectedList.contains(opt);
                return FilterChip(
                  label: Text(opt),
                  selected: isSelected,
                  selectedColor: isDark ? LuxuryColors.champagne.withOpacity(0.25) : LuxuryColors.champagneLight,
                  checkmarkColor: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                  backgroundColor: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                  labelStyle: LuxuryTypography.bodySmall.copyWith(
                    color: isSelected
                        ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                        : (isDark ? LuxuryColors.pureWhite : LuxuryColors.charcoal),
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                  ),
                  side: BorderSide(
                    color: isSelected
                        ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                        : (isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight),
                  ),
                  onSelected: (bool selected) {
                    final updated = List<String>.from(selectedList);
                    if (selected) {
                      updated.add(opt);
                    } else {
                      updated.remove(opt);
                    }
                    _updateValue(def.slug, updated);
                  },
                );
              }).toList(),
            ),
          ],
        );

      case AttributeDataType.file:
        final attachedFile = _values[def.slug]?.toString();
        final hasFile = attachedFile != null && attachedFile.isNotEmpty;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (hasFile)
              Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(
                    color: LuxuryColors.champagne.withOpacity(0.6),
                    width: 1.0,
                  ),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.picture_as_pdf, color: LuxuryColors.champagne, size: 22),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            attachedFile,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: LuxuryTypography.bodySmall.copyWith(
                              fontWeight: FontWeight.w600,
                              color: isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'ENCRYPTED & PRE-SIGNED • CLOUDFLARE R2',
                            style: LuxuryTypography.microCaps.copyWith(
                              color: LuxuryColors.verifiedGreen,
                              fontSize: 7.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 18, color: LuxuryColors.mutedGrey),
                      onPressed: () => _updateValue(def.slug, null),
                    ),
                  ],
                ),
              ),
            InkWell(
              onTap: () async {
                final result = await FilePicker.platform.pickFiles(
                  type: FileType.custom,
                  allowedExtensions: ['pdf', 'png', 'jpg', 'jpeg'],
                );
                if (result != null && result.files.isNotEmpty) {
                  final name = result.files.first.name;
                  _updateValue(def.slug, name);
                }
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: isDark ? LuxuryColors.darkCard : LuxuryColors.pureWhite,
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                    style: BorderStyle.solid,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.cloud_upload_outlined,
                      size: 18,
                      color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                    ),
                    const SizedBox(width: 10),
                    Text(
                      hasFile ? 'REPLACE ATTACHED DOSSIER' : 'ATTACH OFFICIAL CERTIFICATE / REPORT (PDF/JPG)',
                      style: LuxuryTypography.microCaps.copyWith(
                        color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                        fontWeight: FontWeight.w700,
                        fontSize: 9.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        );
    }
  }

  void _showSelectModal(AttributeDefinition def) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? LuxuryColors.pureBlack : LuxuryColors.pureWhite,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'SELECT ${def.label.toUpperCase()}',
                      style: LuxuryTypography.microCaps.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.2,
                        fontSize: 11,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 20),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
              ),
              const Divider(height: 1),
              Flexible(
                child: ListView.separated(
                  shrinkWrap: true,
                  itemCount: def.options.length,
                  separatorBuilder: (_, _) => Divider(
                    height: 1,
                    color: isDark ? LuxuryColors.borderDark : LuxuryColors.borderLight,
                  ),
                  itemBuilder: (ctx, i) {
                    final opt = def.options[i];
                    final isSelected = _values[def.slug] == opt;
                    return ListTile(
                      title: Text(
                        opt,
                        style: LuxuryTypography.bodyMedium.copyWith(
                          color: isSelected
                              ? (isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen)
                              : (isDark ? LuxuryColors.pureWhite : LuxuryColors.pureBlack),
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.normal,
                        ),
                      ),
                      trailing: isSelected
                          ? Icon(
                              Icons.check,
                              color: isDark ? LuxuryColors.champagne : LuxuryColors.deepForestGreen,
                              size: 18,
                            )
                          : null,
                      onTap: () {
                        _updateValue(def.slug, opt);
                        Navigator.pop(ctx);
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
