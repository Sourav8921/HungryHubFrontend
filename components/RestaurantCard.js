import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";

const RestaurantCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...item })}
    >
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.heartIcon}>
          <Icon.Heart height={20} width={20} stroke={themeColors.bgColor(1)} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Image source={require("../assets/images/star.png")} />
            <Text style={styles.ratingText}>4.2 (5k+) - </Text>
            <Text style={styles.deliveryTime}>{item.delivery_time} mins</Text>
          </View>
          <Text>{item.cuisine_type}</Text>
          <Text>{item.place}</Text>
          <View style={styles.deliveryContainer}>
            <Image source={require("../assets/images/freedelivery.png")} />
            <Text style={styles.freeDelivery}>FREE DELIVERY</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  heartIcon: {
    position: "absolute",
    top: 16,
    right: 12,
  },
  infoContainer: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
  },
  deliveryTime: {
    fontWeight: "600",
  },
  deliveryContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  freeDelivery: {
    fontWeight: "800",
    marginLeft: 8,
  },
});

export default RestaurantCard;
