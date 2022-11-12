import User from "./user";
import Suggestions from "./suggestions";
import {
  selectCurrentUser
} from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import React from "react";

export const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="p-4">
      {user ? (
        <>
          <User username={user.username} fullName={user.fullName} />
          <Suggestions />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export const MemoizedSidebar =  React.memo(Sidebar);
