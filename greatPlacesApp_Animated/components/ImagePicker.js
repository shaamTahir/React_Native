import React, {useState} from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';

import Colors from '../constants/Colors';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
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
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing :true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.imagePreview} onPress={takeImageHandler} activeOpacity={0.6}>
            {!pickedImage ? <Text style={styles.fallbackText}>No Image selected yet.</Text>
            : <Image style={styles.image} source={{uri: pickedImage}} />}
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
            {/* <Button title="Take Image" color={Colors.maroonColor} onPress={takeImageHandler} /> */}
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={takeImageHandler}>
                <Text style={styles.buttonText}>Take Image</Text>
                <Animatable.View animation="jello" iterationCount={15} direction="alternate">
                    <Entypo name="image" size={20} color={'#fff'} />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    </View>
  );
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
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: "center",
        color: Colors.backgroundColor
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        width: '50%',
    },
    button: {
        flexDirection :"row",
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
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

export default ImgPicker;