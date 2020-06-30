import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

const CustomButton = props => {
    let Touchable = TouchableOpacity;
    if (Platform.OS === "android") {
        Touchable = TouchableNativeFeedback
    }
    return(
        <View style={styles.container}>
            <View style={{...styles.touchableStyles, ...props.elevation}}>
                <Touchable activeOpacity={0.6} onPress={props.onPress} >
                    <LinearGradient colors={[Colors.buttonColor1, Colors.buttonColor2]} style={props.style}>
                        {props.children}
                    </LinearGradient>
                </Touchable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        borderRadius: 10,
        backgroundColor: 'white',
    },
    touchableStyles :{
        overflow: "hidden",
        borderRadius: 10
    }
})

export default CustomButton;