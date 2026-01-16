import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {STYLES} from "@/constants/styles";
import {DndProvider, Draggable, DraggableGrid, DraggableGridProps} from "@mgcrea/react-native-dnd";
import {SORT_ORDER_SHELF_OFFSET, sortOrderToRack, sortOrderToShelf} from "@/constants/constants";
import {insertItem} from "@/lib/supabase";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const shelved_items = items.filter(i => i.sort_order !== undefined && Math.floor(i.sort_order / SORT_ORDER_SHELF_OFFSET) > 0)
  const unshelved_items = items.filter(i => !shelved_items.includes(i))

  const shelved_item_map = new Map<number, InventoryItem[]>([])

  shelved_items.map((i: InventoryItem) => {
    shelved_item_map.set(
      Math.floor(i.sort_order!  / SORT_ORDER_SHELF_OFFSET),
      [...(shelved_item_map.get(Math.floor(i.sort_order!  / SORT_ORDER_SHELF_OFFSET),) ?? []), i]
    )
  })

  function getItemCategory(item: InventoryItem) {
    return Math.floor((item.sort_order ?? 0) / SORT_ORDER_SHELF_OFFSET)
  }

  const onGridOrderChange: DraggableGridProps["onOrderChange"] = (value) => {
    const newSorted = value.map((id) => items.find((item: InventoryItem) => item.id.toString() === id.toString())!);
    console.log("newSorted", newSorted)

    if (newSorted.length === 0) return

    let currentCat = getItemCategory(newSorted[0])
    let currentColNum = 0
    let newItemList: InventoryItem[] = []

    for (const item of newSorted) {
      if (getItemCategory(item) !== currentCat) {
        currentColNum = 0
        currentCat = getItemCategory(item)
      }
      newItemList.push({...item, sort_order: currentCat * SORT_ORDER_SHELF_OFFSET + currentColNum})
      currentColNum++
    }

    console.log(newItemList)

    for (const newItem of newItemList) {
      insertItem(newItem)
    }
  }

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

          {[...shelved_item_map.entries()].map(([sort_order, items]) => (
            <View key={sort_order} style={{width: '95%'}}>
              <View key={sort_order} style={STYLES.gridShelfHeaderContainer}>
                <Text key={sort_order} style={STYLES.gridShelfHeader}>Rack {sortOrderToRack(sort_order)}, Shelf {sortOrderToShelf(sort_order)}</Text>
              </View>

              <DndProvider>
                <DraggableGrid direction="row" size={3} style={STYLES.grid} onOrderChange={onGridOrderChange}>
                  {items.map((item) => (
                    <Draggable key={item.sort_order} id={item.id.toString()} style={STYLES.draggableGridItem}>
                      <View style={STYLES.gridItem}>
                        <InventoryCard item={item}/>
                      </View>
                    </Draggable>
                  ))}
                </DraggableGrid>
              </DndProvider>
            </View>
          ))}

          <View style={{...STYLES.gridShelfHeaderContainer, width: '95%'}}>
            <Text style={STYLES.gridShelfHeader}>Unshelved items</Text>
          </View>

          <View style={{width: '95%'}}>
            <DndProvider>
              <DraggableGrid direction="row" size={3} style={STYLES.grid} onOrderChange={onGridOrderChange}>
                {unshelved_items.map((item) => (
                  <Draggable key={item.sort_order} id={item.id.toString()} style={STYLES.draggableGridItem}>
                    <View style={STYLES.gridItem}>
                      <InventoryCard item={item}/>
                    </View>
                  </Draggable>
                ))}
              </DraggableGrid>
            </DndProvider>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
