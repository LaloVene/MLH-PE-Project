import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useJwt } from "react-jwt";

function Private({ children, ...rest }) {
  const { decodedToken } = useJwt("token");

  return (
    <Route {...rest} render={() => (decodedToken.username ? children : <Redirect to="/Login" />)} />
  );
}

export default Private;