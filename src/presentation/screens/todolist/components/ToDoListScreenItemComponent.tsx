import React from 'react';
import {Text, View} from 'react-native';
import {ToDoListScreenItemComponentProps} from '../types/ToDoListScreenComponentsProps';

const ToDoListScreenItemComponent = (
  props: ToDoListScreenItemComponentProps,
) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <Text>{props.isDone}</Text>
    </View>
  );
};

export default ToDoListScreenItemComponent;
