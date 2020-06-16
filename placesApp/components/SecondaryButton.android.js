import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const SecondaryButton = props => {
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
        borderRadius: 15,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 15,
        textAlign: "center"
    }
});

export default SecondaryButton;