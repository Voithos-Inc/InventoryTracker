import ParallaxScrollView from "@/components/parallax-scroll-view";
import {Image} from "expo-image";
import {StyleSheet} from "react-native";
import React from "react";
import {ThemedText} from "@/components/themed-text";
import {ThemedView} from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/partial-maxs-logo.png')}
          style={styles.reactLogo}
          />
      }
      headerBackgroundColor={{light: '#a4d5cc', dark: '#0c575b'}}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Max&#39;s Best Inventory</ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
