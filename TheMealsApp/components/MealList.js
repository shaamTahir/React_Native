import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import MealItem from '../components/MealItem';

import {useSelector} from 'react-redux';

const MealList = props => {
    const favouriteMeals_store = useSelector(state=> state.meals.favouriteMeals);
    const renderedItemList = itemdata => {
        const isFavouriteMeal = favouriteMeals_store.some(meal=> meal.id === itemdata.item.id);
        return(
            <MealItem 
            title={itemdata.item.title}
            image={itemdata.item.imageUrl}
            duration={itemdata.item.duration}
            complexity={itemdata.item.complexity}
            affordability={itemdata.item.affordability}

            onSelectMeal={()=> {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        categoryID: itemdata.item.id,
                        mealTitle: itemdata.item.title,
                        isFav: isFavouriteMeal
                    }
                })
            }}
                    
            />
        );
    }

    return (
        <View style={styles.list}>
        <FlatList data={props.displayedMeals} 
            renderItem={renderedItemList} 
            keyExtractor={(item, index)=> item.id}
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    }
});

export default MealList;