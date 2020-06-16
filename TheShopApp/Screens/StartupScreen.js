import React, {useEffect} from 'react';
import {AsyncStorage, ActivityIndicator, View, StyleSheet} from 'react-native';
import colors from '../Constants/colors';

import { useDispatch} from 'react-redux';
import * as authActions from '../Store/Actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(()=> {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            const transformedData = JSON.parse(userData);

            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const { token, userId, expiryDate} = transformedData;

            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            props.navigation.navigate('Shop');
            dispatch(authActions.auto_signin(userId,token));
        }
        tryLogin();
    },[dispatch])
    return(
        <View style={styles.screen}>
            <ActivityIndicator size={"large"} color={colors.primaryColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex :1,
        justifyContent: "center",
        alignItems:"center"
    }
})

export default StartupScreen;