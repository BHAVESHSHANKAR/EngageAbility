// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import CareTakerSig from '../screens/CareTakerSig';
import StartActivities from '../screens/StartActivities';
import DeafandDumb from '../screens/DeafandDumb';
import MentalDisability from '../screens/MentalDisability';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="CareTaker" component={CareTakerSig} options={{ title: 'Care Taker Login' }} />
      <Stack.Screen name="Activities" component={StartActivities} options={{ title: 'Start the Activities' }} />
      <Stack.Screen name="DeafandDumb" component={DeafandDumb} options={{title:'DeafandDumb'}}/>
      <Stack.Screen name="mentaldisability" component={MentalDisability} options={{title:'Mental Disability'}}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;