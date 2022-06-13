import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConnectedSwitchStackNavigator from './SwitchStackNavigator';
import {NavigatorName} from '../entities/NavigatorName';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  /// Render

  return (
    <RootStack.Navigator
      initialRouteName={NavigatorName.forSwitchStack}
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <RootStack.Screen
        name={NavigatorName.forSwitchStack}
        component={ConnectedSwitchStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
