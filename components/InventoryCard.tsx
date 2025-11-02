import { COLORS } from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { InventoryItem } from '../types/inventory';

interface InventoryCardProps {
  item: InventoryItem;
  onPress: (item: InventoryItem) => void;
}

export default function InventoryCard({ item, onPress }: InventoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '28%',
    aspectRatio: 2.2,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
});