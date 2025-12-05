import { STYLES, COLORS } from '@/constants/styles';
import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { InventoryItem } from '@/types/inventory';
import { Check, AlertTriangle } from 'lucide-react-native';
import ItemModal from "@/components/ItemModal";

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  let [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // if isCompleted is true from local, load it
    isCompleted = false
  }, []);

  const handleCardPress = (): void => {
    setModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setModalVisible(false);
  };

  const totalQuantity = item.foh_quantity + item.boh_quantity;
  const isLowStock = totalQuantity <= (item.low_stock_threshold || 1);

  return (
      <TouchableOpacity
          style={[
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
          onPress={() => handleCardPress()}
          activeOpacity={0.7}
      >
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

        <ItemModal
          visible={modalVisible}
          item={item}
          onClose={handleCloseModal}
          completed={isCompleted}
          toggleCompleted={() => setIsCompleted(!isCompleted)}
        />
      </TouchableOpacity>
  );
}