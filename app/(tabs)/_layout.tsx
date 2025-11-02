import { Tabs } from 'expo-router';
import { IceCream, Droplet, Coffee, Utensils, Settings } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: COLORS.tabBarBg,
          borderTopWidth: 2,
          borderTopColor: '#666',
          paddingVertical: 12,
          height: 80,
        },
        tabBarActiveBackgroundColor: COLORS.tabBarActive,
        tabBarItemStyle: {
          borderRadius: 8,
          marginHorizontal: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="toppings"
        options={{
          tabBarIcon: ({ color }) => (
            <IceCream size={32} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="flavors"
        options={{
          tabBarIcon: ({ color }) => (
            <Droplet size={32} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="cones"
        options={{
          tabBarIcon: ({ color }) => (
            <Coffee size={32} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="supplies"
        options={{
          tabBarIcon: ({ color }) => (
            <Utensils size={32} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Settings size={32} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}