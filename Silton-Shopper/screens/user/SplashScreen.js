import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/UI/CustomButton';

const logoHeight = Dimensions.get("window").height * 0.28;

const SplashScreen = props => {
    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Animatable.Image 
                animation="bounceIn"
                duration={2000}
                style={styles.logo}
                resizeMode={"stretch"}
                source={require('../../assets/logo.png')} />
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.title}>Stay Connected!</Text>
                <Text style={styles.text}>SignIn with an account.</Text>
                <View style={styles.button}>
                    <CustomButton style={styles.signIn} elevation={styles.elevation} onPress={()=> {
                        props.navigation.navigate('SignIn');
                    }}>
                        <Text style={styles.signInText}>Get Started</Text>
                        <MaterialIcons name="navigate-next" color='#fff' size={23} />
                    </CustomButton>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    header: {
        flex: 2,
        justifyContent :"center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    logo: {
        width: logoHeight,
        height: logoHeight
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold"
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    signIn: {
        flexDirection: "row",
        width: 150,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    signInText: {
        color: 'white',
    },
    button: {
        marginTop: 20,
        alignItems: "flex-end"
    },
    elevation: {
        elevation: 4,
        borderRadius: 50
    }
});

export default SplashScreen;