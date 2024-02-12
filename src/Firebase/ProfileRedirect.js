import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";

const ProfileRedirect = ({ component: Component, ...rest }) => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              // pathname: isAdmin ? "/dashboard" : `/profile/${currentUser.uid}`,
              pathname: isAdmin ? "/dashboard" : `/`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProfileRedirect;
