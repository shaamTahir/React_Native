import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const Header = props =>{
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerText}> {props.title} </TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width : '100%',
        height : 95,
        paddingTop : 36,
        backgroundColor : Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        color : 'white',
        fontSize : 23
    }
});

export default Header;