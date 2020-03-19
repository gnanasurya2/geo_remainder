import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";
import * as authActions from "../actions/auth";
import firebase from "../constants/firebase";
const db = firebase.auth();
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    if (email != "" && password != "") {
      if (password.length >= 6) {
        db.createUserWithEmailAndPassword(email, password).then(function() {
          Alert.alert("try again", [
            {
              text: "okay"
            }
          ]);
        });
        setEmail("");
        setPassword("");
      } else {
        Alert.alert("Password must be atleast 6 character", [
          {
            text: "okay"
          }
        ]);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={20}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <ScrollView style={styles.card}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <View style={styles.button_container}>
            <Button
              title="Login"
              color={Colors.primary}
              onPress={signupHandler()}
            />
            <Button title="Switch to Sign up" color={Colors.primary} />
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
    // backgroundColor: "black"
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    minWidth: "80%",
    minHeight: "40%",
    maxHeight: 200,
    backgroundColor: Colors.background,
    borderRadius: 20,
    elevation: 12
  },
  button_container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    margin: 30,
    fontSize: 20,
    paddingLeft: 7
  }
});

export default Login;
