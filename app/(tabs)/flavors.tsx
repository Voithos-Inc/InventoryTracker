import Header from '@/components/header';
import { INVENTORY_DATA } from '@/constants/dummy_data';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InventoryGrid from '../../components/InventoryGrid';

export default function FlavorsTab() {
  return (
    <View style={styles.container}>
      <Header />
      <InventoryGrid 
        items={INVENTORY_DATA.flavors} 
        sectionTitle="Flavors"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});