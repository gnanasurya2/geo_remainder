import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";

import Color from "../constants/colors";

function Button(props) {
  let Touchable = TouchableNativeFeedback;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableOpacity;
  }
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
export default Button;
