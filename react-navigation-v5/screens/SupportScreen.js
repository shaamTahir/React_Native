import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SupportScreen = props => {
  return (
    <View style={styles.container}>
      <Text>SupportScreen</Text>
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

export default SupportScreen;
