import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';

import DefaultText from './DefaultText';

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
        <TouchableOpacity onPress={props.onSelectMeal} activeOpacity={0.7}>
            <View>

                <View style={{...styles.mealRow, ...styles.mealHeader}}>
                    <ImageBackground style={styles.bgImg} source={{uri: props.image}}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    </ImageBackground>
                </View>

                <View style={{...styles.mealRow, ...styles.mealDetails}}>
                    <DefaultText>{props.duration} min</DefaultText>
                    <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                </View>

            </View>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        overflow: "hidden",
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        borderStartWidth: 1,
        borderBottomWidth: 1,
    },
    mealRow: {
        flexDirection: "row"
    },
    mealHeader: {
        height: '88%'
    },
    mealDetails: {
        height: '12%',
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems :"center"
    },
    bgImg: {
        width: '100%',
        height: '100%',
        justifyContent: "flex-end"
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: "center",
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5,
    }
});

export default MealItem;