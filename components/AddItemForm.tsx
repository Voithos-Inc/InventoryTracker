import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable, Platform
} from 'react-native';
import {COLORS, STYLES} from '@/constants/styles';
import {AddItemFormData, InventoryItem} from '@/types/inventory';
import {X} from 'lucide-react-native';
import {insertItem} from '@/lib/supabase';
import {getPositiveFloat, getPositiveInteger} from "@/lib/utils";
import {useInventory} from "@/store/inventory";
import ImagePickerBox, {ImageUploadData} from './ImagePickerBox';
import {addImage} from "@/lib/github";
import { categories } from '@/app/_layout';

interface AddItemFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData: InventoryItem | null;
}

const COMMON_UNITS = [
  'quart container',
  'pint container',
  'topping container',
  'jar',
  'bottle',
  'bag',
  'box',
  'gallon',
  'case',
  'cone',
  'cup'
];

export default function AddItemForm({visible, onClose, onSuccess, initialData}: AddItemFormProps) {
  const inv = useInventory((state) => state.inv)?.sort((a, b) => a.id - b.id) ?? [];

  const [formData, setFormData] = useState<AddItemFormData>({
    name: initialData?.name ?? '',
    category: initialData?.category ?? (categories ? categories[0] : "BEVERAGES"),
    units: initialData?.units ?? 'quart container',
    sort_order: initialData?.sort_order,
    foh_quantity: initialData?.foh_quantity ?? 0,
    boh_quantity: initialData?.boh_quantity ?? 0,
    low_stock_threshold: initialData?.low_stock_threshold ?? 1,
  });

  const [imageData, setImageData] = useState<ImageUploadData | null>(null)
  const [saving, setSaving] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState<string>('')

  useEffect(() => {
    async function loadExisting() {
      if (!initialData?.image_link) {
        setImageData(null);
        return;
      }

      try {
        const res = await fetch(initialData.image_link);
        const blob = await res.blob();

        const ext = blob.type.split("/")[1] || "jpg";
        const name = `existing_${Date.now()}.${ext}`;

        setImageData({
          blob,
          name,
          type: blob.type,
          uri: initialData.image_link,
        });
      } catch (err) {
        console.error("initial image fetch failed", err);
        setImageData(null);
      }
    }

    loadExisting();
  }, [initialData]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    if (!formData.units.trim()) {
      Alert.alert('Error', 'Please enter units');
      return;
    }

    setSaving(true);

    const image_filename = imageData?.name

    if (imageData) await addImage(imageData)

    const image_uri = image_filename ?
      `https://cdn.jsdelivr.net/gh/Voithos-Inc/InventoryTracker@main/assets/images/items/${image_filename}` :
      'about:blank'

    try {
      const newItem: InventoryItem = {
        id: initialData?.id ?? inv[inv.length - 1].id + 2,
        sort_order: initialData?.sort_order ?? 0,
        name: formData.name.trim(),
        category: formData.category,
        units: formData.units,
        foh_quantity: formData.foh_quantity,
        boh_quantity: formData.boh_quantity,
        low_stock_threshold: formData.low_stock_threshold,
        image_link: image_uri,
        created_at: new Date().toISOString()
      };

      await insertItem(newItem, initialData !== null);
      if (Platform.OS === 'web') {
        alert('Item added successfully!')
      } else {
        Alert.alert('Success', 'Item added successfully!');
      }

      setFormData({
        name: '',
        category: 'BEVERAGES',
        units: 'quart container',
        foh_quantity: 0,
        boh_quantity: 0,
        low_stock_threshold: 1,
      });

      onSuccess();
      onClose();
      setImageData(null)
    } catch (error) {
      Alert.alert('Error', 'Failed to add item. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 24,
            width: '90%',
            maxHeight: '90%',
            shadowColor: COLORS.pure_black,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <Text style={{fontSize: 28, fontWeight: '700'}}>{initialData === null ? "Add New Item" : "Edit Item"}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={32} color={COLORS.pure_black}/>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 20}}>
              <ImagePickerBox
                initialUri={imageData?.uri ?? null}
                onChange={setImageData}
              />
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                Item Name *
              </Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.header_bg,
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 16,
                  color: formData.name === "" ? COLORS.textgray : COLORS.textoncontrast
                }}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="e.g., Vanilla Ice Cream"
              />
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                Category *
              </Text>

              <View style={{flexDirection: 'row', gap: 8, flexWrap: 'wrap'}}>
                {categories?.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => setFormData({...formData, category: cat})}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      backgroundColor:
                        formData.category === cat ? COLORS.confirm : COLORS.textonbg
                    }}
                  >
                    <Text
                      style={{
                        color: formData.category === cat ? 'white' : COLORS.textgray,
                        fontWeight: '600'
                      }}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
                {isAddingCategory ? (
                  <TextInput
                    style={{
                      ...STYLES.itemFormTextInput,
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      backgroundColor: formData.category === customCategory ? COLORS.confirm : COLORS.textonbg,
                      color: formData.category === customCategory ? COLORS.pure_white : COLORS.textgray,
                    }}
                    onPressIn={() => {
                      setFormData({...formData, category: customCategory.toUpperCase()})
                    }}
                    onChangeText={(text) => {
                      setFormData({...formData, category: text.toUpperCase()})
                      setCustomCategory(text.toUpperCase())
                    }}
                    onEndEditing={(e) => {
                      const text = e.nativeEvent.text.trim();
                      if (text) {
                        categories?.push(text.toUpperCase());
                        setFormData({...formData, category: text.toUpperCase()});
                      }
                      setCustomCategory(text.toUpperCase())
                    }}
                    onFocus={() => {
                      setFormData({...formData, category: customCategory.toUpperCase()})
                    }}
                    placeholder="Type category"
                    autoCapitalize='characters'
                    autoFocus
                  />
                ) : (
                  <Pressable
                    onPress={() => {
                      setIsAddingCategory(true)
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      backgroundColor: formData.category.toUpperCase() === customCategory.toUpperCase() ? COLORS.confirm : COLORS.textonbg,
                    }}
                  >
                    <Text 
                      style={{
                        color: formData.category.toUpperCase() === customCategory.toUpperCase() ? COLORS.pure_white : COLORS.textgray,
                        fontWeight: '600'
                      }}
                    >
                      + Add category
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>

            <View style={{marginBottom: 20, flexDirection: "row", alignContent: 'center', height: 40}}>
              <Text style={{fontSize: 18, fontWeight: '600', alignContent: "center"}}>
                Shelf&nbsp;
              </Text>

              <Text style={{fontSize: 18, fontWeight: '200', alignContent: "center", marginRight: 12}}>
                (optional)
              </Text>

              <View style={{width: 120}}>
                <TextInput
                  style={{
                    ...STYLES.itemFormTextInput,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: COLORS.MINT,
                    padding: 8,
                    paddingLeft: 12,
                    color: formData.sort_order ? COLORS.pure_black : COLORS.textgray,
                    textAlign: 'left'
                  }}
                  onChangeText={(text) => {
                    setFormData({...formData, sort_order: getPositiveInteger(text)})
                  }}
                  keyboardType="number-pad"
                  placeholder="2"
                />
              </View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                Units *
              </Text>

              <View style={{flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap'}}>
                {COMMON_UNITS.map((unit) => (
                  <Pressable
                    key={unit}
                    onPress={() => setFormData({...formData, units: unit})}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 16,
                      backgroundColor:
                        formData.units === unit ? COLORS.confirm : COLORS.textonbg
                    }}
                  >
                    <Text
                      style={{
                        color: formData.units === unit ? 'white' : COLORS.textgray,
                        fontSize: 14
                      }}
                    >
                      {unit}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.header_bg,
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 16
                }}
                value={formData.units}
                onChangeText={(text) => setFormData({...formData, units: text})}
                placeholder="Or type custom unit"
              />
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                Initial Quantities
              </Text>
              <View style={{flexDirection: 'row', gap: 12}}>
                <View style={{flex: 1}}>
                  <Text style={{marginBottom: 4, color: COLORS.textgray}}>FOH</Text>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: COLORS.header_bg,
                      borderRadius: 12,
                      padding: 14,
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                    value={formData.foh_quantity.toString()}
                    onChangeText={(text) =>
                      setFormData({...formData, foh_quantity: getPositiveFloat(text) ?? formData.foh_quantity})
                    }
                    keyboardType="number-pad"
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{marginBottom: 4, color: COLORS.textgray}}>BOH</Text>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: COLORS.header_bg,
                      borderRadius: 12,
                      padding: 14,
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                    value={formData.boh_quantity.toString()}
                    onChangeText={(text) =>
                      setFormData({...formData, boh_quantity: getPositiveFloat(text) ?? formData.boh_quantity})
                    }
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 8}}>
                Low Stock Alert Threshold
              </Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.header_bg,
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 16
                }}
                value={formData.low_stock_threshold.toString()}
                onChangeText={(text) => {
                    setFormData({
                      ...formData,
                      low_stock_threshold: getPositiveFloat(text) ?? formData.low_stock_threshold
                    })
                }
                }
                keyboardType="decimal-pad"
                placeholder="1"
              />
              <Text style={{marginTop: 4, color: COLORS.textgray, fontSize: 12}}>
                Alert when total quantity is at or below this number
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 12, marginTop: 20}}>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: COLORS.textonbg,
                  alignItems: 'center'
                }}
              >
                <Text style={{fontSize: 18, fontWeight: '600', color: COLORS.textgray}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: saving ? COLORS.textgray : COLORS.confirm,
                  alignItems: 'center'
                }}
              >
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                  {saving ? 'Saving...' : 'Save item'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
