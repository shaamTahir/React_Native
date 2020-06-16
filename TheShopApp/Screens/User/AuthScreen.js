import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {View, Text, ScrollView, Dimensions, Button, KeyboardAvoidingView, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Input from '../../Components/UI/Input';
import colors from '../../Constants/colors';

import {useDispatch} from 'react-redux';
import * as authActions from '../../Store/Actions/auth';

//1
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};
//

const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get("window").height);
    useEffect(()=> {
        const updateLayout = () => {
            setAvailableHeight(Dimensions.get("window").height);
        }
        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    })
    //2
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
      });
    //

    const authHandler = async() => {
        Keyboard.dismiss();
        setIsLoading(true);
        setError(null);
        try{
            if (isSignUp) {
                await dispatch(authActions.sign_up(formState.inputValues.email, formState.inputValues.password))
            }
            else{
                await dispatch(authActions.log_in(formState.inputValues.email, formState.inputValues.password))
            }

            props.navigation.navigate("Shop");
        } catch (err) {
            setError(err.message);
            setIsLoading(false);

        }
    }

    //3
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
    //

    useEffect(()=> {
        if (error) {
            Alert.alert("Something went wrong!", error, [{text: "Okay", style: "cancel"}]);
        }
    },[error])

    if (availableHeight < 500) {
        return (
            <ScrollView>
            <View style={styles.screen_landscape}>
                <View style={styles.authContainer_landscape}>
                    <Input 
                    id="email"
                    label= "E-Mail"
                    keyboardType = "email-address"
                    required
                    email
                    autoCapitalize = "none"
                    errorText = "Please enter a valid email address."
                    onInputChange = {inputChangeHandler}
                    initialValue = ""
                />
                <Input 
                    id="password"
                    label= "Password"
                    keyboardType = "default"
                    secureTextEntry
                    required
                    minLength = {5}
                    autoCapitalize = "none"
                    errorText = "Please enter a valid password."
                    onInputChange = {inputChangeHandler}
                    initialValue = ""
                />
                <View style={styles.buttonContainer}>
                    {
                        isLoading ? <ActivityIndicator size={"small"} color={colors.primaryColor} />
                    
                    : <Button title={isSignUp ? "Signup" : "Login"} color={colors.primaryColor} onPress={authHandler} />
                    }
                    </View>
                <View style={styles.buttonContainer}>
                    <Button title= {`Switch to ${isSignUp ? 'Login' : 'Signup'}`} color={colors.secondaryColor} onPress={()=> {
                        setIsSignUp(previousState => !previousState)
                    }} />
                </View>
                </View>
            </View>
            </ScrollView>

        )
    }

    return(
        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
        }} > 
        <KeyboardAvoidingView style={styles.screen} >
            {/* <LinearGradient colors= {["#ffedff", '#ffe3ff']} style={styles.gradient}> */}
            <View style={styles.authContainer}>
                
                    <Input 
                        id="email"
                        label= "E-Mail"
                        keyboardType = "email-address"
                        required
                        email
                        autoCapitalize = "none"
                        errorText = "Please enter a valid email address."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""
                    />
                    <Input 
                        id="password"
                        label= "Password"
                        keyboardType = "default"
                        secureTextEntry
                        required
                        minLength = {5}
                        autoCapitalize = "none"
                        errorText = "Please enter a valid password."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""
                    />
                    <View style={styles.buttonContainer}>
                        {
                            isLoading ? <ActivityIndicator size={"small"} color={colors.primaryColor} />
                        
                        : <Button title={isSignUp ? "Signup" : "Login"} color={colors.primaryColor} onPress={authHandler} />
                        }
                        </View>
                    <View style={styles.buttonContainer}>
                        <Button title= {`Switch to ${isSignUp ? 'Login' : 'Signup'}`} color={colors.secondaryColor} onPress={()=> {
                            setIsSignUp(previousState => !previousState)
                        }} />
                    </View>
                
            </View>
            {/* </LinearGradient> */}
        </KeyboardAvoidingView>
         </TouchableWithoutFeedback> 
    );
}

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    screen_landscape: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '85%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: {height:0, width: 2},
        shadowRadius: 0.26,
        borderRadius: 20,
    },
    authContainer_landscape: {
        width: '70%',
        maxWidth: 350,
        maxHeight: 500,
        padding: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: {height:0, width: 2},
        shadowRadius: 0.26,
        borderRadius: 20,
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;