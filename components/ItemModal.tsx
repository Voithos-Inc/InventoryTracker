import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import { InventoryItem } from '@/types/inventory';
import { CircleMinus, CirclePlus, Check, AlertTriangle } from 'lucide-react-native';
import { insertItem } from '@/lib/supabase';
import { stringIsNumeric } from '@/lib/utils';
import { useInventory } from '@/store/inventory';

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({ visible, item, onClose }: ItemModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [threshold, setThreshold] = useState<number>(1);
  const [completed, setCompleted] = useState<boolean>(false);
  const loadInv = useInventory((state) => state.loadInv);

  useEffect(() => {
    if (item) {
      setQuantities({ ...item.quantities });
      setThreshold(item.low_stock_threshold ?? 1);
      setCompleted(item.completed ?? false);
    }
  }, [item]);

  if (!item) return null;

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const isLowStock = totalQuantity <= threshold;

  const updateQuantity = (location: string, value: number) => {
    const updated = { ...quantities, [location]: value };
    setQuantities(updated);
    item.quantities = updated;
    saveItem(item);
  };

  const handleAdd = (location: string) => {
    updateQuantity(location, (quantities[location] ?? 0) + 1);
  };

  const handleRemove = (location: string) => {
    const current = quantities[location] ?? 0;
    if (current > 0) updateQuantity(location, current - 1);
  };

  const handleInputChange = (location: string, text: string) => {
    text = text.replace(',', '.');
    if (!stringIsNumeric(text)) return;

    const num = parseFloat(text);
    if (num < 0) return;

    if (!isNaN(num)) updateQuantity(location, num);
    else if (text === '' || text === '.') updateQuantity(location, 0);
  };

  const handleCompleteToggle = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    item.completed = newCompleted;
    saveItem(item);
  };

  const handleThresholdSave = (text: string) => {
    text = text.replace(',', '.');

    if (text === '' || text === '.') {
      setThreshold(0);
      item.low_stock_threshold = 0;
      saveItem(item);
      return;
    }

    if (!stringIsNumeric(text)) return;

    const num = parseFloat(text);
    if (!isNaN(num) && num >= 0) {
      setThreshold(num);
      item.low_stock_threshold = num;
      saveItem(item);
    }
  };

  const saveItem = async (updatedItem: InventoryItem) => {
    await insertItem(updatedItem);
    await loadInv();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={STYLES.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity
          style={STYLES.modalContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, height: 50 }}>
            <Text style={STYLES.modalTitle}>{item.name}</Text>
          </View>

          <ScrollView contentContainerStyle={STYLES.modalInnerContent}>
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              {item.image_link && item.image_link !== 'about:blank' ? (
                <Image
                  source={{ uri: item.image_link }}
                  style={{ width: 300, height: 500, borderRadius: 12, marginBottom: 16 }}
                  resizeMode="cover"
                />
              ) : <View style={{ width: 0, height: 0 }} />}
            </View>

            <View style={{ flexDirection: 'column' }}>
              {/* Dynamic location sections */}
              {Object.entries(quantities).map(([location, qty]) => (
                <View key={location} style={{ marginBottom: 20, width: '100%' }}>
                  <Text style={STYLES.modalSubtext}>{location}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable onPress={() => handleRemove(location)}>
                      <CircleMinus size={60} color={COLORS.deny} />
                    </Pressable>

                    <TextInput
                      style={{
                        fontSize: 32, fontWeight: '600', textAlign: 'center',
                        borderWidth: 2, borderColor: COLORS.header_bg, borderRadius: 8,
                        paddingHorizontal: 20, paddingVertical: 10,
                        marginHorizontal: 20, minWidth: 100, backgroundColor: 'white'
                      }}
                      value={qty.toString()}
                      onChangeText={(text) => handleInputChange(location, text)}
                      keyboardType="decimal-pad"
                    />

                    <Pressable onPress={() => handleAdd(location)}>
                      <CirclePlus size={60} color={COLORS.confirm} />
                    </Pressable>
                  </View>
                  <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 16, color: COLORS.textgray }}>
                    {item.units}
                  </Text>
                </View>
              ))}

              {/* Low stock alert — below all quantity rows */}
              {isLowStock && (
                <View style={{
                  flexDirection: 'row', alignItems: 'center',
                  backgroundColor: COLORS.cardBg, padding: 12, borderRadius: 8,
                  marginBottom: 12, borderWidth: 2, borderColor: COLORS.warn
                }}>
                  <AlertTriangle size={24} color={COLORS.warn} />
                  <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '600', color: COLORS.warn }}>
                    Low Stock Alert!
                  </Text>
                </View>
              )}

              <View style={STYLES.rowAlternatingText}>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 16 }}>
                    Total: {totalQuantity} {item.units}
                  </Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>Low Stock Alert at:</Text>
                    <TextInput
                      style={{
                        fontSize: 20, borderWidth: 2, borderColor: COLORS.header_bg,
                        borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4,
                        width: 60, textAlign: 'center', backgroundColor: 'white'
                      }}
                      value={threshold.toString()}
                      onChangeText={handleThresholdSave}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              </View>

              {/* Completion Checkbox */}
              <TouchableOpacity
                onPress={handleCompleteToggle}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  backgroundColor: completed ? COLORS.tintedGreen : COLORS.cardBg,
                  padding: 16, borderRadius: 12, marginBottom: 20,
                  borderWidth: 2, borderColor: completed ? COLORS.green : COLORS.textgray
                }}
              >
                <View style={{
                  width: 32, height: 32, borderRadius: 8, borderWidth: 3,
                  borderColor: completed ? COLORS.green : COLORS.textgray,
                  backgroundColor: completed ? COLORS.green : 'white',
                  justifyContent: 'center', alignItems: 'center',
                  marginRight: 12, alignContent: 'center',
                }}>
                  {completed && <Check size={24} color="white" strokeWidth={3} />}
                </View>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>
                  {completed ? 'Count Completed' : 'Mark as Counted'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={STYLES.modalButton} onPress={onClose}>
                <Text style={STYLES.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}