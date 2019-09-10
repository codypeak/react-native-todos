import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native'

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');  //default state is empty string, so initialize empty string.

    // function goalInputHandler(enteredText) {
    //   setEnteredGoal(enteredText)
    // } or
    const goalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);  //parens here b/c only execute when handler runs.
        setEnteredGoal('');  //to clear input field set state to empty string again. 
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput  
                    placeholder='Course Goal'
                    style={styles.input}
                    //bind state to input, ie when someone types input update state.
                    onChangeText={goalInputHandler}  //no parens b/c dont want to invoke automatically on render. this way will execute on every keystroke.
                    value={enteredGoal}  //bind value prop to state
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color='red' onPress={props.onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="ADD" 
                            onPress={addGoalHandler} 
                            //just passing pointer to func above so no parens/call. parens would execute it too early.
                        />  
                    </View>
                </View>
            </View>  
        </Modal>
    ); 
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
        input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: { //helpful to wrap each button in its own view to get them to be same size.
        width: '40%',
    }
});

export default GoalInput;

//original ADD button: 
//<Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} /> 
//need to forward enteredGoal to addGoalHandler, so bind it. could also do () => props.onAddGoal(enteredGoal)