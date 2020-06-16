import React , { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Button, Modal} from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
    //calling on textInput, on every key stroke 
    const inputHandler = (text) => {
        setEnteredGoal(text);
    }

    const onAddGHoalHandler =() =>{
      props.onAddGoal(enteredGoal);
      setEnteredGoal('');
    }

    return (
      <Modal visible={props.visible} animationType={"slide"}>
        <View style= {styles.inputView} >
          <TextInput placeholder="Add Your Course Goals...."
            style={styles.input}  onChangeText= {inputHandler} value={enteredGoal} />
              <View style={styles.btnOn1Line}>
                <View style={styles.btnStyles}>
                  <Button title="Cancel" color='red'
                    onPress={props.onCancel}
                  />
                </View>

                <View style={styles.btnStyles}>
                  <Button title="ADD Goals" color='#0D98BA'
                    onPress={onAddGHoalHandler}
                  />
                </View>
              </View>
        </View> 
      </Modal>
    );
}

const styles = StyleSheet.create({
    inputView : {
        flex: 1,
        justifyContent : "center",
        alignContent: "center"
    },
    input : {
      alignSelf: "center",
      width : "80%" ,
      padding: 7 , 
      borderColor: 'darkcyan', 
      borderRightColor : 'blue',
      borderWidth: 1,
      borderRadius  :7,
      marginBottom  :3
    },
    btnStyles :{
      width : '50%',
      alignSelf  :"center",
      marginTop  : 5,
    },
});

export default GoalInput;