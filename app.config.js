import "dotenv/config";

export default {
  expo: {
    name: "Delinkquent",
    slug: "Delinkquent",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#0984d6",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.apiondesigns.delinkquent",
      buildNumber: "1.0.3"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#0984d6",
      },
      versionCode: 6,
      package: "com.apiondesigns.delinkquent",
    },
    web: {
      favicon: "./assets/logo.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.measurementId,
      eas: {
        projectId: "1a2fd970-07fb-43ea-b623-5e2c70573ce9",
      },
    },
    plugins: [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 33,
            "targetSdkVersion": 33,
            "buildToolsVersion": "33.0.0"
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        },
      ],
    ],
  },
};
