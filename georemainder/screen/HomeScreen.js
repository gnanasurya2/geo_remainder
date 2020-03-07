import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Button from "../components/Button";

import { Entypo } from "@expo/vector-icons";
import Color from "../constants/colors";

function homeScreen(props) {
  const [dates, setDates] = useState();
  const [marked, setMarked] = useState({});

  function setDateHandler(date) {
    setDates(date);
    var mark = new Object();
    mark[date] = {
      selected: true
    };
    setMarked(mark);
    console.log(date);
  }
  return (
    <View style={styles.outer_container}>
      <View style={styles.container}>
        <Calendar
          style={styles.calender}
          onDayPress={date => setDateHandler(date.dateString)}
          markedDates={marked}
        />
      </View>
      <Button
        title={<Entypo name="plus" size={35} color="#E97E7F" />}
        onPress={() => {
          props.navigation.navigate({
            routeName: "remainder"
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer_container: {
    flex: 1
  },
  container: {
    width: "100%",
    height: "40%",
    backgroundColor: Color.primary
  },
  calender: {
    flex: 1
  },
  title: {
    fontSize: 25,
    color: "white"
  }
});

export default homeScreen;