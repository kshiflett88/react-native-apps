import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import AboutScreen from '../screens/AboutScreen';
import AddHomeScreen from '../screens/AddHomeScreen';
import HomeDetailsScreen from '../screens/HomeDetailsScreen';
import HomeListScreen from '../screens/HomeListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function stackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeList"
        component={HomeListScreen}
        options={{title: 'HomeHunt'}}
      />
      <Stack.Screen
        name="HomeDetails"
        component={HomeDetailsScreen}
      />
      <Stack.Screen
        name="AddHome"
        component={AddHomeScreen}
      />
    </Stack.Navigator>
  )
}
function AboutStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='About'
        component={AboutScreen}
      />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name == "Home") {
              iconName = "home"
            } else if (route.name == "About") {
              iconName = "info"
            }
            return <MaterialIcons name={iconName} size={24} />
          }
        })}
      >
        <Tab.Screen 
          name="Home"
          component={stackNavigator}
        />
        <Tab.Screen 
          name="About"
          component={AboutStackNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;