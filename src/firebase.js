// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWqCaKXTkCO2utt2jQ6kIMkp5wLNv-cMM",
  authDomain: "porject-qeueuing.firebaseapp.com",
  projectId: "porject-qeueuing",
  storageBucket: "porject-qeueuing.appspot.com",
  messagingSenderId: "723552667097",
  appId: "1:723552667097:web:2eed791d0a884ee3a105c8",
  measurementId: "G-B1P4VYB8BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);