import { Navigate } from "react-router-dom";
import { authContext } from "./auth";
import { useContext } from "react";

function RequireAuth({ children }) {
  const authCtx = useContext(authContext);

  if(!authCtx.isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children
}

export default RequireAuth