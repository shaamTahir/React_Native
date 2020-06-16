import React , { useEffect , useState, useCallback} from 'react';
import { FlatList, Platform, Button, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../Store/Actions/cart';
import * as productActions from '../../Store/Actions/products';

import ProductItem from '../../Components/shop/ProductItem';
import HeaderButton from '../../Components/UI/HeaderButton';

import Colors from '../../Constants/colors';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);

    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try{
            await dispatch(productActions.fetch_products());
        }
        catch(err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    },[setIsRefreshing, setError, dispatch]);

    useEffect(()=> {
        const willFocusSub = props.navigation.addListener('willFocus', loadData);

        return ()=> {
            willFocusSub.remove();
        }
    },[loadData]);

    useEffect(()=> {
        setIsLoading(true);
        loadData().then(()=> {
            setIsLoading(false);
        });
    }, [loadData]);

    const onSelectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }

    if (error) {
        return(
            <View style={styles.centered}>
                <Text style={styles.error}>Something went wrong!</Text>
                <Button title='Try Again' color={Colors.primaryColor} onPress={loadData} />
            </View>
        )
    }

    if (isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator size={"large"} color={Colors.primaryColor} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return(
            <View style={styles.centered}>
                <Text style={styles.emptyScreen}>No products found, start adding some!</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadData}
            refreshing={isRefreshing}
            data={products} keyExtractor={(item, index) => item.id}
            renderItem={itemdata => <ProductItem 
                image = {itemdata.item.imageUrl}
                title = {itemdata.item.title}
                price = {itemdata.item.price}
                onSelect = {()=> onSelectItemHandler(itemdata.item.id, itemdata.item.title)}
            >
            
                <Button title='View Details' onPress={()=> onSelectItemHandler(itemdata.item.id, itemdata.item.title)} color={Colors.primaryColor} />
                <Button title='To Card' onPress={()=> {
                    dispatch(cartActions.add_to_cart(itemdata.item))}} 
                    color={Colors.primaryColor} />
    
            </ProductItem>
        }
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
                <Item title='AddToCart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={()=> {
                    navData.navigation.navigate('Cart')
                }} />
            </HeaderButtons>
        )
    }
}

const styles= StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyScreen: {
        fontFamily: 'open-sans-bold'
    },
    error: {
        fontFamily: 'open-sans-bold',
        marginBottom: 8
    }
});

export default ProductsOverviewScreen;