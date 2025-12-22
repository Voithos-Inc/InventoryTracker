import Header from '@/components/header';
import React from 'react';
import {ScrollView, View} from 'react-native';
import InventoryGrid from '../../components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import {inv} from "@/app/_layout";
import WaveDivider from "@/components/WaveDivider";

export default function BeveragesTab() {
  return (
    <View style={STYLES.container}>
      <View style={STYLES.headerContainer}>
        <Header />
      </View>
      <ScrollView style={STYLES.bodyContainer}>
        <WaveDivider />
        <InventoryGrid
          items={inv!.filter(i => i.category === "BEVERAGES")}
          sectionTitle="Beverages"
        />
      </ScrollView>
    </View>
  );
}
