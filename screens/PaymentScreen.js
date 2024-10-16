import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import * as Icon from "react-native-feather";
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
        setPaymentIntentId(clientSecretData.paymentIntentId);
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
      handleOrderSubmit("stripe", paymentIntentId);
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
        const response = await submitOrder(
          orderDetails,
          paymentMethod,
          paymentIntentId
        );
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <BackButton value="Payments" />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pay on Delivery</Text>
          <TouchableOpacity
            style={styles.codButton}
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
                    onPress: () => handleOrderSubmit("cod"),
                  },
                ],
                { cancelable: true }
              )
            }
          >
            <Icon.Truck
              width={24}
              height={24}
              stroke={themeColors.bgColor(1)}
            />
            <Text style={styles.codText}>Pay on delivery (Cash/UPI)</Text>
          </TouchableOpacity>
        </View>

        {/* Card payment */}
        <View style={styles.flexContainer}>
          <Text style={styles.sectionTitle}>Credit & Debit Cards</Text>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>HungryHub</Text>
              <Text style={styles.cardSubtitle}>Secure Payments</Text>
            </View>
            <Text style={styles.orderPaymentText}>Order Payment</Text>
            <Text>Total Amount: ₹{subTotal}</Text>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "0000 0000 0000 0000",
              }}
              cardStyle={{
                backgroundColor: "white",
                textColor: "#000000",
              }}
              style={styles.cardField}
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
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  codButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    marginVertical: 8,
  },
  codText: {
    marginLeft: 16,
    fontSize: 16,
  },
  flexContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardSubtitle: {
    color: "#6B7280",
  },
  orderPaymentText: {
    marginBottom: 10,
    color: themeColors.text,
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 15,
  },
});
