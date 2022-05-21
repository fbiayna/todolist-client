import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ToDoListScreen from '../../screens/todolist/ToDoListScreen';
import {ScreenName} from '../entities/ScreenName';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  /// Render

  return (
    <MainStack.Navigator initialRouteName={ScreenName.forToDoList}>
      <MainStack.Screen
        name={ScreenName.forToDoList}
        component={ToDoListScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
