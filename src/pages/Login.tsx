import { useIonAlert, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useContext } from 'react';
import Header from '../components/Header.component';

import ExploreContainer from '../components/ExploreContainer';
import GlobalContext from "../utils/state/GlobalContext";
import { LRTitle, LRWrapper, LRSmall, LRSwitch, LRLink, LRCol, LRButton } from '../components/LRStyles' ;

import { ReactComponent as LoginPic } from "../components/LoginIcon.svg"

const Login: React.FC = () => {
  const { dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [present] = useIonAlert();
  console.log(window.location.href)

  const onSubmitClick = (e: { preventDefault: () => void; }) => {

    var msg = "";
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)

    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status === "ok") {
          dispatch({ type: "ADD_TOKEN", token: resp.token });
          window.location.href = ("/Profile")
          msg = "Successfully logged in"
        }
        else {
          msg = resp.error
        }
      })

    return present({
      cssClass: 'my-css',
      header: msg,
      message: '',
      buttons: [
        'Ok',
      ],
      onDidDismiss: (e) => console.log('clicked ok'),
    })
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <ExploreContainer name="Login" />
        <IonRow style={{
          margin: "8vh"
        }}>
          <LRCol>
          <LoginPic style={{width: "200px", height: "200px"}} />
            <LRTitle>
              Login to DevUp
            </LRTitle>

            <LRWrapper>

              <IonItem>
                <IonLabel position="floating"> Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
                />
              </IonItem>

              <LRSmall>
                <LRLink to="#">Forgot password?</LRLink>
              </LRSmall>

            </LRWrapper>

            <LRButton onClick={onSubmitClick}>
              Login
            </LRButton>

            <LRSwitch>
              New to DevUp? <LRLink to="/register">Create an account</LRLink>
            </LRSwitch>

          </LRCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
