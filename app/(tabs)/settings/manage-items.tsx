import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Image, Platform
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Link, useRouter} from 'expo-router';
import {COLORS, STYLES} from '@/constants/styles';
import {useInventory} from '@/store/inventory';
import {InventoryItem, CATEGORY} from '@/types/inventory';
import {deleteItem} from '@/lib/supabase';
import {
  ArrowLeft,
  Search,
  Pencil,
  Trash2,
} from 'lucide-react-native';
import AddItemForm from "@/components/AddItemForm";

export default function ManageItemsScreen() {
  const router = useRouter();
  const inv = useInventory((state) => state.inv)?.sort((a, b) => a.name.localeCompare(b.name));
  const loadInv = useInventory((state) => state.loadInv);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CATEGORY | 'ALL'>('ALL');
  const [showAddItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const handleEditItem = (selectedItem: InventoryItem) => {
    setShowEditItem(true);
    setSelectedItem(selectedItem)
  };

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    if (!inv) return [];

    return inv.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [inv, searchQuery, selectedCategory]);

  const categories: (CATEGORY | 'ALL')[] = [
    'ALL',
    'BEVERAGES',
    'DAIRY',
    'FROZEN',
    'INGREDIENTS',
    'REFRIGERATED',
    'SAUCES',
    'TOPPINGS'
  ];

  const handleDeleteItem = (item: InventoryItem) => {
    if (Platform.OS === "web") {
      const confirmed = confirm(`Delete item\nAre you sure you want to delete "${item.name}"? This cannot be undone.`)
      if (confirmed) onDeleteItem(item)
    } else {
      Alert.alert(
        'Delete Item',
        `Are you sure you want to delete "${item.name}"? This cannot be undone.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => onDeleteItem(item)
          }
        ]
      );
    }
  };

  const onDeleteItem = async (item: InventoryItem) => {
    try {
      await deleteItem(item.id);
      await loadInv();
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  }

  return (
    <SafeAreaView style={[STYLES.container, {paddingBottom: 0}]}>
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
        <Pressable onPress={() => router.push('/settings')} style={{marginRight: 16}}>
          <Link href="/settings" asChild>
            <ArrowLeft size={32} color="white"/>
          </Link>
        </Pressable>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: COLORS.textonbg,
            flex: 1
          }}
        >
          Manage Items
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{padding: 16, backgroundColor: COLORS.main_bg}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 2,
            borderColor: COLORS.header_bg
          }}
        >
          <Search size={24} color={COLORS.textgray}/>
          <TextInput
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 18,
              color: COLORS.textoncontrast
            }}
            placeholder="Search items..."
            placeholderTextColor={COLORS.textgray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{maxHeight: 60, backgroundColor: COLORS.main_bg}}
        contentContainerStyle={{paddingHorizontal: 16, gap: 8}}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={{
              height: 45,
              justifyContent: "center",
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor:
                selectedCategory === cat ? COLORS.tabBarBg : 'white',
              borderWidth: 2,
              borderColor: COLORS.header_bg
            }}
          >
            <Text
              style={{
                color: selectedCategory === cat ? 'white' : COLORS.header_bg,
                fontWeight: '600',
                fontSize: 14
              }}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Items List */}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{padding: 16, paddingBottom: 100}}
      >
        {filteredItems.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text style={{fontSize: 18, color: COLORS.textgray}}>
              No items found
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: COLORS.header_bg,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              {/* Item Image */}
              {item.image_link && item.image_link !== "about:blank" ? (
                <Image
                  source={{uri: item.image_link}}
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
                    backgroundColor: COLORS.textonbg,
                    marginRight: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{fontSize: 10, color: COLORS.textgray}}>No Image</Text>
                </View>
              )}

              {/* Item Info */}
              <View style={{flex: 1}}>
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
                    marginBottom: 2
                  }}
                >
                  {item.category} • {item.units}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.textgray
                  }}
                >
                  Total: {item.foh_quantity + item.boh_quantity}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={{gap: 8}}>
                <Pressable
                  onPress={() => handleEditItem(item)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: COLORS.header_bg
                  }}
                >
                  <Pencil size={20} color="white"/>
                </Pressable>

                <Pressable
                  onPress={() => handleDeleteItem(item)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: COLORS.deny
                  }}
                >
                  <Trash2 size={20} color="white"/>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      {selectedItem && (
        <AddItemForm
          visible={showAddItem}
          onClose={() => {setShowEditItem(false); setSelectedItem(null)}}
          onSuccess={() => {
            loadInv();
          }}
          initialData={selectedItem}
        />
      )}
    </SafeAreaView>
  );
}