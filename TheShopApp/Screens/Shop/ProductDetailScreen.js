import React, { useState, useEffect } from 'react';
import {View, ScrollView, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../Store/Actions/cart';

import Colors from '../../Constants/colors';

const ProductDetailScreen = props => {
    const dispatch = useDispatch();
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get("window").height);
    useEffect(()=> {
        const updateLayout = () => {
            setAvailableHeight(Dimensions.get("window").height);
        }
        Dimensions.addEventListener("change", updateLayout);

        return ()=> {
            Dimensions.removeEventListener("change", updateLayout)
        }
    })

    const prodID = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === prodID));

    if (availableHeight < 500) {
        return(
            <View style={styles.screenLandscape}>
                <Image source={{uri: selectedProduct.imageUrl}} style={styles.imageLandscape} />
                <View style={styles.detailContainerLandscape}>
                    <View style={styles.actions}>
                        <Button title='Add to Cart' color={Colors.primaryColor} onPress={()=> {
                            dispatch(cartActions.add_to_cart(selectedProduct));
                        }} />
                    </View>
                    <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                    <Text style={styles.description}>{selectedProduct.description}</Text>
                </View>
            </View>
        )
    }
    return(
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.actions}>
                <Button title='Add to Cart' color={Colors.primaryColor} onPress={()=> {
                    dispatch(cartActions.add_to_cart(selectedProduct));
                }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = (navData) => {
    return{
        headerTitle: navData.navigation.getParam('productTitle')
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
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: "center",
        color: '#888',
        marginTop: 5
    },
    description: {
        fontFamily: 'open-sans',
        marginVertical: 10,
        paddingHorizontal: 20,
        textAlign: "center"
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
    }
});

export default ProductDetailScreen;