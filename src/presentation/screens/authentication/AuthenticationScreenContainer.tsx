import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {mergeMap, take} from 'rxjs';
import {container} from 'tsyringe';
import {setAuthenticationState} from '../../../application/redux/actions';
import {EmailPasswordLogInUseCaseType} from '../../../domain/interfaces/usecases/auth/EmailPasswordLogInUseCaseType';
import {EmailPasswordSignUpUseCaseType} from '../../../domain/interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';
import {CreateUserUseCaseType} from '../../../domain/interfaces/usecases/user/CreateUserUseCaseType';
import {AuthenticationScreenRouteProps} from '../../navigation/types/AuthenticationScreenRouteProps';
import AuthenticationScreenPresenter from './AuthenticationScreenPresenter';
import {AuthenticationScreenContainerProps} from './types/AuthenticationScreenContainerProps';
import AuthenticationScreenMethodsType from './types/AuthenticationScreenMethodsType';

const AuthenticationScreenContainer = (
  props: AuthenticationScreenContainerProps,
) => {
  /// Dependencies

  const useCases = {
    emailPasswordLogInInstance:
      container.resolve<EmailPasswordLogInUseCaseType>(
        'EmailPasswordLogInUseCaseType',
      ),
    emailPasswordSignUpInstance:
      container.resolve<EmailPasswordSignUpUseCaseType>(
        'EmailPasswordSignUpUseCaseType',
      ),
    createUserInstance: container.resolve<CreateUserUseCaseType>(
      'CreateUserUseCaseType',
    ),
  };

  /// Navigation

  const navigation = useNavigation();

  /// Routes

  const {
    params: {authenticationMethod},
  } = useRoute<AuthenticationScreenRouteProps>();

  /// States

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  /// Actions

  const onEmailPasswordLogInDoneTapped = () => {
    if (email && password) {
      useCases.emailPasswordLogInInstance
        .emailPasswordLogIn(email, password)
        .pipe(take(1))
        .subscribe({
          next: () => {
            props.setAuthenticationState(true);
          },
          error: error => console.log(error),
        });
    }
  };

  const onEmailPasswordSignUpDoneTapped = () => {
    if (name && email && password) {
      useCases.emailPasswordSignUpInstance
        .emailPasswordSignUp(email, password)
        .pipe(
          mergeMap(() => useCases.createUserInstance.createUser(name, email)),
          take(1),
        )
        .subscribe({
          next: () => {
            props.setAuthenticationState(true);
          },
          error: error => console.log(error),
        });
    }
  };

  const onChangeAuthenticationMethodTapped = () => {
    if (
      authenticationMethod ===
      AuthenticationScreenMethodsType.emailPasswordLogIn
    ) {
      return navigation.setParams({
        authenticationMethod:
          AuthenticationScreenMethodsType.emailPasswordSignUp,
      });
    }

    return navigation.setParams({
      authenticationMethod: AuthenticationScreenMethodsType.emailPasswordLogIn,
    });
  };

  return (
    <AuthenticationScreenPresenter
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      onEmailPasswordLogInDoneTapped={onEmailPasswordLogInDoneTapped}
      onEmailPasswordSignUpDoneTapped={onEmailPasswordSignUpDoneTapped}
      onChangeAuthenticationMethodTapped={onChangeAuthenticationMethodTapped}
      authenticationMethod={authenticationMethod}
    />
  );
};

const mapDispatchToProps = {
  setAuthenticationState,
};

export default connect(null, mapDispatchToProps)(AuthenticationScreenContainer);
