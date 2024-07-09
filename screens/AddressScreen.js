import { SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { getAddresses } from '../services/api'
import AddressCard from '../components/AddressCard'
import { useDispatch, useSelector } from "react-redux";
import { resetAddress } from '../redux/address';


export default function AddressScreen() {
  const navigation = useNavigation()
  const [addresses, setAddresses] = useState([]);
  const { deliveryAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const found = addresses.find(address => address.id === deleteAddress.id)
  if(!found) {
    dispatch(resetAddress())
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching Addresses', error);
      }
    };
    fetchAddresses();
  }, []);
  
  return (
    <SafeAreaView className="p-4 flex-1 bg-white">
      <View className="flex-1">
        <BackButton value="Select an address" />

        {addresses.map(address => {
          return (
            <AddressCard key={address.id} address={address}/>
          )
        })}

        <View className="absolute bottom-1 w-full">
          <CustomButton onPress={() => navigation.navigate('CreateAddress')} title='Add Address' />
        </View>
      </View>
    </SafeAreaView>
  )
}