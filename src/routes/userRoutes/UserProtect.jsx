import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProtect(props) {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return props.children;
  }
  return <Navigate to={"/"} />;
}

export default UserProtect;
