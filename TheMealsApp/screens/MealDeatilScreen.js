import React, {useEffect, useCallback} from 'react';
import {View, Text,Dimensions, ScrollView, Image, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';
import { toggle_favourite } from '../store/action/meal';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {Ionicons } from '@expo/vector-icons';

const ListItem = props => {
    return(
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}

const MealDetailScreen = props => {
    //catID ==== MealID
    const catID = props.navigation.getParam('categoryID');
    const availableItems = useSelector(state=> state.meals.meals);
    const selectedItem = availableItems.find(cat => cat.id === catID);
    const iscurrentMealFavourite = useSelector(state=> state.meals.favouriteMeals.some(meal=> meal.id === catID));

    const dispatch = useDispatch();
    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggle_favourite(catID));
    },[dispatch, catID]);

    useEffect(()=> {
        props.navigation.setParams({toggleFavourite: toggleFavouriteHandler})
    },[toggleFavouriteHandler]);

    useEffect(()=> {
        props.navigation.setParams({isFav: iscurrentMealFavourite});
    },[iscurrentMealFavourite]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{uri: selectedItem.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedItem.duration} min</DefaultText>
                <DefaultText>{selectedItem.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedItem.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedItem.ingredients.map(ingredient => (
                <ListItem key={ingredient}><Ionicons name ='ios-checkmark' size={23} />  {ingredient}</ListItem>
            ))}

            <Text style={styles.title}>Steps</Text>
            {selectedItem.steps.map(step => (
                <ListItem key={step} ><Ionicons name ='ios-checkmark' size={23} />  {step}</ListItem>
            ))}

        </ScrollView>
    );
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const selectedItem = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFavourite');
    const isFavMeal = navigationData.navigation.getParam('isFav');

    return {
        headerTitle : selectedItem,
        headerTitleStyle : {width : Dimensions.get('window').width/ 1.5},
        headerRight : () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add To Fav' iconName={isFavMeal ? 'ios-star' : 'ios-star-outline'}
                onPress={toggleFav}
             />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: "center",
        marginTop: 5
    },
    listItem: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        marginVertical: 6,
        marginHorizontal: 10,
        elevation: 3,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10
       }
});

export default MealDetailScreen;