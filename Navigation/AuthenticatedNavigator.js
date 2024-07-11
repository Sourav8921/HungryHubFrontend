import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";
import SuccessScreen from "../screens/SuccessScreen";
import SearchScreen from "../screens/SearchScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrdersListScreen from "../screens/OrdersListScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import AddressScreen from "../screens/AddressScreen";
import UpdateAddress from "../screens/UpdateAddress";
import CreateAddress from "../screens/CreateAddress";
import UserInfoScreen from "../screens/UserInfoScreen";

const Stack = createNativeStackNavigator();

export default function AuthenticatedNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="Address" component={AddressScreen}/>
        <Stack.Screen name="CreateAddress" component={CreateAddress}/>
        <Stack.Screen name="UpdateAddress" component={UpdateAddress}/>
        <Stack.Screen name="Payment" component={PaymentScreen}/>
        <Stack.Screen name="Success" component={SuccessScreen}/>
        <Stack.Screen name="Orders" component={OrdersListScreen}/>
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="UserInfo" component={UserInfoScreen}/>
        <Stack.Screen name="Logout" component={UnauthenticatedNavigator}/>
      </Stack.Navigator>
  );
}
