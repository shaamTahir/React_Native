import React from 'react';
import {View, StyleSheet} from 'react-native';

import {CATEGORIES} from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

//redux
import { useSelector } from 'react-redux';

const CategoryMealScreen = props => {
    const catID = props.navigation.getParam('categoryID');
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter(cat => cat.categoryIds.find(theid => theid === catID)) ;

    if (displayedMeals.length === 0) {
        return(
            <View style={styles.noContent}>
                <DefaultText>No meals found. Check your filters!</DefaultText>
            </View>
        );
    }
    return (
        <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
    );
}

CategoryMealScreen.navigationOptions = (navigationData) =>{
    const catid = navigationData.navigation.getParam('categoryID');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catid);

    return {
        headerTitle : selectedCategory.title,
    }
}

const styles = StyleSheet.create({
    noContent: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center"
    }
})

export default CategoryMealScreen;