// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiH4HQEIPTO0zlXF7no-TL67JQYgwOvus",
  authDomain: "react2-lesson8-473b4.firebaseapp.com",
  projectId: "react2-lesson8-473b4",
  storageBucket: "react2-lesson8-473b4.appspot.com",
  messagingSenderId: "56699968751",
  appId: "1:56699968751:web:345d051017d3b80eda8f1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
