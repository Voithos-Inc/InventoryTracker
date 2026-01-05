import React, {useMemo} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {COLORS, STYLES} from '@/constants/styles';
import {useInventory} from '@/store/inventory';
import {CATEGORY, InventoryItem} from '@/types/inventory';
import {ArrowLeft, Clock} from 'lucide-react-native';

export default function CountProgressScreen() {
  const router = useRouter();
  const inv = useInventory((state) => state.inv);

  const stats = useMemo(() => {
    if (!inv) return {completed: 0, pending: 0, total: 0, percentage: 0};

    const completed = inv.filter(item => item.completed).length;
    const total = inv.length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {completed, pending, total, percentage};
  }, [inv]);

  const categoryStats = useMemo(() => {
    if (!inv) return [];

    // Dynamically get all unique categories from inventory
    const uniqueCategories = Array.from(
        new Set(inv.map(item => item.category))
    ).sort();

    return uniqueCategories.map(category => {
      const items = inv.filter(item => item.category === category);
      const completed = items.filter(item => item.completed).length;
      const pending = items.filter(item => !item.completed);
      const total = items.length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        category,
        completed,
        total,
        percentage,
        pendingItems: pending
      };
    }).filter(stat => stat.total > 0);
  }, [inv]);

  const getStatusText = () => {
    if (stats.percentage === 0) return 'Not Started';
    if (stats.percentage === 100) return 'Complete';
    return 'In Progress';
  };

  return (
      <SafeAreaView style={[STYLES.container, {backgroundColor: COLORS.main_bg}]}>
        {/* Header */}
        <View
            style={{
              backgroundColor: COLORS.tabBarBg,
              paddingVertical: 16,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 3,
              borderBottomColor: COLORS.header_bg
            }}
        >
          <Pressable onPress={() => router.back()} style={{marginRight: 16}}>
            <ArrowLeft size={32} color="white"/>
          </Pressable>
          <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: COLORS.textonbg,
                flex: 1
              }}
          >
            Count Progress
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          {/* Overall Progress Card */}
          <View
              style={{
                backgroundColor: 'white',
                margin: 20,
                padding: 24,
                borderRadius: 16,
                borderWidth: 3,
                borderColor: COLORS.MINT,
                alignItems: 'center'
              }}
          >
            <Clock size={48} color={COLORS.tabBarBg} strokeWidth={2}/>

            <Text
                style={{
                  fontSize: 64,
                  fontWeight: '700',
                  color: COLORS.tabBarBg,
                  marginTop: 12
                }}
            >
              {stats.percentage}%
            </Text>

            <Text
                style={{
                  fontSize: 18,
                  color: COLORS.textgray,
                  marginBottom: 20
                }}
            >
              {getStatusText()}
            </Text>

            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: 12
                }}
            >
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 32, fontWeight: '700', color: COLORS.confirm}}>
                  {stats.completed}
                </Text>
                <Text style={{fontSize: 14, color: COLORS.textgray}}>Completed</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 32, fontWeight: '700', color: COLORS.warn}}>
                  {stats.pending}
                </Text>
                <Text style={{fontSize: 14, color: COLORS.textgray}}>Pending</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 32, fontWeight: '700', color: COLORS.tabBarBg}}>
                  {stats.total}
                </Text>
                <Text style={{fontSize: 14, color: COLORS.textgray}}>Total</Text>
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={{paddingHorizontal: 20, marginBottom: 20}}>
            <View
                style={{
                  height: 12,
                  backgroundColor: COLORS.textonbg,
                  borderRadius: 6,
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: COLORS.MINT
                }}
            >
              <View
                  style={{
                    height: '100%',
                    width: `${stats.percentage}%`,
                    backgroundColor: COLORS.confirm
                  }}
              />
            </View>
          </View>

          {/* Category Breakdown */}
          <View style={{paddingHorizontal: 20}}>
            <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  marginBottom: 16,
                  color: COLORS.textoncontrast
                }}
            >
              By Category
            </Text>

            {categoryStats.map((stat) => (
                <View
                    key={stat.category}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: 2,
                      borderColor: COLORS.MINT
                    }}
                >
                  <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }}
                  >
                    <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: COLORS.textoncontrast
                        }}
                    >
                      {stat.category}
                    </Text>
                    <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: stat.percentage === 100 ? COLORS.confirm : COLORS.tabBarBg
                        }}
                    >
                      {stat.percentage}%
                    </Text>
                  </View>

                  <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.textgray,
                        marginBottom: 8
                      }}
                  >
                    {stat.completed} of {stat.total} items counted
                  </Text>

                  {stat.pendingItems.length > 0 && (
                      <View
                          style={{
                            marginTop: 8,
                            paddingTop: 12,
                            borderTopWidth: 1,
                            borderTopColor: COLORS.textonbg
                          }}
                      >
                        <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.textgray,
                              marginBottom: 6
                            }}
                        >
                          Pending:
                        </Text>
                        {stat.pendingItems.slice(0, 3).map((item) => (
                            <View
                                key={item.id}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginBottom: 4
                                }}
                            >
                              <View
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: COLORS.warn,
                                    marginRight: 8
                                  }}
                              />
                              <Text
                                  style={{
                                    fontSize: 14,
                                    color: COLORS.textoncontrast
                                  }}
                              >
                                {item.name}
                              </Text>
                            </View>
                        ))}
                        {stat.pendingItems.length > 3 && (
                            <Text
                                style={{
                                  fontSize: 12,
                                  color: COLORS.textgray,
                                  fontStyle: 'italic',
                                  marginTop: 4
                                }}
                            >
                              +{stat.pendingItems.length - 3} more
                            </Text>
                        )}
                      </View>
                  )}
                </View>
            ))}
          </View>

          <View style={{height: 100}} />
        </ScrollView>
      </SafeAreaView>
  );
}