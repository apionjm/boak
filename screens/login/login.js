import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//import { auth } from 'firebase/auth';
import firebase from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword,} from "firebase/auth";
import axios from "axios";

export default function Login({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signInError, setSignInError] = useState("");
  const [emailError, setEmailError] = useState("");

  //changes password icon and visibility
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  //login

  /*const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigation.navigate('Home');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setSignInError(error.message);
    });*/

    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        year
      );
      //console.log(uid);
      console.log(currentDate);
    }, []);

  const auth = getAuth();

  const signIn = () => {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else if (email.indexOf("@") < 1) {
      setEmailError("This is not an email");
    } else {
      emailValid = true;
    }
    //setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        if (userCredential.user.emailVerified != true){
          setEmailError("The email you are trying to use isn't verified.");

        }else{
          //var user = userCredential.user.emailVerified;
          //const uid = user.uid;

          navigation.replace("Home");
          //console.log(uid);
          // ...
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const loginErrorMessage = "Email or password Incorrect";
        setEmailError("Email or password is incorrect");
        //signInError(error.message);
        //console.log("not working");
      });
  };

  //<View>Text onPress={() => navigation.navigate('About')} style={styles.loginText}>About us</Text>
  //<Text style={styles.name}>N'S Island Loan Ⓒ 2021 - {currentDate} </Text>
  const [fontsLoaded] = useFonts({
    rompies: require("../../assets/fonts/Roboto-Black.ttf"),
    grass: require("../../assets/fonts/GrassRoot.otf"),
    tuwir: require("../../assets/fonts/Tuwir.otf"),
    magic: require("../../assets/fonts/MagicHour.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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
          <View style={styles.inputItems}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={16}
              color="gray"
            />
            <TextInput
              placeholder={"Password"}
              style={styles.input}
              leftIcon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              onChangeText={(text) => setPassword(text)}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            <MaterialCommunityIcons
              onPress={handlePasswordVisibility}
              name={rightIcon}
              size={18}
              color="#c2c2c2"
            />
          </View>

          {signInError ? (
            <ErrorMessage error={loginErrorMessage} visible={true} />
          ) : null}
          {emailError.length > 0 && (
            <Text style={{ fontSize: 12 }}> {emailError}</Text>
          )}

          <View style={{ width: "70%",}}>
          <Text
              onPress={() => navigation.push("Register")}
              style={{
                fontSize: 13,
                alignSelf: "flex-start",
                marginTop: 10,
                color: "gray",
              }}
            >
              Don't have an account?.
            </Text>
            <Text
              onPress={() => navigation.push("Reset")}
              style={{
                fontSize: 13,
                alignSelf: "flex-start",
                marginTop: 10,
                color: "gray",
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
            <Text style={styles.loginText}>LOGIN</Text>
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
      <StatusBar style="light" />
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
    borderTopLeftRadius: 500,
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
    marginTop: 12,
    marginBottom: 8,
  },
  loginText: {
    color: "white",
    paddingHorizontal: 20,
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
