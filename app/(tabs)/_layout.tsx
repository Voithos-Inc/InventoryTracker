import React, { useEffect } from 'react';
import { Slot, usePathname, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, STYLES } from '@/constants/styles';
import { useInventory } from '@/store/inventory';
import { anyToTitleCase } from '@/lib/utils';

export default function TabLayout() {
  const { categories, loadInv } = useInventory();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    loadInv();
  }, []);

  if (!categories.length) return null;

  return (
    <SafeAreaView style={STYLES.container}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -12,
          height: 90,
          paddingBottom: 12,
          paddingHorizontal: 10,

          backgroundColor: COLORS.tabBarBg,
          borderTopWidth: 2,
          borderTopColor: COLORS.pure_black,
          borderRadius: 12,
          overflow: 'hidden',

          flexDirection: 'row',
        }}
      >
        {categories.map((c) => {
          const isActive = pathname === `/c/${c}`;

          return (
            <Pressable
              key={c}
              onPress={() => router.push(`/c/${c}`)}
              style={{
                flex: 1,
                borderColor: COLORS.pure_black,
                borderRadius: 16,
                marginHorizontal: 0,
                backgroundColor: isActive
                  ? COLORS.tabBarActive
                  : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FONTS.bodyLight,
                  overflow: 'visible',
                  color: isActive
                    ? COLORS.textonbg
                    : COLORS.pure_white,
                }}
              >
                {anyToTitleCase(c)}
              </Text>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => router.push('/settings')}
          style={{
            flex: 1,
            borderColor: COLORS.pure_black,
            borderRadius: 16,
            marginHorizontal: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: pathname === `/settings`
              ? COLORS.tabBarActive
              : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bodyLight,
              overflow: 'visible',
              color: pathname === `/settings`
                ? COLORS.textonbg
                : COLORS.pure_white,
            }}
          >
            Settings
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

