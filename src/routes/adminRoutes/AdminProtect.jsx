import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminProtect(props) {
    const {currentAdmin} = useSelector((state)=>state.admin)

    if(currentAdmin){
        return props.children
    }

    return <Navigate to={"/admin/login"}/>
  
}

export default AdminProtect
