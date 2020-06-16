import React from 'react';
import {View, StyleSheet} from 'react-native';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

//redux
import { useSelector } from 'react-redux';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FavouritesScreen = props => {
    const favMeals = useSelector(state=> state.meals.favouriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return(
            <View style={styles.emptyFavText}>
                <DefaultText>No favourite meals found. Start adding some!</DefaultText>
            </View>
        );
    }
    return (
        <MealList displayedMeals={favMeals} navigation={props.navigation} />
    );
}

FavouritesScreen.navigationOptions = (navProps) => {
    return{
    headerTitle : 'Your Favourites',
    headerLeft : ()=> (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-menu' title='iconBar' onPress={()=> navProps.navigation.toggleDrawer()} />
    </HeaderButtons>
    )}
};

const styles = StyleSheet.create({
    emptyFavText:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default FavouritesScreen;