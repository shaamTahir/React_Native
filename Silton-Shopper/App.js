import React from 'react';
import {StatusBar } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducer/Products';
import cartReducer from './store/reducer/cart';
import ordersReducer from './store/reducer/orders';
import authReducer from './store/reducer/auth';
import Colors from './constants/Colors';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.primaryColor} barStyle="light-content" />
      <ShopNavigator />
    </Provider>
  );
}