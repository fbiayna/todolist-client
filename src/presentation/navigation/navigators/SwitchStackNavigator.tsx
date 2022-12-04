import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackNavigator from './MainStackNavigator';
import SplashScreen from '../../screens/splash/SplashScreen';
import fadeInScreenOptionsStyles from './styles/FadeInScreenOptionsStyles';
import AuthenticationStackNavigator from './AuthenticationStackNavigator';
import {SwitchStackNavigatorParamListType} from '../types/SwitchStackNavigatorParamListType';

const SwitcherStack = createStackNavigator<SwitchStackNavigatorParamListType>();

type SwitchStackNavigatorProps = {
  isAuthenticated: boolean;
  isSplashAnimationFinished: boolean;
  isVerifyingAuthenticationFinished: boolean;
};

const SwitchStackNavigator = (props: SwitchStackNavigatorProps) => {
  /// Helper methods

  const getScreen = () => {
    if (
      props.isVerifyingAuthenticationFinished &&
      props.isAuthenticated &&
      props.isSplashAnimationFinished
    ) {
      return (
        <SwitcherStack.Screen
          name={'mainStackNavigator'}
          component={MainStackNavigator}
        />
      );
    }

    if (
      props.isVerifyingAuthenticationFinished &&
      !props.isAuthenticated &&
      props.isSplashAnimationFinished
    ) {
      return (
        <SwitcherStack.Screen
          name={'authenticationStackNavigator'}
          component={AuthenticationStackNavigator}
        />
      );
    }

    return (
      <SwitcherStack.Screen name={'splashScreen'} component={SplashScreen} />
    );
  };

  /// Render

  return (
    <SwitcherStack.Navigator
      initialRouteName={'splashScreen'}
      screenOptions={{
        ...fadeInScreenOptionsStyles,
        headerShown: false,
      }}>
      {getScreen()}
    </SwitcherStack.Navigator>
  );
};

/// Redux methods

const mapStateToProps = (state: {
  appState: {
    isAuthenticated: boolean;
    isSplashAnimationFinished: boolean;
    isVerifyingAuthenticationFinished: boolean;
  };
}) => ({
  isAuthenticated: state.appState.isAuthenticated,
  isSplashAnimationFinished: state.appState.isSplashAnimationFinished,
  isVerifyingAuthenticationFinished:
    state.appState.isVerifyingAuthenticationFinished,
});

const ConnectedSwitchStackNavigator =
  connect(mapStateToProps)(SwitchStackNavigator);

export default ConnectedSwitchStackNavigator;
