import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const ExploreScreen = props => {
  return (
    <View style={styles.container}>
      <Text>ExploreScreen</Text>
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

export default ExploreScreen;
