import React from 'react';
import {Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDeatilScreen from '../screens/MealDeatilScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const myDefaultNavigationOptions = {
    headerStyle : {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle :{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
         fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeal: CategoryMealScreen,
    MealDetail: MealDeatilScreen,
},{
    defaultNavigationOptions: myDefaultNavigationOptions
});

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDeatilScreen,
},{
    defaultNavigationOptions: myDefaultNavigationOptions
});

const FiltersNavigator = createStackNavigator({
    Filters : FiltersScreen
},{
    defaultNavigationOptions: myDefaultNavigationOptions
});

const theScreenconfig = {
    Meals : {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel : Platform.OS === "android" ? <Text style={{fontFamily: 'open-sans'}}>Meals</Text> : 'Meals',
        }
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.secondaryColor,
            tabBarLabel : Platform.OS === "android" ? <Text style={{fontFamily: 'open-sans'}}>Favourites</Text> : 'Favourites',

        }
    }
};

const MealsFavNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(theScreenconfig,{
        activeColor: 'white',
        shifting: true,
    }) 
    : createBottomTabNavigator(theScreenconfig,{
    tabBarOptions: {
        activeTintColor: Colors.secondaryColor
    },
    labelStyle: {
        fontFamily: 'open-sans'
    }
});

const MainNAvigator = createDrawerNavigator({
    Favourites : {screen: MealsFavNavigator, navigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filter : FiltersNavigator
},{
    contentOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 15
        }
    }
});

export default createAppContainer(MainNAvigator);