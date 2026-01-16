import { STYLES, COLORS } from '@/constants/styles';
import React, {useState} from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { InventoryItem } from '@/types/inventory';
import { Check, AlertTriangle } from 'lucide-react-native';
import ItemModal from "@/components/ItemModal";

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCardPress = (): void => {
    setModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setModalVisible(false);
  };

  const totalQuantity = item.foh_quantity + item.boh_quantity;
  const isLowStock = totalQuantity <= (item.low_stock_threshold || 1);
  const isCompleted = item.completed || false;

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
          onPress={() => handleCardPress()}
          activeOpacity={0.7}
      >
        {isCompleted && (
            <View
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  backgroundColor: COLORS.confirm,
                  borderRadius: 15,
                  padding: 3,
                  zIndex: 10
                }}
            >
              <Check size={16} color="white" strokeWidth={3} />
            </View>
        )}

        {isLowStock && (
            <View
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 6,
                  backgroundColor: COLORS.warn,
                  borderRadius: 15,
                  padding: 3,
                  zIndex: 10
                }}
            >
              <AlertTriangle size={16} color="white" strokeWidth={3} />
            </View>
        )}

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
          {item.name} {item.sort_order}
        </Text>

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
          {item.image_link && item.image_link !== "about:blank" ? (
              <Image
                  source={{ uri: item.image_link }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8
                  }}
                  resizeMode="cover"
              />
          ) : <View style={{width: 0, height: 0}} />
          }

          <View style={{ alignItems: 'center' }}>
            <Text
                style={{
                  fontSize: 48,
                  fontWeight: '700',
                  color: isLowStock ? COLORS.warn : COLORS.textoncontrast,
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

        <ItemModal
            visible={modalVisible}
            item={item}
            onClose={handleCloseModal}
        />
      </TouchableOpacity>
    </View>
  );
}