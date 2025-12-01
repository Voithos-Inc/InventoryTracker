import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  Alert
} from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import { InventoryItem } from '@/types/inventory';
import {
  CircleMinus,
  CirclePlus,
  Check,
  AlertTriangle,
  Pencil
} from 'lucide-react-native';
import { insertItem } from '@/lib/supabase';

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({ visible, item, onClose }: ItemModalProps) {
  const [fohCount, setFOHCount] = useState<number>(0);
  const [bohCount, setBOHCount] = useState<number>(0);
  const [fohInput, setFOHInput] = useState<string>('');
  const [bohInput, setBOHInput] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(1);
  const [editingThreshold, setEditingThreshold] = useState<boolean>(false);
  const [thresholdInput, setThresholdInput] = useState<string>('');

  useEffect(() => {
    if (item) {
      setFOHCount(item.foh_quantity);
      setBOHCount(item.boh_quantity);
      setFOHInput(item.foh_quantity.toString());
      setBOHInput(item.boh_quantity.toString());
      setIsCompleted(item.is_completed || false);
      setThreshold(item.low_stock_threshold || 1);
      setThresholdInput((item.low_stock_threshold || 1).toString());
    }
  }, [item]);

  if (!item) return null;

  const totalQuantity = fohCount + bohCount;
  const isLowStock = totalQuantity <= threshold;

  const handleFOHAddButton = () => {
    const newCount = fohCount + 1;
    updateQuantity('foh', newCount);
  };

  const handleFOHRemoveButton = () => {
    if (fohCount > 0) {
      const newCount = fohCount - 1;
      updateQuantity('foh', newCount);
    }
  };

  const handleBOHAddButton = () => {
    const newCount = bohCount + 1;
    updateQuantity('boh', newCount);
  };

  const handleBOHRemoveButton = () => {
    if (bohCount > 0) {
      const newCount = bohCount - 1;
      updateQuantity('boh', newCount);
    }
  };

  const handleFOHInputChange = (text: string) => {
    setFOHInput(text);
    const num = parseInt(text);
    if (!isNaN(num) && num >= 0) {
      updateQuantity('foh', num);
    }
  };

  const handleBOHInputChange = (text: string) => {
    setBOHInput(text);
    const num = parseInt(text);
    if (!isNaN(num) && num >= 0) {
      updateQuantity('boh', num);
    }
  };

  const updateQuantity = (type: 'foh' | 'boh', value: number) => {
    if (type === 'foh') {
      setFOHCount(value);
      item.foh_quantity = value;
    } else {
      setBOHCount(value);
      item.boh_quantity = value;
    }
    saveItem(item);
  };

  const handleCompleteToggle = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    item.is_completed = newCompleted;
    if (newCompleted) {
      item.completed_at = new Date().toISOString();
      // TODO: Add user tracking when auth is implemented
      item.completed_by = 'Current User';
    }
    saveItem(item);
  };

  const handleThresholdSave = () => {
    const num = parseInt(thresholdInput);
    if (!isNaN(num) && num >= 0) {
      setThreshold(num);
      item.low_stock_threshold = num;
      saveItem(item);
      setEditingThreshold(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number');
    }
  };

  const saveItem = (updatedItem: InventoryItem) => {
    insertItem(updatedItem);
  };

  return (
      <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={onClose}
      >
        <TouchableOpacity
            style={STYLES.modalOverlay}
            activeOpacity={1}
            onPress={onClose}
        >
          <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
          >
            <View style={STYLES.modalContent}>
              {/* Image */}
              {item.image_url ? (
                  <Image
                      source={{ uri: item.image_url }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 12,
                        marginBottom: 16
                      }}
                      resizeMode="cover"
                  />
              ) : (
                  <View
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 12,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16
                      }}
                  >
                    <Text style={{ color: '#666', fontSize: 16 }}>No Image</Text>
                  </View>
              )}

              {/* Item Name with Seasonal Badge */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={STYLES.modalTitle}>{item.name}</Text>
                {item.is_seasonal && (
                    <View
                        style={{
                          backgroundColor: '#FFA500',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 8,
                          marginLeft: 12
                        }}
                    >
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                        Seasonal
                      </Text>
                    </View>
                )}
              </View>

              {/* Low Stock Warning */}
              {isLowStock && (
                  <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF3CD',
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 12,
                        borderWidth: 2,
                        borderColor: '#FFC107'
                      }}
                  >
                    <AlertTriangle size={24} color="#FF6B00" />
                    <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#FF6B00'
                        }}
                    >
                      Low Stock Alert!
                    </Text>
                  </View>
              )}

              {/* FOH Section */}
              <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={STYLES.modalSubtext}>Front of House (FOH)</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Pressable onPress={handleFOHRemoveButton}>
                    <CircleMinus size={60} color={COLORS.deny} />
                  </Pressable>

                  <TextInput
                      style={{
                        fontSize: 32,
                        fontWeight: '600',
                        textAlign: 'center',
                        borderWidth: 2,
                        borderColor: COLORS.header_bg,
                        borderRadius: 8,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: 20,
                        minWidth: 100,
                        backgroundColor: 'white'
                      }}
                      value={fohInput}
                      onChangeText={handleFOHInputChange}
                      keyboardType="number-pad"
                  />

                  <Pressable onPress={handleFOHAddButton}>
                    <CirclePlus size={60} color={COLORS.confirm} />
                  </Pressable>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 16, color: COLORS.textgray }}>
                  {item.units}
                </Text>
              </View>

              {/* BOH Section */}
              <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={STYLES.modalSubtext}>Back of House (BOH)</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Pressable onPress={handleBOHRemoveButton}>
                    <CircleMinus size={60} color={COLORS.deny} />
                  </Pressable>

                  <TextInput
                      style={{
                        fontSize: 32,
                        fontWeight: '600',
                        textAlign: 'center',
                        borderWidth: 2,
                        borderColor: COLORS.header_bg,
                        borderRadius: 8,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: 20,
                        minWidth: 100,
                        backgroundColor: 'white'
                      }}
                      value={bohInput}
                      onChangeText={handleBOHInputChange}
                      keyboardType="number-pad"
                  />

                  <Pressable onPress={handleBOHAddButton}>
                    <CirclePlus size={60} color={COLORS.confirm} />
                  </Pressable>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 16, color: COLORS.textgray }}>
                  {item.units}
                </Text>
              </View>

              {/* Total */}
              <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 16 }}>
                Total: {totalQuantity} {item.units}
              </Text>

              {/* Threshold Editor */}
              <View style={{ marginBottom: 20, width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 8 }}>Low Stock Alert at:</Text>
                  {editingThreshold ? (
                      <>
                        <TextInput
                            style={{
                              fontSize: 20,
                              borderWidth: 2,
                              borderColor: COLORS.header_bg,
                              borderRadius: 8,
                              paddingHorizontal: 12,
                              paddingVertical: 4,
                              width: 60,
                              textAlign: 'center',
                              backgroundColor: 'white'
                            }}
                            value={thresholdInput}
                            onChangeText={setThresholdInput}
                            keyboardType="number-pad"
                        />
                        <TouchableOpacity
                            onPress={handleThresholdSave}
                            style={{
                              marginLeft: 8,
                              backgroundColor: COLORS.confirm,
                              padding: 8,
                              borderRadius: 8
                            }}
                        >
                          <Check size={20} color="white" />
                        </TouchableOpacity>
                      </>
                  ) : (
                      <>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{threshold}</Text>
                        <TouchableOpacity
                            onPress={() => setEditingThreshold(true)}
                            style={{ marginLeft: 8 }}
                        >
                          <Pencil size={20} color={COLORS.header_bg} />
                        </TouchableOpacity>
                      </>
                  )}
                </View>
              </View>

              {/* Completion Checkbox */}
              <TouchableOpacity
                  onPress={handleCompleteToggle}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: isCompleted ? '#D4EDDA' : '#F8F9FA',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 20,
                    borderWidth: 2,
                    borderColor: isCompleted ? '#28A745' : '#CCC'
                  }}
              >
                <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      borderWidth: 3,
                      borderColor: isCompleted ? '#28A745' : '#CCC',
                      backgroundColor: isCompleted ? '#28A745' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12
                    }}
                >
                  {isCompleted && <Check size={24} color="white" strokeWidth={3} />}
                </View>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>
                  {isCompleted ? 'Count Completed ✓' : 'Mark as Counted'}
                </Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity style={STYLES.modalButton} onPress={onClose}>
                <Text style={STYLES.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
  );
}