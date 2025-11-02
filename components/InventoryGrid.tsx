import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import InventoryCard from './InventoryCard';
import ItemModal from './ItemModal';
import { COLORS } from '@/constants/colors';
import { InventoryItem } from '@/types/inventory';

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
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {items.map(item => (
            <InventoryCard 
              key={item.id} 
              item={item}
              onPress={handleCardPress}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  sectionHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '400',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});