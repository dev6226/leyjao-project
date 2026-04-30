import React from 'react'
import { Navigate } from 'react-router-dom'

const Protectedroute = ({ children }) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        return <Navigate to="/auth/login" replace />
    }
    return children;
};

export default Protectedroute