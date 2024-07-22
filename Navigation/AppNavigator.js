import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import { useSelector } from "react-redux";

export default function AppNavigator() {
    const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <UnauthenticatedNavigator />
      )}
    </NavigationContainer>
  );
}
