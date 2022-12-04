import React from 'react';
import {Text, View} from 'react-native';
import {AuthenticationScreenTitleComponentProps} from '../types/AuthenticationScreenComponentsProps';

const AuthenticationScreenTitleComponent = (
  props: AuthenticationScreenTitleComponentProps,
) => {
  /// Render

  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

export default AuthenticationScreenTitleComponent;
