import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import CategoryGridTitle from '../components/CategoryGridTitle';
import {CATEGORIES} from '../data/dummy-data';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {

    const renderGridItem = (itemdata) => {
        return(
            <CategoryGridTitle onTap={()=>
                props.navigation.navigate({
                    routeName: 'CategoryMeal',
                    params: {
                        categoryID : itemdata.item.id
                    }
                })
                } 
                title = {itemdata.item.title} color={itemdata.item.color}
                />
        );
    }

    return (
        <FlatList showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES} 
        renderItem={renderGridItem} 
        numColumns={2} />
    );
}

CategoriesScreen.navigationOptions = (navProps) => {

    return{
    headerTitle : 'Meal Categories',
    headerLeft : ()=> (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-menu' title='iconBar' onPress={()=> navProps.navigation.toggleDrawer()} />
    </HeaderButtons>
    )}
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default CategoriesScreen;