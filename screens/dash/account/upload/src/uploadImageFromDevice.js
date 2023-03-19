import * as ImagePicker from "expo-image-picker";
import hasMediaLibraryPermissionGranted from "./hasMediaLibraryPermissionGranted";
import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();

const uploadImageFromDevice = async () => {
  let imgURI = null;
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  console.log(result);

  if (!result.canceled) {
    imgURI = result.assets[0].uri;
  }

  return imgURI;
};

export default uploadImageFromDevice;
