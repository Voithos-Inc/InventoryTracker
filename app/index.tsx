import { useEffect } from 'react';
import {Stack, useRouter} from 'expo-router';
import {STYLES} from "@/constants/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import React from 'react';
import { categories } from './_layout';

export default function Index() {
  const router = useRouter();
  

  useEffect(() => {
    if (categories === null) return;
    const firstCat = categories.length > 0 ? categories[0] : ""
    router.replace(`/c/${firstCat}`);
    return
  }, [router, categories]);

  return (
    <SafeAreaView style={STYLES.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
