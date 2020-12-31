import React, {useState} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';




export default function App() {

    const [loaded, error] = Font.useFonts({
      'Ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
      'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf')
  }); 

  if (!loaded) {
    return null;
  }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({
  
});
