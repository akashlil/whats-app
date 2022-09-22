import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBcYsXaXvX7eD3K7GEM1KQhZQxORhyFxjI",
  authDomain: "whatapp-akash.firebaseapp.com",
  projectId: "whatapp-akash",
  storageBucket: "whatapp-akash.appspot.com",
  messagingSenderId: "75050037661",
  appId: "1:75050037661:web:1bfa018546e073d9db7f74",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup, signOut };
