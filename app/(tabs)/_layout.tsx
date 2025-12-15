import {Tabs} from 'expo-router';
import {
  Settings,
  CupSoda,
  Milk,
  Refrigerator,
  Snowflake,
  ClipboardList, Droplets, Sparkles
} from 'lucide-react-native';
import { COLORS, STYLES } from '@/constants/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';

export default function TabLayout() {
  return (
    <SafeAreaView style={STYLES.container}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.textonbg,
          tabBarInactiveTintColor: COLORS.pure_white,
          tabBarStyle: {
            backgroundColor: COLORS.tabBarBg,
            borderTopWidth: 2,
            borderTopColor: COLORS.pure_black,
            position: 'absolute',
            bottom: -12,
            overflow: 'hidden',
            paddingVertical: 12,
            height: 100,
            borderRadius: 12,
          },
          tabBarActiveBackgroundColor: COLORS.tabBarActive,
          tabBarItemStyle: {
            borderColor: COLORS.pure_black,
            borderRadius: 16,
            marginHorizontal: 0,
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 26,
            fontWeight: '400',
            overflow: 'visible',
            marginBottom: 6
          },
          tabBarLabel:
            route.name.charAt(0).toUpperCase() + route.name.slice(1),
        })}
      >
        <Tabs.Screen
          name="beverages"
          options={{
            title: 'Beverages',
            tabBarIcon: ({ color }) => (
              <CupSoda size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="dairy"
          options={{
            title: 'Dairy',
            tabBarIcon: ({ color }) => (
              <Milk size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="frozen"
          options={{
            title: 'Frozen',
            tabBarIcon: ({ color }) => (
              <Snowflake size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="ingredients"
          options={{
            title: 'Ingredients',
            tabBarIcon: ({ color }) => (
              <ClipboardList size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="refrigerated"
          options={{
            title: 'Refrigerated',
            tabBarIcon: ({ color }) => (
              <Refrigerator size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="sauces"
          options={{
            title: 'Sauces',
            tabBarIcon: ({ color }) => (
              <Droplets size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="toppings"
          options={{
            title: 'Toppings',
            tabBarIcon: ({ color }) => (
              <Sparkles size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <Settings size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}