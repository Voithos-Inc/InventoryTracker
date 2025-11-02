import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { InventoryItem } from '../types/inventory';

interface ItemModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

export default function ItemModal({ visible, item, onClose }: ItemModalProps) {
  if (!item) return null;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>{item.icon}</Text>
            <Text style={styles.modalTitle}>{item.name}</Text>
            <Text style={styles.modalSubtext}>
              Quantity: {item.quantity} {item.unit}
            </Text>
            <Text style={styles.modalLabel}>Item Details</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    minWidth: 400,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 16,
    color: '#999',
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 150,
  },
  modalButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});