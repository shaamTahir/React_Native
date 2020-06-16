import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const CartItem = props => {
    return(
        <View style={styles.cartItem}>
            <View style={{...styles.itemData, ...styles.overFlow1}}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>

            <View style={{...styles.itemData, ...styles.overFlow2}}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === "android" ? 'md-trash' : 'ios-trash'} 
                        size={23} color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem:{

        padding :10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 4
    },
    itemData: {
        flexDirection: 'row',
        alignItems: "center",
    },
    overFlow1: {
        width: '70%'
    },
    overFlow2: {
        width: '30%',
        justifyContent:"flex-end"
    },
    quantity: {
        fontFamily: 'open-sans-bold',
        color: '#888',
        fontSize: 16,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,

    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;