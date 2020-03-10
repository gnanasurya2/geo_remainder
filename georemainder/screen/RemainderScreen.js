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

import firebase from "../constants/firebase";
import colors from "../constants/colors";

const db = firebase.firestore().collection("remainders");

function RemainderScreen(props) {
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
  const [finalLocation, setFinalLocation] = useState();
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
    } catch (err) {
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

  function pressHandler(event) {
    setMarker(event.nativeEvent.coordinate);
    setMapRegion({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }

  function saveLocationHandler() {
    var mark = marker;
    setFinalLocation(mark);
    console.log(finalLocation);
  }
  async function saveRemainderHandler() {
    await db.add({
      location: marker,
      title: remainderTitle,
      content: remainderContent
    });
    setRemainderTitle("");
    setRemainderContent("");
    props.navigation.navigate({
      routeName: "home"
    });
  }
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
        <Button
          title="save location"
          style={styles.button}
          onPress={saveLocationHandler}
        />
      </View>
      <View style={styles.text_container}>
        <Text style={styles.title}> Enter the title : </Text>
        <TextInput
          style={styles.text}
          onChangeText={text => setRemainderTitle(text)}
          value={remainderTitle}
        />
      </View>
      <View style={styles.text_container}>
        <Text style={styles.title}> Enter the content : </Text>
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
