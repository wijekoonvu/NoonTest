// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC4XQoDHkV-yI0OG53M6nVSDnWVLzmnuLA",
//   authDomain: "insta-92aa1.firebaseapp.com",
//   projectId: "insta-92aa1",
//   storageBucket: "insta-92aa1.appspot.com",
//   messagingSenderId: "1014147826852",
//   appId: "1:1014147826852:web:0a6991e7584bb7cb381231",
//   measurementId: "G-6FJ54FKF4Q"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC4XQoDHkV-yI0OG53M6nVSDnWVLzmnuLA",
  authDomain: "insta-92aa1.firebaseapp.com",
  projectId: "insta-92aa1",
  storageBucket: "insta-92aa1.appspot.com",
  messagingSenderId: "1014147826852",
  appId: "1:1014147826852:web:0a6991e7584bb7cb381231",
  measurementId: "G-6FJ54FKF4Q"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();


export {app, db, storage};