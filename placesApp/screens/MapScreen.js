import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const MapScreen = props => { 
    const initialLocation = props.navigation.getParam('choosenLocation_placeDetailscreen');
    const readOnly = props.navigation.getParam('readOnly');
    
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    let mapRegion;
    const defaultMApRegion = {
        latitude: selectedLocation ? selectedLocation.latitude : 37.78,
        longitude: selectedLocation ? selectedLocation.longitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421 
    }

    const selectLocationHandler = (event) => {
        if (readOnly) {
            return;
        }
        // console.log(event);
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    }

    //
    const saveLocationHandler = useCallback(()=> {
        if (!selectedLocation) {
            return
        }
        props.navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        })
    },[selectedLocation]);

    useEffect(()=> {
        props.navigation.setParams({
            saveLocation: saveLocationHandler
        });
    },[saveLocationHandler])
    //

    mapRegion = defaultMApRegion;

    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
        }
    }
    return(
        <MapView style={styles.mapView} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates && (
            <Marker title="Picked Place" coordinate={markerCoordinates} />
            )}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const pickedLocationFn = navData.navigation.getParam('saveLocation');
    const readOnly = navData.navigation.getParam('readOnly');

    if (readOnly) {
        return{
         headerTitle: 'Selected Location',
        }
    }
    return{
        headerTitle: 'Select Location',
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save Place" iconName='md-save' onPress={pickedLocationFn} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    }
});

export default MapScreen;



