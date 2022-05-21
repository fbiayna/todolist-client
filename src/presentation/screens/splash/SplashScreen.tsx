import React from 'react';
import {Text, View} from 'react-native';
import SplashScreenStyles from './styles/SplashScreenStyles';

const SplashScreen = () => {
  console.log('hi');
  /// Render

  return (
    <View style={SplashScreenStyles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
