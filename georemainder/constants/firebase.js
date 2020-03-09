import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB_Y29XJjtQXEGSI8acpCshQASC-86gsKg",
    authDomain: "geo-remainder.firebaseapp.com",
    databaseURL: "https://geo-remainder.firebaseio.com",
    projectId: "geo-remainder",
    storageBucket: "geo-remainder.appspot.com",
    messagingSenderId: "564977260188",
    appId: "1:564977260188:web:ee35223a237dbe47f5bf59",
    measurementId: "G-T9WNVDC86V"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;