import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAmzOw7_1wuFfBSd54zzM_78NacCVdKT48",
  authDomain: "agi-iot-beae7.firebaseapp.com",
  projectId: "agi-iot-beae7",
  storageBucket: "agi-iot-beae7.appspot.com",
  messagingSenderId: "990013555154",
  appId: "1:990013555154:web:5b0a8ed58d13f3ff43880b",
});

export const googleProvider = new GoogleAuthProvider();

export const firebaseAuth = getAuth(firebaseApp);