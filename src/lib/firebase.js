import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { seedDatabase } from "../seed";

const firebaseConfig = {
  apiKey: "AIzaSyAKLrpx44EgScvj9fFsuvroWHhQB-dgmbM",
  authDomain: "instagram-db-780a5.firebaseapp.com",
  projectId: "instagram-db-780a5",
  storageBucket: "instagram-db-780a5.appspot.com",
  messagingSenderId: "126635369690",
  appId: "1:126635369690:web:567b16777172c5b54a31e3",
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);
const FieldValue = firebase.firestore();
const auth = getAuth();

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
}
//seedDatabase(FirebaseApp);

export { FirebaseApp, FieldValue };
