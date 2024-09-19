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
import { useEffect, useRef, useState } from "react";
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
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  // useEffect(() => {
  //   // Trigger form validation when name,
  //   // or password changes
  //   validateForm();
  // }, [username, password]);

  const validateUsername = (username) => {
    let error = "";
    if (!username) {
      error = "Username is required.";
    } else if (/\s+/g.test(username)) {
      error = "No whitespace characters";
    } else if (username.length < 3) {
      error = "Atleast 3 characters";
    }
    setErrors((prevErrors) => ({ ...prevErrors, usernameError: error }));
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const validatePassword = (password) => {
    let error = '';
    if (!password) {
      error = "Password is required.";
    } else if (password.length < 6) {
      error = "Password must be at least 6 characters.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, passwordError: error }));
    setIsFormValid(Object.keys(errors).length === 0);
  }

  
  // const validateForm = () => {
  //   let errors = {};

  //   if (!username) {
  //     errors.usernameError = "Username is required.";
  //   } else if (/\s+/g.test(username)) {
  //     errors.usernameError = "No whitespace characters";
  //   } else if (username.length < 3) {
  //     errors.usernameError = "Atleast 3 characters";
  //   }

  //   if (!password) {
  //     errors.passwordError = "Password is required.";
  //   } else if (password.length < 6) {
  //     errors.passwordError = "Password must be at least 6 characters.";
  //   }

  //   setErrors(errors);
  //   setIsFormValid(Object.keys(errors).length === 0);
  // };

  const checkForErrors = () => {
    // Perform validation for both fields
    validateUsername(username);
    validatePassword(password);
  
    // Check if both errors are empty
    if (!errors.usernameError && !errors.passwordError) {
      setIsFormValid(true);
      // Proceed to login or further action
      handleLogin();
    } else {
      setIsFormValid(false);
    }
  };

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        const response = await loginUser(username, password);
        if (response.status === 200) {
          dispatch(setIsAuth(true));
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
              onChangeText={(value) => {
                setUsername(value);
                validateUsername(value)
              }}
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
            {errors.usernameError && <Text style={styles.errorTxt}>{errors.usernameError}</Text>}
          </View>

          <View>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.inputField}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                validatePassword(value)
              }}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              maxLength={20}
              ref={secondRef}
            />
            <Text style={styles.errorTxt}>{errors.passwordError}</Text>
            <TouchableOpacity
              className="absolute p-2 right-2 bottom-7"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={25}
                color="#CCC"
              />
            </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity style={styles.button} onPress={() => checkForErrors()}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>

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
  signupTxt: {
    textDecorationLine: "underline",
    color: "#58AD53",
  },
});
