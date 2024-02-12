import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && isAdmin) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default AdminRoute;
