import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './View/LandingPage';
import Register from './View/Register';
import HomePage from "./View/Home";
import ProfilePage from './View/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options={{ headerShown: false }} name='Landing Page' component={LandingPage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Register' component={Register}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Home' component={HomePage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Profile' component={ProfilePage}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
};

export default App