import {StyleProp, TextStyle, ViewProps} from 'react-native';

export type ButtonComponentProps = {
  title: string;
  onPress: () => void;
  buttonTextStyle?: StyleProp<TextStyle>;
} & ViewProps;
