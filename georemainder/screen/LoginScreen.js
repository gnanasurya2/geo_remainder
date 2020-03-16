import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet, Alert } from "react-native";
import Firebase from "../constants/firebase";
// using firebase email and password authentication
var db = Firebase.auth();
function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function signUpHandler() {
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
  }
  function loginHandler() {
    db.signInWithEmailAndPassword(email, password).then(function(user) {
      console.log(user.user.email);
      props.navigation.navigate({
        routeName: "home"
      });
    });
  }
  return (
    <View style={styles.outer_container}>
      <View style={styles.login_container}>
        <View style={styles.section_container}>
          <Text style={styles.title}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.section_container}>
          <Text style={styles.title}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.button_container}>
        <Button
          title="Login"
          style={styles.button}
          color="green"
          onPress={loginHandler}
        />
        <Button
          title="Sign Up"
          style={styles.button}
          color="orange"
          onPress={signUpHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer_container: {
    flex: 1,
    backgroundColor: 0xaaaaaa,
    justifyContent: "center",
    alignItems: "center"
  },
  login_container: {
    flexDirection: "column"
  },
  section_container: {
    minWidth: "90%",
    marginLeft: 25
  },
  title: {
    fontSize: 20
  },
  input: {
    backgroundColor: "white",
    height: 35,
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "green"
  },
  button_container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30
  },
  button: {
    minWidth: 30,
    padding: 20
  }
});
export default LoginScreen;
