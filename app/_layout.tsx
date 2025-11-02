import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Acme_400Regular } from '@expo-google-fonts/acme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Acme_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}