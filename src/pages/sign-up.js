import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";
import { FirebaseApp } from "../lib/firebase";
import { ROUTES } from "../constants/routes";
import { doesUserExist } from "../services/firebase";
import { createUserAuthWithEmailAndPassword } from "../lib/firebase";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid =
    username === "" || fullName === "" || password === "" || email === "";
  
  //TODO
  //Creates and adds user to firebase
  //Check if username is already taken
  //Logs user in and sends to dashboard

  const SignUpHandler = async (event) => {
    event.preventDefault();
    const usernameAvailable = await doesUserExist(username);

    if (usernameAvailable) { 
      try {
        const createdUserResult = await createUserAuthWithEmailAndPassword(email, password);
        console.log(createdUserResult);
        await updateProfile(createdUserResult.user, {
          displayName: username
        });
       
        await FirebaseApp.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        })
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            setError(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            setError(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            setError('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            console.log(error.message)
            setError("An error occured. Please try again later");
            break;
        };
      }
    }
    else {
      setError('This username already exists. Please try another.')
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white border rounded  p-4 border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={SignUpHandler} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              type="sumbit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white mt-2 rounded p-2 border border-gray-primary">
          <p>
            Already have an account?
            <Link to="/login" className="font-bold text-blue-medium">
              {" "}
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
