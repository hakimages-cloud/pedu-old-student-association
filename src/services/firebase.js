// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove, push, onValue } from "firebase/database";

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-ReplaceWithYourActualKey",
  authDomain: "pedu-old-student-association.firebaseapp.com",
  databaseURL: "https://pedu-old-student-association-default-rtdb.firebaseio.com",
  projectId: "pedu-old-student-association",
  storageBucket: "pedu-old-student-association.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Disable email verification for testing
auth.settings = {
  appVerificationDisabledForTesting: true
};

export {
  app,
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref,
  set,
  get,
  update,
  remove,
  push,
  onValue
};

export default firebaseConfig;
