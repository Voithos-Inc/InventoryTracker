import { STYLES, COLORS } from '@/constants/styles';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { InventoryItem } from '@/types/inventory';
import { Check, AlertTriangle } from 'lucide-react-native';
import ItemModal from "@/components/ItemModal";

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCardPress = (): void => setModalVisible(true);
  const handleCloseModal = (): void => setModalVisible(false);

  const quantityEntries = Object.entries(item.quantities);
  const totalQuantity = quantityEntries.reduce((sum, [, qty]) => sum + qty, 0);
  const isLowStock = totalQuantity <= (item.low_stock_threshold ?? 1);
  const isCompleted = item.completed ?? false;

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            ...STYLES.card,
            borderWidth: 3,
            borderColor: isLowStock ? COLORS.warn : COLORS.MINT,
            backgroundColor: isCompleted ? COLORS.tintedGreen : COLORS.cardBg,
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            minHeight: 180,
          }
        ]}
        onPress={handleCardPress}
        activeOpacity={0.7}
      >
        {isCompleted && (
          <View style={{
            position: 'absolute', top: 6, right: 6,
            backgroundColor: COLORS.confirm, borderRadius: 15, padding: 3, zIndex: 10
          }}>
            <Check size={16} color="white" strokeWidth={3} />
          </View>
        )}

        {isLowStock && (
          <View style={{
            position: 'absolute', top: 6, left: 6,
            backgroundColor: COLORS.warn, borderRadius: 15, padding: 3, zIndex: 10
          }}>
            <AlertTriangle size={16} color="white" strokeWidth={3} />
          </View>
        )}

        <Text
          style={{
            fontSize: 24, fontWeight: '700', color: COLORS.textoncontrast,
            textAlign: 'center', marginBottom: 8, lineHeight: 28, width: '100%'
          }}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View style={{
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'center', width: '100%', flex: 1, gap: 16
        }}>
          {item.image_link && item.image_link !== "about:blank" ? (
            <Image
              source={{ uri: item.image_link }}
              style={{ width: 64, height: 64, borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : <View style={{ width: 0, height: 0 }} />}

          {/* Total quantity */}
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 48, fontWeight: '700', lineHeight: 52,
              color: isLowStock ? COLORS.warn : COLORS.textoncontrast,
            }}>
              {totalQuantity}
            </Text>
            <Text style={{
              fontSize: 12, color: COLORS.textgray, textAlign: 'center', marginTop: 2
            }} numberOfLines={1}>
              {item.units}
            </Text>
          </View>
        </View>

        {/* Per-location breakdown */}
        <View style={{ width: '100%', marginTop: 8, gap: 2 }}>
          {quantityEntries.map(([location, qty]) => (
            <View key={location} style={{
              flexDirection: 'row', justifyContent: 'space-between',
              paddingHorizontal: 4
            }}>
              <Text style={{ fontSize: 12, color: COLORS.textgray }}>
                {location}
              </Text>
              <Text style={{
                fontSize: 12, fontWeight: '600',
                color: isLowStock ? COLORS.warn : COLORS.textoncontrast
              }}>
                {qty}
              </Text>
            </View>
          ))}
        </View>

        <ItemModal visible={modalVisible} item={item} onClose={handleCloseModal} />
      </TouchableOpacity>
    </View>
  );
}