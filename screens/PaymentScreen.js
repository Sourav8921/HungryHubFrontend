import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
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

export default function PaymentScreen() {
  const navigation = useNavigation();

  //Payment
  const [clientSecret, setClientSecret] = useState("");
  const { confirmPayment } = useStripe();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //order submission
  const dipatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user.id;
  const { cartList, subTotal } = useSelector(
    (state) => state.cart
  );
  const restaurantId = cartList.length > 0 ? cartList[0].restaurant : null;
  const [loading, setLoading] = useState(false);

  //payment
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const csrfData = await getCsrfToken();

        const clientSecretData = await getClientSecret(csrfData, subTotal);
        setClientSecret(clientSecretData.clientSecret);
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
      paymentMethodData: {
        name: name,
        email: email,
        phone: phone,
      },
    });
    if (error) {
      console.log("Payment confirmation error", error);
    } else {
      handleOrderSubmit();
    }
  };

  //order submission
  const handleOrderSubmit = async () => {
    if (restaurantId) {
      setLoading(true)
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
        const response = await submitOrder(orderDetails);
        if (response.status === 200) {
          navigation.navigate("Success");
          dipatch(resetCartList());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
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
                    onPress: () => handleOrderSubmit(),
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
        <View style={styles.container}>
          <Text className="text-lg font-medium">Credit & Debit Cards</Text>
          <View className="space-y-4 bg-white my-2 p-4 rounded-xl shadow-md">
            <Text>Billing Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 20,
              }}
            />
            <CustomButton onPress={handlePayPress} title="Pay" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
});
