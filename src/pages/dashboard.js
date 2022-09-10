import React, { useEffect, useState } from "react";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import SignOutButton from "../components/signout-button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { current } from "@reduxjs/toolkit";

//TODO
//Deny login if error

export const Dashboard = () => {
  const [currentUser, setUser] = useState(useSelector(selectCurrentUser));



  useEffect(() => {
    document.title = "Instagram - Dashboard";
    console.log("useEffect ran");
    setUser(currentUser);
  }, [currentUser]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
      {currentUser ? <SignOutButton /> : console.log()}
    </div>
  );
};

export default Dashboard;
