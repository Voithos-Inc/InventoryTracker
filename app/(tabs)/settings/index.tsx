import React, { useState } from 'react';
import { View, Text, Pressable, Alert, Platform} from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import Header from '@/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
    BadgePlus,
    FileSpreadsheet,
    Edit3,
    RotateCcw
} from 'lucide-react-native';
import AddItemForm from '@/components/AddItemForm';
import { useInventory } from '@/store/inventory';
import { insertItem } from '@/lib/supabase';
import {InventoryItem} from "@/types/inventory";
import {saveAndShareCSV} from "@/lib/exportUtils";

export default function SettingsTab() {
    const router = useRouter();
    const [showAddItem, setShowAddItem] = useState(false);
    const loadInv = useInventory((state) => state.loadInv);
    const inv = useInventory((state) => state.inv);

    const handleAddNewItem = () => {
        setShowAddItem(true);
    };

    const handleEditItems = () => {
        router.push('/settings/manage-items' as any);
    };

    const handleResetCount = async () => {
        if (Platform.OS === "web") {
            let confirmed = confirm("Reset Inventory Count\nThis will uncheck all completed items and start a fresh count. Are you sure?")
            if (confirmed) await onConfirmReset()
        } else {
            Alert.alert(
                'Reset Inventory Count',
                'This will uncheck all completed items and start a fresh count. Are you sure?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Reset',
                        style: 'destructive',
                        onPress: () => onConfirmReset()
                    }
                ]
            );
        }
    };

    const onConfirmReset = async () => {
        try {
            if (!inv) return;

            // Reset all items to not completed
            for (const item of inv) {
                await insertItem({...item, foh_quantity: 0, boh_quantity: 0} as InventoryItem);
            }

            // Reload inventory
            await loadInv();

            Alert.alert('Success', 'All completion checkmarks have been reset!');
            window.location.href = "/";
        } catch (error) {
            console.error('Reset error:', error);
            Alert.alert('Error', 'Failed to reset count. Please try again.');
        }
    }

    const handleExportInventory = () => {
        if (!inv) {
            if (Platform.OS === "web") {
                window.alert("No inventory data to export");
            } else {
                Alert.alert("Error", "No inventory data to export");
            }
            return;
        }

        // --- Web version ---
        if (Platform.OS === "web") {
            const confirmed = window.confirm(
                "Export Inventory\n\nDo you want to export the inventory as a CSV file?"
            );

            if (confirmed) {
                saveAndShareCSV(inv).catch((error) => {
                    console.error("Export error:", error);
                    window.alert("Export Failed: Could not export inventory.");
                });
            }

            return;
        }

        // --- Mobile version (iOS/Android) ---
        Alert.alert(
            "Export Inventory",
            "Export your full inventory as a CSV file?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Export CSV",
                    onPress: async () => {
                        try {
                            await saveAndShareCSV(inv);
                        } catch (error) {
                            console.error("Export error:", error);
                            Alert.alert("Export Failed", "Could not export inventory.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={STYLES.container}>
            <Header />

            <View style={STYLES.sectionHeader}>
                <Text style={STYLES.sectionTitle}>Settings</Text>
            </View>

            {/* Two Column Layout */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 40,
                    gap: 40,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}
            >
                {/* Left Column - Inventory Management */}
                <View style={{ flex: 1, maxWidth: 500 }}>
                    <Text style={[STYLES.settingsSectionTitle, { width: '100%', textAlign: 'center' }]}>
                        Inventory Management
                    </Text>

                    <View style={{ gap: 20 }}>
                        <Pressable
                            style={[
                                STYLES.settingsButton,
                                {
                                    backgroundColor: COLORS.confirm,
                                    justifyContent: 'center',
                                    minHeight: 120
                                }
                            ]}
                            onPress={handleAddNewItem}
                        >
                            <BadgePlus size={40} color="white" strokeWidth={2.5} />
                            <Text style={[STYLES.settingsButtonText, { color: 'white', width: 'auto' }]}>
                                Add New Item
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                STYLES.settingsButton,
                                {
                                    borderColor: COLORS.header_bg,
                                    justifyContent: 'center',
                                    minHeight: 120
                                }
                            ]}
                            onPress={handleEditItems}
                        >
                            <Edit3 size={36} color={COLORS.header_bg} />
                            <Text style={[STYLES.settingsButtonText, { width: 'auto' }]}>
                                Edit Items
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Right Column - Export & Reports */}
                <View style={{ flex: 1, maxWidth: 500 }}>
                    <Text style={[STYLES.settingsSectionTitle, { width: '100%', textAlign: 'center' }]}>
                        Export & Reports
                    </Text>

                    <View style={{ gap: 20 }}>
                        <Pressable
                            style={[
                                STYLES.settingsButton,
                                {
                                    borderColor: '#FFA500',
                                    justifyContent: 'center',
                                    minHeight: 120
                                }
                            ]}
                            onPress={handleResetCount}
                        >
                            <RotateCcw size={36} color="#FFA500" />
                            <Text style={[STYLES.settingsButtonText, { width: 'auto' }]}>
                                Reset Count
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                STYLES.settingsButton,
                                {
                                    borderColor: '#28A745',
                                    justifyContent: 'center',
                                    minHeight: 120
                                }
                            ]}
                            onPress={handleExportInventory}
                        >
                            <FileSpreadsheet size={36} color="#28A745" />
                            <Text style={[STYLES.settingsButtonText, { width: 'auto' }]}>
                                Export Data
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Add Item Modal */}
            <AddItemForm
                visible={showAddItem}
                onClose={() => setShowAddItem(false)}
                onSuccess={() => {
                    loadInv();
                }}
                initialData={null}
            />
        </SafeAreaView>
    );
}