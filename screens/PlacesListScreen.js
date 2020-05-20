import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as placesActions from '../store/places-actions';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
  
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);
 
  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);
 
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
          title='Add place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
