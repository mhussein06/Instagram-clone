import { FieldValue, FirebaseApp } from "../lib/firebase";

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
