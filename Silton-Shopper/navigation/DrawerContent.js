import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {MaterialCommunityIcons, Feather} from '@expo/vector-icons';
import {Text, TouchableRipple} from 'react-native-paper';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/action/auth';
import Colors from '../constants/Colors';

let productsColor= Colors.primaryColor;
let ordersColor= 'gray';
let adminColor= 'gray';

const ColorChanger = (pcolor, oColor, aColor) => {
    productsColor = pcolor;
    ordersColor = oColor;
    adminColor = aColor
}

const DrawerContent = props => {
    const dispatch = useDispatch();
    
    return(
        <View style={styles.screen} >
            <View style={styles.screen}  {...props}> 
                {/* Avatar */}
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/drawerImage.jpg')} 
                    style={styles.image}  />
                </View>
            {/* Drawer Navigation */}
                <TouchableRipple onPress={()=> {
                    ColorChanger(Colors.primaryColor, "gray", "gray");
                    props.navigation.navigate('Products');
                }}>
                    <View style={styles.preference}>
                        <Text style={{...styles.label, ...{color: productsColor}}}>Products</Text>
                        <Feather name="shopping-cart" color={productsColor} size={23} />
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=> {
                    ColorChanger("gray", Colors.primaryColor, "gray");
                    props.navigation.navigate('Orders');
                }}>
                    <View style={styles.preference}>
                        <Text style={{...styles.label, ...{color: ordersColor}}}>Orders</Text>
                        <Feather name="list" color={ordersColor} size={23} />
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=> {
                    ColorChanger("gray", "gray", Colors.primaryColor);
                    props.navigation.navigate('Admin');
                }}>
                    <View style={styles.preference}>
                        <Text style={{...styles.label, ...{color: adminColor}}}>Admin</Text>
                        <Feather name="user" color={adminColor} size={23} />
                    </View>
                </TouchableRipple>
            </View>
            <TouchableRipple onPress={()=> {
                dispatch(authActions.log_out());
                props.navigation.navigate('Auth');
            }}>
                <View style={styles.preference}>
                    <Text style={{...styles.label, ...{color: 'red'}}}>SignOut</Text>
                    <MaterialCommunityIcons name="exit-to-app" color={'red'} size={23} />
                </View>
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 200
    },
    image: {
        width: '100%',
        height: '100%'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 15,
        lineHeight: 16,
    }
});

export default DrawerContent;