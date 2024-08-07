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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/auth";
import { loginUser } from "../services/api/AuthService";


const logoImg = require("../assets/images/logo_only.png");

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,
    // or password changes
    validateForm();
  }, [username, password]);

  const validateForm = () => {
    let errors = {};

    if (!username) {
      errors.usernameError = "Username is required.";
    } else if (/\s+/g.test(username)) {
      errors.usernameError = "No whitespace characters";
    }  else if (username.length < 3) {
      errors.usernameError = "Atleast 3 characters"
    }

    if (!password) {
      errors.passwordError = "Password is required.";
    } else if (password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  //destructuring the errors object
  const { usernameError, passwordError } = errors;

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        const response = await loginUser(username, password);
        if (response.status === 200) {
          dispatch(setIsAuth(true))
        }
      } catch (error) {
        console.error(error);
        alert("Failed to login");
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

        <View className="space-y-2">
          <View>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={styles.inputField}
              value={username}
              onChangeText={setUsername}
              placeholder="username"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={10}
            />
            <Text style={styles.errorTxt}>{usernameError}</Text>
          </View>

          <View>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.inputField}
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              maxLength={20}
            />
            <Text style={styles.errorTxt}>{passwordError}</Text>
            <TouchableOpacity
              className="absolute right-4 bottom-9"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={25}
                color="#CCC"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
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
    marginVertical: 5,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorTxt: {
    color: "red",
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
