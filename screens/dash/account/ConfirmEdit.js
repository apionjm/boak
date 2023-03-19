import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ConfirmEdit({ navigation }) {
  const [text, onChangeText] = React.useState("Username");
  const [textP, onChangeTextPassword] = React.useState("********");

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    //var date = new Date().getDate(); //Current Date
    //var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    //var hours = new Date().getHours(); //Current Hours
    //var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(year);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <Image
          style={styles.logo}
          source={{
            uri: "https://secureservercdn.net/198.71.190.156/5n3.21e.myftpupload.com/wp-content/uploads/2022/06/MENU-LOGO-1-2048x2048.png",
          }}
        />
        <Text
          style={{
            fontSize: 16,
            padding: 10,
            alignItems: "center",
          }}
        >
          Your Account Can only be modified by an admin After user has submitted
          profile.
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Profile Photo")}
        >
          <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "70%",
    margin: 12,
    padding: 10,
    paddingLeft: 25,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 80,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 3,
    marginTop: 150,
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#0984d6",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  loginText: {
    color: "white",
    height: 20,
  },
});
