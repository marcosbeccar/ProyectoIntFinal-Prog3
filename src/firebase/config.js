import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBixCOb4BD9opsyQf9wtUTw50xKYDvPtnQ",
  authDomain: "prog3reactnative.firebaseapp.com",
  projectId: "prog3reactnative",
  storageBucket: "prog3reactnative.firebasestorage.app",
  messagingSenderId: "184521400851",
  appId: "1:184521400851:web:72e7d0bdcff7a05aac55e6",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
