import React from 'react';
import {FlatList, Button, Platform, Alert, View, Text, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../Store/Actions/products';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';

import ProductItem from '../../Components/shop/ProductItem';

import Colors from '../../Constants/colors';

const UserProductScreen = props => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state=> state.products.userProducts);

    const deleteHandler = id => {
        Alert.alert("Are you sure?", "Do you really want to delete this item?", [
            {text: "NO", style: 'default' },
            {text: 'YES', style : "destructive" , onPress: ()=> {
                dispatch(productsActions.delete_product(id))
            }}
        ]
        );
    }

    if (userProducts.length === 0) {
        return(
            <View style={styles.centered}>
                <Text style={styles.centeredText}>No products found. Start adding some!</Text>
            </View>
        )
    }
    
    return(
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=> {
                        props.navigation.navigate('EditProduct',{
                            productId: itemData.item.id
                        })
                    }}

                >
                    <Button title='Edit' onPress={()=> {}} color={Colors.primaryColor} />
                    <Button title='Delete' onPress={
                        deleteHandler.bind(this, itemData.item.id)
                    } 
                    color={Colors.primaryColor} />
                </ProductItem>
            }
        />
    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={()=> {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add Product' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={()=> {
                    navData.navigation.navigate('EditProduct');
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems :"center",
        justifyContent: "center",
    },
    centeredText: {
        fontFamily: 'open-sans'
    }
})

export default UserProductScreen;