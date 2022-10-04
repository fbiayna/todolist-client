import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import SplashScreenStyles from './styles/SplashScreenStyles';
import {
  finishedSplashAnimation,
  finishedVerifyingAuthentication,
  setAuthenticationState,
  setLoadInitialDataState,
  setLoadUserDataState,
} from '../../../application/redux/actions';
import {container} from 'tsyringe';
import {IsAuthenticatedUseCaseType} from '../../../domain/interfaces/usecases/auth/IsAuthenticatedUseCaseType';
import {filter, share, take} from 'rxjs';

type SplashScreenProps = {
  finishedSplashAnimation: () => void;
  finishedVerifyingAuthentication: () => void;
  setAuthenticationState: (isAuthenticated: boolean) => void;
  setLoadInitialDataState: (isLoaded: boolean) => void;
  setLoadUserDataState: (isLoaded: boolean) => void;
};

const SplashScreen = (props: SplashScreenProps) => {
  /// Dependencies

  const useCases = {
    isAuthenticatedUseCase: container.resolve<IsAuthenticatedUseCaseType>(
      'IsAuthenticatedUseCaseType',
    ),
  };

  /// Hooks

  useEffect(() => {
    const finishSplashAnimation = () => {
      setTimeout(() => props.finishedSplashAnimation(), 2000);
    };

    const isAuthenticatedObservable = useCases.isAuthenticatedUseCase
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
  }, [props, useCases.isAuthenticatedUseCase]);

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
  setLoadInitialDataState,
  setLoadUserDataState,
};

export default connect(null, mapDispatchToProps)(SplashScreen);
