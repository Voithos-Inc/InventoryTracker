import { Tabs } from 'expo-router';
import { IceCream, Droplet, Utensils, Settings } from 'lucide-react-native';
import { COLORS, STYLES } from '@/constants/styles';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={STYLES.container}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.textonbg,
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: COLORS.tabBarBg,
            borderTopWidth: 2,
            borderTopColor: '#000',
            position: 'absolute',
            bottom: -12,
            overflow: 'hidden',
            paddingVertical: 12,
            height: 100,
            borderRadius: 12,
          },
          tabBarActiveBackgroundColor: COLORS.tabBarActive,
          tabBarItemStyle: {
            borderColor: '#000',
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
          name="toppings"
          options={{
            title: 'Toppings',
            tabBarIcon: ({ color }) => (
              <Droplet size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="flavors"
          options={{
            title: 'Flavors',
            tabBarIcon: ({ color }) => (
              <IceCream size={32} color={color} strokeWidth={3} />
            ),
          }}
        />
        <Tabs.Screen
          name="supplies"
          options={{
            title: 'Supplies',
            tabBarIcon: ({ color }) => (
              <Utensils size={32} color={color} strokeWidth={3} />
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