import User from "./user";
import Suggestions from "./suggestions";
import {
  selectCurrentUser
} from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { getUserDocId } from "../../utils/firebase.utils";
import React from "react";

export const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="p-4">
      {user ? (
        <>
          <User username={user.username} fullName={user.fullName} />
          <Suggestions userId={user.userId} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export const MemoizedSidebar =  React.memo(Sidebar);
