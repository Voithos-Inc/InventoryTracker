import React from 'react';
import {Image, View, Text} from 'react-native';
import {STYLES} from '@/constants/styles';

export default function Header() {
  return (
    <View style={STYLES.header}>
      <Image
        style={STYLES.headerLogo}
        source={require("../assets/images/maxs_logo.png")}
        resizeMode={"contain"}
      />
      <Text style={STYLES.headerTitle}>Inventory</Text>
      <Image
        style={STYLES.headerLogo}
        source={require("../assets/images/best_buddies.png")}
        resizeMode={"contain"}
      />
    </View>
  );
}
