import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InventoryCard from './InventoryCard';
import ItemModal from './ItemModal';
import { InventoryItem } from '@/types/inventory';
import {STYLES} from "@/constants/styles";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCardPress = (item: InventoryItem): void => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <View style={STYLES.scrollContainer}>
      <View style={STYLES.sectionHeader}>
        <Text style={STYLES.sectionTitle}>{sectionTitle}</Text>
      </View>

      <ScrollView 
        style={STYLES.scrollView}
        contentContainerStyle={STYLES.scrollContent}
      >
        <View style={STYLES.grid}>
          {items.map(item => (
            <View key={item.id} style={STYLES.gridItem}>
              <InventoryCard
                item={item}
                onPress={handleCardPress}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <ItemModal 
        visible={modalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </View>
  );
}