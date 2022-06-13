import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackNavigator from './MainStackNavigator';
import {NavigatorName} from '../entities/NavigatorName';
import {ScreenName} from '../entities/ScreenName';
import SplashScreen from '../../screens/splash/SplashScreen';
import AuthScreen from '../../screens/auth/AuthScreen';

const SwitcherStack = createStackNavigator();

type SwitchStackNavigatorProps = {
  isAuthenticated: boolean;
  isInitialDataLoaded: boolean;
  isUserDataLoaded: boolean;
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
          name={NavigatorName.forMainStack}
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
          name={ScreenName.forAuth}
          component={AuthScreen}
        />
      );
    }

    return (
      <SwitcherStack.Screen
        name={ScreenName.forSplash}
        component={SplashScreen}
      />
    );
  };

  /// Render

  return (
    <SwitcherStack.Navigator
      initialRouteName={ScreenName.forSplash}
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      {getScreen()}
    </SwitcherStack.Navigator>
  );
};

/// Redux methods

const mapStateToProps = (state: {
  appState: {didSplashAnimationFinish: boolean};
}) => ({
  didSplashAnimationFinish: state.appState.didSplashAnimationFinish,
});

const ConnectedSwitchStackNavigator =
  connect(mapStateToProps)(SwitchStackNavigator);

export default ConnectedSwitchStackNavigator;
