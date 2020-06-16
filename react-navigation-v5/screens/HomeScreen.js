import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Go to Detail Screen" onPress={()=> {
        props.navigation.navigate("Detail")
      }} />
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

export default HomeScreen;
