// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"; // Optional

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXk1iOhRltOk6OOhPiGTfZQNiUl5xXsAc",
  authDomain: "taskmaster-f7f70.firebaseapp.com",
  projectId: "taskmaster-f7f70",
  storageBucket: "taskmaster-f7f70.firebasestorage.app",
  messagingSenderId: "365194827896",
  appId: "1:365194827896:web:dc93343cbe91a2884a758d",
  measurementId: "G-MXHWJ4X4C9", // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Add Firebase Authentication
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Analytics only runs in the browser

export default app;
