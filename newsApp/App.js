import React, {useState} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import * as Font from 'expo-font';

import AppNavigator from './src/navigation/AppNavigator';




export default function App() {

    const [loaded, error] = Font.useFonts({
      'Ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
      'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf')
  }); 

  if (!loaded) {
    return null;
  }

    return (
     <AppNavigator />
  );
}

const styles = StyleSheet.create({
  
});
