import React, {useEffect, useCallback, useReducer, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, Platform, Alert, KeyboardAvoidingView,} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../Store/Actions/products';

import Input from '../../Components/UI/Input';
import Colors from '../../Constants/colors';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = props => {

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(product=> product.id === prodId));

    //////
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        description: editedProduct ? editedProduct.description : '',
        price: ''
      },
      inputValidities: {
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false
      },
      formIsValid: editedProduct ? true : false
    });
    



    // const [title, setTitle] = useState(editableProduct? editableProduct.title : '');
    // const [imageUrl, setImageUrl] = useState(editableProduct? editableProduct.imageUrl : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(editableProduct? editableProduct.description : '');

    const submitHandler = useCallback(async () => {
      if (!formState.formIsValid) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.', [
          { text: 'Okay' }
        ]);
        return;
      }
      setError(null);
      setIsLoading(true);
      try{
        if (editedProduct) {
          await dispatch(
            productsActions.update_product(
              prodId,
              formState.inputValues.title,
              formState.inputValues.imageUrl,
              formState.inputValues.description,
            )
          );
        } else {
          await dispatch(
            productsActions.create_product(
              formState.inputValues.title,
              formState.inputValues.imageUrl,
              +formState.inputValues.price,
              formState.inputValues.description
            )
          );
        }
        props.navigation.goBack();
      }

      catch(err) {
        setError(err.message);
      }

      setIsLoading(false);

    }, [dispatch, prodId, formState]);


    useEffect(() => {
      if (error) {
        Alert.alert("An error occurred!", error, [{ text: "Okay", style: "cancel"}]);
      }
    }, [error]);

    useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        });
      },
      [dispatchFormState]
    );

    if (isloading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size={"large"} color={Colors.primaryColor} />
        </View>
      )
    }

    return(
        <ScrollView>
        <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          initiallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
        </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData =>  {
    const submitFunction = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName={Platform.OS === "android" ? 'md-checkmark' : 'ios-checkmark'} 
                    onPress={submitFunction}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
})

export default EditProductScreen;