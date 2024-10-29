import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as Icon from "react-native-feather";
import { registerUser } from "../services/api/AuthService";
import Loading from "../components/Loading";

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Sign Up</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subTitle}>
              Please fill in the details to create account
            </Text>
          </View>
          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputText}>Username</Text> */}
            <TextInput
              style={styles.inputField}
              value={formData.username}
              onChangeText={(value) => handleChange("username", value)}
              placeholder="Username"
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
            {/* <Text style={styles.inputText}>Email address</Text> */}
            <TextInput
              style={styles.inputField}
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Email"
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
            {/* <Text style={styles.inputText}>Password</Text> */}
            <View>
              <TextInput
                style={styles.inputField}
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                placeholder="Password"
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
            {/* <Text style={styles.inputText}>Re-type password</Text> */}
            <View>
              <TextInput
                style={styles.inputField}
                value={formData.password2}
                onChangeText={(value) => handleChange("password2", value)}
                placeholder="Re-password"
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}>
              Already have an account?{" "}
              <Text style={styles.loginTxt}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58AD53",
  },
  headerSection: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    padding: 28,
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ffffff",
    flex: 4,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  subTitle: {
    color: "gray",
  },
  inputField: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f2f3f4",
    padding: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "500",
  },
  eyeBtn: {
    position: "absolute",
    padding: 8,
    right: 8,
    bottom: 7,
  },
  errorTxt: {
    color: "red",
  },
  button: {
    alignItems: "center",
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
  login: {
    fontSize: 14,
  },
  loginTxt: {
    color: "#58AD53",
    fontSize: 14,
    fontWeight: "600",
  },
});
