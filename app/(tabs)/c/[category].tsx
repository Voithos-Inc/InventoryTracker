import Header from '@/components/header';
import React from 'react';
import {ScrollView, View} from 'react-native';
import InventoryGrid from '@/components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import WaveDivider from "@/components/WaveDivider";
import { useLocalSearchParams } from 'expo-router';
import { titleCase } from 'title-case';
import {useInventory} from "@/store/inventory";

export default function CategoryTab() {
  const params = useLocalSearchParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category

  const inv = useInventory((state) => state.inv);

  return (
    <View style={STYLES.container}>
      <View style={STYLES.headerContainer}>
        <Header />
      </View>
      <ScrollView style={STYLES.bodyContainer}>
        <WaveDivider />
        <InventoryGrid
          items={(inv ?? []).filter(i => i.category === category)}
          sectionTitle={titleCase(category)}
        />
      </ScrollView>
    </View>
  );
}
