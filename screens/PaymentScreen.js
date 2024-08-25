import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { getClientSecret, getCsrfToken, submitOrder } from "../services/api";
import Loading from "../components/Loading";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetCartList } from "../redux/cart";
import { themeColors } from "../theme";

export default function PaymentScreen() {
  const navigation = useNavigation();

  //Payment
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState();
  const { confirmPayment } = useStripe();

  //order submission
  const dipatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user.id;
  const { cartList, subTotal } = useSelector((state) => state.cart);
  const restaurantId = cartList.length > 0 ? cartList[0].restaurant : null;
  const [loading, setLoading] = useState(false);

  //payment
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const csrfData = await getCsrfToken();

        const clientSecretData = await getClientSecret(csrfData, subTotal);
        setClientSecret(clientSecretData.clientSecret);
        setPaymentIntentId(clientSecretData.paymentIntentId)
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };
    fetchTokens();
  }, []);

  const handlePayPress = async () => {
    // Confirm the payment with the client secret
    const { error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });
    if (error) {
      alert(error.localizedMessage);
    } else {
      handleOrderSubmit('stripe', paymentIntentId);
    }
  };

  //order submission
  const handleOrderSubmit = async (paymentMethod, paymentIntentId) => {
    if (restaurantId) {
      setLoading(true);
      try {
        const orderDetails = {
          user: userId,
          restaurant: restaurantId,
          items: cartList.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            restaurant: item.restaurant,
            category: item.category,
            count: item.count,
          })),
          total_price: subTotal,
          status: "Pending",
        };
        const response = await submitOrder(orderDetails, paymentMethod, paymentIntentId);
        if (response.status === 200) {
          navigation.navigate("Success");
          dipatch(resetCartList());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <BackButton value="Payments" />
        <View className="my-4">
          <Text className="text-lg font-medium">Pay on Delivery</Text>
          <TouchableOpacity
            className="flex-row  bg-white my-2 p-4 rounded-xl shadow-md"
            onPress={() =>
              Alert.alert(
                "Confirm Order",
                "Are you sure you want to confirm the order?",
                [
                  {
                    text: "Cancel",
                  },
                  {
                    text: "Confirm",
                    onPress: () => handleOrderSubmit('cod'),
                  },
                ],
                { cancelable: true }
              )
            }
          >
            <FontAwesome name="rupee" size={24} color="green" />
            <Text className="ml-4">Pay on delivery (Cash/UPI)</Text>
          </TouchableOpacity>
        </View>

        {/* Card payment */}
        <View className="flex-1">
          <Text className="text-lg font-medium">Credit & Debit Cards</Text>
          <View className="bg-white my-2 p-4 rounded-xl shadow-md">
            <View className="flex-row justify-between border-b border-gray-300 pb-4 mb-4">
              <Text className='text-lg'>HungryHub</Text>
              <Text className="text-gray-500">Secure Payments</Text>
            </View>
            <Text style={{color: themeColors.text, marginBottom: 10}}>Order Payment</Text>
            <Text>Total Amount:  ₹{subTotal}</Text>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "0000 0000 0000 0000",
              }}
              cardStyle={{
                backgroundColor: "white",
                textColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 15,
              }}
            />
            <CustomButton onPress={handlePayPress} title="Pay" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};