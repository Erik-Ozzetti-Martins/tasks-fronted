import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

function LoginRouter() {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return <Navigate to="/home" />;
  }

  return (
    <section>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </section>
  );
}

export default LoginRouter;
