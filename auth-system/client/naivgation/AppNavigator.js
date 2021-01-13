import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function AppNavigator() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ headerLeft: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;