import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from "./View/Home";
import ProfilePage from './View/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
return <NavigationContainer>
  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name='Home' component={HomePage}></Stack.Screen>
    <Stack.Screen name='Profile' component={ProfilePage}></Stack.Screen>
  </Stack.Navigator>
</NavigationContainer>
};

export default App