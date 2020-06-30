import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import Colors from './constants/Colors';

init().then(()=> {
  console.log('Database initialized!');
}).catch((err)=> {
  console.log('Initializing the Database failed!');
  console.log(err);
})

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  if (!isFontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={()=> {setIsFontsLoaded(true)}} />
  }

  const store = createStore(placesReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
      <PlacesNavigator />
    </Provider>
    
  );
}
