// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8id4TOz7KtMXbtaaM1yEkf-qZZ6OoJHI",
  authDomain: "aistory-c683a.firebaseapp.com",
  projectId: "aistory-c683a",
  storageBucket: "aistory-c683a.firebasestorage.app",
  messagingSenderId: "224328321610",
  appId: "1:224328321610:web:5172a996422f244db634b3",
  measurementId: "G-2MFB0FWKZ9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
