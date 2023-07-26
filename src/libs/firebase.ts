// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3nvcpeYqvsxGGEzUc9dYIFHVPdR2fWmQ",
  authDomain: "task-tracker-7777777.firebaseapp.com",
  projectId: "task-tracker-7777777",
  storageBucket: "task-tracker-7777777.appspot.com",
  messagingSenderId: "651252493587",
  appId: "1:651252493587:web:d6949a6faecde1c14e3ee6",
  measurementId: "G-KG0RS6YH9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
