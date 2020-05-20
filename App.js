import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
   init()
  .then(() => {
    console.log('initialied db');
  })
  .catch(err => {
    console.log('db failed'); 
    console.log(err);
  });
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
