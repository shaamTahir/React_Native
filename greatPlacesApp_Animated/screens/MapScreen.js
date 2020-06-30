import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readOnly = props.navigation.getParam('readOnly');

  //from Map PreView
  let selectedMarkerCoords = props.navigation.getParam('selectedMarkerCoords');
  console.log(selectedMarkerCoords)

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  let mapRegion={
    latitude: selectedLocation ? selectedLocation.latitude : (initialLocation ? initialLocation.latitude :  24.91886),
    longitude: selectedLocation ? selectedLocation.longitude : (initialLocation ? initialLocation.longitude : 67.0457658),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  console.log(selectedLocation);
  if(selectedLocation){
    selectedMarkerCoords = undefined;
    mapRegion={
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }
  if (selectedMarkerCoords) {
    mapRegion={
      latitude: selectedMarkerCoords.latitude,
      longitude: selectedMarkerCoords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  const selectedLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    })
  }

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates={
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }
  }
  else if (selectedMarkerCoords){
    markerCoordinates = {
      latitude: selectedMarkerCoords.latitude,
      longitude: selectedMarkerCoords.longitude,
    }
  }


  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      //alert
      return;
    }
    props.navigation.navigate('NewPlace', {
      selectedLocation: selectedLocation
    });
  },[selectedLocation]);

  useEffect(()=> {
    props.navigation.setParams({saveLocation: saveLocationHandler});
  },[saveLocationHandler]);

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectedLocationHandler} >
      {markerCoordinates && <Marker coordinate={markerCoordinates} />}
    </MapView>
  );
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const isReadOnly = navData.navigation.getParam('readOnly');
  if (isReadOnly) {
    return;
  }
  return{
    headerRight: ()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="save" iconName={"ios-save"} onPress={saveFn} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;