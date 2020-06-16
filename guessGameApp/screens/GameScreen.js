import React , { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from "../components/BodyText";
import Colors from '../constants/Colors';

const generateRandomBetween = (min, max, exclude)=> {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max- min)) + min ;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);        
    }
    else{
        return randomNumber;
    }

};

const listItems =(value, index) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{index}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props =>{

    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
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

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(()=>{
        if (currentGuess === userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || 
        (direction === 'greater' && currentGuess > props.userChoice)) 
        {
            Alert.alert('Don\'t lie', 'You know that this is wrong hint.',
            [{title : "Sorry!", style :"cancel"}
            ]);

            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses=> [nextNumber, ...pastGuesses]);
    }

    if (availableHeight < 500) {
        return (
            <View style={styles.screen}>
                <TitleText style={styles.title}>Opponent's Guess</TitleText>

                <View style={styles.landscapeStyles}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
                </View>

                <View style={styles.list}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {pastGuesses.map((guess, index) => listItems(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>Opponent's Guess</TitleText>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
            </Card>

            <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {pastGuesses.map((guess, index) => listItems(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        padding : 12,
        alignItems : 'center'
    },
    buttonContainer: {
        flexDirection :"row",
        justifyContent  :'space-around',
        marginTop : Dimensions.get("window").height  > 600 ? 20 : 5,
        marginBottom : 20,
        width  : 300,
        maxWidth :'80%'
    },
    title: {
        marginVertical : 8,
        fontSize  :17
    },
    list  :{ 
        width  : Dimensions.get("window").width  > 350 ? '75%' : '80%',
        flex:1
    },
    listItem :  {
        borderColor  : Colors.primaryColor,
        borderWidth : 1,
        marginVertical : 3,
        padding: 8,
        paddingHorizontal : 16,
        borderRadius  : 15,
        flexDirection : "row",
        justifyContent  : "space-between"
    },
    landscapeStyles : {
        flexDirection : "row",
        alignItems  :"center",
        width : '80%',
        justifyContent :"space-around"
    }

});

export default GameScreen;