import React, {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {TouchableOpacity, View, Text, Image, Alert, Platform} from "react-native";
import {STYLES} from "@/constants/styles";

export type ImageUploadData = {
  blob: Blob;
  name: string;
  type: string,
  uri: string;
}

interface ImagePickerBoxProps {
  onChange: (file: ImageUploadData | null) => void;
  initialUri?: string | null;
}

export default function ImagePickerBox({ onChange, initialUri } : ImagePickerBoxProps) {
  const [imageUri, setImageUri] = useState<string | null>(initialUri ?? null);

  useEffect(() => {
    if (initialUri) setImageUri(initialUri);
  }, [initialUri]);

  async function pickImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      if (Platform.OS === "web") {
        alert('Permission required. \nPermission to access the media library is required.')
      } else {
        Alert.alert(
          'Permission required',
          'Permission to access the media library is required.'
        );
      }
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let asset = result.assets[0];
      let mimeType = asset.mimeType ?? "image/jpeg";

      if (asset.width > 1280 || asset.height > 720) {
        const manipResult = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 1280 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        asset = {
          ...asset,
          uri: manipResult.uri,
          width: manipResult.width,
          height: manipResult.height,
        };
        mimeType = "image/jpeg";
      }

      const blob = await fetch(asset.uri).then(r => r.blob());
      const ext = mimeType.split('/')[1] ?? 'jpg';
      const name = `${Date.now()}.${ext}`;


      onChange({
        blob,
        name,
        type: mimeType,
        uri: asset.uri,
      });
      setImageUri(asset.uri);
    }
  }

  return (
    <View style={STYLES.imagePickerContainer}>
      <TouchableOpacity onPress={pickImage} style={STYLES.imagePickerButton}>
        <Text style={STYLES.imagePickerButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={STYLES.imagePickerImage} />
      )}
    </View>
  );
}
