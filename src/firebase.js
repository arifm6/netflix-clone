import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ46WkbE5HdZmQ-R34PpYNGME0dNkFmnU",
  authDomain: "netflix-clone-45ea5.firebaseapp.com",
  projectId: "netflix-clone-45ea5",
  storageBucket: "netflix-clone-45ea5.appspot.com",
  messagingSenderId: "841504893471",
  appId: "1:841504893471:web:cffab7d63f1b966a76832a",
  measurementId: "G-FZ44SYQQJL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };

export default db;
