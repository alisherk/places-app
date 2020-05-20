import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState();

  const mapPickedLocation = props.navigation.getParam('pickedLocation');
  const { onLocationPicked } = props; 

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient persmission',
        'Please grant location permission',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      setIsFetching(false);
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      setIsFetching(false);
      Alert.alert(
        'Could not fetch location',
        'Please try to pick a location on the map',
        [{ text: 'Okay' }]
      );
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.LocationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator size='large' />
        ) : (
          <Text>No location chosen yet </Text>
        )}
      </MapPreview>
      <View style={styles.buttonContainer}>
        <Button
          title='Get user location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick on map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LocationPicker: {
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  }
});

export default LocationPicker;
