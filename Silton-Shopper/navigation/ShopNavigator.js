import React from 'react';
import { View, Button, SafeAreaView} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Feather, Ionicons} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import SignInScreen from '../screens/user/SignInScreen';
import SignUpScreen from '../screens/user/SignUpScreen';
import SplashScreen from '../screens/user/SplashScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/action/auth';
import Colors from '../constants/Colors';

import DrawerContent from './DrawerContent';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: "bold"
    }
}

const productsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Feather name="shopping-cart" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const ordersNavigator = createStackNavigator({
    orders: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
        <Feather name="list" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions :defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
        <Ionicons name="ios-create" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions :defaultNavOptions
})

const shopNavigator = createDrawerNavigator({
    Products : productsNavigator,
    Orders: ordersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor : Colors.primaryColor
    },
    contentComponent: props=> <DrawerContent {...props} />
    // contentComponent: props => {
    //     const dispatch = useDispatch();
    //     return(
    //         <View style={{flex: 1, paddingTop: 10, paddingLeft: 0}}>
    //             <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
    //                 <DrawerItems {...props} />
    //                 <View style={{padding: 25}}>
    //                     <Button title='LOGOUT' color={Colors.buttonColor1} onPress={()=> {
    //                         dispatch(authActions.log_out());
    //                         props.navigation.navigate('Auth');
    //                     }} />
    //                 </View>
    //             </SafeAreaView>
    //         </View>
    //     );
    // }
});

const AuthNavigator = createStackNavigator({
    Splash: SplashScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen
},{
    headerMode: "none"
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: shopNavigator
});


export default createAppContainer(MainNavigator);