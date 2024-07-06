import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const logoImg = require("../assets/images/logo_only.png");

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const validateEmail = (username) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(username);
  };

  const loginUser = async () => {
    //validation
    if (!validateEmail(username)) {
      setEmailError("Invalid email format");
      return;
    }
    if (pass.length < 8) {
      setPassError("Password must be at least 8 characters");
      return;
    }
    //
    const postData = {
      username: username,
      password: pass,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/users/login/`,
        postData,
        config
      );
      await AsyncStorage.setItem("auth_token", response.data.token);
      navigation.navigate("Authenticated");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} style={styles.headerImg} alt="logo" />
          <Text style={styles.title}>Hungry Hub</Text>
          <Text style={styles.subTitle}>
            Please sign in to your existing account
          </Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              style={styles.inputField}
              value={username}
              onChangeText={setUsername}
              placeholder="Email or username"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={30}
            />
            {emailError ? <Text>{emailError}</Text> : null}
          </View>

          <View>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.inputField}
              value={pass}
              onChangeText={setPass}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              maxLength={25}
            />
            <TouchableOpacity
              className="absolute right-4 bottom-6"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#CCC"
              />
            </TouchableOpacity>
            {passError ? <Text>{passError}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text>
            Don't have an account? <Text style={styles.signupTxt}>Sign up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f3f4",
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    height: 100,
    width: 100,
    alignSelf: "center",
    backgroundColor: "#294C25",
    borderRadius: 50,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 17,
    textAlign: "center",
    color: "grey",
  },
  inputField: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#58AD53",
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupTxt: {
    textDecorationLine: "underline",
    color: "#58AD53",
  },
});
