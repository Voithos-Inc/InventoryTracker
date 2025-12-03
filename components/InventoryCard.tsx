// components/InventoryCard.tsx - Enhanced with better layout

import { STYLES, COLORS } from '@/constants/styles';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { InventoryItem } from '@/types/inventory';
import { Check, AlertTriangle } from 'lucide-react-native';

interface InventoryCardProps {
    item: InventoryItem;
    onPress: (item: InventoryItem) => void;
}

export default function InventoryCard({ item, onPress }: InventoryCardProps) {
    const totalQuantity = item.foh_quantity + item.boh_quantity;
    const isLowStock = totalQuantity <= (item.low_stock_threshold || 1);
    const isCompleted = item.is_completed || false;

    return (
        <TouchableOpacity
            style={[
                STYLES.card,
                {
                    borderWidth: 3,
                    borderColor: isLowStock ? '#FF6B00' : (isCompleted ? '#28A745' : 'transparent'),
                    backgroundColor: isCompleted ? '#E8F5E9' : COLORS.cardBg,
                    position: 'relative',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 12,
                    minHeight: 180,
                }
            ]}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            {/* Completion Checkmark Overlay */}
            {isCompleted && (
                <View
                    style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        backgroundColor: '#28A745',
                        borderRadius: 15,
                        padding: 3,
                        zIndex: 10
                    }}
                >
                    <Check size={16} color="white" strokeWidth={3} />
                </View>
            )}

            {/* Low Stock Warning Indicator */}
            {isLowStock && (
                <View
                    style={{
                        position: 'absolute',
                        top: 6,
                        left: 6,
                        backgroundColor: '#FF6B00',
                        borderRadius: 15,
                        padding: 3,
                        zIndex: 10
                    }}
                >
                    <AlertTriangle size={16} color="white" strokeWidth={3} />
                </View>
            )}

            {/* Item Name - At Top, Bigger */}
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: '700',
                    color: COLORS.textoncontrast,
                    textAlign: 'center',
                    marginBottom: 16,
                    lineHeight: 28,
                    width: '100%'
                }}
                numberOfLines={2}
            >
                {item.name}
            </Text>

            {/* Seasonal Badge */}
            {item.is_seasonal && (
                <View
                    style={{
                        backgroundColor: '#FFA500',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        marginBottom: 12
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                        SEASONAL
                    </Text>
                </View>
            )}

            {/* Image and Total Side by Side - Centered */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    flex: 1,
                    gap: 24
                }}
            >
                {/* Image */}
                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 8
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 8,
                            backgroundColor: '#e0e0e0',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
                    </View>
                )}

                {/* Total Quantity */}
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 48,
                            fontWeight: '700',
                            color: isLowStock ? '#FF6B00' : COLORS.textoncontrast,
                            lineHeight: 52
                        }}
                    >
                        {totalQuantity}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: COLORS.textgray,
                            textAlign: 'center',
                            marginTop: 2
                        }}
                        numberOfLines={1}
                    >
                        {item.units}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}