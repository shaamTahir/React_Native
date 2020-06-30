import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator({
    PlacesList: PlacesListScreen,
    NewPlace: NewPlaceScreen,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions :{
        headerStyle :{
            backgroundColor: Colors.backgroundColor
        },
        headerTintColor: Colors.tealColor,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        }
    }
});

export default createAppContainer(PlacesNavigator);