import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';
const apiKey = ENV().googleApiKey;
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => async dispatch => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`
  );
  if (!resp.ok) {
    throw new Error('Something went wrong in resp ok');
  }
  const respData = await resp.json();
  if (!respData.results) {
    throw new Error('Something went wrong in respData');
  }
  const address = respData.results[0].formatted_address;
  console.log(address);
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      address,
      location.lat,
      location.lng
    );
    dispatch({
      type: ADD_PLACE,
      payload: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
    } catch (err) {
      throw err;
    }
  };
};
