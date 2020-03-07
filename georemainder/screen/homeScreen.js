import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import Color from "../constants/colors";
function homeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Calend</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    color: Color.primary
  }
});

export default homeScreen;
