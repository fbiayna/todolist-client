import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EmailPasswordLogInScreen from '../../screens/authentication/EmailPasswordLogInScreen';
import EmailPasswordSignUpScreen from '../../screens/authentication/EmailPasswordSignUpScreen';
import {AuthenticationStackParamListType} from '../interfaces/AuthenticationStackParamListType';

const AuthenticationStack =
  createStackNavigator<AuthenticationStackParamListType>();

const AuthenticationStackNavigator = () => {
  /// Render

  return (
    <AuthenticationStack.Navigator initialRouteName={'emailPasswordSignUp'}>
      <AuthenticationStack.Screen
        name={'emailPasswordSignUp'}
        component={EmailPasswordSignUpScreen}
      />
      <AuthenticationStack.Screen
        name={'emailPasswordLogIn'}
        component={EmailPasswordLogInScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
