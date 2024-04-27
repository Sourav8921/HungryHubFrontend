import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const logoImg = require("../assets/Logo.png");

export default function SignupScreen({navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Hungry Hub</Text>
                    <Text style={styles.subTitle}>
                        Please sign in to your existing account
                    </Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputText}>Full name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={name}
                            onChangeText={setName}
                            placeholder="John Doe"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputText}>Email address</Text>
                        <TextInput
                            style={styles.inputField}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="email@example.com"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            style={styles.inputField}
                            value={pass}
                            onChangeText={setPass}
                            placeholder="********"
                            secureTextEntry
                        />
                    </View>
                    <View>
                        <Text style={styles.inputText}>Re-type password</Text>
                        <TextInput
                            style={styles.inputField}
                            value={pass2}
                            onChangeText={setPass2}
                            placeholder="********"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text>Already have an account? <Text style={styles.signupTxt}>Login up</Text></Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f2f3f4",
        justifyContent: 'center'
    },
    header: {
        marginVertical: 36,
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
    inputField: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
        marginVertical: 10,
    },
    inputText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#58AD53',
        height: 50,
        borderRadius: 10,
        padding: 10,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signupTxt: {
        textDecorationLine: 'underline',
        color: '#58AD53',
    }
});
