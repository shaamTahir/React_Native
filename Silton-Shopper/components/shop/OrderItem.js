import React, { useState} from 'react';
import {View , Text, StyleSheet} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import CartItem from './CartItem';

import * as Animatable from 'react-native-animatable';
import CustomButton from '../../components/UI/CustomButton';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return(
        <Animatable.View animation="bounceIn" style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <CustomButton style={styles.button} elevation={styles.elevation} onPress={()=> setShowDetails(previousState => !previousState)}>
                <Entypo name={showDetails ? "chevron-small-up" : "chevron-small-down"} color={'#fff'} size={23} />
                <Text style={styles.buttonText}>{showDetails ? "Hide Details" : "Show Details"}</Text>
                <Entypo name={showDetails ? "chevron-small-up" : "chevron-small-down"} color={'#fff'} size={23} />
             </CustomButton>
            <View  style={styles.showTheDetails}>
                {showDetails && props.item.map(orderItem => 
                    <CartItem 
                    key={orderItem.productId}
                    quantity={orderItem.quantity}
                    title={orderItem.productTitle}
                    amount={orderItem.sum}
                    />
                )}
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        elevation: 10,
        borderRadius: 10,
        backgroundColor: '#eee',
        margin: 20,
        padding: 10,
        alignItems: "center"
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 15
    },
    showTheDetails: {
        width: '100%',
        paddingBottom: 10
    },
    totalAmount: {
        fontSize: 16
    },
    date:  {
        fontSize: 16,
        color: '#888'
    },
    button: {
        flexDirection :'row',
        width: 200,
        height: 40,
        paddingHorizontal: 5,
        paddingVertical: 5,
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: "center",
        fontSize: 17,
        color: '#fff'
    },
    elevation: {
        elevation: 4
    }
});

export default OrderItem;