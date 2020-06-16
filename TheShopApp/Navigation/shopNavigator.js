import React from 'react';
import {Platform, SafeAreaView, View, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {createSwitchNavigator ,createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import Colors from '../Constants/colors';

import ProductsOverViewScreen from '../Screens/Shop/ProductsOverViewScreen';
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import OrderScreen from '../Screens/Shop/OrderScreen';
import UserProductScreen from '../Screens/User/UserProductScreen';
import EditProductScreen from '../Screens/User/EditProductScreen';
import AuthScreen from '../Screens/User/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';

import colors from '../Constants/colors';

import {useDispatch} from 'react-redux';
import * as authActions from '../Store/Actions/auth';

const defaultNavOptions = {
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'  
    },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const ProductsNavigator = createStackNavigator({
    ProductsOverView: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === "android" ? 'md-list' : 'ios-list'}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProduct: UserProductScreen,
    EditProduct: EditProductScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === "android" ? 'md-create' : 'ios-create'}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions :{
        activeTintColor: Colors.primaryColor
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return(
            <View style={{flex: 1, paddingTop: 10, paddingLeft: 0}}>
                <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                    <View style={{padding: 25}}>
                        <Button title='LOGOUT' color={Colors.primaryColor} onPress={()=> {
                            dispatch(authActions.log_out());
                            props.navigation.navigate('Auth');
                        }} />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);
