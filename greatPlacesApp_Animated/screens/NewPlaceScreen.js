import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native';
import {MaterialCommunityIcons, Feather} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewPlaceScreen = props => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [awesomeAlert, setAwesomeAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //awesomeAlert
    const showAlert = () => {
        setAwesomeAlert(true);
    }; 
    const hideAlert = () => {
        setAwesomeAlert(false);
    };

    //title
    const titleChangeHandler = (text) => {
        setTitle(text);
    }

    //Image
    const onImageTakenHandler = (imagePath) => {
        setImage(imagePath);
    }
    
    //location
    const locationPickedHandler = useCallback((loc) => {
        setLocation(loc);
        console.log(loc);
    });

    //savePlace
    const savePlaceHandler = async() => {
        if (!title || !image || !location) {
            setErrorMessage("Please fill the complete form.");
            showAlert();
            return;
        }
        if (!title) {
            setErrorMessage("Please give this a title.");
            showAlert();
            return;
        }
        if (!image) {
            setErrorMessage("Please capture an image.");
            showAlert();
            return;
        }
        if (!location) {
            setErrorMessage("Please provide a location.");
            showAlert();
            return;
        }
        try {
            setIsLoading(true);
            await dispatch(placesActions.addPlace(title, image, location));
            props.navigation.goBack();
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.form}>
            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="rename-box" size={23} color={Colors.tealColor} />
                <TextInput style={styles.textInput}
                value={title}
                onChangeText={titleChangeHandler} />
            </View>
            <ImagePicker onImageTaken={onImageTakenHandler} />
            <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />

            {/* save Place Handler */}
            {isLoading ? <ActivityIndicator size="large" color={Colors.tealColor} />
            : 
            // <Button title="Save Place" color={Colors.maroonColor} onPress={savePlaceHandler} />
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={savePlaceHandler}>
                <Text style={styles.buttonText}>Save Place</Text>
                <Feather name="save" size={20} color='#fff' />
            </TouchableOpacity>
            }
        </View>
        <AwesomeAlert alertContainerStyle={{flex: 1}} overlayStyle={{flex: 1}}
          show={awesomeAlert}
          showProgress={false}
          title="Incomplete Data"
          message={errorMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Yes, My Mistake"
          confirmButtonColor= {Colors.maroonColor}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.tealColor,
        paddingBottom: 10
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 3,
        marginBottom: 10
    },
    textInput: {
        flex: 1,
        paddingLeft: 5,
        marginTop: -3
    },
    button: {
        flexDirection :"row",
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderColor: Colors.backgroundColor,
        borderWidth: 1.2,
        borderRadius: 50,
        backgroundColor: Colors.tealColor,
    },
    buttonText :{
        fontFamily: 'open-sans',
        color: '#fff',
        fontSize: 18,
        paddingRight: 10
    }
});

export default NewPlaceScreen;