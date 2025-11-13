import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {STYLES} from '@/constants/styles';

export default function Header() {
  return (
    <View style={STYLES.header}>
      <Text style={STYLES.headerTitle}>Max&#39;s Best Ice Cream</Text>
    </View>
  );
}
