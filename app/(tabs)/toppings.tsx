import Header from '@/components/header';
import InventoryGrid from '@/components/InventoryGrid';
import { INVENTORY_DATA } from '@/constants/dummy_data';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ToppingsTab() {
  return (
    <View style={styles.container}>
      <Header />
      <InventoryGrid 
        items={INVENTORY_DATA.toppings} 
        sectionTitle="Toppings"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});