import React, { useEffect, useState } from "react";
import {MemoizedTimeline} from "../components/timeline";
import {MemoizedSidebar} from "../components/sidebar/index";
import Header from "../components/header";
import SignOutButton from "../components/signout-button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
} from "../store/user/user.selector";
import { current } from "@reduxjs/toolkit";

//TODO
//Deny login if error

export const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    document.title = "Instagram - Dashboard";
    setUser(user); 
  }, [user]);

  return (
    <div className="bg-gray-background">
        <div>
          <Header />
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <MemoizedTimeline />
            <MemoizedSidebar />
          </div>
        </div> 
    </div>
  );
};

export default Dashboard;
