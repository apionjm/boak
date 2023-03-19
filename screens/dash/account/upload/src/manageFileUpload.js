import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { getDatabase, update, ref as eref } from "firebase/database";
import { db } from "../../../../../config/firebase";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const manageFileUpload = async (
  fileBlob,
  { onStart, onProgress, onComplete, onFail }
) => {
  const imgName = "img-" + new Date().getTime();
  // Create a root reference
  const storage = getStorage();
  //get current users unique id
  const auth = getAuth();
  auth;
  const uid = auth.currentUser.uid;

  const ranid = Math.floor(Math.random() * 1000000000000000);

  var storageRef = ref(storage, `images/${uid}/${ranid}/${imgName}.jpg`);

  //console.log("uploading file", imgName);

  // Create file metadata including the content type
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };
  const pushNotify = async () => {
    const response = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upload sucessfully 📷",
        body: "Your image has been updated.",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
    //const { clientSecret } = await response.json();

    //return clientSecret;
  };

  // Trigger file upload start event
  //onStart && onStart();
  onStart && onStart();

  const result = await uploadBytes(storageRef, fileBlob);

  const url = await getDownloadURL(result.ref);
  //console.log(url);

  const db = getDatabase();
  update(eref(db, "users/" + uid), {
    propic: url,
  });

  //return url;
  onComplete && onComplete(url);
  //console.log("File available at", url);
  //alert("Photo has been uploaded");
  pushNotify();

  //console.log("3");
};

export default manageFileUpload;
