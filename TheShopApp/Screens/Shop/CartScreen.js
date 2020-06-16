import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../Store/Actions/cart';
import * as ordersActions from '../../Store/Actions/order';

import CartItem from '../../Components/shop/CartItem';

import Colors from '../../Constants/colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const totalAmmount = useSelector(state => state.cart.totalAmmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a,b)=> 
            a.productId > b.productId ? 1 : -1
        );
    });

    const setOrdersHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.add_orders(cartItems, totalAmmount))
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.amountContainer}>
                <Text style={styles.amountTitle}>Total Amount: <Text style={styles.amount}>${Math.round(totalAmmount.toFixed(2) * 100) / 100}</Text></Text>
                {
                    isLoading ? (<ActivityIndicator size={"small"} color={Colors.primaryColor} />)
                    : ( <Button title='Order Now' color={Colors.primaryColor}
                    disabled={cartItems.length === 0} 
                    onPress={setOrdersHandler}
                    /> )
                }
            </View>
            <FlatList data={cartItems} 
                keyExtractor={(item)=> item.productId}
                renderItem={itemData => <CartItem 
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove = {()=> {dispatch(cartActions.remove_from_cart(itemData.item.productId))}}
                />}
            />
        </View>
    )
}

CartScreen.navigationsOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20,
    },
    amountContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        elevation: 8,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 20
    },
    amountTitle: {
        fontFamily: 'open-sans-bold'
    },
    amount: {
        color: Colors.primaryColor
    },
});

export default CartScreen;