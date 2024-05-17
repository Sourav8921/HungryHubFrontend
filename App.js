import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticatedNavigator from "./Navigation/AuthenticatedNavigator"
import UnauthenticatedNavigator from "./Navigation/UnauthenticatedNavigator"
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('auth_token');
        if (authToken) {
          // User is authenticated
          setAuthenticated(true);
        } else {
          // User is not authenticated
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error reading auth token from AsyncStorage:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
          {authenticated ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
