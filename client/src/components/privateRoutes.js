

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const PrivateRoutes = ({ children }) => {
  const isauth = localStorage.getItem("token")
  const location = useLocation()
  return (
    isauth ? children : <Navigate to={"/login"} state={location.pathname} replace />

  )
}
export default PrivateRoutes