import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES} from "@/constants/styles";
import {useInventory} from "@/store/inventory";
import {useEffect} from "react";
import {InventoryItem} from "@/types/inventory";

export let inv: null | InventoryItem[] = null

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  const loadInv = useInventory((state) => state.loadInv)

  useEffect(() => {
    loadInv()
  }, [loadInv]);

  inv = useInventory((state) => state.inv)

  if (!fontsLoaded || inv === null) return null;

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}