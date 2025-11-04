import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Acme_400Regular } from '@expo-google-fonts/acme';
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES} from "@/constants/styles";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Acme_400Regular });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}