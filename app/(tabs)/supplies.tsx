import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '@/components/header';
import InventoryGrid from '@/components/InventoryGrid';
import { INVENTORY_DATA } from '@/constants/dummy_data';

export default function SuppliesTab() {
  return (
    <View style={styles.container}>
      <Header />
      <InventoryGrid 
        items={INVENTORY_DATA.supplies} 
        sectionTitle="Supplies"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});