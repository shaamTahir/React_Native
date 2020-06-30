import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/action/cart';
import * as ordersActions from '../../store/action/orders';
import Colors from '../../constants/Colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const totalAmount = useSelector(state=> state.cart.totalAmmount);
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
      return transformedCartItems.sort((a,b)=> a.productId > b.productId ? 1 : -1)
  });
  const saveOrderHandler = async() => {
    setIsLoading(true);
    await dispatch(ordersActions.add_order(cartItems, totalAmount));
    setIsLoading(false);
  }
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountTitle}>Total Amount:  <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>
            {isLoading ? <ActivityIndicator color={Colors.primaryColor} size={"small"} />
            : (<Button title='Order Now' color={Colors.buttonColor1}
              disabled={cartItems.length === 0} 
              onPress= {saveOrderHandler}
            />)}
          </View>
        </View>

        <Animatable.View animation="fadeInUp" duration={1500} style={styles.footer}>
          {cartItems.length === 0 ? 
          <View style={styles.centered}>
            <Text style={styles.fallbacktext}>Your Cart is empty</Text>
          </View> 
          : <FlatList data={cartItems} 
            keyExtractor={(item)=> item.productId}
            renderItem={itemData => <CartItem 
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove = {()=> {
                dispatch(cartActions.remove_from_cart(itemData.item.productId));
              }}
            />}
            /> }
        </Animatable.View>

      </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      backgroundColor: '#eee'
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopColor: Colors.buttonColor1,
    borderTopWidth: 3,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderLeftColor: Colors.buttonColor1,
    borderRightColor: Colors.buttonColor1,
  },
  amountContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2},
      elevation: 8,
      borderRadius: 10,
      backgroundColor: '#eee',
      marginBottom: 20,
      height: 60
  },
  amountTitle: {
    fontWeight: "bold",
    fontSize: 17
  },
  amount: {
      color: Colors.buttonColor2,
      fontWeight: "normal"
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex :1
  },
  fallbacktext: {
    fontSize: 16,
    color: Colors.buttonColor1,
  }
});



export default CartScreen;