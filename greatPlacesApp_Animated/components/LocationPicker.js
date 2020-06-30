import React, { useState, useEffect } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Alert, TouchableOpacity, Button} from 'react-native';
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam('selectedLocation');
  useEffect(()=> {
      if (mapPickedLocation) {
          setPickedLocation(mapPickedLocation);
          props.onLocationPicked(mapPickedLocation);
      }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      if (result.status !== 'granted') {
        Alert.alert("Insufficient Permissions", "You must need to grant permissions in order to access the Location.",[{
            text: "Okay", style: "cancel"
        }]);
        return false;
      }
      return true;
  } 

  const pickLocationHandler = async() => {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
          return;
      } 
      try {
          setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({
              timeout: 5000
          })
        //   console.log(location);
        setPickedLocation({
            latitude: location.coords.latitude,
            longitude : location.coords.longitude,
        })
        props.onLocationPicked({
            latitude: location.coords.latitude,
            longitude : location.coords.longitude,
        })
      } catch (error) {
          console.log(error);
          Alert.alert("Location Error", "Could not find the location, try again later or try to locate on the map.",[{
              text: "Try Again", style: "default", onPress: pickLocationHandler
          },{
            text: "Okay", style: "cancel"
        }]);
      }
      setIsFetching(false);
  }

  const pickOnMapHandler = () => {
      props.navigation.navigate('Map', {
          selectedMarkerCoords: pickedLocation
      });
  }

  return (
    <View style={styles.locationPicker}>
        <MapPreview location={pickedLocation} style={styles.locationPreview} onSelect={pickOnMapHandler}>
            {isFetching ? <ActivityIndicator size="large" color={Colors.tealColor} />
            : <Text style={styles.fallBackText}>No location selected yet.</Text>}
        </MapPreview>
        <View style={styles.actions}>
            {/* <Button title="Pick User Location" color={Colors.maroonColor} onPress={pickLocationHandler} />
            <Button title="Pick Location on Map" color={Colors.maroonColor} onPress={pickOnMapHandler} /> */}
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={pickLocationHandler}>
                <Text style={styles.buttonText}>Current</Text>
                <Animatable.View animation="jello" iterationCount={15} direction="alternate">
                    <Entypo name="location" size={20} color={'#fff'} />
                </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={pickOnMapHandler}>
                <Text style={styles.buttonText}>On Map</Text>
                <Animatable.View animation="jello" iterationCount={15} direction="alternate">
                    <MaterialCommunityIcons name="google-maps" size={20} color={'#fff'} />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    locationPreview: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    },
    fallBackText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: "center",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        marginBottom: 2
    },
    button: {
        flexDirection :"row",
        width: 130,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: Colors.backgroundColor,
        borderWidth: 0.5,
        borderRadius: 50,
        backgroundColor: Colors.tealColor
    },
    buttonText :{
        fontFamily: 'open-sans',
        color: '#fff',
        fontSize: 16,
        paddingRight: 10
    }
});

export default LocationPicker;