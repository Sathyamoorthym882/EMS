
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_U7C3w3Qh-wASOMnRkBiED2KtSR53HCE",
  authDomain: "eams-b994c.firebaseapp.com",
  projectId: "eams-b994c",
  storageBucket: "eams-b994c.firebasestorage.app",
  messagingSenderId: "218523349263",
  appId: "1:218523349263:web:3c192fa633cf73e6b5ce7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };