import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/user";
import api from "../axiosConfig";
import { themeColors } from "../theme";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);

  const [formData, setFormData] = useState({
    fname: user?.first_name,
    lname: user?.last_name,
    email: user?.email,
    phone: user?.phone_number,
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({});

  const validateName = (name) => {
    return name.trim().length >= 2 && name.trim().length <= 50;
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const errors = {};

    if (!validateName(formData.fname)) {
      errors.firstName = "First name should be 2-50 characters long";
    }
    if (!validateName(formData.lname)) {
      errors.lastName = "Last name should be 2-50 characters long";
    }
    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await api.patch(`/api/users/profile/`, {
        first_name: formData.fname,
        last_name: formData.lname,
        email: formData.email,
        phone_number: formData.phone,
      });
      if (response.status === 200) {
        dispatch(fetchUser());
        setFormErrors({});
        alert("Profile Updated Successfully");
        navigation.goBack();
      }
    } catch (error) {
      setFormErrors({ server: error.message });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton value={"Edit Profile"} />
      <View style={styles.formContainer}>
        <View style={styles.profile}>
          <View style={styles.circle}>
            {image && <Image source={{ uri: image }} style={styles.circle} />}
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Feather name="edit-2" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>First name</Text>
          <TextInput
            style={styles.inputField}
            value={formData.fname}
            onChangeText={(value) => handleChange("fname", value)}
            placeholder="First name"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            autoFocus={true}
            blurOnSubmit={false}
            ref={firstRef}
            onSubmitEditing={(e) => {
              const text = e.nativeEvent.text;
              if (!text) return;
              secondRef.current.focus();
            }}
          />
          {formErrors.firstName && (
            <Text style={styles.errorTxt}>{formErrors.firstName}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Last name</Text>
          <TextInput
            style={styles.inputField}
            value={formData.lname}
            onChangeText={(value) => handleChange("lname", value)}
            placeholder="Last name"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            blurOnSubmit={false}
            ref={secondRef}
            onSubmitEditing={(e) => {
              const text = e.nativeEvent.text;
              if (!text) return;
              thirdRef.current.focus();
            }}
          />
          {formErrors.lastName && (
            <Text style={styles.errorTxt}>{formErrors.lastName}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email address</Text>
          <TextInput
            style={styles.inputField}
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="email@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            maxLength={30}
            blurOnSubmit={false}
            ref={thirdRef}
            onSubmitEditing={(e) => {
              const text = e.nativeEvent.text;
              if (!text) return;
              fourthRef.current.focus();
            }}
          />
          {formErrors.email && (
            <Text style={styles.errorTxt}>{formErrors.email}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            placeholder="XXXXXXXXXX"
            keyboardType="number-pad"
            ref={fourthRef}
          />
          {formErrors.phone && (
            <Text style={styles.errorTxt}>{formErrors.phone}</Text>
          )}
        </View>
      </View>
      <CustomButton onPress={() => handleSubmit()} title="SAVE" />
      {formErrors.server && (
        <Text style={styles.errorTxt}>
          {formErrors.server}
          {"\n"}Please try again.
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f3f4f6",
  },
  profile: {
    alignItems: "center",
    marginVertical: 16,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: themeColors.bgColor(0.3),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#58AD53",
    borderRadius: 50,
    padding: 10,
  },
  formContainer: {
    marginVertical: 16,
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputField: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorTxt: {
    color: "red",
  },
});
