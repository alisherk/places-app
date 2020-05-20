import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient persmission',
        'Please grant camera permission',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5, 
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text> No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take image'
        colors={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ccc'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
