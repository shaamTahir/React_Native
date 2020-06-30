import React from 'react';
import { StyleSheet, FlatList, Alert, View, Text } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as productActions from '../../store/action/Products';
import CustomButton from '../../components/UI/CustomButton';
import Colors from '../../constants/Colors';

const UserProductScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state=> state.products.userProducts);

  const editProductHandler = productId => {
    props.navigation.navigate('EditProduct', {
      productId : productId
    })
  }

  const confirmDeleteHandler = id => {
    dispatch(productActions.delete_product(id));
  }

  if (userProducts.length === 0) {
    return(
      <View style={styles.centered}>
        <Text style={styles.fallBackText}>No products found. Start adding some!</Text>
      </View>
    )
  }

  return (
    <Animatable.View animation="bounceIn" duration={1500} style={{flex: 1}}>
    <FlatList data={userProducts} keyExtractor={item => item.id} 
    renderItem={itemData => <ProductItem 
      image={itemData.item.imageUrl} 
      title={itemData.item.title} 
      price={itemData.item.price}
      onSelect={()=> {
        editProductHandler(itemData.item.id);
      }}>
        <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> {
            editProductHandler(itemData.item.id);
        }}>
          <Text style={styles.buttonText}>Edit</Text>
        </CustomButton>

        <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> {
          Alert.alert("Are you sure?","Do you really want to delete " + itemData.item.title + "?",[{
            text: "No", style: "destructive"
          },{
            text :"Yes", style: "cancel" , onPress: confirmDeleteHandler.bind(this, itemData.item.id)
          }])
        }}>
          <Text style={styles.buttonText}>Delete</Text>
        </CustomButton>
      </ProductItem>} />
      </Animatable.View>
  );
}

UserProductScreen.navigationOptions = navData => {
  return{
    headerTitle: 'Your Products',
    headerRight: ()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title="Add" iconName={"plus-square"} onPress={()=>{
          navData.navigation.navigate('EditProduct');
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  fallBackText: {
    color: Colors.buttonColor1,
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
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    color: '#fff'
  },
  elevation: {
    elevation: 8
  }
});

export default UserProductScreen;
