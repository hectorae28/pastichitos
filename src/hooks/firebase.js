// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBqHjW6rC0GiztrJNf3cGzcJJcaGg-1ks",
  authDomain: "pastichitos-4f1b3.firebaseapp.com",
  projectId: "pastichitos-4f1b3",
  storageBucket: "pastichitos-4f1b3.appspot.com",
  messagingSenderId: "730884752964",
  appId: "1:730884752964:web:980840e44612b41b511e11",
  measurementId: "G-CE1GN11FK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app