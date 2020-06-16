import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const MainButton = props => {
    return(
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={props.onPress} useForeground>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {props.children}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: "center"
    }
});

export default MainButton;