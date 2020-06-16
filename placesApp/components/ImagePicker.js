import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet} from 'react-native';

import * as imagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import SecondaryButton from '../components/SecondaryButton';

import Colors from '../constants/Colors';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert("Insufficient Permissions", "You must need to grant permissions in order to use this app.",[{
                text: "Okay", style: "cancel"
            }]);
            return false;
        }
        return true;
    }
    const takeImageHandler = async() => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        const image = await imagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        // console.log(image);
        setPickedImage(image.uri);
        props.onImageTaken(image.uri)
    }

    return(
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (<Text style={styles.fallbackText}>No Image selected yet.</Text>)
                : (<Image style={styles.image} source={{uri: pickedImage}} />) }
            </View>
            <View style={styles.button}>
                <SecondaryButton onPress={takeImageHandler}>Take Image</SecondaryButton>
                {/* <Button title="Take Image" color={Colors.primaryColor} onPress={takeImageHandler} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: "center"
    },
    fallbackText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: "center",
    },
    image: {
        width: '100%',
        height: '100%'
    },
    button: {
        width: '60%'
    }
})

export default ImgPicker;