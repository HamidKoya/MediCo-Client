import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function VideoProtect(props) {
  const {currentUser} = useSelector((state)=>state.user)
  const {currentDoctor} = useSelector((state)=>state.doctor)
  if(currentUser||currentDoctor){
    return props.children
  }
  return <Navigate to={"/"}/>
}

export default VideoProtect
