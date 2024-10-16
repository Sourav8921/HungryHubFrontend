import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as Icon from "react-native-feather";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/auth";
import { loginUser } from "../services/api/AuthService";

const logoImg = require("../assets/images/logo_only.png");

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.usernameError = "Username is required.";
    } else if (/\s+/g.test(data.username)) {
      errors.usernameError = "No whitespace characters";
    } else if (data.username.length < 3) {
      errors.usernameError = "Atleast 3 characters";
    }

    if (!data.password) {
      errors.passwordError = "Password is required.";
    } else if (data.password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters.";
    } else if (/\s+/g.test(data.password)) {
      errors.passwordError = "No whitespace characters";
    }

    return errors;
  };

  const handleLogin = async () => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await loginUser(formData.username, formData.password);
        if (response.status === 200) {
          dispatch(setIsAuth(true));
        }
      } catch (error) {
        Alert.alert("Failed to login", `${error.response.data.detail}`);
      }
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} style={styles.headerImg} alt="logo" />
          <Text style={styles.title}>Hungry Hub</Text>
          <Text style={styles.subTitle}>
            Please sign in to your existing account
          </Text>
        </View>

        <View>
          <View style={styles.unameCont}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={styles.inputField}
              value={formData.username}
              onChangeText={(value) => handleChange("username", value)}
              placeholder="username"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={16}
              autoFocus={true}
              blurOnSubmit={false}
              ref={firstRef}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text;
                if (!text) return;
                secondRef.current.focus();
              }}
            />
            {errors.usernameError && (
              <Text style={styles.errorTxt}>{errors.usernameError}</Text>
            )}
          </View>

          <View>
            <Text style={styles.inputText}>Password</Text>
            <View>
              <TextInput
                style={styles.inputField}
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                placeholder="********"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                maxLength={20}
                ref={secondRef}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon.EyeOff width={22} height={22} stroke="#CCC" />
                ) : (
                  <Icon.Eye width={22} height={22} stroke="#CCC" />
                )}
              </TouchableOpacity>
            </View>
            {errors.passwordError && (
              <Text style={styles.errorTxt}>{errors.passwordError}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signup}>
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
    marginVertical: 5,
  },
  unameCont: {
    marginBottom: 15,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorTxt: {
    color: "red",
  },
  eyeBtn: {
    position: "absolute",
    padding: 8,
    right: 8,
    bottom: 10,
  },
  button: {
    alignItems: "center",
    marginVertical: 15,
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
  signup: {
    fontSize: 16,
  },
  signupTxt: {
    textDecorationLine: "underline",
    color: "#58AD53",
    fontSize: 16,
  },
});
