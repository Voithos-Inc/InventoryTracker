import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import Header from '@/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    BadgePlus,
    LogOut,
    FileSpreadsheet,
    Edit3,
    FolderOpen,
    RotateCcw,
    Settings as SettingsIcon,
    AlertTriangle
} from 'lucide-react-native';
import AddItemForm from '@/components/AddItemForm';
import { useInventory } from '@/store/inventory';
import { saveAndShareCSV, generateSummaryReport, generateLowStockReport } from '@/lib/exportUtils';
import { insertItem } from '@/lib/supabase';

export default function SettingsTab() {
    const router = useRouter();
    const [showAddItem, setShowAddItem] = useState(false);
    const loadInv = useInventory((state) => state.loadInv);
    const inv = useInventory((state) => state.inv);

    const handleAddNewItem = () => {
        setShowAddItem(true);
    };

    const handleEditItems = () => {
        router.push('/manage-items' as any);
    };

    const handleResetCount = async () => {
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
                    onPress: async () => {
                        try {
                            if (!inv) return;

                            // Reset all items to not completed
                            for (const item of inv) {
                                await insertItem({
                                    ...item,
                                    is_completed: false,
                                    completed_at: undefined,
                                    completed_by: undefined
                                });
                            }

                            // Reload inventory
                            await loadInv();

                            Alert.alert('Success', 'All completion checkmarks have been reset!');
                        } catch (error) {
                            console.error('Reset error:', error);
                            Alert.alert('Error', 'Failed to reset count. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    const handleExportInventory = () => {
        if (!inv) {
            Alert.alert('Error', 'No inventory data to export');
            return;
        }

        Alert.alert(
            'Export Inventory',
            'Choose export format:',
            [
                {
                    text: 'CSV Export',
                    onPress: async () => {
                        try {
                            await saveAndShareCSV(inv);
                        } catch (error) {
                            console.error('Export error:', error);
                            Alert.alert('Export Failed', 'Could not export inventory. Check console for details.');
                        }
                    }
                },
                {
                    text: 'Summary Report',
                    onPress: () => {
                        const report = generateSummaryReport(inv);
                        console.log(report);
                        Alert.alert('Summary Report', 'Report generated! Check console for details.\n\nIn the next update, this will be saved as a file.');
                    }
                },
                {
                    text: 'Low Stock Report',
                    onPress: () => {
                        const report = generateLowStockReport(inv);
                        console.log(report);
                        Alert.alert('Low Stock Report', 'Report generated! Check console for details.\n\nIn the next update, this will be saved as a file.');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };

    return (
        <SafeAreaView style={STYLES.container}>
            <Header />

            <View style={STYLES.sectionHeader}>
                <Text style={STYLES.sectionTitle}>Settings</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Inventory Management Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={STYLES.settingsSectionTitle}>Inventory Management</Text>

                    <View style={STYLES.settingsContainer}>
                        <Pressable
                          style={[STYLES.settingsButton, { backgroundColor: COLORS.confirm, flex: 1 }]}
                          onPress={handleAddNewItem}
                        >
                            <BadgePlus size={32} color="white" strokeWidth={2.5} />
                            <Text style={[STYLES.settingsButtonText, { color: 'white' }]}>Add New Item</Text>
                        </Pressable>

                        <Pressable
                            style={[STYLES.settingsButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handleEditItems}
                        >
                            <Edit3 size={28} color={COLORS.header_bg} />
                            <Text style={STYLES.settingsButtonText}>Edit Items</Text>
                        </Pressable>

                        {/*
                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handleManageCategories}
                        >
                            <FolderOpen size={28} color={COLORS.header_bg} />
                            <Text style={styles.buttonText}>Manage Categories</Text>
                        </Pressable>
                        */}
                    </View>
                </View>

                {/* Export & Reports Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={STYLES.settingsSectionTitle}>Export & Reports</Text>

                    <View style={STYLES.settingsContainer}>
                        <Pressable
                          style={[STYLES.settingsButton, { borderColor: '#FFA500', flex: 1 }]}
                          onPress={handleResetCount}
                        >
                            <RotateCcw size={28} color="#FFA500" />
                            <Text style={STYLES.settingsButtonText}>Reset Count</Text>
                        </Pressable>

                        <Pressable
                            style={[STYLES.settingsButton, { borderColor: '#28A745', flex: 1 }]}
                            onPress={handleExportInventory}
                        >
                            <FileSpreadsheet size={28} color="#28A745" />
                            <Text style={STYLES.settingsButtonText}>Export Data</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Add Item Modal */}
            <AddItemForm
                visible={showAddItem}
                onClose={() => setShowAddItem(false)}
                onSuccess={() => {
                    loadInv();
                }}
            />
        </SafeAreaView>
    );
}
