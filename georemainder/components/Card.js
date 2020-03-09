import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from "react-native";

import Color from "../constants/colors";

function Card(props) {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp style={styles.outer_container}>
      <View style={styles.container}>
        <View style={styles.color_strip}></View>
        <View style={styles.remainder_container}>
          <View style={styles.remainder_title_container}>
            <Text style={styles.remainder_title}>
              {" "}
              Things to buy in market{" "}
            </Text>
          </View>
          <View style={styles.remainder_date_container}>
            <Text style={styles.remainder_date_title}>Date :</Text>
            <Text style={styles.remainder_date_content}>23-03-2020</Text>
          </View>
          <View style={styles.remainder_content_container}>
            <Text style={styles.remainder_content}>Toothpaste , Brush</Text>
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
}

const styles = StyleSheet.create({
  outer_container: {
    borderRadius: 20
  },
  container: {
    flexDirection: "row",
    width: "90%",
    minHeight: 150,
    maxHeight: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20
  },
  color_strip: {
    width: 15,
    height: "100%",
    backgroundColor: Color.highlight,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  remainder_container: {
    flexDirection: "column",
    margin: 10
  },
  remainder_title: {
    fontSize: 20,
    fontWeight: "800",
    color: Color.primary,
    paddingBottom: 10
  },
  remainder_title_container: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: Color.background
  },
  remainder_content_container: {
    flex: 1,
    justifyContent: "center"
  },
  remainder_content: {
    fontSize: 17
  },
  remainder_date_container: {
    flexDirection: "row",
    marginTop: 10
  },
  remainder_date_title: {
    fontSize: 18,
    color: Color.primary
  },
  remainder_date_content: {
    fontSize: 18,
    marginLeft: 10
  }
});

export default Card;
