import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import * as Animatable from 'react-native-animatable';

const SignInScreen = props => {
    const [data, setData] = useState({
        email: '',
        password: '',
        checkTextInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    });
    const emailChangeTextHandler = text => {
        if (text.trim().length >= 4) {
            setData({
                ...data,
                email: text,
                checkTextInputChange: true,
                isValidUser :true
            });
        }
        else{
            setData({
                ...data,
                email: text,
                checkTextInputChange: false,
            });
        }
    }

    const passwordChangeHandler = text => {
        if (text.trim().length >= 4) {
            setData({
                ...data,
                password: text,
                isValidPassword: true
            })
        }
        else{
            setData({
                ...data,
                password: text,
                isValidPassword: false
            })
        }

    }

    const secureTextEntryHandler = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const isValidUserHandler = (text) =>{ 
        if (text.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            })
        }
        else{
            setData({
                ...data,
                isValidUser: false
            })
        }
    }

    const isValidPasswordHandler = (text) =>{ 
        if (text.trim().length >= 8) {
            setData({
                ...data,
                isValidPassword: true
            })
        }
        else{
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>

          {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
            <FontAwesome name="user-o" color='#05375a' size={18} />
            <TextInput 
            placeholder="Enter Email"
            style={styles.textInput}
            autoCapitalize="none"
            value= {data.email}
            onChangeText={emailChangeTextHandler}
            onEndEditing={e=> isValidUserHandler(e.nativeEvent.text)} />
            {data.checkTextInputChange ? 
            <Animatable.View animation="bounceIn">
                <Feather name="check-circle" size={18} color='green' />
            </Animatable.View>
            : null}
        </View>
        {data.isValidUser ? null
            : <Animatable.View animation={"fadeInLeft"} duration={500}>
                   <Text style={styles.errorText}>UserName must be 4 characters long</Text>
            </Animatable.View>
        }

        {/* Password */}
        <Text style={{...styles.label, ...{marginTop: 30}}}>Password</Text>
        <View style={styles.inputContainer}>
            <Feather name="lock" color='#05375a' size={18} />
            <TextInput 
            placeholder="Enter Password"
            style={styles.textInput}
            autoCapitalize="none" 
            secureTextEntry={data.secureTextEntry ? true : false} 
            value={data.password}
            onChangeText={passwordChangeHandler}
            onEndEditing={e=> isValidPasswordHandler(e.nativeEvent.text)} />
            <TouchableOpacity onPress={secureTextEntryHandler}>
                {data.secureTextEntry ? <Feather name="eye-off" size={18} color='green' />
                : (<Feather name="eye" size={18} color='green' />)
                }
            </TouchableOpacity>
        </View>
        {data.isValidPassword ? null
            : <Animatable.View animation={"fadeInLeft"} duration={500}>
                   <Text style={styles.errorText}>Password must be 4 characters long</Text>
            </Animatable.View>
        }


        {/* Buttons */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity  style={{...styles.button, ...styles.signInButtonDecoration}} activeOpacity={0.6}>
                <Text style={styles.signInText}>Sign IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> props.navigation.navigate("SignUp")}
              style={{...styles.button, ...styles.signOutButtonDecoration}} activeOpacity={0.6}>
                <Text style={styles.signOutText}>Sign Up</Text>
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
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  headerText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  },
  label: {
      color: '#05375a',
      fontSize: 18
  },
  inputContainer: {
      flexDirection: 'row',
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 1,
      marginTop: 10,
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -6,
      paddingLeft: 10,
      color: '#05375a'
  },
  buttonContainer: {
      marginTop: 50,
      alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  signInText: {
      fontSize: 18,
      fontWeight: "bold",
      color: '#fff'
  },
  signOutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#009387'
  },
  signInButtonDecoration: {
      backgroundColor: "#009387"
  },
  signOutButtonDecoration: {
      backgroundColor: '#fff',
      borderColor: '#009387',
      borderWidth: 1,
      marginTop: 15
   },
   errorText: {
       color: 'red',
       paddingTop: 5
   }
});

export default SignInScreen;
