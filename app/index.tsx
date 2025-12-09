import { useEffect } from 'react';
import {Stack, useRouter} from 'expo-router';
import {STYLES} from "@/constants/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import React from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/beverages');
    return
  }, [router]);

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
