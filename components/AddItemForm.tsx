import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert,
    Modal,
    Pressable
} from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import { CATEGORY, AddItemFormData } from '@/types/inventory';
import { X, Camera, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { insertItem } from '@/lib/supabase';

interface AddItemFormProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES: CATEGORY[] = [
    'BEVERAGES',
    'DAIRY',
    'FROZEN',
    'INGREDIENTS',
    'REFRIGERATED',
    'SAUCES',
    'TOPPINGS'
];

const COMMON_UNITS = [
    'quart container',
    'pint container',
    'topping container',
    'jar',
    'bottle',
    'bag',
    'box',
    'gallon',
    'case',
    'cone',
    'cup'
];

export default function AddItemForm({ visible, onClose, onSuccess }: AddItemFormProps) {
    const [formData, setFormData] = useState<AddItemFormData>({
        name: '',
        category: 'BEVERAGES',
        units: 'quart container',
        foh_quantity: 0,
        boh_quantity: 0,
        low_stock_threshold: 1,
        is_seasonal: false,
        image: null
    });

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Please allow access to your photo library');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Please allow access to your camera');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'Please enter an item name');
            return;
        }

        if (!formData.units.trim()) {
            Alert.alert('Error', 'Please enter units');
            return;
        }

        setSaving(true);

        try {
            const newItem = {
                id: Date.now(),
                name: formData.name.trim(),
                category: formData.category,
                units: formData.units,
                foh_quantity: formData.foh_quantity,
                boh_quantity: formData.boh_quantity,
                low_stock_threshold: formData.low_stock_threshold,
                is_seasonal: formData.is_seasonal,
                image_url: imageUri,
                is_completed: false,
                display_order: 999,
                created_at: new Date().toISOString()
            };

            await insertItem(newItem as any);

            Alert.alert('Success', 'Item added successfully!');

            setFormData({
                name: '',
                category: 'BEVERAGES',
                units: 'quart container',
                foh_quantity: 0,
                boh_quantity: 0,
                low_stock_threshold: 1,
                is_seasonal: false,
                image: null
            });
            setImageUri(null);

            onSuccess();
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to add item. Please try again.');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 24,
                        width: '90%',
                        maxHeight: '90%',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20
                        }}
                    >
                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Add New Item</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={32} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Item Image
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity
                                    onPress={handleTakePhoto}
                                    style={{
                                        flex: 1,
                                        backgroundColor: COLORS.header_bg,
                                        padding: 16,
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Camera size={32} color="white" />
                                    <Text style={{ color: 'white', marginTop: 8, fontWeight: '600' }}>
                                        Take Photo
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleImagePick}
                                    style={{
                                        flex: 1,
                                        backgroundColor: COLORS.confirm,
                                        padding: 16,
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Upload size={32} color="white" />
                                    <Text style={{ color: 'white', marginTop: 8, fontWeight: '600' }}>
                                        Choose Photo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {imageUri && (
                                <Text style={{ marginTop: 8, color: COLORS.confirm, fontWeight: '600' }}>
                                    ✓ Image selected
                                </Text>
                            )}
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Item Name *
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 2,
                                    borderColor: COLORS.header_bg,
                                    borderRadius: 12,
                                    padding: 14,
                                    fontSize: 16
                                }}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                placeholder="e.g., Vanilla Ice Cream"
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Category *
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    {CATEGORIES.map((cat) => (
                                        <Pressable
                                            key={cat}
                                            onPress={() => setFormData({ ...formData, category: cat })}
                                            style={{
                                                paddingVertical: 10,
                                                paddingHorizontal: 16,
                                                borderRadius: 20,
                                                backgroundColor:
                                                    formData.category === cat ? COLORS.header_bg : '#e0e0e0'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: formData.category === cat ? 'white' : '#666',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {cat}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Units *
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                                    {COMMON_UNITS.map((unit) => (
                                        <Pressable
                                            key={unit}
                                            onPress={() => setFormData({ ...formData, units: unit })}
                                            style={{
                                                paddingVertical: 8,
                                                paddingHorizontal: 12,
                                                borderRadius: 16,
                                                backgroundColor:
                                                    formData.units === unit ? COLORS.confirm : '#e0e0e0'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: formData.units === unit ? 'white' : '#666',
                                                    fontSize: 14
                                                }}
                                            >
                                                {unit}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </ScrollView>
                            <TextInput
                                style={{
                                    borderWidth: 2,
                                    borderColor: COLORS.header_bg,
                                    borderRadius: 12,
                                    padding: 14,
                                    fontSize: 16
                                }}
                                value={formData.units}
                                onChangeText={(text) => setFormData({ ...formData, units: text })}
                                placeholder="Or type custom unit"
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Initial Quantities
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ marginBottom: 4, color: COLORS.textgray }}>FOH</Text>
                                    <TextInput
                                        style={{
                                            borderWidth: 2,
                                            borderColor: COLORS.header_bg,
                                            borderRadius: 12,
                                            padding: 14,
                                            fontSize: 16,
                                            textAlign: 'center'
                                        }}
                                        value={formData.foh_quantity.toString()}
                                        onChangeText={(text) =>
                                            setFormData({ ...formData, foh_quantity: parseInt(text) || 0 })
                                        }
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ marginBottom: 4, color: COLORS.textgray }}>BOH</Text>
                                    <TextInput
                                        style={{
                                            borderWidth: 2,
                                            borderColor: COLORS.header_bg,
                                            borderRadius: 12,
                                            padding: 14,
                                            fontSize: 16,
                                            textAlign: 'center'
                                        }}
                                        value={formData.boh_quantity.toString()}
                                        onChangeText={(text) =>
                                            setFormData({ ...formData, boh_quantity: parseInt(text) || 0 })
                                        }
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                                Low Stock Alert Threshold
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 2,
                                    borderColor: COLORS.header_bg,
                                    borderRadius: 12,
                                    padding: 14,
                                    fontSize: 16
                                }}
                                value={formData.low_stock_threshold.toString()}
                                onChangeText={(text) =>
                                    setFormData({
                                        ...formData,
                                        low_stock_threshold: parseInt(text) || 1
                                    })
                                }
                                keyboardType="number-pad"
                                placeholder="1"
                            />
                            <Text style={{ marginTop: 4, color: COLORS.textgray, fontSize: 12 }}>
                                Alert when total quantity is at or below this number
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 20
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>Seasonal Item</Text>
                            <Switch
                                value={formData.is_seasonal}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, is_seasonal: value })
                                }
                                trackColor={{ false: '#ccc', true: COLORS.confirm }}
                                thumbColor="white"
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
                            <TouchableOpacity
                                onPress={onClose}
                                style={{
                                    flex: 1,
                                    padding: 16,
                                    borderRadius: 12,
                                    backgroundColor: '#e0e0e0',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#666' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSave}
                                disabled={saving}
                                style={{
                                    flex: 1,
                                    padding: 16,
                                    borderRadius: 12,
                                    backgroundColor: saving ? '#ccc' : COLORS.confirm,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                    {saving ? 'Saving...' : 'Add Item'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}