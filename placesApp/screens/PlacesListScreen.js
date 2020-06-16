import React, { useEffect, useState } from 'react';
import {FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItems';
import * as placesActions from '../store/places-action';
import Colors from '../constants/Colors';

const PlacesListScreen = props => { 
    const [isFetching, setIsFetching] = useState(true);
    const dispatch = useDispatch();
    const allPlaces = useSelector(state => state.places.places);

    useEffect(()=> {
        setIsFetching(true);
        const dataLoading = async()=> {
            await dispatch(placesActions.fetch_places());
            setIsFetching(false);
        }
        dataLoading();
    },[dispatch]);

    if (isFetching) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primaryColor} size={"large"} />
            </View>
            )
        }

    if (allPlaces.length === 0) {
    return(
        <View style={styles.centered}>
            <Text style={styles.fallbackText}>No Places yet, start adding some!</Text>
        </View>
        )
    }
    return(
        <FlatList data={allPlaces}
        keyExtractor={item=> item.id}
        renderItem = { itemData => 
                <PlaceItem 
                    onSelect={()=> props.navigation.navigate("PlaceDetail",{
                    placeTitle: itemData.item.title,
                    placeId: itemData.item.id
                })}
                    image={itemData.item.imageUri}
                    title = {itemData.item.title}
                    address = {itemData.item.address}
                />
            }
        />
    )
}

PlacesListScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Places',
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add Place' iconName='md-add'
                onPress={()=> {
                    navData.navigation.navigate('NewPlace')
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontFamily: 'open-sans'
    }
});

export default PlacesListScreen;