// app/(tabs)/settings.tsx - Enhanced settings page with grid layout and functionality

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

    const handleManageCategories = () => {
        Alert.alert('Coming Soon', 'Category management will be available in the next update.');
    };

    const handleViewProgress = () => {
        router.push('/completion-progress' as any);
    };

    const handleViewLowStock = () => {
        router.push('/low-stock' as any);
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

    const handlePreferences = () => {
        Alert.alert('Coming Soon', 'App preferences will be available in the next update.');
    };

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert('Signed Out', 'You have been signed out.\n\n(Authentication will be added in a future update)');
                    }
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
                    <Text style={styles.sectionTitle}>Inventory Management</Text>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { backgroundColor: COLORS.confirm, flex: 1 }]}
                            onPress={handleAddNewItem}
                        >
                            <BadgePlus size={32} color="white" strokeWidth={2.5} />
                            <Text style={[styles.buttonText, { color: 'white' }]}>Add New Item</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handleEditItems}
                        >
                            <Edit3 size={28} color={COLORS.header_bg} />
                            <Text style={styles.buttonText}>Edit Items</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handleManageCategories}
                        >
                            <FolderOpen size={28} color={COLORS.header_bg} />
                            <Text style={styles.buttonText}>Manage Categories</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Count Management Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.sectionTitle}>Count Management</Text>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handleViewProgress}
                        >
                            <FileSpreadsheet size={28} color={COLORS.header_bg} />
                            <Text style={styles.buttonText}>View Progress</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.gridButton, { borderColor: '#FFA500', flex: 1 }]}
                            onPress={handleResetCount}
                        >
                            <RotateCcw size={28} color="#FFA500" />
                            <Text style={styles.buttonText}>Reset Count</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Export & Reports Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.sectionTitle}>Export & Reports</Text>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { borderColor: '#FF6B00', flex: 1 }]}
                            onPress={handleViewLowStock}
                        >
                            <AlertTriangle size={28} color="#FF6B00" />
                            <Text style={styles.buttonText}>Low Stock</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.gridButton, { borderColor: '#28A745', flex: 1 }]}
                            onPress={handleExportInventory}
                        >
                            <FileSpreadsheet size={28} color="#28A745" />
                            <Text style={styles.buttonText}>Export Data</Text>
                        </Pressable>
                    </View>
                </View>

                {/* App Settings Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.sectionTitle}>App Settings</Text>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.header_bg, flex: 1 }]}
                            onPress={handlePreferences}
                        >
                            <SettingsIcon size={28} color={COLORS.header_bg} />
                            <Text style={styles.buttonText}>Preferences</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Account Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.sectionTitle}>Account</Text>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={[styles.gridButton, { borderColor: COLORS.deny, flex: 1 }]}
                            onPress={handleSignOut}
                        >
                            <LogOut size={28} color={COLORS.deny} />
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </Pressable>
                    </View>
                </View>

                {/* App Info */}
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: COLORS.textgray, fontSize: 14 }}>
                        Inventory Tracker v1.0.0
                    </Text>
                    <Text style={{ color: COLORS.textgray, fontSize: 12, marginTop: 4 }}>
                        Max&apos;s Best Ice Cream
                    </Text>
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

const styles = {
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        marginBottom: 16,
        color: COLORS.textoncontrast
    },
    buttonRow: {
        flexDirection: 'row' as const,
        gap: 12,
        marginBottom: 12
    },
    gridButton: {
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        borderRadius: 12,
        borderWidth: 3,
        borderStyle: 'solid' as const,
        padding: 20,
        minHeight: 120,
        gap: 8
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600' as const,
        textAlign: 'center' as const,
        color: COLORS.textoncontrast
    }
};