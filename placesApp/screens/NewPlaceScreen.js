import React, { useState, useCallback, useEffect } from 'react';
import {ScrollView,TextInput, Text, View, StyleSheet, Dimensions, Alert, Keyboard } from 'react-native';
import {useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

//
import MainButton from '../components/MainButton';

const NewPlaceScreen = props => { 
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

    //set title of Place
    const [placeTitle, setPlaceTitle] = useState('');
    const changeTitleHandler = text => {
        setPlaceTitle(text);
    }

    //set image
    const [selectedImage,setSelectedImage] = useState();
    const takeImageHandler = (imagePath) => {
        setSelectedImage(imagePath);
    }

    // set Location
    const [selectedLocation, setSelectedLocation] = useState();
    const pickedLocationHandler = useCallback((location) => {
        // console.log(location);
        setSelectedLocation(location);
    },[])

    const dispatch = useDispatch();
    //Saving Data
    const savePlaceHandler = () => {
        Keyboard.dismiss();
        if (placeTitle.trim().length === 0 || !selectedImage || !selectedLocation) {
            Alert.alert("Insufficient Info","You must add complete info to continue", [{
                text: "Okay", style: "cancel"
            }]);
            return;
        }
        dispatch(placesActions.add_place(placeTitle, selectedImage, selectedLocation));
        props.navigation.goBack();
    }

    if (availableHeight < 500) {
        return(
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.formLandscape}>
                    <View style={styles.titleContainerLandscape}>
                        <Text style={styles.label}>Add Title</Text>
                        <View style={styles.inputContainerLandscape}>
                            <TextInput style={styles.titleInput} underlineColorAndroid='transparent' 
                                onChangeText={changeTitleHandler} 
                                value={placeTitle} />
                        </View>
                    </View>
                        <ImagePicker onImageTaken={takeImageHandler} />
                        <LocationPicker navigation={props.navigation} onLocationPicked={pickedLocationHandler} />
                    <MainButton onPress={savePlaceHandler}>Save Place</MainButton>
                    {/* <Button title="Save Place" color={Colors.primaryColor}   /> */}
                </View>
            </ScrollView>
        )
    }
    return(
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{backgroundColor:'white'}}>
            <View style={styles.form}>
                <Text style={styles.label}>Add Title</Text>
                <TextInput style={styles.titleInput} underlineColorAndroid='transparent' 
                onChangeText={changeTitleHandler} 
                value={placeTitle} />
                <ImagePicker onImageTaken={takeImageHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={pickedLocationHandler} />
                <MainButton onPress={savePlaceHandler}>
                    Save Place
                </MainButton>
                {/* <Button title="Save Place" color={Colors.primaryColor}   /> */}
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add A New Place"
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
        marginHorizontal: Dimensions.get("window").width/15,
        padding: 20,
        paddingHorizontal: Dimensions.get("window").width/20,
        backgroundColor: '#eee',
        elevation: 5,
        shadowColor: '#eee',
        shadowOffset: {width: 2, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.6,
        borderRadius: 15
    },
    formLandscape: {
        margin: 20,
        marginHorizontal: Dimensions.get("window").width/11,
        padding: 20,
        paddingHorizontal: Dimensions.get("window").width/15,
        backgroundColor: '#eee',
        elevation: 8,
        shadowColor: '#eee',
        shadowOffset: {width: 2, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.6,
        borderRadius: 20
    },
    titleContainerLandscape: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 16,
        marginBottom: 10
    },
    titleInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    inputContainerLandscape: {
        flex: 1,
        paddingLeft: 20
    }
});

export default NewPlaceScreen;