import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const MainButton = props => {
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
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: "center"

    }
});

export default MainButton;