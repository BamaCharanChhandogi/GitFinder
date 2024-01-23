// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBZz2Y7jQpqu7lywQme8kRs77MpF5h9ZfM",
//   authDomain: "gitfinder-5dde8.firebaseapp.com",
//   projectId: "gitfinder-5dde8",
//   storageBucket: "gitfinder-5dde8.appspot.com",
//   messagingSenderId: "846943126401",
//   appId: "1:846943126401:web:9cf71dd8b7f365c4605e80",
//   measurementId: "G-WW75V7S61R"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: process.env.REACT_APP_MSI,
  appId: process.env.REACT_APP_APP_ID
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GithubAuthProvider();
const storage = firebase.storage();
const db = firebaseApp.firestore();
const Rdb = firebaseApp.database();

export { auth, provider, storage,Rdb };
export default db;