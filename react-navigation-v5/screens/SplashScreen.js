import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as Animatable from 'react-native-animatable';

const logoHeight = Dimensions.get("window").height * 0.28;

const SplashScreen = props => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
            <Animatable.Image
                animation="bounceIn"
                duration={2000}
                style={styles.logo} resizeMode="stretch" source={require('../assets/logo.png')} />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Text style={styles.title}>Stay connected with everyone!</Text>
            <Text style={styles.text}>SignIn with an account.</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={()=> {
                    props.navigation.navigate("SignIn");
                }} style={styles.signIn} activeOpacity={0.6}>
                    <Text style={styles.signInText}>Get Started</Text>
                    <MaterialIcons name="navigate-next" color='#fff' size={23} />
                </TouchableOpacity>
                
            </View>
        </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: "center",
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 50,
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
      flexDirection :'row',
      width: 150,
      height: 40,
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: '#009387',
      borderRadius: 50
  },
  signInText: {
      color: 'white',
  },
  button: {
      alignItems: "flex-end",
      marginTop: 10
  }
});

export default SplashScreen;
