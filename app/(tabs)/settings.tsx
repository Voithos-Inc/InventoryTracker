import React from 'react';
import { View, Text } from 'react-native';
import {STYLES} from "@/constants/styles";
import Header from "@/components/header";

export default function SuppliesTab() {
  return (
    <View style={STYLES.container}>
      <Header/>

      <View style={STYLES.sectionHeader}>
        <Text style={STYLES.sectionTitle}>Settings</Text>
      </View>

    </View>
  );
};