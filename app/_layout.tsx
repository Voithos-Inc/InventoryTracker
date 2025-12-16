import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES} from "@/constants/styles";
import {useInventory} from "@/store/inventory";
import React, {useEffect} from "react";
import {InventoryItem} from "@/types/inventory";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export let inv: null | InventoryItem[] = null

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'AlternateGothicNo3D-Regular': require('../assets/fonts/AlternateGothicNo3D-Regular.otf'),
    'FuturaPT-Book': require('../assets/fonts/FuturaPTBook.otf'),
    'FuturaPT-Medium': require('../assets/fonts/FuturaPTMedium.otf'),
    'FuturaPT-Bold': require('../assets/fonts/FuturaPTBold.otf'),
  });

  const loadInv = useInventory((state) => state.loadInv);
  inv = useInventory((state) => state.inv);

  useEffect(() => {
    loadInv();
  }, [loadInv]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (inv === null) {
    return null;
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}