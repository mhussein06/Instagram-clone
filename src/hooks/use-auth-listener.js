// import React, { useState, useEffect, useContext } from "react";
// import { FirebaseContext } from "../context/firebase";

// export const useAuthListener = () => {
//     const [user, setUser] = React.useState({});
//   const { firebase } = React.useContext(FirebaseContext);

//   useEffect =
//     (() => {
//       const listener = firebase.auth().onAuthStateChanged((authUser) => {
//         if (authUser) {
//           localStorage.setItem("authUser", JSON.stringify(authUser));
//           setUser(authUser);
//         } else {
//           localStorage.removeItem("authUser");
//             setUser({ user: {} });
//         }
//       });
//       return () => listener();
//     },
//     [firebase]);
//   return { user };
// };

// export default useAuthListener;
