import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, } from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//import { auth } from 'firebase/auth';
import firebase from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { FieldValue, serverTimestamp, Timestamp } from "firebase/firestore";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [FirstName, setFirstName] = useState("");
  //const [LastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [currentDate, setCurrentDate] = useState([]);
  const [Tel, setTel] = useState("");
  const [Address, setAddress] = useState("");
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
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const pushNotify = async () => {
    const response = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Account Registered",
        body: "Your account has been registered successfully.",
      },
      trigger: { seconds: 1 },
    });
  };

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
    } else if(businessName.length == 0)
    {
        setEmailError("Business name is required");
    }else if(Tel.length == 0)
    {
        setEmailError("Phone number is required");
    } else if(Address.length == 0)
    {
        setEmailError("Address is required");
    }else {
      emailValid = true;
    }
    //setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        const uid = user.uid;
        const db = getDatabase();
        set(ref(db, "users/" + uid), {
        //FirstName: FirstName,
        //LastName: LastName,
        businessName: businessName,
        id: uid,
        Email: email,
        Tel: Tel,
        Address: Address,
        created: currentDate,
        });
        pushNotify();
        sendEmailVerification(auth.currentUser);
        navigation.replace("login");
        //console.log(uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const loginErrorMessage =emailError;
        setEmailError(emailError);
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
      <View style={{width:"100%",}}>
      <View style={styles.logosrc}>
        <Text style={{ fontSize: 35, color: "white", fontFamily: "tuwir" }}>
          Delinkquent
          </Text>
          <Text style={{ fontSize: 15, color: "white", fontFamily: "tuwir" }}>
          Jamaica
          </Text>
      </View>
      <View style={styles.loginform}>
        <View style={styles.login}>
            <View style={{
            flexDirection: "column", 
            width: "80%",
            height: 150,
            borderColor: "#bfbfbf",
            justifyContent: "space-evenly",
            borderRadius: 20,
            }}>
        <TextInput
          style={styles.input2}
          onChangeText={(text) => setBusinessName(text)}
          placeholder="Business Name"
        ></TextInput>
        <TextInput
          style={styles.input2}
          onChangeText={(text) => setTel(text)}
          placeholder="Tel / Cel"
          keyboardType="numeric"
          numeric
        ></TextInput>
        <TextInput
          style={styles.input2}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
        ></TextInput>
          </View>
          <View style={{marginTop: 10,}}>
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
          </View>

          {signInError ? (
            <ErrorMessage error={loginErrorMessage} visible={true} />
          ) : null}
          {emailError.length > 0 && (
            <Text style={{ fontSize: 12 }}> {emailError}</Text>
          )}

          <View style={{ width: "70%" }}>
            <Text
              onPress={() => navigation.push("login")}
              style={{
                fontSize: 13,
                alignSelf: "flex-start",
                marginTop: 10,
                fontWeight: "800",
                color: "gray",
              }}
            >
              Already have an Account?.
            </Text>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
            <Text style={styles.loginText}>Register</Text>
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
      </View>
      <StatusBar style="Dark" />
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
  input2: {
    height: 50,
    width: "100%",
    padding: 10,
    paddingLeft: 58,
    borderColor: "#bfbfbf",
    borderRadius: 30,
    marginVertical: 15,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputItems: {
    height: 50,
    flexDirection: "row",
    marginVertical: 4,
    borderColor: "#bfbfbf",
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    overflow: "scroll",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0984d6",
  },

  login: {
    flex: 1,
    zIndex: 2,
    width: "90%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loginform: {
    height: "100%",
    width: "100%",
    paddingBottom: 50,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
    borderTopRightRadius: 200,
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
    paddingHorizontal: 20,
    height: 20,
  },
  logosrc: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
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
