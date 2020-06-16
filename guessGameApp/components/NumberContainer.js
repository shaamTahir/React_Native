import React from 'react';
import {View , Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';

const NumberContainer = props =>{
    return(
        <View style={styles.container}> 
            <TitleText style={styles.number}>{props.children}</TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth :2,
        borderColor : Colors.secondaryColor,
        borderTopRightRadius : 35,
        borderBottomLeftRadius : 35,
        padding  :10,
        marginVertical : 10,
        alignItems : "center",
        justifyContent  :"center"
    },
    number: {
        color : Colors.secondaryColor,
        fontSize : 22
    }
});

export default NumberContainer;