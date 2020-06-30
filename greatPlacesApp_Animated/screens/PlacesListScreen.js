import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-action';
import Colors from '../constants/Colors';

const PlaceListScreen = props => {
    const places = useSelector(state => state.places);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const placesLoading = useCallback(async()=> {
        setIsLoading(true);
        await dispatch(placesActions.fetchAllPlaces());
    }, [dispatch]);

    useEffect(()=> {
        placesLoading().then(()=> {
            setIsLoading(false);
        });
    }, [placesLoading]);


    if (places.length === 0) {
        return(
            <View style={styles.centered}>
                <Text style={styles.fallBackText}>No places found, start adding some!</Text>
            </View>
        )
    }

    if (isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.backgroundColor} size="large" />
            </View>
        )
    }
    return(
        <FlatList 
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => <PlaceItem
            title={itemData.item.title}
            image={itemData.item.imageUri}
            address={itemData.item.address}
            newAddress={itemData.item.address}
            onSelect={()=> {
                props.navigation.navigate('PlaceDetail', {
                    placeId: itemData.item.id,
                    placeTitle: itemData.item.title
                });
            }}
            />}
        />
    )
}

PlaceListScreen.navigationOptions = navData => {
    return{
        headerTitle: "All Places",
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Add Place" iconName="md-add" onPress={()=>{
                    navData.navigation.navigate('NewPlace');
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    fallBackText: {
        color: Colors.backgroundColor,
        fontFamily: 'open-sans',
        fontSize: 17,
        textAlign: "center"
    }
});

export default PlaceListScreen;