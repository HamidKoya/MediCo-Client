import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function DoctorProtect(props) {
  const { currentDoctor } = useSelector((state) => state.doctor);
  if (currentDoctor) {
    return props.children;
  }
  return <Navigate to={"/doctor/home"} />;
}

export default DoctorProtect;
