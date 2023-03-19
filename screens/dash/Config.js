import { Platform } from "react-native";
import ENV from "react-native-config";

// Address to stripe server running on local machine
export const LOCAL_URL =
  Platform.OS === "android"
    ? "http://192.168.0.31:4242"
    : "http://localhost:4242";

export const API_URL = ENV.API_URL ? ENV.API_URL : LOCAL_URL;
