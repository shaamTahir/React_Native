import React, {useState, useEffect} from 'react';
import { View, Button, Dimensions, StyleSheet, TouchableWithoutFeedback , Keyboard, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonLayout, setButtonLayout] = useState(Dimensions.get("window").width / 4);

    useEffect(()=> {
        const updateLayout = ()  => {
            setButtonLayout(Dimensions.get("window").width / 4);
        }
        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    });

    const numberInputHandler = text =>{
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >99) {
            Alert.alert('Invalid Number!', 'You have to choose a Number between 1 & 99.', 
            [{text: 'ok', style : "destructive", onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => {props.onStartGame(selectedNumber)}} >
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{padding: 10}}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss(); 
        }}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input underlineColorAndroid="transparent" style={styles.input} 
                    blurOnSubmit autoCapitalize="none" autoCorrect={false} 
                    keyboardType="number-pad" maxLength={2}
                    onChangeText = {numberInputHandler} value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={{width : buttonLayout}}>
                        <Button title='Reset' color={Colors.secondaryColor} onPress={resetInputHandler} />
                    </View>
                    <View style={{width : buttonLayout}}>
                        <Button title='Confirm' color={Colors.primaryColor} onPress={confirmInputHandler} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView> 
    );
}

const styles = StyleSheet.create({
    screen :{
        flex: 1,
        padding: 12,
        alignItems: "center"
    },
    title :{
        fontSize : 17,
        marginVertical: 10
    },
    inputContainer:{
        width : '80%',
        minWidth: 300,
        maxWidth  :'95%',
        alignItems  :"center",
        marginTop  : 5
    },
    buttonContainer: {
        flexDirection : "row",
        width: '100%',
        paddingHorizontal : 15,
        justifyContent : "space-between"
    },
    // button :{
    //     // width : 90
    //     width  : Dimensions.get("window").width / 4
    // },
    input :{
        width : 50,
        textAlign  : "center"
    },
    summaryContainer : {
        marginTop : 20,
        alignItems : "center"
    }
});

export default StartGameScreen;