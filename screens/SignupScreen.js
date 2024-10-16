import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as Icon from "react-native-feather";
import { registerUser } from "../services/api/AuthService";

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
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

    if (!data.email) {
      errors.emailError = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.emailError = "Email is invalid.";
    }

    if (!data.password) {
      errors.passwordError = "Password is required.";
    } else if (data.password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters.";
    } else if (/\s+/g.test(data.password)) {
      errors.passwordError = "No whitespace characters";
    }

    if (data.password !== data.password2) {
      errors.password2Error = "Password should be the same";
    }

    return errors;
  };

  const handleSignup = async () => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await registerUser(
          formData.username,
          formData.email,
          formData.password
        );
        if (response.status === 201) {
          navigation.navigate("Login");
        }
        alert("Created account");
      } catch (error) {
        Alert.alert(
          "Failed to register",
          `${error.response.data.username || error.response.data.email}`
        );
      }
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 50,
          justifyContent: "center",
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>HungryHub</Text>
          <Text style={styles.subTitle}>
            Please fill in the details to create account
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={styles.inputField}
              value={formData.username}
              onChangeText={(value) => handleChange("username", value)}
              placeholder="username"
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
            {errors.usernameError && (
              <Text style={styles.errorTxt}>{errors.usernameError}</Text>
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
              ref={secondRef}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text;
                if (!text) return;
                thirdRef.current.focus();
              }}
            />
            {errors.emailError && (
              <Text style={styles.errorTxt}>{errors.emailError}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <View>
              <TextInput
                style={styles.inputField}
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                placeholder="********"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                maxLength={25}
                blurOnSubmit={false}
                ref={thirdRef}
                onSubmitEditing={(e) => {
                  const text = e.nativeEvent.text;
                  if (!text) return;
                  fourthRef.current.focus();
                }}
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Re-type password</Text>
            <View>
              <TextInput
                style={styles.inputField}
                value={formData.password2}
                onChangeText={(value) => handleChange("password2", value)}
                placeholder="********"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                maxLength={25}
                ref={fourthRef}
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
            {errors.password2Error && (
              <Text style={styles.errorTxt}>{errors.password2Error}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignup()}
          >
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>
            Already have an account?{" "}
            <Text style={styles.loginTxt}>Login up</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "500",
  },
  eyeBtn: {
    position: "absolute",
    padding: 8,
    right: 8,
    bottom: 10,
  },
  errorTxt: {
    color: "red",
  },
  button: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#58AD53",
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  login: {
    fontSize: 16,
  },
  loginTxt: {
    textDecorationLine: "underline",
    color: "#58AD53",
    fontSize: 16,
  },
});
