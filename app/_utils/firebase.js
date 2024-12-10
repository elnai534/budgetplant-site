import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmGkFmDIRnjUwXprmE8GA5x0QIQTFR900",
  authDomain: "budget-plant-web.firebaseapp.com",
  projectId: "budget-plant-web",
  storageBucket: "budget-plant-web.firebasestorage.app",
  messagingSenderId: "410472000922",
  appId: "1:410472000922:web:5981286e3cb87f09401e23",
  measurementId: "G-LDWR95XVES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);

export {
  onAuthStateChanged,
  signInWithPopup,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
};
