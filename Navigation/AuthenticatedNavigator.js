import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import CartScreen from "../screens/CartScreen";
import OrderPreparingScreen from "../screens/OrderPreparingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderFailureScreen from "../screens/OrderFailureScreen";
import SuccessScreen from "../screens/SuccessScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function AuthenticatedNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen}/>
        <Stack.Screen name="Success" component={SuccessScreen}/>
        <Stack.Screen name="OrderFailure" component={OrderFailureScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="Logout" component={UnauthenticatedNavigator}/>
      </Stack.Navigator>
  );
}
