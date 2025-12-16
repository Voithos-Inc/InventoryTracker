import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { STYLES } from "@/constants/styles";
import { useInventory } from "@/store/inventory";
import React from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Alternate Gothic No 3 D for headings (only Regular)
    'AlternateGothicNo3D-Regular': require('../assets/fonts/AlternateGothicNo3D-Regular.otf'),

    // Futura PT for body text (Book, Medium, Bold)
    'FuturaPT-Book': require('../assets/fonts/FuturaPTBook.otf'),
    'FuturaPT-Medium': require('../assets/fonts/FuturaPTMedium.otf'),
    'FuturaPT-Bold': require('../assets/fonts/FuturaPTBold.otf'),
  });

  const loadInv = useInventory((state) => state.loadInv);
  const inv = useInventory((state) => state.inv);

  useEffect(() => {
    loadInv();
  }, [loadInv]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render until both fonts and inventory are loaded
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