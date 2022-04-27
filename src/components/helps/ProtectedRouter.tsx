import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from 'context/UserContext';

interface ProtectedRouterProps {
  children: any;
}

function ProtectedRouter({ children }:ProtectedRouterProps) {
  const { login } = React.useContext(UserContext);
  return login ? children : <Navigate to="/" />;
}

export default ProtectedRouter;
