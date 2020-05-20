import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as actions from '../store/places-actions';

//comps
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState()

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(actions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const handleImageTaken = imagePath => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location); 
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}> Title </Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={handleImageTaken} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: Colors.primary
  },
  input: {
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});

export default NewPlaceScreen;
