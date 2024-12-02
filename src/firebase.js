// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN2wRFxe-0QWqDkfO4SAXtVKovNWJwS84",
    authDomain: "login--getcode.firebaseapp.com",
    projectId: "login--getcode",
    storageBucket: "login--getcode.firebasestorage.app",
    messagingSenderId: "758762397753",
    appId: "1:758762397753:web:4ead4ee66b6a245fffade8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut }; // ส่งออก signOut ที่นี่
