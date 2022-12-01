import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ToDoListScreenContainer from '../../screens/todolist/ToDoListScreenContainer';
import {MainStackNavigatorParamListType} from '../interfaces/MainStackNavigatorParamListType';

const MainStack = createStackNavigator<MainStackNavigatorParamListType>();

const MainStackNavigator = () => {
  /// Render

  return (
    <MainStack.Navigator initialRouteName={'toDoListScreenContainer'}>
      <MainStack.Screen
        name={'toDoListScreenContainer'}
        component={ToDoListScreenContainer}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
