import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput , ScrollView, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);

  //enable or disable model
  const [isOnmode, setIsOnMode] = useState(false);
  


  //On button press, getting textInput value
  const getUserInput = (goalTitle) => {
    setCourseGoals([...courseGoals, {
      key: Math.random().toString(),
      value: goalTitle
    }]);
    setIsOnMode(false);
  }

  //onDeleteItem
  const onDeleteItem = goal_ID_to_be_Deleted =>{
    setCourseGoals(currentGoals =>{
      return currentGoals.filter((goal) => goal.key !== goal_ID_to_be_Deleted)
    });
  }

  //onCancel
  const onCancelModel_btn = () =>{
    setIsOnMode(false);
  }

  return (
    // Outer View
    <View style={styles.screen}>
      <Button title='Add New Goals' onPress={()=> setIsOnMode(true)} />

      <GoalInput onAddGoal={getUserInput} visible={isOnmode} onCancel={onCancelModel_btn} />

      <FlatList showsVerticalScrollIndicator={false} 
      data={courseGoals} renderItem={items => 
        <GoalItem title={items.item.value} id={items.item.key} onDelete={onDeleteItem} />
      } />


    </View>
  );
}

const styles = StyleSheet.create({
  screen : {
    padding: 50
  },

});
