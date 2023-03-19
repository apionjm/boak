import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getDatabase, ref, set, push, transaction } from "firebase/database";
import { Feather } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import {
  ImageBackground,
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
import * as Notifications from "expo-notifications";
import { FieldValue, serverTimestamp, Timestamp } from "firebase/firestore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CreateDelinkquent({ navigation }) {
  const image = {
    uri: "https://i.pinimg.com/736x/20/9a/39/209a39b373db6e48cc3f32312868c1a4.jpg",
  };

  const [currentDate, setCurrentDate] = useState([]);
  const [FirstName, setFirstName] = useState([]);
  const [LastName, setLastName] = useState([]);
  const [Trn, settrn] = useState([]);
  const [Tel, setTel] = useState([]);
  const [Comment, setComment] = useState([]);
  const [Address, setAddress] = useState([]);
  const [data, setData] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;
  const pushNotify = async () => {
    const response = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delinquent Submitted",
        body: "Delinquent will be updated on page reload.",
      },
      trigger: { seconds: 2 },
    });
  };
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

  const update = () => {
    const db = getDatabase();
    const postListRef = ref(db, 'submittedDqent/');
    const newPostRef = push(postListRef);
    const fullName = FirstName + ' ' + LastName;
    [set((newPostRef),
      {
      FirstName: FirstName,
      LastName: LastName,
      fullName: fullName,
      Trn: Trn,
      comment: Comment,
      Loaner: data.businessName,
      Tel: Tel,
      creator: uid,
      id: newPostRef.key,
      Address: Address,
      date: currentDate,
      timestamp: toString(serverTimestamp),
    })]
    pushNotify();
    navigation.navigate("Home");
  };
  const imageUrl =
    "https://nsislandloan.com/wp-content/uploads/2022/06/GettyImages-482343250-585265dc05e2470cad06e17273b1c077.jpg";

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
    //console.log(uid);
    console.log(currentDate);
  }, []);
  const [fontsLoaded] = useFonts({
    rompies: require("../../../assets/fonts/Roboto-Black.ttf"),
    grass: require("../../../assets/fonts/GrassRoot.otf"),
    tuwir: require("../../../assets/fonts/Tuwir.otf"),
    magic: require("../../../assets/fonts/MagicHour.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground>
      <ScrollView style={{ height: "100%", paddingHorizontal: 50 }}>
        <StatusBar style="dark" />
        <View style={styles.logo}>
        <Text style={{ fontSize: 45, fontFamily: "tuwir" }}>
          Delinkquent
          </Text>
          <Text style={{ fontSize: 25, fontFamily: "tuwir" }}>
          Jamaica
          </Text>
      </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          placeholder="Firstname"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          placeholder="Surname"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => settrn(text)}
          placeholder="Trn"
          keyboardType={"numeric"}
          numeric
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTel(text)}
          placeholder="Tel / Cel"
          keyboardType={"numeric"}
          numeric
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
        ></TextInput>
        <TextInput
          style={{width: "100%", backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10, fontSize: 20, borderRadius: 10,}}
          onChangeText={(text) => setComment(text)}
          placeholder="Comment"
        ></TextInput>
        <TouchableOpacity style={styles.loginBtn} onPress={update}>
          <Text style={{fontWeight: "900", color: "white"}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
    marginHorizontal: 30,
  },
  login: {
    flex: 1,
    zIndex: 2,
    width: "100%",
    height: 600,
    alignItems: "center",
  },
  input: {
    marginVertical: 8,
    padding: 5,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input2: {
    marginRight: 8,
    padding: 5,
    paddingLeft: 20,
    width: 90,
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    flexDirection: "row",
    borderRadius: 10,
    width: "100%",
  },
  logo: {
    height: 150,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 500,
    justifyContent: "center",
    margin: 10,
    padding: 5,
    marginTop: 30,
    zIndex: 3,
  },
  Image: {
    height: "100%",
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#0984d6",
    alignSelf: "center",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 8,
  },
  loginText: {
    color: "white",
    height: 20,
  },
});
