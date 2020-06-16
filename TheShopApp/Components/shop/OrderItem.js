import React , { useState} from 'react';
import {View , Text, Button, StyleSheet} from 'react-native';
import CartItem from '../shop/CartItem';
import colors from '../../Constants/colors';


const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetails ? "Hide Details" : "Show Details"} color={colors.primaryColor} 
                onPress={()=> setShowDetails(previousState => !previousState)}
            />
            <View style={styles.showTheDetails}>
            {showDetails && props.item.map(orderItem => 
                <CartItem 
                    key={orderItem.productId}
                    quantity={orderItem.quantity}
                    title={orderItem.productTitle}
                    amount={orderItem.sum}
                />
            )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        elevation: 8,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
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
        width: '100%'
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date:  {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    }
});

export default OrderItem;