import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {STYLES} from "@/constants/styles";
import {DndProvider, Draggable, DraggableGrid, DraggableGridProps} from "@mgcrea/react-native-dnd";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

type InventoryGridItem = {
  key: string | number;
  item: InventoryItem;
};

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const gridItems: InventoryGridItem[] = items.map((item: InventoryItem) => ({key: item.id, item}))

  const shelved_items = items.filter(i => i.sort_order != undefined)
  const unshelved_items = items.filter(i => i.sort_order == undefined)

  const shelved_item_map = new Map<number, InventoryItem[]>([])

  shelved_items.map((i: InventoryItem) => {
    shelved_item_map.set(
      i.sort_order!!,
      [...(shelved_item_map.get(i.sort_order!!) ?? []), i]
    )
  })

  function renderItem(gridItem : InventoryGridItem) {
    return (
      <View key={gridItem.key} style={STYLES.draggableGridItem}>
        <InventoryCard
          item={gridItem.item}
        />
      </View>
    )
  }

  const onGridOrderChange: DraggableGridProps["onOrderChange"] = (value) => {
    console.log("onGridOrderChange", value);
  };

  return (
    <View style={STYLES.scrollContainer}>
      <ScrollView
        style={STYLES.scrollView}
        contentContainerStyle={STYLES.gridScrollContent}
      >
        <View style={{alignItems: "center"}}>
          <View style={STYLES.sectionHeader}>
            <Text style={STYLES.sectionTitle}>{sectionTitle}</Text>
          </View>

          <DndProvider>
            <DraggableGrid direction="row" size={3} style={STYLES.grid} onOrderChange={onGridOrderChange}>
              {items.map((item) => (
                <Draggable key={item.id} id={item.id.toString()} style={STYLES.draggableGridItem}>
                  <View >
                    <InventoryCard item={item}/>
                  </View>
                </Draggable>
              ))}
            </DraggableGrid>
          </DndProvider>

          {/*

          {[...shelved_item_map.entries()].map(([shelf, items]) => (
            <View key={shelf}>
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
          */}
        </View>
      </ScrollView>
    </View>
  );
}
