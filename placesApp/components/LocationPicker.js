import React, { useState, useEffect } from 'react';
import {View, Text, ActivityIndicator, Dimensions, StyleSheet, Alert} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

import SecondaryButton from '../components/SecondaryButton';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    //location from mapScreen
    const {onLocationPicked} = props;
    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    useEffect(()=> {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    },[mapPickedLocation, onLocationPicked])

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert("Insufficient Permissions", "You must need to grant permissions in order to access the Location.",[{
                text: "Okay", style: "cancel"
            }]);
            return false;
        }
        return true;
    }

    const locationPickerHandler = async()=> {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const _location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            // console.log(_location);
            setPickedLocation({
                latitude: _location.coords.latitude,
                longitude: _location.coords.longitude,
            });
            props.onLocationPicked({
                latitude: _location.coords.latitude,
                longitude: _location.coords.longitude,
            })
        } catch (error) {
            console.log(error);
            Alert.alert("Location Error", "Could not find the location, try again later or try to locate on the map.",[{
                text: "Okay", style: "cancel"
            }, {
                text: 'Try Again', style :"default", onPress: locationPickerHandler
            }]);
        }
        setIsFetching(false);
        
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }



    return (
        <View style={styles.locationPicker}>
            <MapPreview location={pickedLocation} style={styles.locationPreview} onSelect={pickOnMapHandler}>
                {isFetching ? <ActivityIndicator size="small" color={Colors.primaryColor} /> 
                :<Text style={styles.fallBackText}>No Location selected yet.</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <View style={styles.button}>
                    <SecondaryButton onPress={locationPickerHandler}>Add User Location</SecondaryButton>
                    {/* <Button title="Add User Location"  color={Colors.primaryColor} onPress={locationPickerHandler} /> */}
                </View>
                <View style={styles.button}>
                    <SecondaryButton onPress={pickOnMapHandler}>Pick Location on Map</SecondaryButton>
                    {/* <Button title="Pick on Map"  color={Colors.primaryColor} onPress={pickOnMapHandler} /> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    locationPreview: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    fallBackText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: "center",
    },
    button: {
        width: '45%'
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%'
    }
});

export default LocationPicker;