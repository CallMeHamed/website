import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF93rT1PClVsZ9yGtOh5_-Hn5STTGPUtk",
  authDomain: "school-students-6c5fa.firebaseapp.com",
  projectId: "school-students-6c5fa",
  storageBucket: "school-students-6c5fa.firebasestorage.app",
  messagingSenderId: "322263940873",
  appId: "1:322263940873:web:95fc1bd8b033c1e14a9dd8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
