import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticatedNavigator from "./Navigation/AuthenticatedNavigator"
import UnauthenticatedNavigator from "./Navigation/UnauthenticatedNavigator"
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('auth_token');
        // await AsyncStorage.clear();
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
    <StripeProvider publishableKey="pk_test_51PPezlAuFKGwV1a8th6QH1vW1N97UtGQj7eQ3oyDJ9oCA5iL31Ex4SmUSP8oPQaq9JkJU4Z3IbrDSG6c42XT7c9Q00aCAVyMs0">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
                {authenticated ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}
