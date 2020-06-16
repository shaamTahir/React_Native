import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, Dimensions} from 'react-native';



const ProductItem = props => {
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
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android') {
        TouchableComponent = TouchableNativeFeedback
    }

    if (availableHeight< 500) {
        return(
            <View style={styles.productLandscape}>
            <View style={styles.touchableContainer}>
            <TouchableComponent activeOpacity={0.6} onPress={props.onSelect} useForeground>
                <View style={styles.rowLandscape}>
                    <View style={styles.imageContainerLandscape}>
                        <Image style={styles.image} source={{uri: props.image}} />
                    </View>
                    <View style={styles.detailContainerLandscape}>
                        <View style={styles.detailsLandscape}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actionsLandscape}>
                            {props.children}
                        </View>
                    </View>
                </View>
            </TouchableComponent> 
            </View>
            </View>
        )
    }
    return(
        <View style={styles.product}>
        <View style={styles.touchableContainer}>
        <TouchableComponent activeOpacity={0.6} onPress={props.onSelect} useForeground>
            <View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.image}} />
                </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>

            </View>
        </TouchableComponent> 
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        elevation: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    productLandscape: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2},
        elevation: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 250,
        margin: 20
    },
    touchableContainer: {
        borderRadius: 10,
        overflow: "hidden"
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    image:{
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: "center",
        height: '15%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: '25%',
        paddingHorizontal: 20
    },
    rowLandscape: {
        flexDirection: "row",
        width: '100%',
        height: '100%'
    },
    imageContainerLandscape: {
        width: '60%',
        height: '100%',
        borderTopLeftRadius: 10,
        overflow: "hidden"
    },
    detailContainerLandscape: {
        width: '40%',
        height: '100%',
        alignItems: "center",
        marginVertical: 20
    },
    detailsLandscape: {
        alignItems: "center",
        height: '60%',
        padding: 10
    },
    actionsLandscape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: '40%',
        paddingVertical: 20,
        width: '100%'
    }
});

export default ProductItem;