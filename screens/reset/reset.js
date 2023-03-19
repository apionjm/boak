import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, Component } from "react";
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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function Reset({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");

  const [email, setEmail] = useState("");
  const auth = getAuth();

  //login
  const resetUser = () => {
    //setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(function (user) {
        alert("Please check your email.");
        console.log("not working");
        navigation.navigate("login");
        //console.log('working');
      })
      .catch(function (e) {
        console.log(e);
        //console.log('not working');
      });
  };

  //<View>Text onPress={() => navigation.navigate('About')} style={styles.loginText}>About us</Text>
  //<Text style={styles.name}>N'S Island Loan Ⓒ 2021 - {currentDate} </Text>

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
      <View style={styles.logosrc}>
        <Text style={{ fontSize: 45, color: "white", fontFamily: "tuwir" }}>
          Delinkquent
          </Text>
          <Text style={{ fontSize: 25, color: "white", fontFamily: "tuwir" }}>
          Jamaica
          </Text>
      </View>
      <View style={styles.loginform}>
        <View style={styles.login}>
          <View style={styles.inputItems}>
            <Ionicons name="mail-outline" size={16} color="gray" />
            <TextInput
              placeholder={"Email"}
              keyboardType="email-address"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={resetUser}>
            <Text style={styles.loginText}>Reset Password</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontSize: 10,
              padding: 2,
              position: "relative",
            }}
          >
            Delinkquent © 2023 - {currentDate}
          </Text>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "70%",
    padding: 10,
    borderColor: "#bfbfbf",
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputItems: {
    height: 50,
    flexDirection: "row",
    width: "70%",
    margin: 12,
    borderColor: "#bfbfbf",
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: "100%",
    overflow: "scroll",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0984d6",
  },
  logo: {
    width: "70%",
    height: "40%",
    padding: 100,
    marginTop: "20%",
    position: "absolute",
    zIndex: 3,
  },

  login: {
    flex: 1,
    zIndex: 2,
    width: "90%",
    height: "50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loginform: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
    borderTopRightRadius: 500,
    flex: 1,
    borderColor: "#011f33",
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#0984d6",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  loginText: {
    color: "white",
    height: 20,
  },
  logosrc: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    width: "100%",
  },
  devText: {
    fontSize: 6,
    color: "white",
    backgroundColor: "black",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    padding: 3,
  },
});
