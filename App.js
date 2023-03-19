import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login/login";
import Account from "./screens/dash/account/account";
import AccountEdit from "./screens/dash/account/accountEdit";
import About from "./screens/dash/about";
import Home from "./screens/dash/Home";
import Reset from "./screens/reset/reset";
import ConfirmEdit from "./screens/dash/account/ConfirmEdit";
import Profile_picture from "./screens/dash/account/upload/pfileUpload";
import CreateDelinkquent from "./screens/dash/deposit/delinkquent";
import Deqt from "./screens/dash/account/Deqt";
import Register from "./screens/register/register";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Account Details" component={Account} />
        <Stack.Screen name="Edit Account" component={AccountEdit} />
        <Stack.Screen name="Profile Photo" component={Profile_picture} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Create" component={CreateDelinkquent} />
        <Stack.Screen name="More" component={Deqt} />
        <Stack.Screen
          name="Confirm"
          options={{ headerShown: false }}
          component={ConfirmEdit}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
