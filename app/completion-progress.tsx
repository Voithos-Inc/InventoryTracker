// app/completion-progress.tsx - View count completion progress

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, STYLES } from '@/constants/styles';
import { useInventory } from '@/store/inventory';
import { ArrowLeft, Check, Clock, AlertCircle } from 'lucide-react-native';

export default function CompletionProgressScreen() {
    const router = useRouter();
    const inv = useInventory((state) => state.inv);

    if (!inv) {
        return (
            <SafeAreaView style={STYLES.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    // Calculate stats
    const totalItems = inv.length;
    const completedItems = inv.filter((i) => i.is_completed).length;
    const pendingItems = totalItems - completedItems;
    const completionPercentage = Math.round((completedItems / totalItems) * 100);

    // Group by category
    const categoryStats: Record<
        string,
        { total: number; completed: number; pending: string[] }
    > = {};

    inv.forEach((item) => {
        if (!categoryStats[item.category]) {
            categoryStats[item.category] = { total: 0, completed: 0, pending: [] };
        }
        categoryStats[item.category].total++;
        if (item.is_completed) {
            categoryStats[item.category].completed++;
        } else {
            categoryStats[item.category].pending.push(item.name);
        }
    });

    return (
        <SafeAreaView style={[STYLES.container, { paddingBottom: 0 }]}>
            {/* Header */}
            <View
                style={{
                    backgroundColor: COLORS.header_bg,
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: '#5A8CA0'
                }}
            >
                <Pressable onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <ArrowLeft size={32} color="white" />
                </Pressable>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        flex: 1
                    }}
                >
                    Count Progress
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            >
                {/* Overall Progress Card */}
                <View
                    style={{
                        backgroundColor: completionPercentage === 100 ? '#D4EDDA' : 'white',
                        borderRadius: 16,
                        padding: 24,
                        marginBottom: 24,
                        borderWidth: 3,
                        borderColor: completionPercentage === 100 ? '#28A745' : COLORS.header_bg,
                        alignItems: 'center'
                    }}
                >
                    {completionPercentage === 100 ? (
                        <Check size={48} color="#28A745" strokeWidth={3} />
                    ) : (
                        <Clock size={48} color={COLORS.header_bg} strokeWidth={3} />
                    )}

                    <Text
                        style={{
                            fontSize: 64,
                            fontWeight: '700',
                            color:
                                completionPercentage === 100 ? '#28A745' : COLORS.header_bg,
                            marginTop: 16
                        }}
                    >
                        {completionPercentage}%
                    </Text>

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: COLORS.textoncontrast,
                            marginTop: 8
                        }}
                    >
                        {completionPercentage === 100
                            ? 'Count Complete!'
                            : 'In Progress'}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 16,
                            gap: 32
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 32,
                                    fontWeight: '700',
                                    color: '#28A745'
                                }}
                            >
                                {completedItems}
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                Completed
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 32,
                                    fontWeight: '700',
                                    color: '#FFA500'
                                }}
                            >
                                {pendingItems}
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                Pending
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 32,
                                    fontWeight: '700',
                                    color: COLORS.header_bg
                                }}
                            >
                                {totalItems}
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.textgray }}>Total</Text>
                        </View>
                    </View>
                </View>

                {/* Progress Bar */}
                <View
                    style={{
                        backgroundColor: '#e0e0e0',
                        height: 24,
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginBottom: 32
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#28A745',
                            height: '100%',
                            width: `${completionPercentage}%`
                        }}
                    />
                </View>

                {/* Category Breakdown */}
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

                {Object.entries(categoryStats).map(([category, stats]) => {
                    const categoryPercentage = Math.round(
                        (stats.completed / stats.total) * 100
                    );

                    return (
                        <View
                            key={category}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 12,
                                borderWidth: 2,
                                borderColor:
                                    categoryPercentage === 100 ? '#28A745' : COLORS.header_bg
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 8
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '600',
                                        color: COLORS.textoncontrast
                                    }}
                                >
                                    {category}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        color:
                                            categoryPercentage === 100 ? '#28A745' : COLORS.header_bg
                                    }}
                                >
                                    {categoryPercentage}%
                                </Text>
                            </View>

                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLORS.textgray,
                                    marginBottom: 8
                                }}
                            >
                                {stats.completed} of {stats.total} items counted
                            </Text>

                            {/* Progress bar */}
                            <View
                                style={{
                                    backgroundColor: '#e0e0e0',
                                    height: 8,
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    marginBottom: stats.pending.length > 0 ? 12 : 0
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: '#28A745',
                                        height: '100%',
                                        width: `${categoryPercentage}%`
                                    }}
                                />
                            </View>

                            {/* Pending items */}
                            {stats.pending.length > 0 && (
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '600',
                                            color: COLORS.textgray,
                                            marginBottom: 4
                                        }}
                                    >
                                        Pending:
                                    </Text>
                                    {stats.pending.map((itemName, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: 2
                                            }}
                                        >
                                            <AlertCircle size={12} color="#FFA500" />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: COLORS.textgray,
                                                    marginLeft: 4
                                                }}
                                            >
                                                {itemName}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}