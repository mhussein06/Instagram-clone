import React, { useEffect, useState } from "react";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import SignOutButton from "../components/signout-button";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../store/user/user.actions";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router";
import { selectCurrentUser } from "../store/user/user.selector";

export const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [user, setUser] = useState(currentUser);

    const navigate = useNavigate();

    React.useEffect = (() => {
        const setTitle = (() => {
            document.title = "Instagram - Dashboard"
        });
      
        if(user === null) {
        navigate(ROUTES.DASHBOARD)
      }
  });

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
      {user ? <SignOutButton /> : console.log()}
    </div>
  );
};

export default Dashboard;
