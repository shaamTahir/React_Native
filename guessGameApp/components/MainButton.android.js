import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = props =>  {
    return(
        <View style={styles.container} >
        <TouchableNativeFeedback activeOpacity={0.7} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    );
}

const styles= StyleSheet.create({
    container : {
        borderRadius : 20,
        overflow  : "hidden"
    },
    button  : {
        backgroundColor : Colors.primaryColor,
        paddingHorizontal  :30,
        paddingVertical : 12,
        borderRadius : 20
    },
    buttonText : {
        color : 'white',
        fontFamily: 'open-sans',
        fontSize : 18
    }
});

export default MainButton;