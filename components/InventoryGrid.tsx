import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {STYLES} from "@/constants/styles";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const shelved_items = items.filter(i => i.sort_order != undefined)
  const unshelved_items = items.filter(i => i.sort_order == undefined)

  const shelved_item_map = new Map<number, InventoryItem[]>([])

  shelved_items.map((i: InventoryItem) => {
    shelved_item_map.set(
      i.sort_order!!,
      [...(shelved_item_map.get(i.sort_order!!) ?? []), i]
    )
  })

  return (
    <View style={STYLES.scrollContainer}>
      <ScrollView 
        style={STYLES.scrollView}
        contentContainerStyle={STYLES.scrollContent}
      >
        <View style={STYLES.sectionHeader}>
          <Text style={STYLES.sectionTitle}>{sectionTitle}</Text>
        </View>

        {[...shelved_item_map.entries()].map(([shelf, items]) => (
          <View>
            <View key={shelf} style={STYLES.gridShelfHeaderContainer}>
              <Text key={shelf} style={STYLES.gridShelfHeader}>Shelf {shelf}</Text>
            </View>

            <View style={STYLES.grid}>
              {items.map((item: InventoryItem) => (
                <View key={item.id} style={STYLES.gridItem}>
                  <InventoryCard
                    item={item}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={STYLES.grid}>
          {unshelved_items.map(item => (
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
