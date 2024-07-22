import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import AppNavigator from "./Navigation/AppNavigator";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51PPezlAuFKGwV1a8th6QH1vW1N97UtGQj7eQ3oyDJ9oCA5iL31Ex4SmUSP8oPQaq9JkJU4Z3IbrDSG6c42XT7c9Q00aCAVyMs0">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}
