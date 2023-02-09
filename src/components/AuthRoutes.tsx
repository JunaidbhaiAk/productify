import React, { FC, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Navigate } from "react-router-dom";
const AuthRoutes: FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) return <> {children} </>;
  return <Navigate to="/login" replace={true} />;
};

export default AuthRoutes;