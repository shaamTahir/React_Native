import React from 'react';
import {View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet} from 'react-native';

const CategoryGridTitle = props => {

    let TheResponse = TouchableOpacity;
    if (Platform.OS === 'android') {
        TheResponse = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
        <TheResponse style={{flex :1}}
        onPress={props.onTap} >
            <View style={{...styles.container,...{backgroundColor: props.color}}}>
                <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
            </View>
        </TheResponse>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem : {
        flex: 1,
        margin : 15,
        height: 150,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset : {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
        borderRadius: 10,
        overflow : Platform.OS === 'android' ? "hidden" : 'visible'
    },
    container: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        justifyContent : "flex-end",
        alignItems: "flex-end"
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 19,
        textAlign: "right"
    }
});

export default CategoryGridTitle;