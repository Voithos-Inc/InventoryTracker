import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {COLORS, STYLES} from "@/constants/styles";
import Header from "@/components/header";
import {SafeAreaView} from "react-native-safe-area-context";
import {BadgePlus, LogOut} from "lucide-react-native";

export default function SuppliesTab() {
  return (
    <SafeAreaView style={STYLES.container}>
      <Header/>

      <View style={STYLES.sectionHeader}>
        <Text style={STYLES.sectionTitle}>Settings</Text>
      </View>

      <View style={STYLES.settingsContainer}>

        <Pressable style={{...STYLES.settingsButton, borderColor: COLORS.confirm}}>
          <BadgePlus size={24} color={COLORS.confirm}/>
          <Text style={STYLES.settingsButtonText}>Add new category</Text>
        </Pressable>

        <Pressable style={{...STYLES.settingsButton, borderColor: COLORS.deny}}>
          <LogOut size={24} color={COLORS.deny}/>
          <Text style={STYLES.settingsButtonText}>Sign out</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
};