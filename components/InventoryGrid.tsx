import React, { useState } from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {COLORS, STYLES} from "@/constants/styles";
import {DndProvider, Draggable, DraggableGrid, DraggableGridProps} from "@mgcrea/react-native-dnd";
import {SORT_ORDER_SHELF_OFFSET} from "@/constants/constants";
import {insertItem} from "@/lib/supabase";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  React.useEffect(() => {
    setRefreshKey(prev => prev + 1)
  }, [])

  const shelved_items = items.filter(i => Math.floor((i.sort_order ?? 0) / SORT_ORDER_SHELF_OFFSET) > 0)
  const unshelved_items = items.filter(i => !shelved_items.includes(i))

  const shelved_item_map = new Map<number, InventoryItem[]>([])

  shelved_items.map((i: InventoryItem) => {
    shelved_item_map.set(
      Math.floor(i.sort_order!  / SORT_ORDER_SHELF_OFFSET),
      [...(shelved_item_map.get(Math.floor(i.sort_order!  / SORT_ORDER_SHELF_OFFSET)) ?? []), i]
    )
  })

  function getItemCategory(item: InventoryItem) {
    return Math.floor((item.sort_order ?? 0) / SORT_ORDER_SHELF_OFFSET)
  }

  const onGridOrderChange: DraggableGridProps["onOrderChange"] = (value) => {
    const newSorted = value.map((id) => items.find((item: InventoryItem) => item.id.toString() === id.toString())!);

    if (newSorted.length === 0) return

    let currentCat = getItemCategory(newSorted[0])
    let currentColNum = 0
    let newItemList: InventoryItem[] = []

    for (const item of newSorted) {
      if (getItemCategory(item) !== currentCat) {
        currentColNum = 0
        currentCat =  getItemCategory(item)
      }
      newItemList.push({...item, sort_order: currentCat * SORT_ORDER_SHELF_OFFSET + currentColNum})
      currentColNum++
    }

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
        <View style={{alignItems: "center"}} key={refreshKey}>
          <View style={STYLES.sectionHeader}>
            <Text style={STYLES.sectionTitle}>{sectionTitle}</Text>
          </View>

          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <Pressable onPress={() => setIsDraggable(!isDraggable)} style={{...STYLES.draggableButton, backgroundColor: isDraggable ? COLORS.MAXS_TEAL : COLORS.main_bg}}>
              <Text style={{...STYLES.draggableButtonText, color: isDraggable ? COLORS.pure_white : COLORS.MAXS_TEAL}}>{isDraggable ? "Disable rearrangement" : "Enable rearrangement"}</Text>
            </Pressable>
          </View>

          {[...shelved_item_map.entries()].map(([sortCat, items]) => (
            <View key={sortCat ^ 17} style={{width: '95%'}}>
              <View key={sortCat ^ 31} style={STYLES.gridShelfHeaderContainer}>
                <Text key={sortCat ^ 67} style={STYLES.gridShelfHeader}>Rack {Math.floor(sortCat / SORT_ORDER_SHELF_OFFSET)}, Shelf {sortCat % SORT_ORDER_SHELF_OFFSET}</Text>
              </View>

              <DndProvider>
                <DraggableGrid direction="row" size={3} style={STYLES.grid} onOrderChange={onGridOrderChange}>
                  {items.map((item) =>
                    isDraggable ? (
                    <Draggable key={item.sort_order} id={item.id.toString()} style={STYLES.draggableGridItem}>
                      <View style={STYLES.gridItem}>
                        <InventoryCard item={item}/>
                      </View>
                    </Draggable>
                  ) : (
                    <View key={item.sort_order} id={item.id.toString()} style={STYLES.draggableGridItem}>
                      <View style={STYLES.gridItem}>
                        <InventoryCard item={item}/>
                      </View>
                    </View>
                  ))}
                </DraggableGrid>
              </DndProvider>
            </View>
          ))}

          {(unshelved_items.length > 0) &&
            <View style={{width: '95%'}}>
              <View style={{...STYLES.gridShelfHeaderContainer, width: '95%'}}>
                <Text style={STYLES.gridShelfHeader}>Unshelved items</Text>
              </View>

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
          }
        </View>
      </ScrollView>
    </View>
  );
}
