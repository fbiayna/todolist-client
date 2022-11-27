import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {take} from 'rxjs';
import {setAuthenticationState} from '../../../application/redux/actions';
import authUseCases from '../../usecases/AuthUseCases';
import EmailPasswordLogInScreenStyles from './styles/EmailPasswordLogInScreenStyles';

type EmailPasswordLogInScreenProps = {
  setAuthenticationState: (isAuthenticated: boolean) => void;
};

const EmailPasswordLogInScreen = (props: EmailPasswordLogInScreenProps) => {
  /// Navigation

  const navigation = useNavigation();

  /// States

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  /// Actions

  const onEmailPasswordLogInDoneTapped = () => {
    if (email && password) {
      authUseCases
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

  const onEmailPasswordSignUpTapped = () => {
    navigation.navigate('emailPasswordSignUpScreen');
  };

  /// Render

  return (
    <View style={EmailPasswordLogInScreenStyles.container}>
      <Text>EmailPasswordLogInScreen</Text>
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
      <TouchableWithoutFeedback onPress={onEmailPasswordLogInDoneTapped}>
        <Text>Done</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onEmailPasswordSignUpTapped}>
        <Text>Do you want to create an account? Sign up!</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const mapDispatchToProps = {
  setAuthenticationState,
};

export default connect(null, mapDispatchToProps)(EmailPasswordLogInScreen);
