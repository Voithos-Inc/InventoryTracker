import React, {useEffect, useState} from 'react';
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
import {COLORS, STYLES} from '@/constants/styles';
import {InventoryItem} from '@/types/inventory';
import {
  CircleMinus,
  CirclePlus,
  Check,
  AlertTriangle,
} from 'lucide-react-native';
import {insertItem} from '@/lib/supabase';
import {stringIsNumeric} from "@/lib/utils";
import {useInventory} from '@/store/inventory';

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({visible, item, onClose}: ItemModalProps) {
  const [fohCount, setFOHCount] = useState<number>(0);
  const [bohCount, setBOHCount] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(1);
  const [completed, setCompleted] = useState<boolean>(false);
  const loadInv = useInventory((state) => state.loadInv);

  useEffect(() => {
    if (item) {
      setFOHCount(item.foh_quantity);
      setBOHCount(item.boh_quantity);
      setThreshold(item.low_stock_threshold || 1);
      setCompleted(item.completed || false);
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
    text = text.replace(',', '.');

    if (!stringIsNumeric(text)) return;

    const num = parseFloat(text);
    if (num < 0) return

    if (!isNaN(num)) updateQuantity('foh', num)
    else if (text === "" || text === ".") updateQuantity('foh', 0)

  };

  const handleBOHInputChange = (text: string) => {
    text = text.replace(',', '.');

    if (!stringIsNumeric(text)) return

    const num = parseFloat(text);
    if (num < 0) return

    if (!isNaN(num)) updateQuantity('boh', num)
    else if (text === "" || text === ".") updateQuantity('boh', 0)
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
    const newCompleted = !completed;
    setCompleted(newCompleted);
    item.completed = newCompleted;
    saveItem(item);
  };

  const handleThresholdSave = (text: string) => {
    text = text.replace(',', '.');

    if (text === "" || text === ".") {
      setThreshold(0)
      item.low_stock_threshold = 0
      saveItem(item)
    }

    if (!stringIsNumeric(text)) return

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
              style={STYLES.modalContent}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12, height: 50}}>
              <Text style={STYLES.modalTitle}>{item.name}</Text>
            </View>
            <ScrollView contentContainerStyle={STYLES.modalInnerContent}>
              <View style={{marginTop: 50, alignItems: "center"}}>
                {item.image_link && item.image_link !== "about:blank" ? (
                    <Image
                        source={{uri: item.image_link}}
                        style={{
                          width: 300,
                          height: 500,
                          borderRadius: 12,
                          marginBottom: 16
                        }}
                        resizeMode="cover"
                    />
                ) : <View style={{width: 0, height: 0}} />
                }
              </View>
              <View>
                {isLowStock && (
                    <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: COLORS.cardBg,
                          padding: 12,
                          borderRadius: 8,
                          marginBottom: 12,
                          borderWidth: 2,
                          borderColor: COLORS.warn
                        }}
                    >
                      <AlertTriangle size={24} color={COLORS.warn}/>
                      <Text
                          style={{
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.warn
                          }}
                      >
                        Low Stock Alert!
                      </Text>
                    </View>
                )}

                {/* FOH Section */}
                <View style={{marginBottom: 20, width: '100%'}}>
                  <Text style={STYLES.modalSubtext}>Front of House (FOH)</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable onPress={handleFOHRemoveButton}>
                      <CircleMinus size={60} color={COLORS.deny}/>
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
                        value={fohCount.toString()}
                        onChangeText={handleFOHInputChange}
                        keyboardType="decimal-pad"
                    />

                    <Pressable onPress={handleFOHAddButton}>
                      <CirclePlus size={60} color={COLORS.confirm}/>
                    </Pressable>
                  </View>
                  <Text style={{textAlign: 'center', marginTop: 8, fontSize: 16, color: COLORS.textgray}}>
                    {item.units}
                  </Text>
                </View>

                {/* BOH Section */}
                <View style={{marginBottom: 20, width: '100%'}}>
                  <Text style={STYLES.modalSubtext}>Back of House (BOH)</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable onPress={handleBOHRemoveButton}>
                      <CircleMinus size={60} color={COLORS.deny}/>
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
                        value={bohCount.toString()}
                        onChangeText={handleBOHInputChange}
                        keyboardType="number-pad"
                    />

                    <Pressable onPress={handleBOHAddButton}>
                      <CirclePlus size={60} color={COLORS.confirm}/>
                    </Pressable>
                  </View>
                  <Text style={{textAlign: 'center', marginTop: 8, fontSize: 16, color: COLORS.textgray}}>
                    {item.units}
                  </Text>
                </View>

                <View style={STYLES.rowAlternatingText}>
                  {/* Total */}
                  <View>
                    <Text style={{fontSize: 24, fontWeight: '600', marginBottom: 16}}>
                      Total: {totalQuantity} {item.units}
                    </Text>
                  </View>

                  {/* Threshold Editor */}
                  <View style={{marginBottom: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 18, marginRight: 8}}>Low Stock Alert at:</Text>
                      {
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
                              value={threshold.toString()}
                              onChangeText={handleThresholdSave}
                              keyboardType="number-pad"
                          />
                        </>
                      }
                    </View>
                  </View>
                </View>

                {/* Completion Checkbox */}
                <TouchableOpacity
                    onPress={handleCompleteToggle}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: completed ? COLORS.tintedGreen : COLORS.cardBg,
                      padding: 16,
                      borderRadius: 12,
                      marginBottom: 20,
                      borderWidth: 2,
                      borderColor: completed ? COLORS.green : COLORS.textgray
                    }}
                >
                  <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        borderWidth: 3,
                        borderColor: completed ? COLORS.green : COLORS.textgray,
                        backgroundColor: completed ? COLORS.green : 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                        alignContent: "center",
                      }}
                  >
                    {completed && <Check size={24} color="white" strokeWidth={3}/>}
                  </View>
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {completed ? 'Count Completed ✓' : 'Mark as Counted'}
                  </Text>
                </TouchableOpacity>

                {/* Close Button */}
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