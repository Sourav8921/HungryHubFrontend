import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';


const RestaurantCard = ({item}) => {
  const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback
      onPress={()=> navigation.navigate("Restaurant", {...item})}
    >
      <View className="p-4 flex-row" >
        {/* <View> */}
            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 120,
                borderRadius: 8,
                marginRight: 8 }}
            />
            <View className='absolute top-4 right-3'>
                <Icon.Heart height={20} width={20} stroke={themeColors.bgColor(1)}/>
            </View>
        {/* </View> */}
        <View className="ml-3">
            <Text className="text-lg font-bold">{item.name}</Text>
            <View className="flex-row">
              <Image source={require('../assets/images/star.png')} />
              <Text className="ml-1 font-semibold">4.2 (5k+) - </Text>
              <Text className="font-semibold">{item.delivery_time} mins</Text>
            </View>
            <Text>{item.cuisine_type}</Text>
            <Text>{item.place}</Text>
            <View className="flex-row mt-1">
              <Image source={require('../assets/images/freedelivery.png')}/>
              <Text className="font-extrabold ml-2">FREE DELIVERY</Text>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default RestaurantCard;
