import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/action/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(()=> {
        const tryLogin = async()=> {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                props.navigation.navigate("Auth");
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token , userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate("Auth");
                return;
            }

            dispatch(authActions.auto_login(token,userId));
            props.navigation.navigate("Shop");
        }
        tryLogin();
    },[dispatch]);
    
    return(
        <View style={styles.centered}>
            <ActivityIndicator color={Colors.primaryColor} size={"large"} />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default StartupScreen;