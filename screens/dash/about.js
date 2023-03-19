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

export default function About() {
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
      <StatusBar style="dark" />
      <ScrollView>
      <View style={{alignItems: "center", paddingVertical: 120,}}>
        <Text style={{ fontSize: 45, color: "white", fontFamily: "tuwir" }}>
          Delinkquent
          </Text>
          <Text style={{ fontSize: 25, color: "white", fontFamily: "tuwir" }}>
          Jamaica
          </Text>
      </View>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            padding: 2,
            position: "relative",
            alignSelf: "center",
          }}
        >
          Mission Statement
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            paddingHorizontal: 30,
            padding: 2,
            paddingBottom: 25,
            position: "relative",
          }}
        >
        Delinkquent aims at providing services to companies so that they never have to deal with a delinquent customer/person
          so that there business can be sucessfull. 
        </Text>
        <View style={styles.circle}></View>
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
    backgroundColor: "#0984d6",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 3,
  },

  login: {
    flex: 1,
    zIndex: 2,
    width: "100%",
    height: 600,
    alignItems: "center",
    marginBottom: 80,
  },
  name: {
    color: "white",
    marginTop: 40,
    padding: 5,
    fontSize: 11,
    height: 40,
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#02263d",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
