import React from 'react';
import {View, Text, StyleSheet , TouchableOpacity} from 'react-native';

const GoalItem = (props) => {
    return ( 
        <TouchableOpacity activeOpacity={0.5} onPress={props.onDelete.bind(this, props.id)} > 
            <View style={styles.listItems}>
            <Text> {props.title} </Text> 
            </View> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItems : {
        padding: 10,
        marginTop : 10,
        backgroundColor : '#ccc',
        borderColor : 'black',
        borderRadius: 6 ,
        
      }
});

export default GoalItem;

