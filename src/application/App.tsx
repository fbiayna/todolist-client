import React from 'react';
import {Provider} from 'react-redux';
import RootStackNavigator from '../presentation/navigation/navigators/RootStackNavigator';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  /// Render

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
