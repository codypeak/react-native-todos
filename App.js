import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);  //user generated list of goals starts as empty array.
  const [isAddMode, setIsAddMode] = useState(false); //initially not in add mode, so false.

  //takes in goalTitle from GoalInput
  const addGoalHandler = goalTitle => {
    //take current state and return updated state with new goal
    setCourseGoals(currentGoals => [
        ...currentGoals, 
        { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false); //set back to false when done adding to clear modal.
  }; //need to know when button clicked in GoalInput, so pass this into component as prop

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {   //because need to update state after deleting something.
      return currentGoals.filter(goal => goal.id !== goalId);  //filter returns new array. return true to keep item or false to remove.
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }; //then need to forward to GoalInput component

  return (
    <View style={styles.screen}>
      <Button 
        title="Add New Goal" 
        onPress={() => setIsAddMode(true)} //set to true when open modal.
      />
      <GoalInput 
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals} 
        renderItem={itemData => (
          <GoalItem 
            id={itemData.item.id} //pass id so know which one deleted.
            onDelete={removeGoalHandler} //passing this method to GoalItem for when item pressed.
            title={itemData.item.value}/> //need title prop passed to GoalItem component
          )} 
        />
    </View>  
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
})

//everything in View will be compiled to native code. but everything else like the methods above will stay js; it will not be compiled.
//the js will then talk to native code through a bridge RN sets up. 

//rn view is default flexbox.
//default is column (web default for child elements is row), but can change with flexDirection.
//height and width default whatever size is of item inside. 
//main axis v cross axis, which is perpendicular to main. 
//justify content to organize element along main axis and align items for cross axis. 
//flex 1 will take up all available space along main axis. 

//scrollView renders all elements even ones not on screen which can be expensive for long lists. can slow down app. 
// <ScrollView> 
// {courseGoals.map(goal => (
//   <View key={goal} style={styles.listItem}>
//     <Text>
//       {goal}
//     </Text>
//   </View>
// ))}
// </ScrollView>
// map array of data into array of text components. for each goal return the goal. key needs to be on root element.

//FlatList takes in two args: data (point to array of input data want to output) and renderItem which is a function that for 
//every item generates a list item, so it's like mapping (takes in data returns a component)
//automatically adds key if data is in right shape, so list needs to be a list of objects with each obj having a key property.
//so for all the item data will make a list of each item (which is an obj) which has a key and value.
//can also use keyExtractor to inform react what key to use. or just use key instead of some other id.
//this was how it looked prior to refactoring into separate components: 
// <FlatList
//   keyExtractor={(item, index) => item.id}
//   data={courseGoals} 
//   renderItem={itemData => (
//     <View style={styles.listItem}>
//       <Text>{itemData.item.value}</Text>
//     </View>
//   )}
// />