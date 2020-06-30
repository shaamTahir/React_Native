import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
const CartItem = props => {
    return(
        <View style={styles.cartItem}>
            <View style={{...styles.itemData, ...styles.overFlow1}}>
                <Text style={styles.quantity}>{props.quantity}    </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>

            <View style={{...styles.itemData, ...styles.overFlow2}}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <EvilIcons name='trash' 
                        size={26} color={Colors.buttonColor1}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem:{
        paddingVertical :10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 4,
        borderBottomColor: Colors.buttonColor2,
        borderBottomWidth: 1
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
        justifyContent:"flex-end",
        paddingBottom: 8
    },
    quantity: {
        color: Colors.buttonColor1,
        fontSize: 16,
    },
    title: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;