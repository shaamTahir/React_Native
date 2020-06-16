import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const SecondaryButton = props => {
    return(
            <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {props.children}
                    </Text>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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