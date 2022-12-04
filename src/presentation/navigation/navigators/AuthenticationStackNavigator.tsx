import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthenticationScreenContainer from '../../screens/authentication/AuthenticationScreenContainer';
import AuthenticationScreenMethodsType from '../../screens/authentication/types/AuthenticationScreenMethodsType';
import {AuthenticationStackNavigatorParamListType} from '../types/AuthenticationStackNavigatorParamListType';

const AuthenticationStack =
  createStackNavigator<AuthenticationStackNavigatorParamListType>();

const AuthenticationStackNavigator = () => {
  /// Render

  return (
    <AuthenticationStack.Navigator initialRouteName={'authenticationScreen'}>
      <AuthenticationStack.Screen
        name={'authenticationScreen'}
        initialParams={{
          authenticationMethod:
            AuthenticationScreenMethodsType.emailPasswordLogIn,
        }}
        component={AuthenticationScreenContainer}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
