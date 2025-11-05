import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, Button, Pressable} from 'react-native';
import {COLORS, STYLES} from '@/constants/styles';
import { InventoryItem } from '../types/inventory';
import {CircleMinus, CirclePlus} from "lucide-react-native";

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({ visible, item, onClose }: ItemModalProps) {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    // TODO: load the number from db (pass in w `item`?)
    if (item) {
      setCount(item.quantity);
    }
  }, [item]);

  if (!item) return null;
  const Icon = item.icon

  // TODO proto for now
  // TODO change onClose to "sync" data with db
  const handleAddButton = (curVal: number) => { setCount(count + 1) }
  const handleRemoveButton = (curVal: number) => { if (count > 0) setCount(count - 1) }

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
            <Icon size={96} color={'black'}/>
            <Text style={STYLES.modalTitle}>{item.name}</Text>
            <Text style={STYLES.modalSubtext}>
              Quantity: {count} {item.unit}
            </Text>

            <View
             style={{ marginBottom: 20, flex: 1, flexDirection: "row", justifyContent: "space-between", width: "60%" }}
            >
              <Pressable
                onPress={() => handleRemoveButton(count)}
                style={({ pressed }) => [{
                  color: pressed ? `${COLORS.deny}aa` : `${COLORS.deny}ff`,
                  borderRadius: 32,
                  borderColor: '#fff'
                }]}
              >
                <CircleMinus size={64}/>
              </Pressable>

              <Pressable
                onPress={() => handleAddButton(count)}
                style={({ pressed }) => [{
                  color: pressed ? `${COLORS.confirm}aa` : `${COLORS.confirm}ff`,
                  borderRadius: 32,
                  borderColor: '#fff'
                }]}
              >
                <CirclePlus size={64}/>
              </Pressable>
            </View>

            <TouchableOpacity
              style={STYLES.modalButton}
              onPress={onClose}
            >
              <Text style={STYLES.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
