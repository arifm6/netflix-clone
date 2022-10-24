import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCZ46WkbE5HdZmQ-R34PpYNGME0dNkFmnU",
  authDomain: "netflix-clone-45ea5.firebaseapp.com",
  projectId: "netflix-clone-45ea5",
  storageBucket: "netflix-clone-45ea5.appspot.com",
  messagingSenderId: "841504893471",
  appId: "1:841504893471:web:cffab7d63f1b966a76832a",
  measurementId: "G-FZ44SYQQJL",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

export { auth };

export default db;
