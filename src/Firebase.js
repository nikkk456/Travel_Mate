// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7itAQMSlMFYhYfomULOLLOgehGyMlr4I",
  authDomain: "basicproject-fbdd1.firebaseapp.com",
  databaseURL: "https://basicproject-fbdd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "basicproject-fbdd1",
  storageBucket: "basicproject-fbdd1.appspot.com",
  messagingSenderId: "926444712144",
  appId: "1:926444712144:web:6d0d306d712d822ffeeed5",
  measurementId: "G-VZYNN3DQDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};