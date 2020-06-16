import React, {useEffect, useState} from 'react';
import {Text, FlatList, Platform, View, StyleSheet, ActivityIndicator} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';

import {useSelector, useDispatch} from 'react-redux';
import * as ordersActions from '../../Store/Actions/order';

import OrderItem from '../../Components/shop/OrderItem';
import colors from '../../Constants/colors';

const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state=> state.orders.orders);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsLoading(true);
        const loadOrders = async () => {
            await dispatch(ordersActions.fetch_orders());
            setIsLoading(false);
        }
        loadOrders();
    },[dispatch]);

    if (isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator size={"large"} color={colors.primaryColor} />
            </View>
        )
    }

    if (orders.length === 0) {
        return(
            <View style={styles.centered}>
                <Text style={styles.centeredText}>No orders found. Start ordering some!</Text>
            </View>
        )
    }

    return(
        <FlatList 
            data={orders}
            keyExtractor= {(item)=> item.id}
            renderItem = {itemdata=> <OrderItem 
                amount={itemdata.item.totalAmount}
                date={itemdata.item.readableDate}
                item={itemdata.item.items}
            />}
        />
    )
}

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={()=> {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered :{
        flex: 1,
        justifyContent :"center",
        alignItems: "center"
    },
    centeredText: {
        fontFamily: 'open-sans'
    }
})
export default OrderScreen;