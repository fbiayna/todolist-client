import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EmailPasswordLogInScreen from '../../screens/authentication/EmailPasswordLogInScreen';
import EmailPasswordSignUpScreen from '../../screens/authentication/EmailPasswordSignUpScreen';
import {AuthenticationStackNavigatorParamListType} from '../interfaces/AuthenticationStackNavigatorParamListType';

const AuthenticationStack =
  createStackNavigator<AuthenticationStackNavigatorParamListType>();

const AuthenticationStackNavigator = () => {
  /// Render

  return (
    <AuthenticationStack.Navigator
      initialRouteName={'emailPasswordLogInScreen'}>
      <AuthenticationStack.Screen
        name={'emailPasswordSignUpScreen'}
        component={EmailPasswordSignUpScreen}
      />
      <AuthenticationStack.Screen
        name={'emailPasswordLogInScreen'}
        component={EmailPasswordLogInScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
