import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserPublic(props) {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default UserPublic;
