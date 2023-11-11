// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mer-state.firebaseapp.com",
  projectId: "mer-state",
  storageBucket: "mer-state.appspot.com",
  messagingSenderId: "235255275078",
  appId: "1:235255275078:web:83ee56a630e1b17555b447"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);