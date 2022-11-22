import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {ToDoListScreenButtonsComponentProps} from '../interfaces/ToDoListScreenComponentsProps';

const ToDoListScreenButtonsComponent = (
  props: ToDoListScreenButtonsComponentProps,
) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={props.onAddItemTapped}>
        <Text>{props.addItemTitle}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.onSignOutTapped}>
        <Text>{props.signOutTitle}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ToDoListScreenButtonsComponent;
