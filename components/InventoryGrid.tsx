import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {COLORS, STYLES} from "@/constants/styles";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  return (
    <View style={STYLES.scrollContainer}>
      <ScrollView 
        style={STYLES.scrollView}
        contentContainerStyle={STYLES.scrollContent}
      >
        <View style={STYLES.sectionHeader}>
          <Text style={STYLES.sectionTitle}>{sectionTitle}</Text>
        </View>

        <View style={STYLES.grid}>
          {items.map(item => (
            <View key={item.id} style={STYLES.gridItem}>
              <InventoryCard
                item={item}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}