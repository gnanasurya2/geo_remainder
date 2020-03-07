import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as Fonts from "expo-font";
import { AppLoading } from "expo";
import Color from "./constants/colors";

import HomeScreen from "./screen/homeScreen";

import MainNavigator from "./navigation/mainNavigation";
// function fecthFonts() {
//   return Fonts.loadAsync.bind({
//     circular: require("./assets/fonts/Circular Std Book.otf"),
//     circularR: require("./assets/fonts/CircularStd-Book.otf")
//   });
// }
export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
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
