import {STYLES} from '@/constants/styles';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { InventoryItem } from '@/types/inventory';

interface InventoryCardProps {
  item: InventoryItem;
  onPress: (item: InventoryItem) => void;
}

export default function InventoryCard({ item, onPress }: InventoryCardProps) {
  // const Icon = item.icon

  return (
    <TouchableOpacity
      style={STYLES.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      {/*<Icon size={48} color={'black'}/>*/}
      <Text style={STYLES.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
}
