import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {mergeMap, take} from 'rxjs';
import {setAuthenticationState} from '../../../application/redux/actions';
import authUseCases from '../../usecases/AuthUseCases';
import userUseCases from '../../usecases/UserUseCases';
import EmailPasswordSignUpScreenStyles from './styles/EmailPasswordSignUpScreenStyles';
import {EmailPasswordSignUpScreenProps} from './types/EmailPasswordSignUpScreenProps';

const EmailPasswordSignUpScreen = (props: EmailPasswordSignUpScreenProps) => {
  /// Navigation

  const navigation = useNavigation();

  /// States

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  /// Actions

  const onEmailPasswordSignUpDoneTapped = () => {
    if (name && email && password) {
      authUseCases
        .emailPasswordSignUp(email, password)
        .pipe(
          mergeMap(() => userUseCases.createUser(name, email)),
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

  const onEmailPasswordLogInTapped = () => {
    navigation.navigate('emailPasswordLogInScreen');
  };

  /// Render

  return (
    <View style={EmailPasswordSignUpScreenStyles.container}>
      <Text>Auth Screen</Text>
      <TextInput
        autoCapitalize={'none'}
        value={name}
        placeholder={'Name'}
        onChangeText={setName}
      />
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
