import Header from '@/components/header';
import React from 'react';
import {View} from 'react-native';
import InventoryGrid from '../../components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import {inv} from "@/app/_layout";

export default function RefrigeratedTab() {
  return (
    <View style={STYLES.container}>
      <Header />
      <InventoryGrid 
        items={inv!.filter(i => i.category === "REFRIGERATED")}
        sectionTitle="Refrigerated"
      />
    </View>
  );
}
