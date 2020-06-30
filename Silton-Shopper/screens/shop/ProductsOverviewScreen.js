import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import AwesomeAlert from 'react-native-awesome-alerts';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/action/cart';
import * as productActions from '../../store/action/Products';
import HeaderButton from '../../components/UI/HeaderButton';
import CustomButton from '../../components/UI/CustomButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  //setProducts
  const loadProducts = useCallback(async()=> {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.set_products());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch])
  useEffect(()=> {
    setIsLoading(true);
    loadProducts().then(()=> {
      setIsLoading(false)
    });
  }, [loadProducts]);

  //willFocus
  useEffect(()=> {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

    //clean up, not to stuck in infinite loops (reason: props.navigation)
    return ()=> {
      willFocusSub.remove();
    }
  }, [loadProducts])

  const onSelectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      "productId": id,
      "productTitle": title
    })
  }

  //AwesomeAlert
  const [showAlertt, setShowAlert] = React.useState(false);
  const showAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false)
    }, 1000)
  };

  if (isLoading) {
    return(
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primaryColor} size={"large"} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return(
      <View style={styles.centered}>
        <Text style={styles.fallBackText}>No products found. May be start adding some!</Text>
      </View>
    )
  }

  if (error) {
    return(
      <View style={styles.centered}>
        <Text style={styles.fallBackText}>{error}</Text>
        <CustomButton style={styles.button} onPress={loadProducts}>
          <Text style={styles.buttonText}>Try Again</Text>
        </CustomButton>
      </View>
    )
  }

  // const [availableHeight, setAvailableHeight] = useState(Dimensions.get("window").height);
  // useEffect(()=> {
  //     const updateLayout = () => {
  //         setAvailableHeight(Dimensions.get("window").height);
  //     }
  //     Dimensions.addEventListener("change", updateLayout);

  //     return ()=> {
  //         Dimensions.removeEventListener("change", updateLayout);
  //     }
  // },[]);

  return (
      <Animatable.View animation="bounceIn" duration={1500}>
    <FlatList showsVerticalScrollIndicator={false}
      // onRefresh={loadProducts}
      // refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          colors={[Colors.buttonColor1, Colors.buttonColor2]}
        />
      }
       data={products}
       keyExtractor={item => item.id}
       renderItem={
           itemData => <ProductItem
            image= {itemData.item.imageUrl}
            title= {itemData.item.title}
            price= {itemData.item.price}
            onSelect = {()=> {
              onSelectItemHandler(itemData.item.id,itemData.item.title)                                        
            }}
           >
             <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> {
                onSelectItemHandler(itemData.item.id,itemData.item.title)  
              }}>
                <Text style={styles.buttonText}>View Details</Text>
             </CustomButton>

             <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> {
                dispatch(cartActions.add_to_cart(itemData.item))
                showAlert();
              }}>
                <Text style={styles.buttonText}>Add To Cart</Text>
             </CustomButton>
           </ProductItem>
       } />
       {/* AwesomeAlert */}
       <AwesomeAlert titleStyle = {{color: 'red'}} messageStyle={{color: Colors.primaryColor}}
        show={showAlertt}
        showProgress={false}
        title={"Success!"}
        message={"Product added to cart."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
      />
       </Animatable.View>
  );
}

ProductsOverviewScreen.navigationOptions = navData => {
  return{
    headerTitle: 'All Products',
    headerRight: ()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title="cart" iconName={"shopping-cart"} onPress={()=>{
          navData.navigation.navigate('Cart')
        }} />
      </HeaderButtons>
    ),
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
    justifyContent: 'center'
  },
  fallBackText: {
    color: Colors.primaryColor,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    paddingBottom: 10
  },
  button: {
    width: 110,
    height: 38,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    color: '#fff'
  },
  elevation: {
    elevation: 4
  }
});

export default ProductsOverviewScreen;
