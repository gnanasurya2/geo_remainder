import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

// import * as location from "expo-location";
function RemainderScreen(props) {
  return (
    <View style={styles.outer_container}>
      <MapView style={styles.map} />
      <Text>as</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  outer_container: {
    flex: 1
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2
  }
});
export default RemainderScreen;
