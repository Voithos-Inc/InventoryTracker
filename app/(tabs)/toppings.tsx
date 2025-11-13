import Header from '@/components/header';
import InventoryGrid from '@/components/InventoryGrid';
import { INVENTORY_DATA } from '@/constants/dummy_data';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {STYLES} from "@/constants/styles";

export default function ToppingsTab() {
  return (
    <View style={STYLES.container}>
      <Header />
      <InventoryGrid 
        items={INVENTORY_DATA.toppings} 
        sectionTitle="Toppings"
      />
    </View>
  );
}
