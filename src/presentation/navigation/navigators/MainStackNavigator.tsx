import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ToDoListScreen from '../../screens/todolist/ToDoListScreen';
import {MainStackNavigatorParamListType} from '../interfaces/MainStackNavigatorParamListType';

const MainStack = createStackNavigator<MainStackNavigatorParamListType>();

const MainStackNavigator = () => {
  /// Render

  return (
    <MainStack.Navigator initialRouteName={'toDoListScreen'}>
      <MainStack.Screen name={'toDoListScreen'} component={ToDoListScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
