import React from 'react';
import {View, Text} from 'react-native';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';

const ToDoListScreen = () => {
  /// Render

  return (
    <View style={ToDoListScreenStyles.container}>
      <Text>Hello there!</Text>
    </View>
  );
};

export default ToDoListScreen;
