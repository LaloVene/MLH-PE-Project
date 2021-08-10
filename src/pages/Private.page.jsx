import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import GlobalContext from "../utils/state/GlobalContext";
// import { useJwt } from "react-jwt";

function Private({ children, ...rest }) {
  const {state} = useContext(GlobalContext);
  // const { decodedToken } = useJwt(state.token);

  return (
    <>
      <Route {...rest} render={() => (state.token.length ? children : <Redirect to="/Login" />)} />
    </>
  );
}   

export default Private;