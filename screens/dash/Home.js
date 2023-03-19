import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "react-native";

import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import * as Speech from "expo-speech";
import { useRoute } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");

  const image = {
    uri: "https://data.whicdn.com/images/346668112/original.gif",
  };

  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //console.log(data);

  const [search, setSearch] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const getData = async () => {
      const data = await fetch('https://delinkquent-95b32-default-rtdb.firebaseio.com/submittedDqent.json')
      .then((data) => data.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        //console.log(responseJson);
      })
    };
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('https://delinkquent-95b32-default-rtdb.firebaseio.com/submittedDqent.json')
      .then((data) => data.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        //console.log(responseJson);
      })
    };
    getData();
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = Object.values(masterDataSource).filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.fullName
          ? item.fullName.toUpperCase()
          : 'Doesnt exists'.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.FirstName.toUpperCase()}
        {' '}
        {item.LastName.toUpperCase()}
        {' | '}
        {item.Loaner}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.LastName + ' Title : ' + item.FirstName);
  };

  //fetch user data
  /*useEffect(() => {
    fetch(
      "https://ns-island-loan-default-rtdb.firebaseio.com/users/" +
        uid +
        ".json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);*/
  //end here
  const speak = () => {
    const thingToSay = "your current balance is $250.00";
    Speech.speak(thingToSay);
  };

  useEffect(() => {
    //var date = new Date().getDate(); //Current Date
    //var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    //var hours = new Date().getHours(); //Current Hours
    //var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(year);
  }, []);

  const [fontsLoaded] = useFonts({
    rompies: require("../../assets/fonts/Roboto-Black.ttf"),
    grass: require("../../assets/fonts/GrassRoot.otf"),
    tuwir: require("../../assets/fonts/Tuwir.otf"),
    magic: require("../../assets/fonts/MagicHour.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.menu}>
        <View style={{ flexDirection: "column", alignItems: "center", }}>
          <Text style={{ fontSize: 18, color: "white", fontFamily: "tuwir" }}>
          Delinkquent
          </Text>
        </View>
        <View style={styles.textInputStyle}>
      <Ionicons name="search" size={16} color="#b6dffa" style={{paddingRight: 5}} />
        <TextInput
        style={{width: "100%"}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search.."
        />
      </View>
      <Ionicons
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("About")}
            name="information-circle"
            size={30}
            color="white"
          />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  style={{height: "100%", marginBottom: 80,}}>
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          {Object.values(filteredDataSource).map((filteredDataSource) => {
            return (
              <View key={filteredDataSource} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",paddingVertical: 5, paddingLeft: 15,borderRadius: 10, marginVertical: 3, backgroundColor: "white"}}>
                <View>
                  <Text style={styles.item}>{filteredDataSource.fullName}</Text>
                <Text style={{fontSize: 10,}}>{filteredDataSource.Loaner}</Text>
                </View>
                <Ionicons
                style={{paddingRight: 10}}
                onPress={() => navigation.navigate("More", {
                  itemId: filteredDataSource.id,
                })}
                  dqent = {filteredDataSource.key}
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
      <View style={styles.menuBT}>
      <Ionicons
          style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Account Details")}
            name="ios-person-circle-outline"
            size={30}
            color="white"
          />
          <Ionicons
            onPress={() => navigation.navigate("Create")}
            name="add"
            size={30}
            color="white"
          />
          <Ionicons
            onPress={handleSignOut}
            name="log-out-outline"
            size={30}
            color="white"
          />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0984d6",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    height: 80,
  },
  menuBT: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0984d6",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    alignItems: "center",
    paddingHorizontal: 40,
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    justifyContent: "space-between",
    height: "8%",
  },
  logo: {
    width: 50,
    height: 50,
  },
  main: {
    backgroundColor: "white",
    height: "78%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    width: "60%",
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 10,
    margin: 5,
    borderColor: '#b6dffa',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
});
