import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Pressable} from 'react-native';
import {COLORS, STYLES} from '@/constants/styles';
import { InventoryItem } from '@/types/inventory';
import {CircleMinus, CirclePlus} from "lucide-react-native";
import {insertItem} from "@/lib/supabase";

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({ visible, item, onClose }: ItemModalProps) {
  const [fohCount, setFOHCount] = useState<number>(0)
  const [bohCount, setBOHCount] = useState<number>(0)

  useEffect(() => {
    // TODO: seperate foh and boh @arjun
    if (item) {
      setFOHCount(item.foh_quantity);
    }
  }, [item]);

  if (!item) return null;
  // const Icon = item.icon

  const handleFOHAddButton = (curVal: number) => {
    item.foh_quantity++
    update(item)
  }
  const handleFOHRemoveButton = (curVal: number) => {
    item.foh_quantity = Math.max(0, item.foh_quantity - 1)
    update(item)
  }
  const handleBOHAddButton = (curVal: number) => {
    item.boh_quantity++
    update(item)
  }
  const handleBOHRemoveButton = (curVal: number) => {
    item.boh_quantity = Math.max(0, item.boh_quantity - 1)
    update(item)
  }

  function update(item: InventoryItem) {
    setFOHCount(item.foh_quantity)
    setBOHCount(item.boh_quantity)
    insertItem(item)
  }


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
            {/*<Icon size={128} color={'black'}/>*/}
            <Text style={STYLES.modalTitle}>{item.name}</Text>
            <Text style={STYLES.modalSubtext}>
              FOH Quantity: {fohCount} {item.units}
            </Text>
            <Text style={STYLES.modalSubtext}>
              BOH Quantity: {bohCount} {item.units}
            </Text>


            <View
             style={STYLES.modalButtonsContainer}
            >
              <Pressable
                onPress={() => handleFOHRemoveButton(fohCount)}
                style={({ pressed }) => [{
                  color: pressed ? `${COLORS.deny}aa` : `${COLORS.deny}ff`,
                  borderRadius: 32,
                  borderColor: '#fff'
                }]}
              >
                <CircleMinus size={80}/>
              </Pressable>

              <Pressable
                onPress={() => handleFOHAddButton(fohCount)}
                style={({ pressed }) => [{
                  color: pressed ? `${COLORS.confirm}aa` : `${COLORS.confirm}ff`,
                  borderRadius: 32,
                  borderColor: '#fff'
                }]}
              >
                <CirclePlus size={80}/>
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
