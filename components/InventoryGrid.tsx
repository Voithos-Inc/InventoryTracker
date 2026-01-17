import React, { useState } from 'react';
import {View, Text, ScrollView, Pressable, Switch} from 'react-native';
import InventoryCard from './InventoryCard';
import { InventoryItem } from '@/types/inventory';
import {COLORS, STYLES} from "@/constants/styles";
import {DndProvider, Draggable, DraggableGrid, DraggableGridProps} from "@mgcrea/react-native-dnd";
import {SORT_ORDER_SHELF_OFFSET} from "@/constants/constants";
import {insertItem} from "@/lib/supabase";
import {useInventory} from "@/store/inventory";

interface InventoryGridProps {
  items: InventoryItem[];
  sectionTitle: string;
}

export default function InventoryGrid({ items, sectionTitle }: InventoryGridProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [pendingItems, setPendingItems] = useState<InventoryItem[]>([])

  React.useEffect(() => {
    setRefreshKey(prev => prev + 1)
  }, [])

  const inv = useInventory((state) => state.inv);
  const loadInv = useInventory((state) => state.loadInv);

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

  const onButtonPress = async () => {
    if (isDraggable && pendingItems.length > 0) {
      // Saving when turning OFF draggable mode
      await Promise.all(pendingItems.map(item => insertItem(item)))
      await loadInv()
      setPendingItems([])
    }
    setIsDraggable(!isDraggable)
  }

  const onGridOrderChange: DraggableGridProps["onOrderChange"] = async (value) => {
    const newSorted = value.map((id) => items.find((item: InventoryItem) => item.id.toString() === id.toString())!);

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

    setPendingItems(newItemList)
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
            <Pressable onPress={onButtonPress} style={{...STYLES.draggableButton, backgroundColor: isDraggable ? COLORS.MAXS_TEAL : COLORS.main_bg}}>
              <Text style={{...STYLES.draggableButtonText, color: isDraggable ? COLORS.pure_white : COLORS.MAXS_TEAL}}>{isDraggable ? "Disable rearrangement" : "Enable rearrangement"}</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isDraggable ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={isDraggable}
              />
            </Pressable>
          </View>

          {[...shelved_item_map.entries()].map(([sortCat, items]) => (
            <View key={sortCat ^ 17} style={{width: '95%'}}>
              <View key={sortCat ^ 31} style={STYLES.gridShelfHeaderContainer}>
                <Text key={sortCat ^ 67} style={STYLES.gridShelfHeader}>Rack {Math.floor(sortCat / SORT_ORDER_SHELF_OFFSET)}, Shelf {sortCat % SORT_ORDER_SHELF_OFFSET}</Text>
              </View>

              {isDraggable ? (
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
              ) : (
                <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
                  {items.map((item) => (
                    <View key={item.sort_order} style={STYLES.draggableGridItem}>
                      <View style={STYLES.gridItem}>
                        <InventoryCard item={item}/>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          {(unshelved_items.length > 0) &&
            <View style={{width: '95%'}}>
              <View style={{...STYLES.gridShelfHeaderContainer, width: '95%'}}>
                <Text style={STYLES.gridShelfHeader}>Unshelved items</Text>
              </View>

              <DndProvider>
                <DraggableGrid direction="row" size={3} style={STYLES.grid} onOrderChange={onGridOrderChange}>
                  {unshelved_items.map((item) => isDraggable ? (
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
          }
        </View>
      </ScrollView>
    </View>
  );
}
