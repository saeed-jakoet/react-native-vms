// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SIgnupPage';
import AddVehicleScreen from './screens/AddVehiclePage';
import VerificationPage from './screens/VerficationPage';

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="Verify" component={VerificationPage} />
        <Tab.Screen name="AddVehicle" component={AddVehicleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
