
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDLNc6CmkNPa49_unuA2U6X4wodmX8VYmg",
  authDomain: "reindeerlogin.firebaseapp.com",
  projectId: "reindeerlogin",
  storageBucket: "reindeerlogin.appspot.com",
  messagingSenderId: "462159771261",
  appId: "1:462159771261:web:b9180e5a19169f12d16314",
  measurementId: "G-1BZJXQD6CC"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);