import React from 'react';
import {Text, View} from 'react-native';
import {AuthenticationScreenPresenterProps} from './types/AuthenticationScreenPresenterProps';

const AuthenticationScreenPresenter = (
  props: AuthenticationScreenPresenterProps,
) => {
  /// Render

  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default AuthenticationScreenPresenter;
