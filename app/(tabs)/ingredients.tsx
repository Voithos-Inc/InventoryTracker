import React from 'react';
import {View} from 'react-native';
import Header from '@/components/header';
import InventoryGrid from '@/components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import {inv} from "@/app/_layout";

export default function IngredientsTab() {
  return (
    <View style={STYLES.container}>
      <Header />
      <InventoryGrid 
        items={inv!.filter(i => i.category === "INGREDIENTS")}
        sectionTitle="Supplies"
      />
    </View>
  );
}
