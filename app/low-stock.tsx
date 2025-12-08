// app/low-stock.tsx - View items that need restocking

import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, STYLES } from '@/constants/styles';
import { useInventory } from '@/store/inventory';
import { ArrowLeft, AlertTriangle, AlertCircle } from 'lucide-react-native';

export default function LowStockScreen() {
    const router = useRouter();
    const inv = useInventory((state) => state.inv);

    if (!inv) {
        return (
            <SafeAreaView style={STYLES.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    // Get low stock items
    const lowStockItems = inv
        .filter((item) => {
            const total = item.foh_quantity + item.boh_quantity;
            return total <= (item.low_stock_threshold || 1);
        })
        .sort((a, b) => {
            const totalA = a.foh_quantity + a.boh_quantity;
            const totalB = b.foh_quantity + b.boh_quantity;
            return totalA - totalB; // Most critical first
        });

    const outOfStock = lowStockItems.filter(
        (item) => item.foh_quantity + item.boh_quantity === 0
    );
    const lowStock = lowStockItems.filter(
        (item) => item.foh_quantity + item.boh_quantity > 0
    );

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
                    Low Stock Alert
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            >
                {/* Summary Card */}
                <View
                    style={{
                        backgroundColor: lowStockItems.length === 0 ? '#D4EDDA' : '#FFF3CD',
                        borderRadius: 16,
                        padding: 24,
                        marginBottom: 24,
                        borderWidth: 3,
                        borderColor: lowStockItems.length === 0 ? '#28A745' : '#FFC107',
                        alignItems: 'center'
                    }}
                >
                    {lowStockItems.length === 0 ? (
                        <>
                            <AlertCircle size={48} color="#28A745" strokeWidth={3} />
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '700',
                                    color: '#28A745',
                                    marginTop: 16,
                                    textAlign: 'center'
                                }}
                            >
                                All Items In Stock!
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: COLORS.textgray,
                                    marginTop: 8,
                                    textAlign: 'center'
                                }}
                            >
                                No items need restocking at this time.
                            </Text>
                        </>
                    ) : (
                        <>
                            <AlertTriangle size={48} color="#FF6B00" strokeWidth={3} />
                            <Text
                                style={{
                                    fontSize: 48,
                                    fontWeight: '700',
                                    color: '#FF6B00',
                                    marginTop: 16
                                }}
                            >
                                {lowStockItems.length}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: COLORS.textoncontrast,
                                    marginTop: 8
                                }}
                            >
                                Items Need Attention
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
                                            color: '#d40006'
                                        }}
                                    >
                                        {outOfStock.length}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                        Out of Stock
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
                                        {lowStock.length}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                        Low Stock
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>

                {/* Out of Stock Items */}
                {outOfStock.length > 0 && (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16
                            }}
                        >
                            <AlertTriangle size={24} color="#d40006" />
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '700',
                                    marginLeft: 8,
                                    color: '#d40006'
                                }}
                            >
                                Out of Stock ({outOfStock.length})
                            </Text>
                        </View>

                        {outOfStock.map((item) => (
                            <View
                                key={item.id}
                                style={{
                                    backgroundColor: '#FFF5F5',
                                    borderRadius: 12,
                                    padding: 16,
                                    marginBottom: 12,
                                    borderWidth: 3,
                                    borderColor: '#d40006',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                {item.image_url ? (
                                    <Image
                                        source={{ uri: item.image_url }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 8,
                                            marginRight: 12
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 8,
                                            backgroundColor: '#e0e0e0',
                                            marginRight: 12,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, color: '#999' }}>
                                            No Image
                                        </Text>
                                    </View>
                                )}

                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                            color: COLORS.textoncontrast,
                                            marginBottom: 4
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: COLORS.textgray,
                                            marginBottom: 4
                                        }}
                                    >
                                        {item.category} • {item.units}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '700',
                                            color: '#d40006'
                                        }}
                                    >
                                        🔴 OUT OF STOCK
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}

                {/* Low Stock Items */}
                {lowStock.length > 0 && (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                                marginTop: outOfStock.length > 0 ? 24 : 0
                            }}
                        >
                            <AlertCircle size={24} color="#FFA500" />
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '700',
                                    marginLeft: 8,
                                    color: '#FFA500'
                                }}
                            >
                                Low Stock ({lowStock.length})
                            </Text>
                        </View>

                        {lowStock.map((item) => {
                            const total = item.foh_quantity + item.boh_quantity;
                            return (
                                <View
                                    key={item.id}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        padding: 16,
                                        marginBottom: 12,
                                        borderWidth: 3,
                                        borderColor: '#FFA500',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    {item.image_url ? (
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 8,
                                                marginRight: 12
                                            }}
                                        />
                                    ) : (
                                        <View
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 8,
                                                backgroundColor: '#e0e0e0',
                                                marginRight: 12,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{ fontSize: 10, color: '#999' }}>
                                                No Image
                                            </Text>
                                        </View>
                                    )}

                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: '600',
                                                color: COLORS.textoncontrast,
                                                marginBottom: 4
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: COLORS.textgray,
                                                marginBottom: 4
                                            }}
                                        >
                                            {item.category} • {item.units}
                                        </Text>
                                        <View style={{ flexDirection: 'row', gap: 16 }}>
                                            <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                                FOH: {item.foh_quantity}
                                            </Text>
                                            <Text style={{ fontSize: 14, color: COLORS.textgray }}>
                                                BOH: {item.boh_quantity}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '700',
                                                    color: '#FFA500'
                                                }}
                                            >
                                                Total: {total}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: COLORS.textgray,
                                                marginTop: 4
                                            }}
                                        >
                                            ⚠️ Alert threshold: {item.low_stock_threshold}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}