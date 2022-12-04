import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import ButtonComponentStyles from './styles/ButtonComponentStyles';
import {ButtonComponentProps} from './types/ButtonComponentProps';

const ButtonComponent = (props: ButtonComponentProps) => {
  /// Render

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[ButtonComponentStyles.container, props.style]}>
        <Text adjustsFontSizeToFit={true} style={props.buttonTextStyle}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ButtonComponent;
