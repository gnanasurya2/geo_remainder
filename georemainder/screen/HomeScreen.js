import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  YellowBox,
  FlatList
} from "react-native";
import { Calendar } from "react-native-calendars";
import Button from "../components/Button";
import Card from "../components/Card";
import _ from "lodash";
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
import { Entypo } from "@expo/vector-icons";
import Color from "../constants/colors";

import firebase from "../constants/firebase";

const db = firebase.firestore().collection("remainders");

function homeScreen(props) {
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState();
  const [marked, setMarked] = useState({});
  const [remainders, setRemainders] = useState([]);
  function setDateHandler(date) {
    setDates(date);
    var mark = new Object();
    mark[date] = {
      selected: true
    };
    setMarked(mark);
    console.log(date);
  }
  var i = 0;
  useEffect(() => {
    return db.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { content, location, title } = doc.data();
        list.push({
          id: doc.id,
          content,
          location,
          title
        });
      });
      setRemainders(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  function Item({ content, location, title }) {
    return <Card title={title} location={location} content={content} />;
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
      <ScrollView>
        <FlatList
          data={remainders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              location={item.location}
              content={item.content}
            />
          )}
        />
      </ScrollView>
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
