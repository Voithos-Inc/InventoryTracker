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
              minHeight: 160
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
                  top: 8,
                  right: 8,
                  backgroundColor: '#28A745',
                  borderRadius: 20,
                  padding: 4,
                  zIndex: 10
                }}
            >
              <Check size={20} color="white" strokeWidth={3} />
            </View>
        )}

        {/* Low Stock Warning Indicator */}
        {isLowStock && (
            <View
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: '#FF6B00',
                  borderRadius: 20,
                  padding: 4,
                  zIndex: 10
                }}
            >
              <AlertTriangle size={20} color="white" strokeWidth={3} />
            </View>
        )}

        {/* Image */}
        {item.image_url ? (
            <Image
                source={{ uri: item.image_url }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginBottom: 8
                }}
                resizeMode="cover"
            />
        ) : (
            <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  backgroundColor: '#e0e0e0',
                  marginBottom: 8
                }}
            />
        )}

        {/* Item Name */}
        <Text
            style={[
              STYLES.cardTitle,
              {
                fontSize: 18,
                paddingLeft: 0,
                marginBottom: 8,
                textAlign: 'center'
              }
            ]}
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
                  marginBottom: 8,
                  alignSelf: 'center'
                }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                SEASONAL
              </Text>
            </View>
        )}

        {/* FOH/BOH Quantities */}
        <View style={{ width: '100%', marginTop: 'auto' }}>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4
              }}
          >
            <Text style={{ fontSize: 14, color: COLORS.textgray }}>FOH:</Text>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>
              {item.foh_quantity}
            </Text>
          </View>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4
              }}
          >
            <Text style={{ fontSize: 14, color: COLORS.textgray }}>BOH:</Text>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>
              {item.boh_quantity}
            </Text>
          </View>
          <View
              style={{
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                paddingTop: 4,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700' }}>Total:</Text>
            <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: isLowStock ? '#FF6B00' : '#000'
                }}
            >
              {totalQuantity}
            </Text>
          </View>
          <Text
              style={{
                fontSize: 11,
                color: COLORS.textgray,
                textAlign: 'center',
                marginTop: 4
              }}
          >
            {item.units}
          </Text>
        </View>
      </TouchableOpacity>
  );
}