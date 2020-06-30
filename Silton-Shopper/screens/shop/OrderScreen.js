import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/action/orders';
import Colors from '../../constants/Colors';

const OrderScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state=> state.orders.orders);
  // console.log(orders);

  useEffect(()=> {
    const loadOrders = async()=> {
      setIsLoading(true);
      await dispatch(ordersActions.fetch_orders());
      setIsLoading(false);
    }
    loadOrders();
  }, [dispatch]);

  if (isLoading) {
    return(
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primaryColor} size={"large"} />
      </View>
    )
  }

  if (orders.length === 0) {
    return(
      <View style={styles.centered}>
        <Text style={styles.fallBackText}>No orders yet. Start ordering some!</Text>
      </View>
    )
  }
  
  return (
    <FlatList data={orders} keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} 
      date={itemData.item.readableDate} item={itemData.item.items} />}
    />
  );
}

OrderScreen.navigationOptions = navData => {
  return{
    headerTitle: "Your Orders",
    headerLeft: ()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title="menu" iconName={"menu"} onPress={()=>{
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  fallBackText: {
    color: Colors.buttonColor1,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    paddingBottom: 10
  }
});

export default OrderScreen;
