import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DetailScreen = props => {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
