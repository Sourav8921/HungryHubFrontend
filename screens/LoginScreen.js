import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as Icon from "react-native-feather";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/auth";
import { loginUser } from "../services/api/AuthService";
import Loading from "../components/Loading";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const response = await loginUser(formData.username, formData.password);
        if (response.status === 200) {
          dispatch(setIsAuth(true));
        }
      } catch (error) {
        Alert.alert("Failed to login", `${error.response.data.detail}`);
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
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,50,0,0.6)", "transparent"]}
        style={styles.background}
        start={[1, 0.5]}
        end={[0, 0.5]}
      />
      <StatusBar />
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subTitle}>
            To keep connected with us please login with your personal info
          </Text>
        </View>
        <View>
          {/* <Text style={styles.inputText}>Username</Text> */}
          <TextInput
            style={styles.inputField}
            value={formData.username}
            onChangeText={(value) => handleChange("username", value)}
            placeholder="Username"
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
          {/* <Text style={styles.inputText}>Password</Text> */}
          <View>
            <TextInput
              style={styles.inputField}
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              placeholder="Password"
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
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signup}>
            Don't have an account? <Text style={styles.signupTxt}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58AD53",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  headerSection: {
    flex: 1,
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
    bottom: 6,
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
  signup: {
    fontSize: 14,
  },
  signupTxt: {
    color: "#58AD53",
    fontSize: 14,
    fontWeight: "600",
  },
});
