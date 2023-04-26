// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd0fj92kV54yYXG-Ontto2tXReXz1OFcU",
  authDomain: "project1-aca74.firebaseapp.com",
  projectId: "project1-aca74",
  storageBucket: "project1-aca74.appspot.com",
  messagingSenderId: "95847633801",
  appId: "1:95847633801:web:5025ff3b9dc02844660758",
  measurementId: "G-NTY0BRX1VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);