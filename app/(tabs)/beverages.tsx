import Header from '@/components/header';
import React from 'react';
import {View} from 'react-native';
import InventoryGrid from '../../components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import {inv} from "@/app/_layout";

export default function BeveragesTab() {
  return (
    <View style={STYLES.container}>
      <Header />
      <InventoryGrid 
        items={inv!.filter(i => i.category === "BEVERAGES")}
        sectionTitle="Flavors"
      />
    </View>
  );
}
