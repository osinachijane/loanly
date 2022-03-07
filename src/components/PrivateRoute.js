import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.token ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )
        }
      />
    </>
  );
};

export default withRouter(PrivateRoute);
