import React from 'react';
import {FlatList, View} from 'react-native';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import {ButtonComponentProps} from '../../components/buttons/types/ButtonComponentProps';
import {ListItemPresentable} from '../../interfaces/ListItemPresentable';
import {VariousContentListRenderItem} from '../../interfaces/ListRenderItem';
import AuthenticationScreenInputComponent from './components/AuthenticationScreenInputComponent';
import AuthenticationScreenTitleComponent from './components/AuthenticationScreenTitleComponent';
import AuthenticationScreenPresenterStyles from './styles/AuthenticationScreenPresenterStyles';
import {
  AuthenticationScreenInputComponentProps,
  AuthenticationScreenTitleComponentProps,
} from './types/AuthenticationScreenComponentsProps';
import AuthenticationScreenMethodsType from './types/AuthenticationScreenMethodsType';
import {AuthenticationScreenPresenterContentType} from './types/AuthenticationScreenPresenterContentType';
import {AuthenticationScreenPresenterProps} from './types/AuthenticationScreenPresenterProps';

const AuthenticationScreenPresenter = (
  props: AuthenticationScreenPresenterProps,
) => {
  /// FlatList setup

  const getData = () => {
    let screenContent: ListItemPresentable<AuthenticationScreenPresenterContentType>[] =
      [];

    const titleData = {
      key: '1',
      contentType: AuthenticationScreenPresenterContentType.title,
      title:
        props.authenticationMethod ===
        AuthenticationScreenMethodsType.emailPasswordLogIn
          ? 'LogIn'
          : 'SignUp',
    };

    const nameInputData = {
      key: '2',
      contentType: AuthenticationScreenPresenterContentType.nameInput,
      title: 'Name',
      placeholder: 'Introduce your name',
      value: props.name,
      setValue: props.setName,
    };

    const emailInputData = {
      key: '3',
      contentType: AuthenticationScreenPresenterContentType.emailInput,
      title: 'Email',
      placeholder: 'Introduce your email',
      value: props.email,
      setValue: props.setEmail,
    };

    const passwordInputData = {
      key: '4',
      contentType: AuthenticationScreenPresenterContentType.passwordInput,
      title: 'Password',
      placeholder: 'Introduce your password',
      value: props.password,
      setValue: props.setPassword,
    };

    const doneButtonData = {
      key: '5',
      contentType: AuthenticationScreenPresenterContentType.doneButton,
      title: 'Done',
      onPress:
        props.authenticationMethod ===
        AuthenticationScreenMethodsType.emailPasswordLogIn
          ? props.onEmailPasswordLogInDoneTapped
          : props.onEmailPasswordSignUpDoneTapped,
    };

    const changeMethodButtonData = {
      key: '6',
      contentType: AuthenticationScreenPresenterContentType.changeMethodButton,
      title:
        props.authenticationMethod ===
        AuthenticationScreenMethodsType.emailPasswordLogIn
          ? 'Go to SignUp'
          : 'Go to LogIn',
      onPress: props.onChangeAuthenticationMethodTapped,
    };

    screenContent.push(
      titleData,
      emailInputData,
      passwordInputData,
      doneButtonData,
      changeMethodButtonData,
    );

    if (
      props.authenticationMethod ===
      AuthenticationScreenMethodsType.emailPasswordSignUp
    ) {
      screenContent.splice(1, 0, nameInputData);
    }

    return screenContent;
  };

  const renderItemData: VariousContentListRenderItem<
    AuthenticationScreenPresenterContentType
  > = ({item}) => {
    switch (item.contentType) {
      case AuthenticationScreenPresenterContentType.title:
        return (
          <AuthenticationScreenTitleComponent
            {...(item as AuthenticationScreenTitleComponentProps &
              ListItemPresentable<AuthenticationScreenPresenterContentType>)}
          />
        );
      case AuthenticationScreenPresenterContentType.nameInput:
      case AuthenticationScreenPresenterContentType.emailInput:
      case AuthenticationScreenPresenterContentType.passwordInput:
        return (
          <AuthenticationScreenInputComponent
            {...(item as AuthenticationScreenInputComponentProps &
              ListItemPresentable<AuthenticationScreenPresenterContentType>)}
          />
        );
      case AuthenticationScreenPresenterContentType.doneButton:
      case AuthenticationScreenPresenterContentType.changeMethodButton:
        return (
          <ButtonComponent
            {...(item as ButtonComponentProps &
              ListItemPresentable<AuthenticationScreenPresenterContentType>)}
          />
        );

      default:
        return null;
    }
  };

  /// Render

  return (
    <View style={AuthenticationScreenPresenterStyles.container}>
      <FlatList
        data={getData()}
        renderItem={renderItemData}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default AuthenticationScreenPresenter;
