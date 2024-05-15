import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './src/View/LandingPage';
import Register from './src/View/Register';
import Login from './src/View/Login';
import HomePage from "./src/View/Home";
import ProfilePage from './src/View/ProfileScreen';
import Feedback from './src/View/Feedback';
import ViewEntries from './src/View/ViewEntries';
import ThankYouPage from './src/View/ThankYouPage';
import FAQs from './src/View/FAQs';

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{ headerShown: false }} name='Landing Page' component={LandingPage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Register' component={Register}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Login' component={Login}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Home' component={HomePage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Profile' component={ProfilePage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Feedback' component={Feedback}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='ViewEntries' component={ViewEntries}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='ThankYouPage' component={ThankYouPage}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='FAQs' component={FAQs}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
};

export default App