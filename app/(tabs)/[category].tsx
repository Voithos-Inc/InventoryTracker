import Header from '@/components/header';
import React from 'react';
import {ScrollView, View} from 'react-native';
import InventoryGrid from '../../components/InventoryGrid';
import {STYLES} from "@/constants/styles";
import {inv} from "@/app/_layout";
import WaveDivider from "@/components/WaveDivider";
import { useLocalSearchParams } from 'expo-router';
import { camelCaseToTitleWithSpaces } from '@/lib/utils';

export default function CategoryTab() {
  const params = useLocalSearchParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category

  return (
    <View style={STYLES.container}>
      <View style={STYLES.headerContainer}>
        <Header />
      </View>
      <ScrollView style={STYLES.bodyContainer}>
        <WaveDivider />
        <InventoryGrid
          items={inv!.filter(i => i.category === category)}
          sectionTitle={camelCaseToTitleWithSpaces(category)}
        />
      </ScrollView>
    </View>
  );
}
