import {ImageProps, StyleProp, ViewStyle} from 'react-native';

export type IconButtonComponentProps = {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
} & ImageProps;
