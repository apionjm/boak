import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getDatabase, ref, set } from "firebase/database";
import { Feather } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Account({ navigation }) {
  const image = {
    uri: "https://i.pinimg.com/736x/20/9a/39/209a39b373db6e48cc3f32312868c1a4.jpg",
  };

  const [currentDate, setCurrentDate] = useState("");
  //const [FirstName, setFirstName] = useState("");
  //const [LastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [Tel, setTel] = useState("");
  const [Address, setAddress] = useState("");

  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;
  const [data, setData] = useState([]);
  //console.log(data);

  //fetch user data
  useEffect(() => {
    fetch(
      "https://ns-island-loan-default-rtdb.firebaseio.com/users/" +
        uid +
        ".json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      //.then(navigation.navigate("Edit Account"))
      .finally(() => setLoading(false));
  }, []);
  //end here
  const pushNotify = async () => {
    const response = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Profile Updated",
        body: "Your profile has been updated sucessfully.",
      },
      trigger: { seconds: 2 },
    });
  };

  const update = () => {
    const db = getDatabase();
    set(ref(db, "users/" + uid), {
      businessName: businessName,
      Tel: Tel,
      Address: Address,
    });
    pushNotify();
    navigation.navigate("Confirm");
  };
  const imageUrl =
    "https://nsislandloan.com/wp-content/uploads/2022/06/GettyImages-482343250-585265dc05e2470cad06e17273b1c077.jpg";

  useEffect(() => {
    //var date = new Date().getDate(); //Current Date
    //var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    //var hours = new Date().getHours(); //Current Hours
    //var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(year);
    //console.log(uid);
  }, []);
  return (
    <ImageBackground>
      <ScrollView style={{ height: "100%", paddingHorizontal: 50 }}>
        <StatusBar style="dark" />
        {/*<TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          placeholder={data ? data.FirstName : "Firstname"}
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          placeholder={data ? data.LastName : "Surname"}
          ></TextInput>*/}
        <TextInput
          style={styles.input}
          onChangeText={(text) => setBusinessName(text)}
          placeholder={data ? data.businessName : "Business Name"}
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTel(text)}
          placeholder={data ? data.Tel : "Tel / Cel"}
          keyboardType={"numeric"}
          numeric
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          placeholder={data ? data.Address : "Address"}
        ></TextInput>
        <TouchableOpacity style={styles.loginBtn} onPress={update}>
          <Text style={styles.loginText}>UPDATE</Text>
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
    borderWidth: 1,
    borderColor: "#bfbfbf",
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
    width: 150,
    height: 150,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 500,
    justifyContent: "center",
    backgroundColor: "white",
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
});
