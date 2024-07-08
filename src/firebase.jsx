// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_hCmYVHQd49fm3tfZkdmti3mg63Fe1IQ",
  authDomain: "pm-systemdb.firebaseapp.com",
  projectId: "pm-systemdb",
  storageBucket: "pm-systemdb.appspot.com",
  messagingSenderId: "1057234808264",
  appId: "1:1057234808264:web:38045042e23ef18677e4fd",
  measurementId: "G-DQ7K3VWZ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
