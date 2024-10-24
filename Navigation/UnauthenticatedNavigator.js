import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createNativeStackNavigator();

export default function UnauthenticatedNavigator() {
  return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Getstarted" component={GetStartedScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
  )
}