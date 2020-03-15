import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
  TextInput,
  Text
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";

import firebase from "../constants/firebase";
import colors from "../constants/colors";

//db is the variable name of the firebase database with the name of "remainders".
const db = firebase.firestore().collection(firebase.auth().currentUser.email);
//task manager is to define tasks that will in the background or when the app is closed
//the first variable is the name of the task and second one is a function which will execute when there is any changes in the task
TaskManager.defineTask("g", ({ data: { eventType, region }, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("I did this:", region);
  }
});
function RemainderScreen(props) {
  //List of useState hooks
  const [mapRegion, setMapRegion] = useState({
    latitude: 23,
    longitude: 9,
    latitudeDelta: 10,
    longitudeDelta: 10
  });
  const [marker, setMarker] = useState({
    latitude: 23.845753230770367,
    longitude: 91.41600955277681
  });
  const [remainderTitle, setRemainderTitle] = useState("");
  const [remainderContent, setRemainderContent] = useState("");
  //The below function is to get permission for location from the user using expo-permission and this is a async function which means that the compiler waits for the function to get over in a separate thread rather than in a main thread.
  async function verifyPermissions() {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permissions to use the app",
        [
          {
            text: "Okay"
          }
        ]
      );
      return false;
    }
    return true;
  }
  //The below function is to get locations from user using expo-locations package.
  async function locationHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
      console.log(await TaskManager.getRegisteredTasksAsync());
      //The below function is to start geo fencing both in the foreground and in the background as well. We have to pass as array of objects as parameter.
      await Location.startGeofencingAsync("g", [
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          radius: 30
        },
        {
          latitude: location.coords.latitude - 2,
          longitude: location.coords.longitude - 2,
          radius: 30
        },
        {
          latitude: location.coords.latitude - 10,
          longitude: location.coords.longitude - 20,
          radius: 30
        }
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert(
        "could not fetch location",
        "Please try again later or pick a location on map",
        [
          {
            text: "Okay"
          }
        ]
      );
    }
  }
  //The below function is to detect touch on map and place a marker on te clicked location and move the map to focus on the marker.
  function pressHandler(event) {
    setMarker(event.nativeEvent.coordinate);
    setMapRegion({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }
  //The below function is add the remainder to the database with location , title and content
  //db is variable name of the firebase database.
  async function saveRemainderHandler() {
    if (remainderTitle != "" && remainderContent != "") {
      await db.add({
        location: marker,
        title: remainderTitle,
        content: remainderContent
      });
    }
    setRemainderTitle("");
    setRemainderContent("");
    console.log(await TaskManager.getRegisteredTasksAsync());
    console.log();
    // props.navigation.navigate({
    //   routeName: "home"
    // });
  }
  //MapView is the tag which renders the map google and it takes Marker as it children.
  return (
    <View style={styles.outer_container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={event => pressHandler(event)}
      >
        <Marker coordinate={marker} />
      </MapView>
      <View style={styles.button_container}>
        <Button
          title="get my location"
          onPress={locationHandler}
          style={styles.button}
        />
      </View>
      <View style={styles.text_container}>
        <Text style={styles.title}> Enter the title: </Text>
        <TextInput
          style={styles.text}
          onChangeText={text => setRemainderTitle(text)}
          value={remainderTitle}
        />
      </View>
      <View style={styles.text_container}>
        <Text style={styles.title}> Enter the content: </Text>
        <TextInput
          style={styles.text}
          onChangeText={text => setRemainderContent(text)}
          value={remainderContent}
        />
      </View>
      <View style={styles.save_container}>
        <Button
          title="save"
          style={styles.save_button}
          onPress={saveRemainderHandler}
        />
      </View>
    </View>
  );
}
//Stylesheet for the app
const styles = StyleSheet.create({
  outer_container: {
    flex: 1,
    alignItems: "center"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20
  },
  text_container: {
    width: "90%",
    marginTop: 20,
    justifyContent: "center",
    textAlign: "left"
  },
  text: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  save_container: {
    marginTop: 20,
    borderRadius: 10
  },
  save_button: {
    borderRadius: 30,
    padding: 50
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    color: colors.primary,
    marginBottom: 10
  }
});
export default RemainderScreen;
