import React, { useState } from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productsRecuder from './Store/Reducers/products';
import cartReducer from './Store/Reducers/cart';
import ordersReducer from './Store/Reducers/order';
import authrecuder from './Store/Reducers/auth';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './Navigation/shopNavigator';

const rootReducer = combineReducers({
  products: productsRecuder,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authrecuder
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={()=> setFontsLoaded(true)} />
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}


