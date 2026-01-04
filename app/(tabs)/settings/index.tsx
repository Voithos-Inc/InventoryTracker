import React, {useState} from 'react';
import {View, Text, Pressable, Alert, Platform, ScrollView} from 'react-native';
import {COLORS, STYLES} from '@/constants/styles';
import Header from '@/components/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

import {
  BadgePlus,
  FileSpreadsheet,
  Edit3,
  RotateCcw,
  ClipboardCheck
} from 'lucide-react-native';
import AddItemForm from '@/components/AddItemForm';
import {useInventory} from '@/store/inventory';
import {insertItem} from '@/lib/supabase';
import {InventoryItem} from "@/types/inventory";
import {saveAndShareXLSX} from "@/lib/exportUtils";
import WaveDivider from "@/components/WaveDivider";

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

  const handleViewProgress = () => {
    router.push('/settings/count-progress' as any);
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
        await insertItem({...item, foh_quantity: 0, boh_quantity: 0, completed: false} as InventoryItem);
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
          "Export Inventory\n\nDo you want to export the inventory as an Excel file?"
      );

      if (confirmed) {
        saveAndShareXLSX(inv).catch((error) => {
          console.error("Export error:", error);
          window.alert("Export Failed: Could not export inventory.");
        });
      }

      return;
    }

    Alert.alert(
        "Export Inventory",
        "Export your full inventory as an Excel file?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Export Excel",
            onPress: async () => {
              try {
                await saveAndShareXLSX(inv);
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
        <Header/>
        <ScrollView style={STYLES.bodyContainer}>
          <WaveDivider/>

          <View style={STYLES.settingsSpacer}/>

          {/* Two Column Layout */}
          <View style={STYLES.settingsTwoColumnContainer}>
            {/* Left Column - Inventory Management */}
            <View style={STYLES.settingsColumn}>
              <Text style={STYLES.settingsSectionTitle}>
                Inventory Management
              </Text>

              <View style={STYLES.settingsButtonGroup}>
                <Pressable
                    style={[STYLES.settingsButton, STYLES.settingsButtonPrimary]}
                    onPress={handleAddNewItem}
                >
                  <BadgePlus size={40} color="white" strokeWidth={2.5}/>
                  <Text style={STYLES.settingsButtonTextPrimary}>
                    Add New Item
                  </Text>
                </Pressable>

                <Pressable
                    style={[STYLES.settingsButton, STYLES.settingsButtonSecondary]}
                    onPress={handleEditItems}
                >
                  <Edit3 size={36} color={COLORS.header_bg}/>
                  <Text style={STYLES.settingsButtonText}>
                    Edit Items
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Right Column - Export & Reports */}
            <View style={STYLES.settingsColumn}>
              <Text style={STYLES.settingsSectionTitle}>
                Export & Reports
              </Text>

              <View style={STYLES.settingsButtonGroup}>
                <Pressable
                    style={[STYLES.settingsButton, STYLES.settingsButtonWarning]}
                    onPress={handleResetCount}
                >
                  <RotateCcw size={36} color="#FFA500"/>
                  <Text style={STYLES.settingsButtonText}>
                    Reset Count
                  </Text>
                </Pressable>

                <Pressable
                    style={[STYLES.settingsButton, STYLES.settingsButtonSuccess]}
                    onPress={handleExportInventory}
                >
                  <FileSpreadsheet size={36} color="#28A745"/>
                  <Text style={STYLES.settingsButtonText}>
                    Export Excel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Centered View Progress Button */}
          <View style={STYLES.settingsProgressContainer}>
            <Pressable
                style={[STYLES.settingsButton, STYLES.settingsButtonProgress]}
                onPress={handleViewProgress}
            >
              <ClipboardCheck size={56} color="#2196F3" strokeWidth={2.5}/>
              <Text style={STYLES.settingsButtonTextProgress}>
                View Count Progress
              </Text>
            </Pressable>
          </View>

          <AddItemForm
              visible={showAddItem}
              onClose={() => setShowAddItem(false)}
              onSuccess={() => {
                loadInv();
              }}
              initialData={null}
          />
        </ScrollView>
      </SafeAreaView>
  );
}