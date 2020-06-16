import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props =>{

    const [availableWidth, setAvailableWidth] = useState(Dimensions.get("window").width);
    useEffect(()=> {
        const updateLayout = () => {
            setAvailableWidth(Dimensions.get("window").width);
        }
        Dimensions.addEventListener("change",updateLayout);

        return () =>{ 
            Dimensions.removeEventListener("change", updateLayout);
        }
    })

    return (
        <ScrollView>
        <View style={styles.screen}>
            <TitleText style={styles.title}>The Game is Over!</TitleText>
            <View style={{width: availableWidth*0.7, height: availableWidth*0.7, overflow : "hidden", borderColor  :'black', borderWidth :3, borderRadius  : availableWidth*0.7 /2, marginVertical  : Dimensions.get("window").height/ 40}}>
                <Image source={require('../assets/success.png')} resizeMode={"cover"} style={styles.image} />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.summaryTextContainer}>Your phone took 
                 <Text style={styles.detailedOutputText}> {props.theNumOfRounds}
                 </Text> rounds to guess your number <Text style={styles.detailedOutputText}> 
                {props.theUserNumber}</Text>. 
            </BodyText>
            </View>
            
            <MainButton onPress={props.onRestart} >Start a New Game</MainButton>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent : "center",
        alignItems :"center",
        paddingVertical : Dimensions.get("window").height / 40
    },
    title :  {
        fontSize : 17
    },
    // imageContainer :  {
    //     width : Dimensions.get("window").width * 0.7,
    //     height : Dimensions.get("window").width * 0.7,
    //     borderRadius  : Dimensions.get("window").width * 0.7 / 2,
    //     borderColor  : 'black',
    //     borderWidth  :3,
    //     overflow  : "hidden",
    //     marginVertical : Dimensions.get("window").height / 40  
    // },
    image :  {
        width  :'100%',
        height  :'100%',
    },
    detailedOutputText  : {
        color  : Colors.secondaryColor,
        fontSize  : Dimensions.get("window").height < 400 ? 12 : 15,
        fontFamily  : 'open-sans-bold'
    },
    summaryTextContainer : {
        textAlign  : "center",
    },
    resultContainer : {
        marginHorizontal  : 30,
        marginVertical: Dimensions.get("window").height / 60
    }
    
});

export default GameOverScreen;