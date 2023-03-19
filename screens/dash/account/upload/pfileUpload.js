import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { ImageBackground } from "react-native";
import Constants from "expo-constants";
import { AntDesign, Feather } from "@expo/vector-icons";
import uplodImageFromDevice from "./src/uploadImageFromDevice";
import getBlobFromUri from "./src/getBlobFromUri";
import manageFileUpload from "./src/manageFileUpload";
export default function Profile_picture({ navigation }) {
  const image = {
    uri: "https://i.pinimg.com/originals/57/20/cb/5720cbd912ded0ae5edcd767d6d843fa.jpg",
  };

  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");

  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleLocalImageUpload = async () => {
    const fileURI = await uplodImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
    navigation.navigate("Home");
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;
    //console.log(imgURI);

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <Text style={styles.heading}>Select image to upload</Text>
      {Boolean(imgURI) && (
        <View>
          <Image
            source={{ uri: imgURI }}
            resizeMode="contain"
            style={{ width, height: width }}
          />
        </View>
      )}

      {!isUploading && (
        <View style={styles.row}>
          <View
            style={{
              padding: 10,
              alignContent: "center",
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 100,
            }}
          >
            <AntDesign
              name="addfile"
              size={46}
              color={imgURI ? "white" : "white"}
              onPress={handleLocalImageUpload}
            />
          </View>

          {Boolean(imgURI) && (
            <View
              style={{
                padding: 10,
                alignContent: "center",
                borderWidth: 5,
                borderColor: "white",
                borderRadius: 100,
              }}
            >
              <Feather
                name="upload-cloud"
                size={46}
                color="white"
                onPress={handleCloudImageUpload}
              />
            </View>
          )}
        </View>
      )}

      {isUploading && (
        <View style={styles.uploadProgressContainer}>
          <ActivityIndicator size={150} />
        </View>
      )}

      {Boolean(remoteURL) && (
        <View style={{ paddingVertical: 20 }}>
          <Text>
            Image has been uploaded at
            <Text style={{ color: "blue" }}> {remoteURL} </Text>
          </Text>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },

  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  uploadProgressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
