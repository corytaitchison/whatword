// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

// FILL THESE IN:
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "what-word-b8cb0",
    storageBucket: "what-word-b8cb0.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
