import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/action/Products';
import Colors from '../../constants/Colors';

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const [data, setData] = useState({
    //values
    title: editedProduct  ? editedProduct.title : '',
    imageUrl: editedProduct  ? editedProduct.imageUrl : '',
    price: '',
    description: editedProduct  ? editedProduct.description : '',
    //check icon
    showTitleCheck: editedProduct  ? true : false,
    showImageUrlCheck:editedProduct  ? true : false,
    showPriceCheck:editedProduct  ? true : false,
    showDescriptionCheck:editedProduct  ? true : false,
    // validity
    isValidTitle: true,
    isValidImageUrl: true,
    isValidPrice: true,
    isValidDescription: true,
  });

  // titleChangeHandler
  const titleChangeHandler = (text) => {
    if (text.trim().length >= 4) {
      setData({
        ...data,
        title: text,
        showTitleCheck: true,
        isValidTitle: true
      })
    }
    else {
      setData({
        ...data,
        title: text,
        showTitleCheck: false,

      })
    }
  }

  const isValidTitleHandler = (text) => {
    if (text.trim().length >= 4) {
      setData({
        ...data,
        isValidTitle: true
      })
    }
    else{
      setData({
        ...data,
        isValidTitle: false
      })
    }
  }

  // imageUrlChangeHandler
  let imageUrlPattern = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png|svg))/g;
  let imageUrlPattern2 = /(.*\/images.*)/;
  const imageUrlChangeHandler = (text) => {
    if (imageUrlPattern.test(text) || imageUrlPattern2.test(text)) {
      setData({
        ...data,
        imageUrl: text,
        showImageUrlCheck: true,
        isValidImageUrl: true
      })
    }
    else {
      setData({
        ...data,
        imageUrl: text,
        showImageUrlCheck: false,
      })
    }
  }

  const isValidImageUrlHandler = (text) => {
    if (imageUrlPattern.test(text) || imageUrlPattern2.test(text)) {
      setData({
        ...data,
        isValidImageUrl: true
      })
    }
    else{
      setData({
        ...data,
        isValidImageUrl: false
      })
    }
  }

    // priceChangeHandler
    let pricePattern = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
    const priceChangeHandler = (text) => {
      if (pricePattern.test(text)) {
        setData({
          ...data,
          price: text,
          showPriceCheck: true,
          isValidPrice: true
        })
      }
      else {
        setData({
          ...data,
          price: text,
          showPriceCheck: false,
        })
      }
    }
  
    const isValidPriceHandler = (text) => {
      if (pricePattern.test(text)) {
        setData({
          ...data,
          isValidPrice: true
        })
      }
      else{
        setData({
          ...data,
          isValidPrice: false
        })
      }
    }

  // descriptionChangeHandler
  const descriptionChangeHandler = (text) => {
    if (text.trim().length >= 8) {
      setData({
        ...data,
        description: text,
        showDescriptionCheck: true,
        isValidDescription: true
      })
    }
    else {
      setData({
        ...data,
        description: text,
        showDescriptionCheck: false,
      })
    }
  }

  const isValidDescriptionHandler = (text) => {
    if (text.trim().length >= 8) {
      setData({
        ...data,
        isValidDescription: true
      })
    }
    else{
      setData({
        ...data,
        isValidDescription: false
      })
    }
  }

    const submitHandler = useCallback(async() => {
    if (!data.showTitleCheck || !data.showImageUrlCheck || !data.showPriceCheck || !data.showDescriptionCheck) {
      // alert("Error in form");
      setData({
        ...data,
        isValidTitle: data.showTitleCheck ? true : false,
        isValidPrice: data.showPriceCheck ? true : false,
        isValidImageUrl: data.showImageUrlCheck ? true : false,
        isValidDescription: data.showDescriptionCheck ? true : false
      })
      return;
    }
    else{
      setError(null);
      setIsLoading(true);

      try {
        if (editedProduct) {
          await dispatch(productsActions.update_product(
            prodId,
            data.title,
            data.imageUrl,
            data.description,
          ));
        }
        else{
          await dispatch(productsActions.create_product(
            data.title,
            data.imageUrl,
            data.description,
            +data.price
          ))
        }
        setIsLoading(false);
        props.navigation.goBack();
      } catch (err) {
        setError(err.message);
      }
    }

  },[dispatch, prodId, data.title, data.imageUrl, data.description, data.price,
    data.showTitleCheck, data.showImageUrlCheck, data.showPriceCheck, data.showDescriptionCheck]);

  useEffect(()=> {
    props.navigation.setParams({submit: submitHandler});
  },[submitHandler]);


  if (isLoading) {
    return(
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primaryColor} size={"large"} />
      </View>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
    <View style={styles.screen}>
      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <View style={styles.inputContainer}>
        <Animatable.View animation="tada">
          <MaterialCommunityIcons name="rename-box" color={Colors.primaryColor} size={20} />
        </Animatable.View>
        <TextInput
        placeholder="Enter product title"
        style={styles.input}
        underlineColorAndroid={"transparent"}
        value={data.title}
        onChangeText={titleChangeHandler}
        onEndEditing={(e)=> isValidTitleHandler(e.nativeEvent.text)} />
        {data.showTitleCheck ? 
        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color={Colors.primaryColor} size={18} />
        </Animatable.View>
        : null 
        }
      </View>
      {/* error Message */}
      {data.isValidTitle ? null
      : <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Title must be 4 characters long!</Text>
        </Animatable.View>
      }

      {/* Image URL */}
      <Text style={{...styles.label, ...{marginTop: 30}}}>Image URL</Text>
      <View style={styles.inputContainer}>
        <Animatable.View animation="tada">
          <Entypo name="image-inverted" color={Colors.primaryColor} size={20} />
        </Animatable.View>
        <TextInput
        placeholder="Enter image URL"
        style={styles.input}
        underlineColorAndroid={"transparent"}
        value={data.imageUrl}
        onChangeText={imageUrlChangeHandler}
        onEndEditing={(e)=> isValidImageUrlHandler(e.nativeEvent.text)} />
        {data.showImageUrlCheck? 
        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color={Colors.primaryColor} size={18} />
        </Animatable.View>
        : null 
        }
      </View>
        {/* error Message */}
      {data.isValidImageUrl ? null
      : <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Enter a Valid Url. Supported Formates: PNG, JPEG, JPG & SVG!</Text>
        </Animatable.View>
      }

      {/* Price */}
      {editedProduct ? null : (
      <View>
      <Text style={{...styles.label, ...{marginTop: 30}}}>Price</Text>
      <View style={styles.inputContainer}>
        <Animatable.View animation="tada">
          <Entypo name="price-tag" color={Colors.primaryColor} size={20} />
        </Animatable.View>
        <TextInput
        placeholder="Enter product price"
        style={styles.input}
        underlineColorAndroid={"transparent"}
        value={data.price}
        keyboardType="number-pad"
        onChangeText={priceChangeHandler}
        onEndEditing={(e)=> isValidPriceHandler(e.nativeEvent.text)} />
        {data.showPriceCheck? 
        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color={Colors.primaryColor} size={18} />
        </Animatable.View>
        : null 
        }
      </View>
        {/* error Message */}
      {data.isValidPrice ? null
      : <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Please enter a valid price!</Text>
        </Animatable.View>
      }
      </View>)}

      {/* Description */}
      <Text style={{...styles.label, ...{marginTop: 30}}}>Description</Text>
      <View style={styles.inputContainer}>
        <Animatable.View animation="tada">
          <MaterialIcons name="description" color={Colors.primaryColor} size={20} />
        </Animatable.View>
        <TextInput
        placeholder="Enter product description"
        style={styles.input}
        underlineColorAndroid={"transparent"}
        value={data.description}
        onChangeText={descriptionChangeHandler}
        onEndEditing={(e)=> isValidDescriptionHandler(e.nativeEvent.text)}
        multiline={true} />
        {data.showDescriptionCheck? 
        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color={Colors.primaryColor} size={18} />
        </Animatable.View>
        : null 
        }
      </View>
      {/* error Message */}
      {data.isValidDescription ? null
      : <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Description must be 8 characters long!</Text>
        </Animatable.View>
      }
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: ()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="check"
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20
  },
  label: {
    color: Colors.primaryColor,
    fontSize: 17,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: '#ccc',
    borderBottomWidth : 1,
    marginTop: 15,
    paddingBottom: 5,
    alignItems: "center"
  },
  input: {
    flex: 1,
    marginTop: Platform.OS =='ios' ? 0 : -3,
    paddingHorizontal: 10,
    color: '#05375a'
  },
  errorText: {
    color: 'red',
    paddingTop: 5,
    textAlign: "left"
  },
  //
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  fallBackText: {
    color: Colors.primaryColor,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    paddingBottom: 10
  }
});

export default EditProductScreen;
