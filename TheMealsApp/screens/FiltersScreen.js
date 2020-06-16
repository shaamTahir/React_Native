import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

import {set_filters} from '../store/action/meal';
import {useDispatch} from 'react-redux';

const FilterComponent = props => {
    return (
        <View style={styles.filterContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <Switch
            trackColor= {{true: 'rgba(0,0,0,0.6)', false: '#ccc'}}
            thumbColor= {Colors.primaryColor}
            value={props.state} 
            onValueChange={props.onChange} />
    </View>
    );
}

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const { navigation } = props;

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree : isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }
        dispatch(set_filters(appliedFilters));
        
    },[isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(()=>{
        navigation.setParams({save: saveFilters});
    },[saveFilters]);
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterComponent label='Gluten Free' state={isGlutenFree} onChange={(newValue)=> setIsGlutenFree(newValue)} />
            <FilterComponent label='Lactose Free' state={isLactoseFree} onChange={(newValue)=> setIsLactoseFree(newValue)} />
            <FilterComponent label='Vegan' state={isVegan} onChange={(newValue)=> setIsVegan(newValue)} />
            <FilterComponent label='Vegetarian' state={isVegetarian} onChange={(newValue)=> setIsVegetarian(newValue)} />
        </View>
    );
}

FiltersScreen.navigationOptions = (navProps) => {
    return{
    headerTitle : 'Filter Meals',
    headerLeft : ()=> (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-menu' title='iconBar' onPress={()=> navProps.navigation.toggleDrawer()} />
    </HeaderButtons>
    ),
    headerRight : ()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName='ios-save' title='save' onPress={navProps.navigation.getParam('save')} />
        </HeaderButtons>
        )
}
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: "center",
        marginVertical: 10,
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems :"center",
        width: '80%',
        marginVertical: 10
    },
    label: {
        fontFamily: 'open-sans'
    }
});

export default FiltersScreen;