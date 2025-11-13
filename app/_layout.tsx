import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES} from "@/constants/styles";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}