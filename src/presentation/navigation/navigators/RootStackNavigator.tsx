import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConnectedSwitchStackNavigator from './SwitchStackNavigator';
import {RootStackNavigatorParamListType} from '../types/RootStackNavigatorParamListType';

const RootStack = createStackNavigator<RootStackNavigatorParamListType>();

const RootStackNavigator = () => {
  /// Render

  return (
    <RootStack.Navigator
      initialRouteName={'switchStackNavigator'}
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <RootStack.Screen
        name={'switchStackNavigator'}
        component={ConnectedSwitchStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
