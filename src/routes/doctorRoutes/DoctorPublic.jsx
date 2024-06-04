import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function DoctorPublic(props) {
  const { currentDoctor } = useSelector((state) => state.doctor);
  if (currentDoctor) {
    return <Navigate to={"/doctor/dashboard"} />;
  }
  return props.children;
}

export default DoctorPublic;
