import React from 'react';
import {Text, View} from 'react-native';
import {ToDoListScreenTitleComponentProps} from '../interfaces/ToDoListScreenComponentsProps';

const ToDoListScreenTitleComponent = (
  props: ToDoListScreenTitleComponentProps,
) => {
  /// Render

  return (
    <View>
      <Text>{props.title}</Text>
      <Text>{props.name}</Text>
    </View>
  );
};

export default ToDoListScreenTitleComponent;
