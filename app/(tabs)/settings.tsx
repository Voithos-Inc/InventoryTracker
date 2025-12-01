import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { COLORS, STYLES } from '@/constants/styles';
import Header from '@/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    BadgePlus,
    LogOut,
    FileSpreadsheet,
    Edit3,
    FolderOpen,
    RotateCcw,
    Settings as SettingsIcon
} from 'lucide-react-native';
// eslint-disable-next-line import/no-unresolved
import AddItemForm from '@/components/AddItemForm';
import { useInventory } from '@/store/inventory';

export default function SettingsTab() {
    const [showAddItem, setShowAddItem] = useState(false);
    const loadInv = useInventory((state) => state.loadInv);

    const handleExportInventory = () => {
        Alert.alert(
            'Export Inventory',
            'Choose export format:',
            [
                {
                    text: 'CSV (Simple)',
                    onPress: () => exportToCSV()
                },
                {
                    text: 'Google Sheets',
                    onPress: () => exportToGoogleSheets()
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };

    const exportToCSV = () => {
        // TODO: Implement CSV export
        Alert.alert('Coming Soon', 'CSV export will be implemented in the next phase');
    };

    const exportToGoogleSheets = () => {
        // TODO: Implement Google Sheets export
        Alert.alert('Coming Soon', 'Google Sheets export will be implemented in the next phase');
    };

    const handleResetInventory = () => {
        Alert.alert(
            'Reset Inventory Count',
            'This will clear all completion checkmarks and start a new count. Are you sure?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        // TODO: Implement reset logic
                        Alert.alert('Success', 'Inventory count has been reset');
                    }
                }
            ]
        );
    };

    const handleManageItems = () => {
        Alert.alert('Coming Soon', 'Item management interface will be available soon');
    };

    const handleManageCategories = () => {
        Alert.alert('Coming Soon', 'Category management will be available soon');
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
                        // TODO: Implement sign out
                        Alert.alert('Signed Out', 'You have been signed out');
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
                contentContainerStyle={STYLES.settingsContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Inventory Management Section */}
                <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 16,
                            color: COLORS.textoncontrast
                        }}
                    >
                        Inventory Management
                    </Text>

                    <Pressable
                        style={{
                            ...STYLES.settingsButton,
                            borderColor: COLORS.confirm,
                            backgroundColor: COLORS.confirm
                        }}
                        onPress={() => setShowAddItem(true)}
                    >
                        <BadgePlus size={28} color="white" strokeWidth={2.5} />
                        <Text style={{ ...STYLES.settingsButtonText, color: 'white' }}>
                            Add New Item
                        </Text>
                    </Pressable>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: COLORS.header_bg }}
                        onPress={handleManageItems}
                    >
                        <Edit3 size={24} color={COLORS.header_bg} />
                        <Text style={STYLES.settingsButtonText}>Edit Items</Text>
                    </Pressable>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: COLORS.header_bg }}
                        onPress={handleManageCategories}
                    >
                        <FolderOpen size={24} color={COLORS.header_bg} />
                        <Text style={STYLES.settingsButtonText}>Manage Categories</Text>
                    </Pressable>
                </View>

                {/* Count Management Section */}
                <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 16,
                            color: COLORS.textoncontrast
                        }}
                    >
                        Count Management
                    </Text>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: '#FFA500' }}
                        onPress={handleResetInventory}
                    >
                        <RotateCcw size={24} color="#FFA500" />
                        <Text style={STYLES.settingsButtonText}>Reset Count</Text>
                    </Pressable>
                </View>

                {/* Export Section */}
                <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 16,
                            color: COLORS.textoncontrast
                        }}
                    >
                        Export & Reports
                    </Text>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: '#28A745' }}
                        onPress={handleExportInventory}
                    >
                        <FileSpreadsheet size={24} color="#28A745" />
                        <Text style={STYLES.settingsButtonText}>Export Inventory</Text>
                    </Pressable>
                </View>

                {/* App Settings Section */}
                <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 16,
                            color: COLORS.textoncontrast
                        }}
                    >
                        App Settings
                    </Text>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: COLORS.header_bg }}
                        onPress={() => Alert.alert('Coming Soon', 'App preferences coming soon')}
                    >
                        <SettingsIcon size={24} color={COLORS.header_bg} />
                        <Text style={STYLES.settingsButtonText}>Preferences</Text>
                    </Pressable>
                </View>

                {/* Account Section */}
                <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 40 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 16,
                            color: COLORS.textoncontrast
                        }}
                    >
                        Account
                    </Text>

                    <Pressable
                        style={{ ...STYLES.settingsButton, borderColor: COLORS.deny }}
                        onPress={handleSignOut}
                    >
                        <LogOut size={24} color={COLORS.deny} />
                        <Text style={STYLES.settingsButtonText}>Sign Out</Text>
                    </Pressable>
                </View>

                {/* App Info */}
                <View style={{ alignItems: 'center', paddingBottom: 40 }}>
                    <Text style={{ color: COLORS.textgray, fontSize: 14 }}>
                        Inventory Tracker v1.0.0
                    </Text>
                    <Text style={{ color: COLORS.textgray, fontSize: 12, marginTop: 4 }}>
                        Max&#39;s Best Ice Cream
                    </Text>
                </View>
            </ScrollView>

            {/* Add Item Modal */}
            <AddItemForm
                visible={showAddItem}
                onClose={() => setShowAddItem(false)}
                onSuccess={() => {
                    // Reload inventory after adding new item
                    loadInv();
                }}
            />
        </SafeAreaView>
    );
}