// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_hCmYVHQd49fm3tfZkdmti3mg63Fe1IQ",
  authDomain: "pm-systemdb.firebaseapp.com",
  projectId: "pm-systemdb",
  storageBucket: "pm-systemdb.appspot.com",
  messagingSenderId: "1057234808264",
  appId: "1:1057234808264:web:82a56443ec07d99a77e4fd",
  measurementId: "G-G4DMNHDSC2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
