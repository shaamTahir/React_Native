import React from 'react';
import moduleName from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors';

const placesNavigator = createStackNavigator({
    PlacesList: PlacesListScreen,
    NewPlace: NewPlaceScreen,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
});

export default createAppContainer(placesNavigator);