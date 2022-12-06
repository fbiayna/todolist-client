import React from 'react';
import {ImageBackground, TouchableWithoutFeedback} from 'react-native';
import IconButtonComponentStyles from './styles/IconButtonComponentStyles';
import {IconButtonComponentProps} from './types/IconButtonComponentProps';

const IconButtonComponent = (props: IconButtonComponentProps) => {
  /// Render

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <ImageBackground
        style={[IconButtonComponentStyles.container, props.containerStyle]}
        imageStyle={props.style}
        source={props.source}
      />
    </TouchableWithoutFeedback>
  );
};
export default IconButtonComponent;
