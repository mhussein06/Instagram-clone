import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  updateDoc,
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAKLrpx44EgScvj9fFsuvroWHhQB-dgmbM",
  authDomain: "instagram-db-780a5.firebaseapp.com",
  projectId: "instagram-db-780a5",
  storageBucket: "instagram-db-780a5.appspot.com",
  messagingSenderId: "126635369690",
  appId: "1:126635369690:web:567b16777172c5b54a31e3",
};

const FirebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);
const auth = getAuth();

export const db = getFirestore();

export const signOutUser = async () => await signOut(auth);

export const getUserSnapshotFromId = async (userId) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("userId", "==", userId));
  let snapshot = {};
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    snapshot = { ...doc.data(), docId: doc.id };
  });
  const pfp = await getUserAvatar(snapshot.username);
  pfp ? (snapshot = { ...snapshot, profilePicture: pfp }) : (
    snapshot = { ...snapshot, profilePicture: "/images/defaultpfp.jpg" }
  )
  
  return snapshot;
};

export const getUserSnapshotFromUsername = async (username) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("username", "==", username));
  let snapshot = {};
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    snapshot = { ...doc.data(), docId: doc.id };
  });
  const pfp = await getUserAvatar(username);
  pfp ? (snapshot = { ...snapshot, profilePicture: pfp }) : (
    snapshot = { ...snapshot, profilePicture: "/images/defaultpfp.jpg" }
  )
  
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

export const doesUserExist = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = getDocs(q);

  return (await querySnapshot).empty;
};



export const createUserAuthWithEmailAndPassword = async (
  email,
  password,
  displayName,
  fullName
) => {
  if (!email || !password || !displayName || !fullName) {
    console.log("Parameters not recieved");
    return;
  }


  const usernameAvailable = await doesUserExist(displayName);
  console.log("username available: ", usernameAvailable);

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

      await addDoc(collection(db, "users"), {
        userId: createdUserSnapshot.user.uid,
        username: displayName.toLowerCase(),
        fullName,
        emailAddress: email.toLowerCase(),
        followers: [],
        following: [],
        dateCreated: Date.now(),
      });
      console.log(createdUserSnapshot);
      await updateAvatar('/images/defaultpfp.jpg', displayName.toLowerCase())
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

export const getUserDocId = async (userId) => {
  let snapshot = null;
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.map((userSnapshot) => {
    const matchedDocs = userSnapshot.size;
    if (matchedDocs) {
      userSnapshot.docs.forEach((doc) => {
        snapshot = doc.id;
      });
    } else {
      console.log("0 documents matched the query");
    }
    return snapshot;
  });
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId,
  loggedInUserId,
  userId,
  isFollowingProfile
) => {
  const userDocRef = doc(db, "users", loggedInUserDocId);
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("userId", "==", loggedInUserId));
  let following = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    following = doc.data().following;
  });
  await updateDoc(userDocRef, {
    following: isFollowingProfile
      ? following.filter((e) => e !== userId)
      : [...following, userId],
  });
};

export async function updateLikes(docId, photoId, userId, liked) {
  const photoDocRef = doc(db, "photos", docId);
  const collectionRef = collection(db, "photos");
  const q = query(collectionRef, where("photoId", "==", photoId));
  let likes = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    likes = doc.data().likes;
  });
  await updateDoc(photoDocRef, {
    likes: liked ? likes.filter((e) => e !== userId) : [...likes, userId],
  });
}

export async function updateFollowedUserFollowers(
  otherUserDocId,
  otherUserId,
  loggedInUserId,
  isFollowingProfile
) {
  const userDocRef = doc(db, "users", otherUserDocId);
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("userId", "==", otherUserId));
  let followers = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    followers = doc.data().followers;
  });
  await updateDoc(userDocRef, {
    followers: isFollowingProfile
      ? followers.filter((e) => e !== loggedInUserId)
      : [...followers, loggedInUserId],
  });
}

export async function updateComments({ displayName, comment }, docId, photoId) {
  const photoDocRef = doc(db, "photos", docId);
  const collectionRef = collection(db, "photos");
  const q = query(collectionRef, where("photoId", "==", photoId));
  let comments = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    comments = doc.data().comments;
  });
  await updateDoc(photoDocRef, {
    comments: [...comments, { displayName, comment }],
  });
}

export const getSuggestedProfiles = async (userId) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, limit(10));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !profile.followers.includes(userId)
    );
};

export async function getPhotoWithUserDetails(userFollowedPhotos, userId) {
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserSnapshotFromId(photo.userId);
      const username = user.username;
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getPhotos(userId, following) {
  const collectionRef = collection(db, "photos");
  const q = query(collectionRef, where("userId", "in", following));
  const querySnapshot = await getDocs(q);

  const userFollowedPhotos = await Promise.all(querySnapshot.docs.map(async (photo) => (
    
    {
    ...photo.data(),
      docId: photo.id,
    imageUrl: await getUserPost(photo.id),
  })));

  return getPhotoWithUserDetails(userFollowedPhotos, userId);
}

export async function getUserPhotosByUserId(userId) {
  const collectionRef = collection(db, "photos");
  const q = query(collectionRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const photos = await Promise.all(querySnapshot.docs.map(async (photo) => (
    {
      ...photo.data(),
      docId: photo.id,
      imageUrl: await getUserPost(photo.id),
    })));
  
  return photos;
}

export async function getUserAvatar(username) {
  const path = "images/profiles/" + username + '.jpg';
  const avatarRef = ref(storage, path);


  const result = await getDownloadURL(avatarRef).then((url) => {
    return url;
  }).catch(error => {
    console.log("File does not exist");
    return null;
  })

  return result;
}

export const createPost = async (caption, userId, file) => {
  if (!caption || !userId || !file) {
    return;
  }
  
  const post = {
    caption: caption,
    comments: [],
    dateCreated: Date.now(),
    likes: [],
    userId: userId,
  }

  const docRef = await addDoc(collection(db, "photos"), post);
  const postId = docRef.id;
  await uploadPostPhoto(file, postId);
  return {
    ...post,
    imageUrl: await getUserPost(postId),
  }
}

export async function getUserPost(docId) {
  const path = "images/posts/" + docId + '.jpg';
  const avatarRef = ref(storage, path);
  const result = await getDownloadURL(avatarRef).then((url) => {
    return url;
  });
  return result;
}

export async function uploadPostPhoto(file, docId) {
  const postRef = ref(storage, "images/posts/" + docId + '.jpg');
  await uploadBytes(postRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}

export async function updateAvatar(file, username) {
  const avatarRef = ref(storage, "images/profiles/" + username + '.jpg');
  await uploadBytes(avatarRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}

export { FirebaseApp };
