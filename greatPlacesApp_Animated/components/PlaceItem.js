import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Colors from '../constants/Colors';

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem} activeOpacity={0.6}>
      <Animatable.Image animation="pulse" iterationCount={20} direction="alternate" style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    backgroundColor : '#f5f5f5',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    borderColor: Colors.tealColor,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 8
  },
  title: {
    color: Colors.tealColor,
    fontFamily: 'open-sans',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: Colors.backgroundColor,
    fontSize: 14,
    fontFamily: 'open-sans',
    textAlign: "left",
    paddingRight: 8
  }
});

export default PlaceItem;