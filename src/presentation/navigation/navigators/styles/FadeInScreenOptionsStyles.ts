import {StackCardInterpolationProps} from '@react-navigation/stack';

const fadeInScreenOptionsStyles = {
  cardOverlayEnabled: true,
  cardStyleInterpolator: (props: StackCardInterpolationProps) => ({
    cardStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export default fadeInScreenOptionsStyles;
