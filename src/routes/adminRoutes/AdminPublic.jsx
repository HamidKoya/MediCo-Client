import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminPublic(props) {
    const {currentAdmin} = useSelector((state)=>state.admin)

    if(currentAdmin){
        return <Navigate to={"/admin/dashboard"}/>
    }

    return props.children
  
}

export default AdminPublic
