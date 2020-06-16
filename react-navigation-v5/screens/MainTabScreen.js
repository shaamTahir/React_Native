import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeScreenStack = createStackNavigator();
const DetailScreenStack = createStackNavigator();
const ExploreScreenStack = createStackNavigator();
const ProfileScreenStack = createStackNavigator();

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: '#009387'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}

const HomeStack = props => (
  <HomeScreenStack.Navigator screenOptions={defaultStackOptions} >
    <HomeScreenStack.Screen name="Home" component={HomeScreen} options={{
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="md-menu" size={23} color={'white'} backgroundColor={'#009387'} onPress={()=> {
          props.navigation.toggleDrawer();
        }} />
      )
    }} />
  </HomeScreenStack.Navigator>
);

const DetailStack = props => (
  <DetailScreenStack.Navigator screenOptions={defaultStackOptions} >
    <DetailScreenStack.Screen name="Detail" component={DetailScreen} options={{
      title: 'Details',
      headerStyle: {
          backgroundColor: '#1f65ff'
      },
      headerLeft: () => (
        <Icon.Button name="md-menu" size={23} color={'white'} backgroundColor={'#1f65ff'} onPress={()=> {
          props.navigation.toggleDrawer();
        }} />
      )
    }} />
  </DetailScreenStack.Navigator>
);

const ProfileStack = props => (
    <ProfileScreenStack.Navigator screenOptions={defaultStackOptions} >
      <ProfileScreenStack.Screen name="Detail" component={DetailScreen} options={{
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#694fad'
        },
        headerLeft: () => (
          <Icon.Button name="md-menu" size={23} color={'white'} backgroundColor={'#694fad'} onPress={()=> {
            props.navigation.toggleDrawer();
          }} />
        )
      }} />
    </ProfileScreenStack.Navigator>
  );

  const ExploreStack = props => (
    <ExploreScreenStack.Navigator screenOptions={defaultStackOptions} >
      <ExploreScreenStack.Screen name="Explore" component={ExploreScreen} options={{
        title: 'Explore',
        headerStyle: {
            backgroundColor: '#d02860'
        },
        headerLeft: () => (
          <Icon.Button name="md-menu" size={23} color={'white'} backgroundColor={'#d02860'} onPress={()=> {
            props.navigation.toggleDrawer();
          }} />
        )
      }} />
    </ExploreScreenStack.Navigator>
  );


const MainTabScreen = props => {
    return(
        <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="md-home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={DetailStack}
        options={{
          tabBarLabel: 'Details',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={23} />
          ),
        }}
      />
       <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
        ),
        }}
      />
    </Tab.Navigator>
    );
}

export default MainTabScreen;