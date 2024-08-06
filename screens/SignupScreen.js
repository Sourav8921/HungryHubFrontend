import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [username, email, password, password2]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!username) {
      errors.usernameError = "Username is required.";
    } else if (/\s+/g.test(username)) {
      errors.usernameError = "No whitespace characters";
    }

    // Validate email field
    if (!email) {
      errors.emailError = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.emailError = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.passwordError = "Password is required.";
    } else if (password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters.";
    }

    if (password !== password2) {
      errors.password2Error = "Password should be the same";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const {
    usernameError,
    emailError,
    passwordError,
    password2Error,
  } = errors;

  const registerUser = async () => {
    if (isFormValid) {
      try {
        const postData = {
          username,
          email,
          password,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          `${BASE_URL}/api/users/register/`,
          postData,
          config
        );
        console.log("Response:", response.data);
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Form is invalid, display error messages
      alert("Form has errors. Please correct them.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Hungry Hub</Text>
          <Text style={styles.subTitle}>
            Please sign in to your existing account
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={styles.inputField}
              value={username}
              onChangeText={setUsername}
              placeholder="username"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={15}
            />
            <Text style={styles.errorTxt}>{usernameError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email address</Text>
            <TextInput
              style={styles.inputField}
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              maxLength={30}
            />
            <Text style={styles.errorTxt}>{emailError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.inputField}
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              maxLength={25}
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Re-type password</Text>
            <TextInput
              style={styles.inputField}
              value={password2}
              onChangeText={setPassword2}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              maxLength={25}
            />
            <Text style={styles.errorTxt}>{password2Error}</Text>
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => registerUser()}
          >
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            Already have an account?{" "}
            <Text style={styles.signupTxt}>Login up</Text>
          </Text>
        </TouchableOpacity>
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
    marginBottom: 10,
  },
  headerImg: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 20,
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
