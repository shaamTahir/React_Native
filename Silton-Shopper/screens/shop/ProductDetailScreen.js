import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';

import * as cartActions from '../../store/action/cart';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/UI/CustomButton';



const ProductDetailScreen = props => {
  const [showAlertt, setShowAlert] = React.useState(false);
  const showAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false)
    }, 1000)
  };
  


  const dispatch = useDispatch();
  const selectedProductId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state=> state.products.availableProducts.find(product => product.id === selectedProductId));
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
    <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
    <Animatable.View animation={"flash"} iterationCount={9} direction="alternate">
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
    </Animatable.View>

    <Animatable.View animation={"tada"}>
    <Text style={styles.description}>{selectedProduct.description}</Text>
    </Animatable.View>
    <View style={styles.actions}>
      <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> {
            dispatch(cartActions.add_to_cart(selectedProduct));
            showAlert()
      }}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </CustomButton>
        {/* <Button title='Add to Cart' color={Colors.primaryColor} onPress={()=> {
            dispatch(cartActions.add_to_cart(selectedProduct));
            showAlert()
        }} /> */}
    </View>


    <AwesomeAlert titleStyle = {{color: 'red'}} messageStyle={{color: Colors.primaryColor}}
      show={showAlertt}
      showProgress={false}
      title={selectedProduct.title}
      message={selectedProduct.title + " added to cart."}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
    />
  </ScrollView>
  );
}

ProductDetailScreen.navigationOptions = navData => {
  return{
    headerTitle: navData.navigation.getParam("productTitle")
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
},
actions: {
    marginVertical: 10,
    alignItems: "center",
},
price: {
    fontSize: 20,
    textAlign: "center",
    color: '#888',
    marginTop: 5
},
description: {
    marginVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    lineHeight: 20
},
screenLandscape: {
    flex: 1,
    flexDirection: "row",
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2},
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    overflow: "hidden"
},
imageLandscape: {
    width: '60%',
    height: '100%'
},
detailContainerLandscape: {
    width: '40%',
    height: '100%',
    alignItems: "center",
    justifyContent :"center",
},
button: {
  width: 120,
  height: 40,
  paddingHorizontal: 5,
  paddingVertical: 5,
  justifyContent: "center",
  borderRadius: 10
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

export default ProductDetailScreen;
