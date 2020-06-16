import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native';

import { useSelector } from 'react-redux';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
    const selectedPlaceId = props.navigation.getParam('placeId');
    const selectedPlace = useSelector(state=> state.places.places.find(place => place.id === selectedPlaceId));

    const showMapHandler = () => {
        props.navigation.navigate('Map',{
            choosenLocation_placeDetailscreen: {
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude
            },
            readOnly : true
        })
    }
    return (
        <ScrollView contentContainerStyle={{alignItems: "center"}} >
            <Image source={{uri: selectedPlace.imageUri}} style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedPlace.address}</Text>
                </View>
                <MapPreview style={styles.mapPreview} location={{latitude: selectedPlace.latitude, longitude: selectedPlace.longitude}} 
                    onSelect={showMapHandler}
                />
            </View>                                                                                     
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam("placeTitle")
    }
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: 'black',
        shadowOffset: {height: 0, width: 2},
        shadowRadius: 8,
        shadowOpacity: 0.6,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: "hidden",
    },
    addressContainer: {
        padding: 20
    },
    address: {
        textAlign: "center",
        color: Colors.primaryColor,
        fontFamily: 'open-sans',
        fontSize: 14
    },
    mapPreview: {
        height: 250,
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#ccc',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default PlaceDetailScreen;