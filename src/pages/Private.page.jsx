import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";

function Private({ children, ...rest }) {
  const {state} = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);

  return (
    <>
    {
      decodedToken &&
      <Route {...rest} render={() => (decodedToken?.username ? children : <Redirect to="/Login" />)} />
    }
    </>
  );
}   

export default Private;