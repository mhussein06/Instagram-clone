import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ROUTES } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { signInStart } from "../store/user/user.actions";
import { selectUserError, selectCurrentUser } from "../store/user/user.selector";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userError = useSelector(selectUserError);
  const user = useSelector(selectCurrentUser);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const isInvalid = password === "" || email === "";

  const LoginHandler = async (event) => {
    event.preventDefault();
    dispatch(signInStart(email, password));
    
  };

  useEffect(() => {
    document.title = "Login - Instagram";
    if (user) {
      navigate(ROUTES.DASHBOARD);
    }
    switch (userError) {
      case "auth/wrong-password":
      alert("Username or Password is incorrect! Please try again.");
      break;
    case "auth/user-not-found":
      alert("Email does not exist. Please register for free or try again.");
      break;
    case null:     
      return;
    default:
      console.log("Error occured", userError);
    }
  }, [userError, user, navigate]);

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
          <form onSubmit={LoginHandler} method="POST">
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
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white mt-2 rounded p-2 border border-gray-primary">
          <p>
            Don't have an account?
            <Link to="/signup" className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
