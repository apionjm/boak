import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ImageBackground } from "react-native";

export default function Deqt({route, navigation }) {
  const image = {
    uri: "https://i.pinimg.com/originals/57/20/cb/5720cbd912ded0ae5edcd767d6d843fa.jpg",
  };
  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [creator, setIsCreator] = useState(false);
  //console.log(data);

  //fetch user data
  useEffect(() => {
    fetch(
      "https://delinkquent-95b32-default-rtdb.firebaseio.com/submittedDqent/" +
      route.params.itemId+
        ".json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  //end here
  //const myimg = data.propic;
  return (
    <ImageBackground style={styles.image}>
      <View>
        <ScrollView
          style={{
            height: "100%",
            paddingHorizontal: 50,
            paddingTop: 10,
            zIndex: 100,
          }}
        >
          <StatusBar style="dark" />
          <View
            style={{
              borderRadius: 25,
              padding: 18,
              backgroundColor: "white",
              flexDirection: "column",
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            <View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Full Name.</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.FirstName : "Firstname"}{" "}
                {data ? data.LastName : "Lastname"}
              </Text>
            </View>
            <View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Loaner</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.Loaner : "Loaner"}
              </Text>
            </View>
            <View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>TRN</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.Trn : "Trn"}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 2,
                paddingHorizontal: 20,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: -6 }}>
                Phone Number.
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.Tel : "1876-000-0000"}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 2,
                paddingHorizontal: 20,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Address.</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.Address : "Address"}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 2,
                paddingHorizontal: 20,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: -4 }}>
                Comment
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.comment : "Comment"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
    marginHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 150,
    justifyContent: "center",
    backgroundColor: "white",
    margin: 30,
    marginBottom: -5,
    zIndex: 3,
  },
  Image: {
    height: "100%",
    backgroundColor: "#0984d6",
  },
});
