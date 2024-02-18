// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOZrkZaj2e2FHB2sgkZcqy36wUmuoWjyY",
  authDomain: "chat-9b582.firebaseapp.com",
  projectId: "chat-9b582",
  storageBucket: "chat-9b582.appspot.com",
  messagingSenderId: "549795457245",
  appId: "1:549795457245:web:7951d1015c1425d1c41334",
  measurementId: "G-871N97JWD6",
  databaseURL: "https://chat-9b582-default-rtdb.firebaseio.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export var messageRef = firebase.database().ref("messages");
export var roomRef = firebase.database().ref("rooms");
