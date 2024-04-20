// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-47127.firebaseapp.com",
  projectId: "real-estate-47127",
  storageBucket: "real-estate-47127.appspot.com",
  messagingSenderId: "956609383455",
  appId: "1:956609383455:web:ac1dd12fc0c49df7b9192a",
  measurementId: "G-EKYGQZ0BR6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);