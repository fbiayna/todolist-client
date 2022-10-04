import React, {useState} from 'react';
import {Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {take} from 'rxjs';
import {container} from 'tsyringe';
import {EmailPasswordSignUpUseCaseType} from '../../../domain/interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';
import AuthScreenStyles from './styles/AuthScreenStyles';

const AuthScreen = () => {
  /// Dependencies

  const useCases = {
    emailPasswordSignUpUseCase:
      container.resolve<EmailPasswordSignUpUseCaseType>(
        'EmailPasswordSignUpUseCaseType',
      ),
  };

  /// Hooks

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  /// Actions

  const onEmailPasswordSignUpDoneTapped = () => {
    if (email && password) {
      useCases.emailPasswordSignUpUseCase
        .emailPasswordSignUp(email, password)
        .pipe(take(1))
        .subscribe({
          next: newUserID => console.log('newUserID', newUserID),
          error: error => console.log(error),
        });
    }
  };

  /// Render

  return (
    <View style={AuthScreenStyles.container}>
      <Text>Auth Screen</Text>
      <TextInput value={email} placeholder={'Email'} onChangeText={setEmail} />
      <TextInput
        value={password}
        placeholder={'Password'}
        onChangeText={setPassword}
      />
      <TouchableWithoutFeedback onPress={onEmailPasswordSignUpDoneTapped}>
        <Text>Done</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AuthScreen;
