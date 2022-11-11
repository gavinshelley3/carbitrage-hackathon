// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnZVGLt4tpByiEL1Qk7o3bRoOlq7FriWs",
  authDomain: "carbitrage-a688f.firebaseapp.com",
  projectId: "carbitrage-a688f",
  storageBucket: "carbitrage-a688f.appspot.com",
  messagingSenderId: "945241971100",
  appId: "1:945241971100:web:08852f217264145f141059",
  measurementId: "G-3WC2GS32CF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// get firebase and export it
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
export default db;