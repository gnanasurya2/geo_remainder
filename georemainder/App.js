import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as Fonts from "expo-font";
import { AppLoading } from "expo";
import Color from "./constants/colors";
import MainNavigator from "./navigation/mainNavigation";
// function fecthFonts() {
//   return Fonts.loadAsync.bind({
//     circular: require("./assets/fonts/Circular Std Book.otf"),
//     circularR: require("./assets/fonts/CircularStd-Book.otf")
//   });
// }
//always name the function same as the file name
export default function App() {
  return (
    //View component is similar to that of div in HTML.
    //mainNavigator is navigation tag which we will use in the app .It's a custom component which is imported in line 6.
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}
//style is a variable which contains all styles required for the page.
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    color: Color.primary
  }
});
//Color.primary is the color defined in color.js .It's always recommended to stores the colors that we will use in a separate file as it will easier to use and change a color at a single place.
