
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

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
const storage = getStorage();
const db = getDatabase(app);

export {app,auth,storage,db};