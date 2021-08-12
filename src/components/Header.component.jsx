import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg
} from "@ionic/react";
import { logOutOutline, logInOutline } from 'ionicons/icons';
import styled from "styled-components";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import logo from '../imgs/devup.png'

const Icon = styled(IonIcon)`
  margin-right: 0.5rem;
`

const Logo = styled(IonImg)`
  height: 50px;
  width: 160px;
  margin: 8px;
`


function Searchbar() {
  const {state, dispatch} = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (decodedToken) {
      setUser(decodedToken.username);
    }
  }, [decodedToken, setUser]);

  const logOut = () => {
    dispatch({type: 'REMOVE_TOKEN'});
    setUser(null);
  }

  return (
    <IonHeader>
      <IonToolbar>
        <Link to='/explore' style={{ textDecoration: 'none' }}>
          <Logo src={logo}/>
        </Link>
        <IonButtons slot="end">
          {
            user ?
            <IonButton onClick={logOut}> <Icon icon={logOutOutline} />Log Out</IonButton>
            :
            <Link to='/login'>
              <IonButton> <Icon icon={logInOutline} />Login</IonButton>
            </Link>
          }
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default Searchbar;
