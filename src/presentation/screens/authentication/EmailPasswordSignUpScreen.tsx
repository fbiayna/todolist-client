import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {take} from 'rxjs';
import {container} from 'tsyringe';
import {setAuthenticationState} from '../../../application/redux/actions';
import {EmailPasswordSignUpUseCaseType} from '../../../domain/interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';
import EmailPasswordSignUpScreenStyles from './styles/EmailPasswordSignUpScreenStyles';

type EmailPasswordSignUpScreenProps = {
  setAuthenticationState: (isAuthenticated: boolean) => void;
};

const EmailPasswordSignUpScreen = (props: EmailPasswordSignUpScreenProps) => {
  /// Dependencies

  const useCases = {
    emailPasswordSignUpUseCase:
      container.resolve<EmailPasswordSignUpUseCaseType>(
        'EmailPasswordSignUpUseCaseType',
      ),
  };

  /// Hooks

  const navigation = useNavigation();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  /// Actions

  const onEmailPasswordSignUpDoneTapped = () => {
    if (email && password) {
      useCases.emailPasswordSignUpUseCase
        .emailPasswordSignUp(email, password)
        .pipe(take(1))
        .subscribe({
          next: newUserID => {
            props.setAuthenticationState(true);
            console.log('newUserID', newUserID);
          },
          error: error => console.log(error),
        });
    }
  };

  const onEmailPasswordLogInTapped = () => {
    navigation.navigate('emailPasswordLogIn');
  };

  /// Render

  return (
    <View style={EmailPasswordSignUpScreenStyles.container}>
      <Text>Auth Screen</Text>
      <TextInput
        autoCapitalize={'none'}
        value={email}
        placeholder={'Email'}
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize={'none'}
        secureTextEntry={true}
        value={password}
        placeholder={'Password'}
        onChangeText={setPassword}
      />
      <TouchableWithoutFeedback onPress={onEmailPasswordSignUpDoneTapped}>
        <Text>Done</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onEmailPasswordLogInTapped}>
        <Text>Do you have an account? Log in!</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const mapDispatchToProps = {
  setAuthenticationState,
};

export default connect(null, mapDispatchToProps)(EmailPasswordSignUpScreen);
