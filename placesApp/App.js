import React, {useState} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import {init} from './helpers/db';

init().then(()=> {
  console.log('Database Initialized!');
}).catch(()=> {
  console.log('Initializing the database failed!');
})

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  });
}

const rootReducer = combineReducers({
  places: placesReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  if (!isFontsLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={()=> setIsFontsLoaded(true)} />
  }
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans-bold'
  }
});


