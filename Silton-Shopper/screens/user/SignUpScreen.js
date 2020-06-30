import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import {Feather, FontAwesome} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';

import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/UI/CustomButton';
import * as authActions from '../../store/action/auth';

const SignUpScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        showEmailCheck: false,
        showPasswordCheck: false,
        showConfirmPasswordCheck: false,
        secureTextEntry: true,
        secureTextEntry_confirm: true,
        //validities
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        //passwordMatched
        isPasswordMatch: true
    })

    //Email
    const emailChecker = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTextChangeHandler = (text) => {
        if (emailChecker.test(text)) {
            setData({
                ...data,
                email: text,
                showEmailCheck: true,
                isValidEmail: true
            });
        }
        else{
            setData({
                ...data,
                email: text,
                showEmailCheck: false
            })
        }
    }

    const isValidEmailHandler = (text) => {
        if (emailChecker.test(text)) {
            setData({
                ...data,
                isValidEmail: true
            });
        }
        else{
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    //password
    const passwordCheck = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordTextChangeHandler = (text) => {
        if (passwordCheck.test(text)) {
            setData({
                ...data,
                password: text,
                showPasswordCheck: true,
                isValidPassword: true
            });
        }
        else{
            setData({
                ...data,
                password: text,
                showPasswordCheck: false,
            })
        }
    }

    const isValidPasswordHandler = (text) => {
        if (passwordCheck.test(text)) {
            setData({
                ...data,
                isValidPassword: true
            });
        }
        else{
            setData({
                ...data,
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

    //Confirm password
    const confirmPasswordTextChangeHandler = (text) => {
        if (passwordCheck.test(text)) {
            setData({
                ...data,
                confirmPassword: text,
                showConfirmPasswordCheck: true,
                isValidConfirmPassword: true
            });
        }
        else{
            setData({
                ...data,
                confirmPassword: text,
                showConfirmPasswordCheck: false,
            })
        }
    }

    const isValidConfirmPasswordHandler = (text) => {
        if (passwordCheck.test(text)) {
            setData({
                ...data,
                isValidConfirmPassword: true
            });
        }
        else{
            setData({
                ...data,
                isValidConfirmPassword: false
            })
        }
    }

    const secureTextEntry_confirmHandler = () => {
        setData({
            ...data,
            secureTextEntry_confirm: !data.secureTextEntry_confirm
        })
    }

    //check if Password Matched
    const passwordChecker = () => {
        setData({
            ...data,
            isPasswordMatch: false
        });
        setTimeout(() => {
          setData({
              ...data,
              isPasswordMatch: true
          })
        }, 1500)
      };

    //signUpHandler
    const signUpHandler = async() => {
        if (!data.showEmailCheck || !data.showPasswordCheck || !data.showConfirmPasswordCheck) {
            setData({
                ...data,
                isValidEmail: data.showEmailCheck ? true : false,
                isValidPassword: data.showPasswordCheck ? true : false,
                isValidConfirmPassword: data.showConfirmPasswordCheck ? true : false,
            });
            return;
        }
        else if (data.password !== data.confirmPassword) {
            passwordChecker();
            return
        }
        else{
            setError(null);
            setIsLoading(true);
            try {
                await dispatch(authActions.signup(data.email,data.password));
                props.navigation.navigate('SignIn', {
                    accountCreated: data.email
                })
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
    }

    //Awesome Alert
    const [awesomeAlert, setAwesomeAlert] = useState(false);

    const showAlert =useCallback(() => {
        setAwesomeAlert(true);
    });
         
    const hideAlert = () => {
        setAwesomeAlert(false);
    };

    //error Handling
    useEffect(()=> {
        if (error) {
            // Alert.alert("Something went wrong!", error, [{
            //     text: "Okay" , style: "cancel"
            // }])
            showAlert();
        }
    },[error])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Register Now!</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig" >
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user-o" color={Colors.primaryColor} size={18} />
                    <TextInput 
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.textInput}
                    value={data.email}
                    onChangeText={emailTextChangeHandler}
                    onEndEditing={e=> isValidEmailHandler(e.nativeEvent.text)} />
                    {data.showEmailCheck ? 
                    (<Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color={Colors.primaryColor} size={18} />
                    </Animatable.View>)
                    : null }
                </View>
                {data.isValidEmail ? null
                : <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorText}>Enter a valid email address.</Text>
                </Animatable.View>
                }

                {/* Password */}
                <Text style={{...styles.label, ...{marginTop: 30}}}>Password</Text>
                <View style={styles.inputContainer}>
                    <Feather name="lock" color={Colors.primaryColor} size={18} />
                    <TextInput 
                    placeholder="Enter password"
                    autoCapitalize="none"
                    keyboardType= "default"
                    secureTextEntry={data.secureTextEntry}
                    style={styles.textInput}
                    value={data.password}
                    onChangeText={passwordTextChangeHandler}
                    onEndEditing={e=> isValidPasswordHandler(e.nativeEvent.text)} />
                    <TouchableOpacity onPress={secureTextEntryHandler}>
                        {data.secureTextEntry ? 
                        <Feather name="eye-off" color={Colors.primaryColor} size={18} />
                        : <Feather name="eye" color={Colors.primaryColor} size={18} />}
                        </TouchableOpacity>
                </View>
                {data.isValidPassword ? null
                : <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorText}>Minimum 8 character password with at least a symbol, upper and lower case letters and a number.</Text>
                </Animatable.View>
                }

                {/* Confirm Password */}
                <Text style={{...styles.label, ...{marginTop: 30}}}>Confirm Passsord</Text>
                <View style={styles.inputContainer}>
                    <Feather name="lock" color={Colors.primaryColor} size={18} />
                    <TextInput 
                    placeholder="Re-enter password"
                    autoCapitalize="none"
                    keyboardType= "default"
                    secureTextEntry={data.secureTextEntry_confirm}
                    style={styles.textInput}
                    value={data.confirmPassword}
                    onChangeText={confirmPasswordTextChangeHandler}
                    onEndEditing={e=> isValidConfirmPasswordHandler(e.nativeEvent.text)} />
                    <TouchableOpacity onPress={secureTextEntry_confirmHandler}>
                        {data.secureTextEntry_confirm ? 
                        <Feather name="eye-off" color={Colors.primaryColor} size={18} />
                        : <Feather name="eye" color={Colors.primaryColor} size={18} />}
                        </TouchableOpacity>
                </View>
                {data.isValidConfirmPassword ? null
                : <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorText}>Minimum 8 character password with at least a symbol, upper and lower case letters and a number.</Text>
                </Animatable.View>
                }

                {data.isPasswordMatch ? null
                : <Animatable.View animation="flash" duration={500}>
                    <Text style={{...styles.errorText,...{textAlign: "center", paddingTop: 10}}}>Password did'nt Match.</Text>
                </Animatable.View>
                }

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {isLoading ? <ActivityIndicator color={Colors.buttonColor1} size={"large"} />
                    :(<CustomButton onPress={signUpHandler} style={styles.button}>
                        <Text style={styles.signInText}>Sign UP</Text>
                    </CustomButton>)}
                    <TouchableOpacity activeOpacity={0.6} style={{...styles.button,...styles.signUpButtonDecoration}} onPress={()=> {
                        props.navigation.navigate("SignIn")
                    }}>
                        <Text style={styles.signUpText}>Sign IN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </Animatable.View>

            {/* Awesome Alert */}
            <AwesomeAlert confirmButtonStyle={styles.awesomeConfirmButtonStyle}
                messageStyle={styles.awesomeMessageStyle}
                show={awesomeAlert}
                showProgress={false}
                title="Something went wrong!"
                message={error}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Okay"
                confirmButtonColor= {Colors.buttonColor1}
                onConfirmPressed={() => {
                    hideAlert();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10
    },
    footer: {
        flex: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: "bold"
    },
    label: {
        color: Colors.primaryColor,
        fontSize: 18
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: 10,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#05375a'
    },
    buttonContainer :{
        marginTop: 40,
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: Dimensions.get("window").width * 0.88,
        borderRadius: 10
    },
    signInText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: "bold"
    },
    signUpText: {
        fontSize: 18,
        color: Colors.buttonColor1,
        fontWeight: "bold"
    },
    signUpButtonDecoration: {
        marginTop: 15,
        borderColor: Colors.buttonColor1,
        borderWidth: 1
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    },
    awesomeMessageStyle:{
        textAlign: 'center'
    },
    awesomeConfirmButtonStyle: {
        height: 40, 
        width: 100, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default SignUpScreen;