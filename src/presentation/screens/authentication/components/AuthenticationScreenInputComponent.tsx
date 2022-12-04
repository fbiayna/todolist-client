import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {AuthenticationScreenInputComponentProps} from '../types/AuthenticationScreenComponentsProps';

const AuthenticationScreenInputComponent = (
  props: AuthenticationScreenInputComponentProps,
) => {
  /// Render

  return (
    <View>
      <Text>{props.title}</Text>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.setValue}
        value={props.value}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default AuthenticationScreenInputComponent;
