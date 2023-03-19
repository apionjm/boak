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

export default function Account({ navigation }) {
  const image = {
    uri: "https://i.pinimg.com/originals/57/20/cb/5720cbd912ded0ae5edcd767d6d843fa.jpg",
  };
  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //console.log(data);

  //fetch user data
  useEffect(() => {
    fetch(
      "https://delinkquent-95b32-default-rtdb.firebaseio.com/users/" +
        uid +
        ".json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log(data);
  }, []);
  //end here
  const myimg = data.propic;
  return (
    <ImageBackground>
      <View>
        <ScrollView
          style={{
            height: "100%",
            paddingHorizontal: 50,
            alignContent: "center",
            paddingTop: 10,
            zIndex: 100,
          }}
        >
          <StatusBar style="dark" />
          <View style={styles.logo}>
            {myimg ? (
              <Image
                style={{
                  height: 220,
                  width: 220,
                  borderRadius: 200,
                  borderWidth: 10,
                  padding: 15,
                  borderColor: "white",
                }}
                source={{
                  uri: data.propic,
                }}
              />
            ) : (
              <View style={styles.logosrc}>
                <Text style={{ fontSize: 35, color: "#0984d6", fontFamily: "tuwir" }}>
                  Delinkquent
                  </Text>
                  <Text style={{ fontSize: 25, color: "#0984d6", fontFamily: "tuwir", alignSelf: "center" }}>
                  Jamaica
                  </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              justifyContent: "space-between",
              marginTop: -30,
              marginBottom: 10,
              width: "100%",
            }}
          >
          
              <View
                style={{
                  width: 50,
                  padding: 8,
                  backgroundColor: "white",
                  borderRadius: 50,
                  zIndex: 100,
                }}
              >
                <Feather
                  onPress={() => navigation.navigate("Edit Account")}
                  name="edit"
                  size={34}
                  color="black"
                />
              </View>
            <View
              style={{
                padding: 8,
                width: 50,
                backgroundColor: "black",
                borderRadius: 50,
                zIndex: 100,
              }}
            >
              <Feather
                onPress={() => navigation.navigate("Profile Photo")}
                name="image"
                size={34}
                color="white"
              />
            </View>
          </View>

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
            {/*<View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Full Name.</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data.FirstName ? data.FirstName : "Firstname"}{" "}
                {data.LastName ? data.LastName : "Lastname"}
              </Text>
          </View>*/}
          <View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Business Name.</Text>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.businessName : "Bank"}
              </Text>
            </View>
            <View style={{ paddingVertical: 2, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12, marginBottom: -6 }}>Email.</Text>
              <Text style={{ fontSize: 15, marginBottom: 4 }}>
                {isLoading ? <ActivityIndicator /> : ""}
                {data ? data.Email : "Email"}
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
