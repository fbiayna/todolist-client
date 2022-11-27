/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import SplashScreenStyles from './styles/SplashScreenStyles';
import {
  finishedSplashAnimation,
  finishedVerifyingAuthentication,
  setAuthenticationState,
} from '../../../application/redux/actions';
import {filter, share, take} from 'rxjs';
import authUseCases from '../../usecases/AuthUseCases';

type SplashScreenProps = {
  finishedSplashAnimation: () => void;
  finishedVerifyingAuthentication: () => void;
  setAuthenticationState: (isAuthenticated: boolean) => void;
};

const SplashScreen = (props: SplashScreenProps) => {
  /// Effects

  useEffect(() => {
    const finishSplashAnimation = () => {
      setTimeout(() => props.finishedSplashAnimation(), 2000);
    };

    const isAuthenticatedObservable = authUseCases
      .isAuthenticated()
      .pipe(take(1), share());

    isAuthenticatedObservable
      .pipe(filter(isAuthenticated => isAuthenticated))
      .subscribe({
        next: () => props.setAuthenticationState(true),
        error: error => {
          console.log(error);
          props.setAuthenticationState(false);
        },
        complete: () => {
          props.finishedVerifyingAuthentication();
          finishSplashAnimation();
        },
      });

    isAuthenticatedObservable
      .pipe(filter(isAuthenticated => !isAuthenticated))
      .subscribe({
        next: () => props.setAuthenticationState(false),
        error: error => {
          console.log(error);
          props.setAuthenticationState(false);
        },
        complete: () => {
          props.finishedVerifyingAuthentication();
          finishSplashAnimation();
        },
      });
  }, []);

  /// Render

  return (
    <View style={SplashScreenStyles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

const mapDispatchToProps = {
  finishedSplashAnimation,
  finishedVerifyingAuthentication,
  setAuthenticationState,
};

export default connect(null, mapDispatchToProps)(SplashScreen);
