import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCaYsieu9beSiR671y-jTHtdmOVdKp8Y8I",
  authDomain: "telegram-3b7d0.firebaseapp.com",
  projectId: "telegram-3b7d0",
  storageBucket: "telegram-3b7d0.appspot.com",
  messagingSenderId: "588546058593",
  appId: "1:588546058593:web:159934af4687e4089dfd20",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
