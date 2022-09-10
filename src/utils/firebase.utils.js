import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";


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

export const db = getFirestore();

export const signOutUser = async () => await signOut(auth);

export const getUserSnapshotFromId = async (userId) => {
  const collectionRef = firebase.firestore().collection("users");
  const docRef = collectionRef.where("userId", "==", userId);
  let snapshot = {};
  try {
    await docRef.get().then((userSnapshot) => {
      const matchedDocs = userSnapshot.size;
      if (matchedDocs) {
        userSnapshot.docs.forEach((doc) => {
          snapshot = doc.data();
        });
      } else {
        console.log("0 documents matched the query");
      }
    });
  } catch (e) {
    console.log(e);
  }
  return snapshot;
};

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  return userSnapshot;
};



export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const createUserAuthWithEmailAndPassword = async (
  email,
  password,
  displayName,
  fullName
) => {
  if (!email || !password || !displayName || !fullName) return;
  const usernameAvailable = await doesUserExist(displayName);

  if (usernameAvailable) {
    try {
      const createdUserSnapshot = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(createdUserSnapshot.user, {
        displayName: displayName,
      });

      await FirebaseApp.firestore().collection("users").add({
        userId: createdUserSnapshot.user.uid,
        username: displayName.toLowerCase(),
        fullName,
        emailAddress: email.toLowerCase(),
        following: [],
        dateCreated: Date.now(),
      });
      console.log(createdUserSnapshot);
      return createdUserSnapshot;
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log(`Email address ${email} already in use.`);
          break;
        case "auth/invalid-email":
          console.log(`Email address ${email} is invalid.`);
          break;
        case "auth/operation-not-allowed":
          console.log(`Error during sign up.`);
          break;
        case "auth/weak-password":
          console.log(
            "Password is not strong enough. Add additional characters including special characters and numbers."
          );
          break;
        default:
          console.log(error.message);
          console.log("An error occured. Please try again later");
          break;
      }
    }
  }
};

//seedDatabase(FirebaseApp);

export const doesUserExist = async (username) => {
  const db = FirebaseApp.firestore();
  const usersRef = await db.collection("users");
  const isEmpty = usersRef
    .where("username", "==", username)
    .get()
    .then((snapshot) => {
      return snapshot.empty;
    });
  return isEmpty;
};

export const onAuthChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export { FirebaseApp, FieldValue };
