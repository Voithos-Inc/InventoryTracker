import {Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES} from "@/constants/styles";
import {useInventory} from "@/store/inventory";
import React, {useEffect} from "react";
import {InventoryItem} from "@/types/inventory";
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto-hide with error handling for Expo Go
try {
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  // Ignore errors in Expo Go - this is expected
  console.log('SplashScreen not available in Expo Go');
}

export let inv: null | InventoryItem[] = null
export let categories: null | string[] = null

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'AlternateGothicNo3D-Regular': require('../assets/fonts/AlternateGothicNo3D-Regular.otf'),
    'FuturaCyrillicLight': require('../assets/fonts/FuturaCyrillicLight.otf'),
    'FuturaPT-Book': require('../assets/fonts/FuturaPTBook.otf'),
    'FuturaPT-Medium': require('../assets/fonts/FuturaPTMedium.otf'),
    'FuturaPT-Bold': require('../assets/fonts/FuturaPTBold.otf'),
  });

  const loadInv = useInventory((state) => state.loadInv);
  inv = useInventory((state) => state.inv);
  categories = useInventory((state) => state.categories);

  useEffect(() => {
    loadInv();
  }, [loadInv]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen with error handling for Expo Go
      try {
        SplashScreen.hideAsync();
      } catch (e) {
        // Ignore errors in Expo Go
        console.log('SplashScreen.hideAsync not available');
      }
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (inv?.length === 0) {
    return null;
  }

  return (
      <SafeAreaView style={STYLES.container}>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
  );
}
