//It's always advised to create your own components in a separate file to increase reusability of code.
import React from "react";
//TouchableNativeFeedback is android component which is used to create a effect of android button.
//Platform is used to find which platform is the mobile running.
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";

import Color from "../constants/colors";
//props are the variable which are passed from other files.
function Button(props) {
  let Touchable = TouchableNativeFeedback;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableOpacity;
  }
  //props.onPress is an variable which is sent from other file.
  return (
    <Touchable style={styles.button} onPress={props.onPress}>
      <View>
        <Text>{props.title}</Text>
      </View>
    </Touchable>
  );
}
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 3,
    margin: 15,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20
  }
});
//export the Button function.
export default Button;
