import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Button
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
function ca() {
  console.log("working");
}
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
  const [finalLocation, setFinalLocation] = useState();
  async function verifyPermissions() {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permissions to use the app",
        [{ text: "Okay" }]
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
        [{ text: "Okay" }]
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
    height: Dimensions.get("window").height / 2
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20
  }
});
export default RemainderScreen;
